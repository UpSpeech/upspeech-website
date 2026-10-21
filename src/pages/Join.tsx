import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  CheckIcon,
  ChevronLeftIcon,
  ExclamationCircleIcon,
  WifiIcon,
} from "@heroicons/react/24/outline";
import { SEO } from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  AUDIENCE,
  isAudience,
  type Audience,
} from "@/components/join/companions";
import {
  Check,
  Done,
  FormHero,
  Landing,
  ShareCard,
  Story,
  SubmitButton,
  type Request,
  type Sent,
} from "@/components/join/Screens";
import { fill } from "@/components/join/fill";
import "@/components/join/join.css";
import { trackFormSubmit } from "@/lib/analytics";
import { getCampaign, getReferral, leadEventProperties } from "@/lib/utm";
import {
  CLINIC_SIZES,
  EMAIL_PATTERN,
  SHARE_CODE,
  type ClinicSize,
} from "@/lib/join-contract";
import { useLocale, useT } from "@/i18n";

const SLOTS = ["11:30", "13:00", "15:30", "17:00"];
const COUNTRIES = ["PT", "ES", "GB", "IE", "FR", "DE", "NL", "IT", "BR", "US"];
const INTERESTS = ["stutter", "dld", "unsure"] as const;
/* The sheet gets English labels whatever the visitor's language. */
const INTEREST_LABELS: Record<(typeof INTERESTS)[number], string> = {
  stutter: "Stuttering",
  dld: "Developmental language difficulties",
  unsure: "Not sure yet",
};
const SHARE_KEY = "upspeech_share";
/* How far down the sky the sun sits on each screen, 0 to 1. */
const SUN = { landing: 0, story: 0.33, form: 0.66, done: 1 };

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
    // Storage blocked: the code lasts for this page view only.
  }
  return code;
};

export default function Join() {
  const t = useT().join;
  const locale = useLocale();
  const [params, setParams] = useSearchParams();
  const forParam = params.get("for");
  const aud: Audience | null = isAudience(forParam) ? forParam : null;
  const figure = params.get("from") === "figure";
  const [sent, setSent] = useState<Sent | null>(null);
  const step = params.get("step");
  const screen: keyof typeof SUN = !aud
    ? "landing"
    : step === "done" && sent
      ? "done"
      : step === "form" || step === "done"
        ? "form"
        : "story";

  const [code] = useState(shareCode);
  const link = `upspeech.app/join?ref=${code}`;
  const [stand] = useState(standAvailable);

  const [request, setRequest] = useState<Request>("early");
  const [demoWhen, setDemoWhen] = useState<"stand" | "call">("stand");
  const [slot, setSlot] = useState<number | null>(null);
  const [team, setTeam] = useState<ClinicSize>("small");
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
  const [detailsError, setDetailsError] = useState(false);
  const formRef = useRef<HTMLElement>(null);

  const when = stand ? demoWhen : "call";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [screen, aud]);

  // Leaving the flow from anywhere (the header, Back to the landing) starts a
  // new sign-up rather than reopening the last confirmation.
  useEffect(() => {
    if (!aud && sent) setSent(null);
  }, [aud, sent]);

  const go = (next: { for?: Audience | null; step?: "form" | "done" }) => {
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
      const { token } = (await res.json()) as { token?: string };
      trackFormSubmit("waitlist_form", true, properties);
      setSent({
        token: token ?? "",
        request: kind,
        demoWhen: when,
        demoSlot:
          kind === "demo" && when === "stand" && slot !== null
            ? SLOTS[slot]
            : "",
        email: email.trim(),
        consent,
      });
      setSaved(false);
      go({ step: "done" });
    } catch (err) {
      console.error("Join submission error:", err);
      trackFormSubmit("waitlist_form", false, properties);
      setSendError(true);
    } finally {
      window.clearTimeout(slowTimer);
      setSlow(false);
      setSubmitting(false);
    }
  };

  const saveDetails = async () => {
    setDetailsError(false);
    try {
      const res = await fetch("/.netlify/functions/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "details",
          email: sent?.email,
          token: sent?.token,
          country,
          interests: interests.map(
            (k) => INTEREST_LABELS[k as (typeof INTERESTS)[number]],
          ),
        }),
      });
      if (!res.ok) throw new Error(`early-access details ${res.status}`);
      setSaved(true);
    } catch (err) {
      console.error("Join details error:", err);
      setDetailsError(true);
    }
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
                        {CLINIC_SIZES.map((size) => (
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
                  onKeyDown={(ev) => {
                    if (ev.key === "Enter") {
                      ev.preventDefault();
                      submit();
                    }
                  }}
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
                  aria-describedby={
                    errors.consent ? "j-consent-error" : undefined
                  }
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
                      {asksRequest
                        ? t.form.consentOptional
                        : isFriend
                          ? t.form.consentFriend
                          : isTherapist
                            ? t.form.consentEarly
                            : t.form.consent}
                    </b>
                    <small>{t.form.consentHint}</small>
                  </span>
                </button>
                {errors.consent && (
                  <span
                    className="j-err-line"
                    id="j-consent-error"
                    style={{ paddingLeft: 36 }}
                  >
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
                  <span className="j-hint">{t.done.interestsHint}</span>
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
                        {interests.includes(k) && <Check size={16} />}
                        {t.done.interests[k]}
                        {k === "dld" && (
                          <span className="j-chip j-chip-dev">
                            {t.inDevelopment}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  {detailsError && (
                    <div className="j-alert" role="alert">
                      {t.form.errorSend}
                    </div>
                  )}
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
