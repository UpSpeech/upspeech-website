import { useEffect, useRef, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ArrowPathIcon,
  ArrowUpOnSquareIcon,
  CalendarIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EnvelopeIcon,
  ExclamationCircleIcon,
  LinkIcon,
  MapPinIcon,
  UserGroupIcon,
  WifiIcon,
} from "@heroicons/react/24/outline";
import { SEO } from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Companion from "@/components/Companion";
import {
  AUDIENCE,
  AUDIENCES,
  COMPANION_ACCENTS,
  COMPANION_TINTS,
  isAudience,
  type Audience,
} from "@/components/join/companions";
import * as Mock from "@/components/join/Mocks";
import "@/components/join/join.css";
import { trackFormSubmit } from "@/lib/analytics";
import {
  SHARE_CODE,
  getCampaign,
  getReferral,
  leadEventProperties,
} from "@/lib/utm";
import { useLocale, useT } from "@/i18n";

type Request = "early" | "demo" | "pilot";
type TeamSize = "solo" | "small" | "medium" | "large";
type Sent = {
  request: Request | "waitlist";
  demoWhen: "stand" | "call";
  demoSlot: string;
  email: string;
  consent: boolean;
};

const SLOTS = ["11:30", "13:00", "15:30", "17:00"];
const TEAMS: TeamSize[] = ["solo", "small", "medium", "large"];
const COUNTRIES = ["PT", "ES", "GB", "IE", "FR", "DE", "NL", "IT", "BR", "US"];
const INTERESTS = ["stutter", "dld", "unsure"] as const;
/* The sheet gets English labels whatever the visitor's language. */
const INTEREST_LABELS: Record<(typeof INTERESTS)[number], string> = {
  stutter: "Stuttering",
  dld: "Developmental language difficulties",
  unsure: "Not sure yet",
};
const SHARE_KEY = "upspeech_share";
/* Where the sun sits for each screen, as a share of its walk down the sky. */
const SUN = { landing: 0, story: 0.33, form: 0.66, done: 1 };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/*
 * The stand demo exists for three days, and only for someone who reached the
 * page from a booth link. Lisbon is on UTC in November.
 */
const SUMMIT_START = Date.UTC(2026, 10, 10);
const SUMMIT_END = Date.UTC(2026, 10, 13);
const standAvailable = () => {
  const now = Date.now();
  return (
    now >= SUMMIT_START &&
    now < SUMMIT_END &&
    getCampaign().source === "websummit"
  );
};

const shareCode = (): string => {
  try {
    const kept = sessionStorage.getItem(SHARE_KEY);
    if (kept && SHARE_CODE.test(kept)) return kept;
  } catch {
    // Storage blocked: a fresh code per visit is fine.
  }
  const code = Math.random().toString(36).slice(2, 8).padEnd(6, "0");
  try {
    sessionStorage.setItem(SHARE_KEY, code);
  } catch {
    // As above.
  }
  return code;
};

const fill = (text: string, values: Record<string, string>) =>
  text.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");

const Check = ({ size = 18 }: { size?: number }) => (
  <CheckIcon width={size} height={size} strokeWidth={2} aria-hidden="true" />
);

export default function Join() {
  const t = useT().join;
  const locale = useLocale();
  const [params, setParams] = useSearchParams();
  const forParam = params.get("for");
  const aud: Audience | null = isAudience(forParam) ? forParam : null;
  const figure = params.get("from") === "figure";
  const [sent, setSent] = useState<Sent | null>(null);
  const screen: keyof typeof SUN = sent
    ? "done"
    : !aud
      ? "landing"
      : params.get("step") === "form"
        ? "form"
        : "story";

  const [code] = useState(shareCode);
  const link = `upspeech.app/join?ref=${code}`;
  const [stand] = useState(standAvailable);

  const [request, setRequest] = useState<Request>("early");
  const [demoWhen, setDemoWhen] = useState<"stand" | "call">("stand");
  const [slot, setSlot] = useState<number | null>(null);
  const [team, setTeam] = useState<TeamSize>("small");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [clinic, setClinic] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sendError, setSendError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [slow, setSlow] = useState(false);
  const [exDone, setExDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const [country, setCountry] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);
  const formRef = useRef<HTMLElement>(null);

  const when = stand ? demoWhen : "call";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [screen, aud]);

  const go = (next: { for?: Audience | null; step?: "form" }) => {
    const p = new URLSearchParams();
    const target = next.for === undefined ? aud : next.for;
    if (target) p.set("for", target);
    if (figure && target) p.set("from", "figure");
    if (next.step) p.set("step", next.step);
    setErrors({});
    setSendError(false);
    setParams(p);
  };

  const openForm = (r?: Request) => {
    if (r) {
      setRequest(r);
      setSlot(null);
    }
    go({ step: "form" });
  };

  const isTherapist = aud === "therapist";
  const isFriend = aud === "friend";
  const asksRequest = isTherapist && request !== "early";
  const kind: Sent["request"] = isTherapist ? request : "waitlist";

  const validate = () => {
    const e: Record<string, string> = {};
    if (!email.trim()) e.email = t.form.errorEmailEmpty;
    else if (!EMAIL_PATTERN.test(email.trim()))
      e.email = t.form.errorEmailInvalid;
    if (!asksRequest && !consent) e.consent = t.form.errorConsent;
    if (isTherapist && request === "demo" && when === "stand" && slot === null)
      e.slot = t.form.errorSlot;
    return e;
  };

  const submit = async () => {
    if (submitting || !aud) return;
    const e = validate();
    setErrors(e);
    setSendError(false);
    if (Object.keys(e).length) {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    const campaign = getCampaign();
    const properties = leadEventProperties(
      { profile: AUDIENCE[aud].profile, request: kind },
      campaign,
    );
    setSubmitting(true);
    const slowTimer = window.setTimeout(() => setSlow(true), 2500);
    try {
      const res = await fetch("/.netlify/functions/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: asksRequest ? name.trim() : "",
          clinic: asksRequest ? clinic.trim() : "",
          profile: AUDIENCE[aud].profile,
          request: kind,
          demoWhen: kind === "demo" ? when : "",
          demoSlot: kind === "demo" && when === "stand" ? SLOTS[slot ?? 0] : "",
          clinicSize: kind === "pilot" ? team : "",
          companion: AUDIENCE[aud].companion,
          consent,
          shareCode: isFriend ? code : "",
          referredBy: getReferral(),
          locale,
          ...campaign,
        }),
      });
      if (!res.ok) throw new Error(`early-access ${res.status}`);
      trackFormSubmit("join_form", true, properties);
      setSent({
        request: kind,
        demoWhen: when,
        demoSlot: slot === null ? "" : SLOTS[slot],
        email: email.trim(),
        consent,
      });
    } catch (err) {
      console.error("Join submission error:", err);
      trackFormSubmit("join_form", false, properties);
      setSendError(true);
    } finally {
      window.clearTimeout(slowTimer);
      setSlow(false);
      setSubmitting(false);
    }
  };

  const saveDetails = () => {
    setSaved(true);
    fetch("/.netlify/functions/early-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: "details",
        email: sent?.email,
        country,
        interests: interests.map(
          (k) => INTEREST_LABELS[k as (typeof INTERESTS)[number]],
        ),
      }),
    }).catch((err) => console.error("Join details error:", err));
  };

  const copyLink = () => {
    navigator.clipboard?.writeText(`https://${link}`).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };
  const shareLink = () => {
    if (navigator.share)
      navigator
        .share({
          title: "UpSpeech",
          text: t.form.shareText,
          url: `https://${link}`,
        })
        .catch(() => {});
    else copyLink();
  };

  const restart = () => {
    setSent(null);
    setEmail("");
    setName("");
    setClinic("");
    setConsent(false);
    setSaved(false);
    setCountry("");
    setInterests([]);
    go({ for: null });
  };

  return (
    <div className="join">
      <SEO
        title={t.seoTitle}
        description={t.seoDescription}
        path="/join"
        locale={locale}
      />
      <Header />
      <div className="j-scene" aria-hidden="true">
        <div className="j-sun" style={{ top: 100 + SUN[screen] * 160 }} />
        <div className="j-hill j-hill-1" />
        <div className="j-hill j-hill-2" />
        <div className="j-hill j-hill-3" />
      </div>

      <main id="main" className="j-main">
        {screen === "landing" && <Landing onPick={(a) => go({ for: a })} />}
        {screen === "story" && aud && (
          <Story
            aud={aud}
            figure={figure}
            exDone={exDone}
            onExDone={() => setExDone((d) => !d)}
            link={link}
            onBack={() => go({ for: null })}
            footer={
              isTherapist ? (
                <>
                  <button
                    type="button"
                    className="j-btn"
                    onClick={() => openForm("demo")}
                  >
                    {t.actions.requestDemo}
                  </button>
                  <button
                    type="button"
                    className="j-btn ghost"
                    onClick={() => openForm("early")}
                  >
                    {t.actions.earlyAccess}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="j-btn"
                  onClick={() => openForm()}
                >
                  {isFriend ? t.actions.getLink : t.actions.join}
                </button>
              )
            }
          />
        )}
        {screen === "form" && aud && (
          <div className="j-pad">
            <button type="button" className="j-back" onClick={() => go({})}>
              <ChevronLeftIcon width={20} height={20} aria-hidden="true" />
              {t.back}
            </button>
            <FormHero aud={aud} request={kind} when={when} />
            {isFriend && (
              <ShareCard
                link={link}
                copied={copied}
                onCopy={copyLink}
                onShare={shareLink}
              />
            )}
            <section
              ref={formRef}
              className={`j-card${submitting ? " j-busy" : ""}`}
              aria-labelledby={isFriend ? "j-updates" : "j-form-title"}
            >
              {isFriend ? (
                <div className="j-group" style={{ gap: 2 }}>
                  <div className="j-card-h">
                    <h2 id="j-updates">{t.form.updatesTitle}</h2>
                    <span className="j-hint">{t.form.optionalTag}</span>
                  </div>
                  <p className="j-hint" style={{ fontSize: 13.5 }}>
                    {t.form.updatesHint}
                  </p>
                </div>
              ) : (
                <div className="j-joining">
                  <span>
                    {t.joiningAs} <strong>{t.audiences[aud].short}</strong>
                  </span>
                  <button
                    type="button"
                    className="j-link"
                    onClick={() => go({ for: null })}
                  >
                    {t.change}
                  </button>
                </div>
              )}

              {Object.keys(errors).length > 0 && (
                <div className="j-alert" role="alert">
                  <ExclamationCircleIcon
                    width={20}
                    height={20}
                    aria-hidden="true"
                    style={{ flex: "none" }}
                  />
                  {Object.keys(errors).length === 1
                    ? t.form.errorsOne
                    : fill(t.form.errorsMany, {
                        count: String(Object.keys(errors).length),
                      })}
                </div>
              )}

              {isTherapist && (
                <>
                  <div className="j-group">
                    <span className="j-lbl" id="j-req">
                      {t.form.requestLabel}
                    </span>
                    <div
                      className="j-seg"
                      role="radiogroup"
                      aria-labelledby="j-req"
                    >
                      {(["early", "demo", "pilot"] as Request[]).map((r) => (
                        <button
                          key={r}
                          type="button"
                          role="radio"
                          aria-checked={request === r}
                          onClick={() => {
                            setRequest(r);
                            setErrors({});
                          }}
                        >
                          {t.form.requests[r]}
                        </button>
                      ))}
                    </div>
                  </div>
                  {request === "demo" && stand && (
                    <div className="j-group">
                      <span className="j-lbl">{t.form.whenLabel}</span>
                      <div
                        className="j-when-opts"
                        role="radiogroup"
                        aria-label={t.form.whenLabel}
                      >
                        {(
                          [
                            ["stand", t.form.whenStand, t.form.whenStandSub],
                            ["call", t.form.whenCall, t.form.whenCallSub],
                          ] as const
                        ).map(([k, label, sub]) => (
                          <button
                            key={k}
                            type="button"
                            role="radio"
                            aria-checked={demoWhen === k}
                            onClick={() => setDemoWhen(k)}
                          >
                            <b>{label}</b>
                            <small>{sub}</small>
                          </button>
                        ))}
                      </div>
                      {demoWhen === "stand" && (
                        <>
                          <div
                            className="j-pills"
                            role="group"
                            aria-label={t.form.slotsLabel}
                          >
                            {SLOTS.map((s, i) => (
                              <button
                                key={s}
                                type="button"
                                className="j-pill"
                                aria-pressed={slot === i}
                                onClick={() => {
                                  setSlot(i);
                                  setErrors(({ slot: _, ...rest }) => rest);
                                }}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                          {errors.slot ? (
                            <span className="j-err-line">{errors.slot}</span>
                          ) : (
                            <span className="j-hint">{t.form.slotsHint}</span>
                          )}
                        </>
                      )}
                    </div>
                  )}
                  {request === "pilot" && (
                    <div className="j-group">
                      <span className="j-lbl">{t.form.teamLabel}</span>
                      <div
                        className="j-pills"
                        role="group"
                        aria-label={t.form.teamLabel}
                      >
                        {TEAMS.map((size) => (
                          <button
                            key={size}
                            type="button"
                            className="j-pill"
                            aria-pressed={team === size}
                            onClick={() => setTeam(size)}
                          >
                            {t.form.teams[size]}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              <div className="j-field">
                <label htmlFor="j-email">
                  {asksRequest ? t.form.workEmail : t.form.email}
                </label>
                <input
                  id="j-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  autoCapitalize="off"
                  spellCheck={false}
                  placeholder={
                    asksRequest
                      ? t.form.workEmailPlaceholder
                      : t.form.emailPlaceholder
                  }
                  value={email}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "j-email-error" : undefined}
                  onChange={(ev) => {
                    setEmail(ev.target.value);
                    if (
                      errors.email &&
                      EMAIL_PATTERN.test(ev.target.value.trim())
                    )
                      setErrors(({ email: _, ...rest }) => rest);
                  }}
                />
                {errors.email && (
                  <span className="j-err-line" id="j-email-error">
                    {errors.email}
                  </span>
                )}
              </div>

              {asksRequest && (
                <div className="j-two">
                  <div className="j-field">
                    <label htmlFor="j-name">{t.form.name}</label>
                    <input
                      id="j-name"
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(ev) => setName(ev.target.value)}
                    />
                  </div>
                  <div className="j-field">
                    <label htmlFor="j-clinic">
                      {t.form.clinic} <small>{t.form.optional}</small>
                    </label>
                    <input
                      id="j-clinic"
                      type="text"
                      autoComplete="organization"
                      value={clinic}
                      onChange={(ev) => setClinic(ev.target.value)}
                    />
                  </div>
                </div>
              )}

              <div>
                <button
                  type="button"
                  className="j-check"
                  role="checkbox"
                  aria-checked={consent}
                  aria-invalid={!!errors.consent}
                  onClick={() => {
                    setConsent((c) => !c);
                    setErrors(({ consent: _, ...rest }) => rest);
                  }}
                >
                  <span className="j-box">
                    <CheckIcon
                      width={15}
                      height={15}
                      strokeWidth={3}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="t">
                    <b>
                      {asksRequest ? t.form.consentOptional : t.form.consent}
                    </b>
                    <small>{t.form.consentHint}</small>
                  </span>
                </button>
                {errors.consent && (
                  <span className="j-err-line" style={{ paddingLeft: 36 }}>
                    {errors.consent}
                  </span>
                )}
              </div>

              {asksRequest && (
                <p className="j-hint">
                  {fill(t.form.requestHint, {
                    request: t.form.requestNouns[request as "demo" | "pilot"],
                  })}
                </p>
              )}
              {sendError && (
                <div className="j-alert" role="alert">
                  {t.form.errorSend}
                </div>
              )}
              {isFriend && (
                <SubmitButton
                  className="j-btn ghost"
                  busy={submitting}
                  label={submitting ? t.form.saving : t.form.submit.friend}
                  onClick={submit}
                />
              )}
            </section>
            {!isFriend && (
              <div className="j-foot">
                {slow && (
                  <div className="j-status" role="status">
                    <WifiIcon
                      width={20}
                      height={20}
                      aria-hidden="true"
                      style={{ flex: "none" }}
                    />
                    <span>
                      <b>{t.form.slowTitle}</b> {t.form.slowBody}
                    </span>
                  </div>
                )}
                <SubmitButton
                  className="j-btn"
                  busy={submitting}
                  label={
                    submitting
                      ? asksRequest
                        ? t.form.sending
                        : t.form.saving
                      : !isTherapist
                        ? t.form.submit.waitlist
                        : request === "pilot"
                          ? t.form.submit.pilot
                          : request === "demo"
                            ? when === "call"
                              ? t.form.submit.demoCall
                              : slot === null
                                ? t.form.submit.demoStandNoTime
                                : fill(t.form.submit.demoStand, {
                                    time: SLOTS[slot],
                                  })
                            : t.form.submit.early
                  }
                  onClick={submit}
                />
              </div>
            )}
          </div>
        )}
        {screen === "done" && aud && sent && (
          <Done
            aud={aud}
            sent={sent}
            stand={stand}
            share={
              isFriend ? (
                <ShareCard
                  link={link}
                  copied={copied}
                  onCopy={copyLink}
                  onShare={shareLink}
                />
              ) : null
            }
            onUpsell={() => {
              setSent(null);
              setRequest("demo");
              setSlot(null);
              go({ step: "form" });
            }}
            tailor={
              saved ? (
                <span className="j-saved">
                  <Check />
                  {t.done.saved}
                </span>
              ) : (
                <>
                  <div className="j-field">
                    <select
                      aria-label={t.done.country}
                      value={country}
                      onChange={(ev) => setCountry(ev.target.value)}
                    >
                      <option value="">{t.done.country}</option>
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c}>
                          {regionName(c, locale)}
                        </option>
                      ))}
                      <option value="other">{t.done.countryOther}</option>
                    </select>
                  </div>
                  <div className="j-pills">
                    {INTERESTS.map((k) => (
                      <button
                        key={k}
                        type="button"
                        className="j-pill soft"
                        aria-pressed={interests.includes(k)}
                        onClick={() =>
                          setInterests((list) =>
                            list.includes(k)
                              ? list.filter((x) => x !== k)
                              : [...list, k],
                          )
                        }
                      >
                        {t.done.interests[k]}
                        {k === "dld" && (
                          <span className="j-chip j-chip-dev">
                            {t.inDevelopment}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="j-btn ghost"
                    style={{ minHeight: 48 }}
                    onClick={saveDetails}
                  >
                    {t.done.save}
                  </button>
                </>
              )
            }
            onRestart={restart}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

const regionName = (code: string, locale: string) => {
  try {
    return new Intl.DisplayNames([locale], { type: "region" }).of(code) ?? code;
  } catch {
    return code;
  }
};

function SubmitButton({
  className,
  busy,
  label,
  onClick,
}: {
  className: string;
  busy: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={className}
      aria-busy={busy}
      onClick={onClick}
    >
      {busy && <span className="j-spinner" />}
      {label}
    </button>
  );
}

function Landing({ onPick }: { onPick: (a: Audience) => void }) {
  const t = useT().join;
  return (
    <div className="j-pad">
      <div className="j-lead">
        <h1>
          {t.titleLead} <span>{t.titleAccent}</span>
        </h1>
        <p>{t.lead}</p>
      </div>
      <h2 className="j-list-h">{t.listTitle}</h2>
      <div className="j-aud">
        {AUDIENCES.map((a) => {
          const c = AUDIENCE[a].companion;
          return (
            <button
              key={a}
              type="button"
              className="j-aud-row"
              onClick={() => onPick(a)}
            >
              <span
                className="j-bust"
                style={{ background: COMPANION_TINTS[c] }}
                aria-hidden="true"
              >
                <Companion
                  species={c}
                  accent={COMPANION_ACCENTS[c]}
                  size={76}
                />
              </span>
              <span className="j-txt">
                <b>{t.audiences[a].label}</b>
                <small>{t.audiences[a].line}</small>
              </span>
              <ChevronRightIcon
                width={20}
                height={20}
                color="#50526b"
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Story({
  aud,
  figure,
  exDone,
  onExDone,
  link,
  onBack,
  footer,
}: {
  aud: Audience;
  figure: boolean;
  exDone: boolean;
  onExDone: () => void;
  link: string;
  onBack: () => void;
  footer: ReactNode;
}) {
  const t = useT().join;
  const a = t.audiences[aud];
  const c = AUDIENCE[aud].companion;
  const accent = COMPANION_ACCENTS[c];
  const tint = COMPANION_TINTS[c];
  const mocks: Record<Audience, ReactNode[]> = {
    therapist: [
      <Mock.Assign tint={tint} />,
      <Mock.Week accent={accent} />,
      <Mock.Report />,
    ],
    patient: [
      <Mock.Notification />,
      <Mock.Exercise done={exDone} onToggle={onExDone} />,
      <Mock.TherapistNote accent={accent} />,
    ],
    family: [
      <Mock.Plan tint={tint} />,
      <Mock.LeoWeek accent={accent} />,
      <Mock.AnaNote />,
    ],
    friend: [
      <Mock.Strip accent={accent} filled={false} />,
      <Mock.Strip accent={accent} filled />,
      <Mock.SentLink link={link} />,
    ],
  };

  return (
    <div className="j-pad">
      <button type="button" className="j-back" onClick={onBack}>
        <ChevronLeftIcon width={20} height={20} aria-hidden="true" />
        {t.back}
      </button>
      <div className="j-hero" style={{ background: tint }}>
        {figure && (
          <span className="j-found">{t.found.replace("{name}", c)}</span>
        )}
        <h1>{a.title}</h1>
        <span className="j-hero-c" aria-hidden="true">
          <Companion species={c} accent={accent} size={112} />
        </span>
      </div>
      <p className="j-sub">{a.sub}</p>
      {aud === "therapist" && (
        <div className="j-stat">
          <b>{t.stat.value}</b>
          <p>{t.stat.text}</p>
        </div>
      )}
      <section
        className="j-group"
        style={{ gap: 14 }}
        aria-labelledby="j-steps"
      >
        <div className="j-steps-h">
          <h2 id="j-steps">{a.stepsTitle}</h2>
          <p>{a.stepsLead}</p>
        </div>
        <ol className="j-steps">
          {a.steps.map((step, i) => (
            <li key={i} className="j-step">
              <span className="j-num" style={{ background: tint }}>
                {i + 1}
              </span>
              <div className="j-step-card">
                <span className="j-when">{step.when}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                {mocks[aud][i]}
              </div>
            </li>
          ))}
        </ol>
        {aud === "family" && (
          <div className="j-dev">
            <div>
              <b>{t.devTitle}</b>
              <span className="j-chip j-chip-dev">{t.inDevelopment}</span>
            </div>
            <p>{t.devBody}</p>
          </div>
        )}
      </section>
      <div className="j-foot">{footer}</div>
    </div>
  );
}

function FormHero({
  aud,
  request,
  when,
}: {
  aud: Audience;
  request: Sent["request"];
  when: "stand" | "call";
}) {
  const t = useT().join;
  const c = AUDIENCE[aud].companion;
  const friend = aud === "friend";
  const title = friend
    ? t.form.titles.friend
    : request === "waitlist"
      ? t.form.titles.waitlist
      : t.form.titles[request];
  const lead = friend
    ? t.form.leads.friend
    : request === "demo"
      ? when === "stand"
        ? t.form.leads.demoStand
        : t.form.leads.demoCall
      : t.form.leads[request];
  return (
    <div className="j-form-hero" style={{ background: COMPANION_TINTS[c] }}>
      <div className="j-txt">
        <h1 id="j-form-title">{title}</h1>
        <p>{lead}</p>
        {!friend && (
          <ul className="j-perks">
            {t.audiences[aud].perks.map((p) => (
              <li key={p}>
                <Check />
                {p}
              </li>
            ))}
          </ul>
        )}
      </div>
      <span className="j-hero-c" aria-hidden="true">
        <Companion species={c} accent={COMPANION_ACCENTS[c]} size={84} />
      </span>
    </div>
  );
}

function ShareCard({
  link,
  copied,
  onCopy,
  onShare,
}: {
  link: string;
  copied: boolean;
  onCopy: () => void;
  onShare: () => void;
}) {
  const t = useT().join.form;
  return (
    <section className="j-card" aria-labelledby="j-link">
      <h2 id="j-link">{t.linkTitle}</h2>
      <p>{t.linkBody}</p>
      <div className="j-share">
        <LinkIcon
          width={18}
          height={18}
          color="#50526b"
          aria-hidden="true"
          style={{ flex: "none" }}
        />
        <span>{link}</span>
        <button type="button" onClick={onCopy}>
          {copied ? t.copied : t.copy}
        </button>
      </div>
      <button type="button" className="j-btn" onClick={onShare}>
        <ArrowUpOnSquareIcon width={20} height={20} aria-hidden="true" />
        {t.share}
      </button>
    </section>
  );
}

function Done({
  aud,
  sent,
  stand,
  share,
  onUpsell,
  tailor,
  onRestart,
}: {
  aud: Audience;
  sent: Sent;
  stand: boolean;
  share: ReactNode;
  onUpsell: () => void;
  tailor: ReactNode;
  onRestart: () => void;
}) {
  const t = useT().join;
  const d = t.done;
  const c = AUDIENCE[aud].companion;
  const isRequest = sent.request === "demo" || sent.request === "pilot";
  const title =
    sent.request === "pilot"
      ? d.titles.pilot
      : sent.request === "demo"
        ? sent.demoWhen === "stand"
          ? d.titles.demoStand
          : d.titles.demoCall
        : d.titles.waitlist;
  const line = isRequest
    ? d.lineRequest
    : aud === "friend"
      ? d.lineFriend
      : fill(d.lineWaitlist, { email: sent.email });

  const next: [typeof EnvelopeIcon, string, string][] = [];
  if (sent.request === "demo" && sent.demoWhen === "stand")
    next.push([
      MapPinIcon,
      d.nextStand,
      fill(d.nextStandSub, { time: sent.demoSlot }),
    ]);
  else if (sent.request === "demo")
    next.push([UserGroupIcon, d.nextCall, d.nextContactSub]);
  else if (sent.request === "pilot")
    next.push([UserGroupIcon, d.nextPilot, d.nextContactSub]);
  if (sent.consent) {
    next.push([
      EnvelopeIcon,
      d.nextWelcome,
      fill(d.nextWelcomeSub, { email: sent.email }),
    ]);
    next.push([CalendarIcon, d.nextWeek, d.nextWeekSub[aud]]);
    next.push([ArrowPathIcon, d.nextMonthly, d.nextMonthlySub]);
  }

  return (
    <div className="j-pad">
      <div className="j-done-card" style={{ background: COMPANION_TINTS[c] }}>
        <span aria-hidden="true">
          <Companion species={c} accent={COMPANION_ACCENTS[c]} size={88} />
        </span>
        <div className="j-txt">
          <span className="j-badge">
            <i>
              <CheckIcon
                width={10}
                height={10}
                strokeWidth={3.5}
                aria-hidden="true"
              />
            </i>
            {isRequest ? d.requestReceived : d.signedUp}
          </span>
          <h1>{title}</h1>
          <p>{line}</p>
        </div>
      </div>
      {share}
      {aud === "therapist" && sent.request === "early" && (
        <button type="button" className="j-upsell" onClick={onUpsell}>
          <span className="j-txt">
            <b>{d.upsellTitle}</b>
            <small>{stand ? d.upsellBody : d.upsellBodyCall}</small>
          </span>
          <span className="go">{d.upsellCta}</span>
        </button>
      )}
      <section className="j-card" aria-labelledby="j-tailor">
        <div className="j-card-h">
          <h2 id="j-tailor">{d.tailorTitle}</h2>
          <span className="j-hint">{t.form.optionalTag}</span>
        </div>
        {tailor}
      </section>
      {next.length > 0 && (
        <section className="j-next" aria-labelledby="j-next">
          <h2 id="j-next">{d.nextTitle}</h2>
          {next.map(([IconCmp, title, sub]) => (
            <div key={title} className="j-next-row">
              <span className="ic">
                <IconCmp
                  width={18}
                  height={18}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </span>
              <div>
                <b>{title}</b>
                <small>{sub}</small>
              </div>
            </div>
          ))}
        </section>
      )}
      <button type="button" className="j-btn ghost" onClick={onRestart}>
        {d.restart}
      </button>
    </div>
  );
}
