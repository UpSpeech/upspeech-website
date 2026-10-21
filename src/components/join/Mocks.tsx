import {
  CalendarIcon,
  ChatBubbleOvalLeftIcon,
  CheckIcon,
  HeartIcon,
  MapIcon,
  MoonIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";
import Companion from "@/components/Companion";
import { useT } from "@/i18n";
import { COMPANION_ACCENTS, COMPANION_TINTS } from "./companions";

/*
 * Small, static drawings of real app screens, one per story step. They show
 * what the product does; nothing here is interactive except "Mark as done".
 */

const NAVY = "#293587";
const REST = "#4b5187";
type Icon = ComponentType<SVGProps<SVGSVGElement>>;

const Tick = ({ size = 12 }: { size?: number }) => (
  <CheckIcon width={size} height={size} strokeWidth={3} aria-hidden="true" />
);

const Ana = ({ title, sub }: { title: string; sub: string }) => (
  <div className="j-who">
    <span className="j-avatar" aria-hidden="true">
      AS
    </span>
    <div>
      <b>{title}</b>
      <small>{sub}</small>
    </div>
  </div>
);

export const Notification = () => {
  const m = useT().join.mocks;
  return (
    <div className="j-mock">
      <div className="j-notif">
        <img src="/icons/apple-touch-icon.png" alt="" />
        <div>
          <small>{m.notifApp}</small>
          <b>{m.notifTitle}</b>
          <span>{m.notifBody}</span>
        </div>
      </div>
    </div>
  );
};

export const Exercise = ({
  done,
  onToggle,
}: {
  done: boolean;
  onToggle: () => void;
}) => {
  const m = useT().join.mocks;
  return (
    <div className="j-mock">
      <div className="j-ex">
        <div className="j-ex-h">
          <b>{m.exerciseTitle}</b>
          <small>{m.exerciseMeta}</small>
        </div>
        {m.exerciseSteps.map((step) => (
          <div key={step} className={`j-tick${done ? " on" : ""}`}>
            <i>
              <Tick />
            </i>
            {step}
          </div>
        ))}
        <button
          type="button"
          className="j-mini-btn"
          aria-pressed={done}
          onClick={onToggle}
        >
          {done ? m.doneToday : m.markDone}
        </button>
      </div>
    </div>
  );
};

export const TherapistNote = ({ accent }: { accent: string }) => {
  const m = useT().join.mocks;
  const practised = [0, 2, 3];
  return (
    <div className="j-mock">
      <Ana title={m.anaYours} sub={m.anaSaw} />
      <div className="j-dots" aria-hidden="true">
        {m.days.map((d, i) => (
          <span key={i}>
            <i
              style={
                practised.includes(i)
                  ? { background: accent, borderColor: accent }
                  : undefined
              }
            >
              {practised.includes(i) && <Tick />}
            </i>
            {d}
          </span>
        ))}
      </div>
      <div className="j-bubble">{m.anaNote}</div>
    </div>
  );
};

const PathRow = ({
  tint,
  icon: IconCmp,
  title,
  sub,
  chip,
}: {
  tint: string;
  icon: Icon;
  title: string;
  sub: string;
  chip?: string;
}) => (
  <div className="j-lp">
    <span className="ic" style={{ background: tint }}>
      <IconCmp width={20} height={20} strokeWidth={1.5} aria-hidden="true" />
    </span>
    <div>
      <b>{title}</b>
      <small>{sub}</small>
    </div>
    {chip && <span className="j-chip j-chip-ok">{chip}</span>}
  </div>
);

export const Assign = ({ tint }: { tint: string }) => {
  const m = useT().join.mocks;
  return (
    <div className="j-mock">
      <PathRow
        tint={tint}
        icon={MapIcon}
        title={m.assignTitle}
        sub={m.assignMeta}
        chip={m.assigned}
      />
      <PathRow
        tint={tint}
        icon={CalendarIcon}
        title={m.assignFreq}
        sub={m.assignUntil}
      />
    </div>
  );
};

/* An illustrative week: sessions stay put, admin shrinks, home practice appears. */
const SESSIONS = [52, 60, 44, 58, 48];

export const Week = ({ accent }: { accent: string }) => {
  const m = useT().join.mocks;
  const chart = (title: string, admin: number[], practice: number[]) => (
    <div className="j-chart">
      <b>{title}</b>
      <div className="j-bars">
        {SESSIONS.map((s, i) => (
          <div key={i}>
            <span style={{ height: practice[i], background: accent }} />
            <span className="j-admin" style={{ height: admin[i] }} />
            <span style={{ height: s * 0.5, background: NAVY }} />
          </div>
        ))}
      </div>
      <div className="j-lbls">
        {m.weekdays.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
    </div>
  );
  return (
    <div className="j-mock">
      <div className="j-charts" aria-hidden="true">
        {chart(m.weekToday, [40, 34, 46, 38, 44], [0, 0, 0, 0, 0])}
        {chart(m.weekWith, [16, 12, 18, 14, 16], [12, 12, 12, 12, 12])}
      </div>
      <div className="j-legend">
        <span>
          <i style={{ background: NAVY }} />
          {m.legendSessions}
        </span>
        <span>
          <i className="j-admin" />
          {m.legendAdmin}
        </span>
        <span>
          <i style={{ background: accent }} />
          {m.legendPractice}
        </span>
      </div>
    </div>
  );
};

export const Report = () => {
  const m = useT().join.mocks;
  return (
    <div className="j-mock">
      <div className="j-report">
        <div className="j-report-h">
          <b>{m.reportTitle}</b>
          <span className="j-chip j-chip-draft">{m.draft}</span>
        </div>
        <p>{m.reportBody}</p>
        <div className="j-skel" style={{ width: "92%" }} />
        <div className="j-skel" style={{ width: "76%" }} />
        <div className="j-skel" style={{ width: "58%" }} />
        <div className="j-row2" aria-hidden="true">
          <span>{m.edit}</span>
          <span className="solid">{m.sign}</span>
        </div>
      </div>
    </div>
  );
};

export const Plan = ({ tint }: { tint: string }) => {
  const m = useT().join.mocks;
  return (
    <div className="j-mock">
      <PathRow
        tint={tint}
        icon={MapIcon}
        title={m.planTitle}
        sub={m.planMeta}
      />
      <div className="j-bubble">{m.planNote}</div>
    </div>
  );
};

type DayKind = "done" | "together" | "session" | "note" | "rest";
const LEO_WEEK: DayKind[] = [
  "done",
  "done",
  "together",
  "session",
  "note",
  "done",
  "rest",
];

export const LeoWeek = ({ accent }: { accent: string }) => {
  const m = useT().join.mocks;
  const kinds: Record<DayKind, [string, string, Icon, string]> = {
    done: [NAVY, NAVY, CheckIcon, "#fff"],
    together: [accent, accent, HeartIcon, NAVY],
    session: ["#fff", NAVY, CalendarIcon, NAVY],
    note: ["#fff", accent, ChatBubbleOvalLeftIcon, NAVY],
    rest: [REST, REST, MoonIcon, "#fff"],
  };
  return (
    <div className="j-mock">
      <div className="j-days" aria-hidden="true">
        {LEO_WEEK.map((kind, i) => {
          const [bg, border, IconCmp, ink] = kinds[kind];
          return (
            <span key={i} className="j-day">
              <i style={{ background: bg, borderColor: border, color: ink }}>
                <IconCmp width={14} height={14} strokeWidth={2} />
              </i>
              {m.leoDays[i]}
            </span>
          );
        })}
      </div>
      <div className="j-legend">
        <span>
          <i style={{ background: NAVY }} />
          {m.legendPracticed}
        </span>
        <span>
          <i style={{ background: accent }} />
          {m.legendTogether}
        </span>
        <span>
          <i style={{ border: `1.5px solid ${NAVY}` }} />
          {m.legendSession}
        </span>
        <span>
          <i style={{ background: REST }} />
          {m.legendRest}
        </span>
      </div>
    </div>
  );
};

export const AnaNote = () => {
  const m = useT().join.mocks;
  return (
    <div className="j-mock">
      <Ana title={m.anaLeo} sub={m.anaFriday} />
      <div className="j-bubble">{m.anaLeoNote}</div>
    </div>
  );
};

/* A session on each Monday; with UpSpeech, practice fills the days between. */
export const Strip = ({
  accent,
  filled,
}: {
  accent: string;
  filled: boolean;
}) => {
  const m = useT().join.mocks;
  return (
    <div className="j-mock">
      <div className="j-days" aria-hidden="true">
        {m.stripDays.map((d, i) => {
          const session = i === 0 || i === 6;
          const practice = filled && !session && i !== 5;
          const bg = session ? NAVY : practice ? accent : "#fff";
          return (
            <span key={i} className="j-day">
              <i
                style={{
                  background: bg,
                  borderColor: session || practice ? bg : "#d4d3df",
                  color: session ? "#fff" : NAVY,
                }}
              >
                {session ? (
                  <UserGroupIcon width={13} height={13} strokeWidth={2} />
                ) : practice ? (
                  <Tick size={13} />
                ) : null}
              </i>
              {d}
            </span>
          );
        })}
      </div>
      <div className="j-legend">
        <span>
          <i style={{ background: NAVY }} />
          {m.legendSession2}
        </span>
        {filled ? (
          <span>
            <i style={{ background: accent }} />
            {m.legendHome}
          </span>
        ) : (
          <span>
            <i style={{ border: "1.5px solid #d4d3df" }} />
            {m.legendAlone}
          </span>
        )}
      </div>
    </div>
  );
};

export const SentLink = ({ link }: { link: string }) => {
  const m = useT().join.mocks;
  return (
    <div className="j-mock">
      <div className="j-sent">
        <div className="j-sent-msg">{m.sentMessage}</div>
        <div className="j-preview">
          <span
            className="j-pv-img"
            style={{ background: COMPANION_TINTS.lumo }}
            aria-hidden="true"
          >
            <Companion
              species="lumo"
              accent={COMPANION_ACCENTS.lumo}
              size={84}
            />
          </span>
          <span className="j-pv-txt">
            <b>{m.previewTitle}</b>
            <small>{link}</small>
          </span>
        </div>
        <small className="j-sent-meta">
          {m.sent} <Tick />
        </small>
      </div>
    </div>
  );
};
