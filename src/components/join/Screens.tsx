import type { ReactNode } from "react";
import {
  ArrowPathIcon,
  ArrowUpOnSquareIcon,
  CalendarIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EnvelopeIcon,
  LinkIcon,
  MapPinIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Companion from "@/components/Companion";
import {
  AUDIENCE,
  AUDIENCES,
  COMPANION_ACCENTS,
  COMPANION_TINTS,
  type Audience,
} from "./companions";
import * as Mock from "./Mocks";
import { useT } from "@/i18n";
import { fill } from "./fill";

export type Request = "early" | "demo" | "pilot";
export type Sent = {
  /** Proves to the function that a later details post follows this sign-up. */
  token: string;
  request: Request | "waitlist";
  demoWhen: "stand" | "call";
  demoSlot: string;
  email: string;
  consent: boolean;
};

export const Check = ({ size = 18 }: { size?: number }) => (
  <CheckIcon width={size} height={size} strokeWidth={2} aria-hidden="true" />
);

export function SubmitButton({
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

export function Landing({ onPick }: { onPick: (a: Audience) => void }) {
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

export function Story({
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

export function FormHero({
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

export function ShareCard({
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

export function Done({
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
