import assert from "node:assert/strict";
import { LOCALES, localePath } from "./routes.mjs";

export async function checkMobileShowcase(browser, baseUrl) {
  const page = await browser.newPage();
  try {
    await page.emulateMediaFeatures([
      { name: "prefers-reduced-motion", value: "reduce" },
    ]);
    for (const locale of LOCALES) {
      const prefix = locale === "en" ? "" : `/${locale}`;
      for (const width of [390, 1440]) {
        await page.setViewport({ width, height: 900 });
        for (const route of ["/", "/for-patients"]) {
          const path = localePath(route, locale);
          const response = await page.goto(`${baseUrl}${path}`, {
            waitUntil: "domcontentloaded",
            timeout: 30000,
          });
          assert.equal(
            response?.status(),
            200,
            `${path} must serve successfully`,
          );
          await page.waitForSelector(
            route === "/" ? ".family-practice-action" : "#with-your-child",
          );
          await page.evaluate(async () => {
            await document.fonts.ready;
            const shots = [...document.images].filter(
              (img) =>
                img.src.includes("/screenshots/mobile/") ||
                /\/screenshots\/(pt|es)\/mobile\//.test(img.src),
            );
            await Promise.all(
              shots.map((img) => {
                img.loading = "eager";
                return img.decode();
              }),
            );
          });
          if (route === "/") {
            await page.waitForFunction(
              () =>
                document.querySelector("video[src*='app-screen']")
                  ?.readyState >= 1,
              { timeout: 15000 },
            );
          }
          const report = await page.evaluate(() => {
            const section = document.querySelector("#with-your-child");
            const row = section?.querySelector("ol");
            const shots = [...(section?.querySelectorAll("[role=img]") ?? [])];
            return {
              overflow: document.documentElement.scrollWidth > innerWidth + 1,
              familyHref: document
                .querySelector(".family-practice-action")
                ?.getAttribute("href"),
              video: document
                .querySelector("video[src*='app-screen']")
                ?.getAttribute("src"),
              videoPaused: document.querySelector("video[src*='app-screen']")
                ?.paused,
              screenshotSources: [...document.images]
                .map((img) => img.getAttribute("src"))
                .filter(
                  (src) =>
                    src?.includes("/mobile/") &&
                    !src.endsWith("iphone-frame.webp"),
                ),
              count: shots.length,
              shots: shots.map((shot) => ({
                width: shot.getBoundingClientRect().width,
                display: getComputedStyle(shot).display,
                label: shot.getAttribute("aria-label"),
                src: shot.querySelector("img").getAttribute("src"),
              })),
              rowFocusable: row?.tabIndex === 0,
            };
          });
          assert.equal(
            report.overflow,
            false,
            `${path} overflows at ${width}px`,
          );
          for (const src of report.screenshotSources) {
            assert.ok(
              src.startsWith(`/screenshots${prefix}/mobile/`),
              `wrong screenshot locale: ${src}`,
            );
          }
          if (route === "/") {
            assert.equal(
              report.familyHref,
              `${prefix}/for-patients/#with-your-child`,
            );
            assert.equal(report.video, `/videos${prefix}/app-screen.mp4`);
            assert.equal(
              report.videoPaused,
              true,
              "video must pause under reduced motion",
            );
            const video = await fetch(`${baseUrl}${report.video}`);
            assert.equal(video.status, 200, `missing ${report.video}`);
            assert.ok(
              (await video.arrayBuffer()).byteLength > 1000,
              "empty video",
            );
          } else {
            assert.equal(
              report.count,
              4,
              `missing caregiver screens on ${path}`,
            );
            assert.equal(
              report.rowFocusable,
              true,
              "caregiver row must support keyboard scrolling",
            );
            for (const shot of report.shots) {
              assert.notEqual(shot.display, "none", "caregiver screen hidden");
              assert.ok(
                shot.width >= 250,
                `caregiver screen too small at ${width}px`,
              );
              assert.ok(shot.label?.trim(), "caregiver screen needs alt text");
              assert.ok(
                shot.src.startsWith(`/screenshots${prefix}/mobile/`),
                `wrong locale: ${shot.src}`,
              );
            }
            await page.focus(".caregiver-screens");
            const overflows = await page.$eval(
              ".caregiver-screens",
              (row) => row.scrollWidth > row.clientWidth,
            );
            if (overflows) {
              await page.keyboard.press("ArrowRight");
              await page.waitForFunction(
                () =>
                  document.querySelector(".caregiver-screens").scrollLeft > 0,
                { timeout: 3000 },
              );
            }
          }
        }
      }
    }
    await page.setViewport({ width: 1440, height: 900 });
    await page.emulateMediaFeatures([
      { name: "prefers-reduced-motion", value: "no-preference" },
    ]);
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForFunction(() => {
      const video = document.querySelector("video[src*='app-screen']");
      return video && !video.paused && video.currentTime > 0;
    });
    await page.waitForSelector(".site-intro", { hidden: true });
    await page.click('button[aria-haspopup="menu"]');
    await page.waitForSelector('[role="menuitem"]', { timeout: 5000 });
    await page.$$eval('[role="menuitem"]', (items) => {
      const portuguese = items.find(
        (item) => item.textContent.trim() === "Português",
      );
      if (!portuguese) throw new Error("Portuguese language option missing");
      portuguese.click();
    });
    await page.waitForFunction(
      () => {
        const video = document.querySelector("video[src*='app-screen']");
        return (
          video?.getAttribute("src") === "/videos/pt/app-screen.mp4" &&
          !video.paused &&
          video.currentTime > 0
        );
      },
      { timeout: 5000 },
    );
    await page.emulateMediaFeatures([
      { name: "prefers-reduced-motion", value: "reduce" },
    ]);
    await page.waitForFunction(
      () => document.querySelector("video[src*='app-screen']").paused,
    );
    console.log(
      "check:mobile-showcase OK: EN/PT/ES, 390px and 1440px, decoded images and localised videos.",
    );
  } finally {
    await page.close();
  }
}
