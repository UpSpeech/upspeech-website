import puppeteer from 'puppeteer';
const NET = { offline:false, downloadThroughput: 1.6*1024*1024/8, uploadThroughput: 750*1024/8, latency: 150 };
const RUNS = Number(process.env.RUNS || 7);

const INSTRUMENT = () => {
  window.__m = { fcp:null, lcp:null, lcpEl:null, cls:0, long:[] };
  new PerformanceObserver(l => { for (const e of l.getEntries())
    if (e.name === 'first-contentful-paint') window.__m.fcp = e.startTime; }).observe({type:'paint',buffered:true});
  new PerformanceObserver(l => { const es=l.getEntries(); const e=es[es.length-1];
    window.__m.lcp = e.startTime;
    window.__m.lcpEl = e.url ? e.url.split('/').pop() : (e.element?.tagName || 'n/a');
  }).observe({type:'largest-contentful-paint',buffered:true});
  new PerformanceObserver(l => { for (const e of l.getEntries())
    if (!e.hadRecentInput) window.__m.cls += e.value; }).observe({type:'layout-shift',buffered:true});
  new PerformanceObserver(l => { for (const e of l.getEntries())
    window.__m.long.push({s:e.startTime,d:e.duration}); }).observe({type:'longtask',buffered:true});
};

async function run(browser, url, { mobile = true, suppressIntro = false } = {}) {
  const ctx = await browser.createBrowserContext();
  const page = await ctx.newPage();
  await page.setViewport(mobile
    ? { width:412, height:823, deviceScaleFactor:1.75, isMobile:true, hasTouch:true }
    : { width:1350, height:940, deviceScaleFactor:1 });
  const cdp = await page.createCDPSession();
  await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions', NET);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: mobile ? 4 : 1 });
  if (suppressIntro) await page.evaluateOnNewDocument(() => { try { sessionStorage.setItem('upspeech_intro_seen','1'); } catch {} });
  await page.evaluateOnNewDocument(INSTRUMENT);
  await page.goto(url, { waitUntil:'load', timeout:120000 });
  await new Promise(r => setTimeout(r, 6000));
  const m = await page.evaluate(() => {
    const res = performance.getEntriesByType('resource');
    const nav = performance.getEntriesByType('navigation')[0];
    return { fcp:window.__m.fcp, lcp:window.__m.lcp, lcpEl:window.__m.lcpEl, cls:window.__m.cls,
      tbt: window.__m.long.filter(t=>window.__m.fcp===null||t.s>=window.__m.fcp).reduce((a,t)=>a+Math.max(0,t.d-50),0),
      bytes: res.reduce((a,r)=>a+(r.transferSize||0),0)+(nav?.transferSize||0) };
  });
  await ctx.close();
  return m;
}
const med = a => { const s=[...a].sort((x,y)=>x-y); return s[Math.floor(s.length/2)]; };
const browser = await puppeteer.launch({ headless:'new', args:['--no-sandbox'] });

const mobile = process.env.DESKTOP !== '1';
const cases = mobile ? [
  ['prod code',                 'http://localhost:8801/', {}],
  ['branch as built',           'http://localhost:8802/', {}],
  ['branch + fixes',            'http://localhost:8808/', {}],
  ['branch + fixes, no intro',  'http://localhost:8808/', { suppressIntro:true }],
] : [
  ['prod code',                 'http://localhost:8801/', { mobile:false }],
  ['branch as built',           'http://localhost:8802/', { mobile:false }],
  ['branch + fixes',            'http://localhost:8808/', { mobile:false }],
];

console.log(`${mobile?'MOBILE 412x823, 4x CPU':'DESKTOP 1350x940, 1x CPU'}, 1.6Mbps/150ms, median of ${RUNS}\n`);
console.log('case'.padEnd(29),'FCP'.padStart(7),'LCP'.padStart(8),'CLS'.padStart(7),'TBT'.padStart(7),'KB'.padStart(6),'  LCP element');
for (const [label,url,opts] of cases) {
  const rs=[]; for (let i=0;i<RUNS;i++) rs.push(await run(browser,url,{ mobile, ...opts }));
  const el = rs.map(r=>r.lcpEl).sort((a,b)=>rs.filter(r=>r.lcpEl===b).length-rs.filter(r=>r.lcpEl===a).length)[0];
  console.log(label.padEnd(29),
    (med(rs.map(r=>r.fcp))/1000).toFixed(2).padStart(6)+'s',
    (med(rs.map(r=>r.lcp))/1000).toFixed(2).padStart(7)+'s',
    med(rs.map(r=>r.cls)).toFixed(3).padStart(7),
    Math.round(med(rs.map(r=>r.tbt))).toString().padStart(6)+'ms',
    Math.round(med(rs.map(r=>r.bytes))/1024).toString().padStart(6),
    '  '+el);
}
await browser.close();
