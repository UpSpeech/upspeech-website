import { Img, staticFile } from "remotion";
import { useRise } from "../ui";
import { useStrings } from "../strings";

const SceneEnd = () => {
  const s = useStrings();
  return (
    <div className="absolute inset-0 bg-calm-light">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 600px at 50% 20%, rgba(152,165,254,0.25), transparent 65%)",
        }}
      />
      <div className="relative flex h-full flex-col items-center justify-center gap-7">
        <Img
          src={staticFile("images/logo.svg")}
          className="h-14 w-auto"
          alt="UpSpeech"
          style={useRise(0, 16)}
        />
        <h2
          className="max-w-[700px] text-center font-heading text-[44px] font-bold leading-tight tracking-tight text-calm-charcoal"
          style={useRise(10)}
        >
          {s.end.line1}
          <span className="text-calm-lavender">{s.end.line2}</span>
        </h2>
        <div
          className="font-body text-[15px] text-calm-charcoal/55"
          style={useRise(22, 12)}
        >
          upspeech.app
        </div>
      </div>
    </div>
  );
};

export default SceneEnd;
