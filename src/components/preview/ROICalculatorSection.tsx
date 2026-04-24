import { useState } from "react";

interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  unit?: string;
  onChange: (value: number) => void;
}

const SliderInput = ({
  label,
  value,
  min,
  max,
  unit,
  onChange,
}: SliderInputProps) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="font-body text-sm font-medium text-calm-charcoal">
          {label}
        </label>
        <span className="font-heading font-bold text-lg text-calm-navy tabular-nums">
          {value}
          {unit}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer focus-ring
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-calm-navy
            [&::-webkit-slider-thumb]:shadow-button
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:duration-200
            [&::-webkit-slider-thumb]:hover:scale-110
            [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-calm-navy
            [&::-moz-range-thumb]:border-0
            [&::-moz-range-thumb]:shadow-button
            [&::-moz-range-thumb]:cursor-pointer"
          style={{
            background: `linear-gradient(to right, #98A5FE ${percentage}%, #F6F6F6 ${percentage}%)`,
          }}
        />
      </div>
    </div>
  );
};

interface ResultCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: string;
}

const ResultCard = ({ icon, value, label, delay }: ResultCardProps) => (
  <div
    className="bg-white rounded-2xl shadow-card p-6 animate-fade-in transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5"
    style={{ animationDelay: delay }}
  >
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-calm-lavender/15 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="font-heading font-bold text-2xl sm:text-3xl text-calm-navy tabular-nums leading-tight">
          {value}
        </p>
        <p className="font-body text-sm text-calm-charcoal/70 mt-1">{label}</p>
      </div>
    </div>
  </div>
);

const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5 text-calm-navy"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5 text-calm-navy"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
    />
  </svg>
);

const CurrencyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5 text-calm-navy"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
    />
  </svg>
);

const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5 text-calm-navy"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
    />
  </svg>
);

const ROICalculatorSection = () => {
  const [therapists, setTherapists] = useState(5);
  const [patientsPerTherapist, setPatientsPerTherapist] = useState(15);
  const [hoursReports, setHoursReports] = useState(4);
  const [churnRate, setChurnRate] = useState(10);

  // Calculations
  const reportHoursSaved = Math.round(therapists * hoursReports * 0.75 * 4);
  const extraPatients = therapists * 3;
  const revenueImpact = extraPatients * 150 * 4;
  const totalPatients = therapists * patientsPerTherapist;
  const patientsRetained = Math.round(totalPatients * (churnRate / 100) * 0.4);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-calm-navy/5 via-white to-calm-lavender/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-[15%] w-40 h-40 bg-calm-lavender/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 left-[10%] w-32 h-32 bg-calm-navy/5 rounded-full blur-2xl animate-float-delayed"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14 animate-fade-in">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-calm-charcoal mb-4">
            Calculate Your Clinic's ROI
          </h2>
          <p className="font-body text-lg text-calm-charcoal/70 max-w-xl mx-auto">
            See how UpSpeech impacts your bottom line.
          </p>
        </div>

        {/* Calculator grid */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left: Sliders */}
          <div className="bg-white rounded-2xl shadow-card p-6 sm:p-8 space-y-7 animate-fade-in-up">
            <SliderInput
              label="Number of therapists"
              value={therapists}
              min={1}
              max={30}
              onChange={setTherapists}
            />
            <SliderInput
              label="Patients per therapist"
              value={patientsPerTherapist}
              min={5}
              max={30}
              onChange={setPatientsPerTherapist}
            />
            <SliderInput
              label="Hours spent on reports per week"
              value={hoursReports}
              min={1}
              max={10}
              onChange={setHoursReports}
            />
            <SliderInput
              label="Monthly patient churn rate"
              value={churnRate}
              min={0}
              max={20}
              unit="%"
              onChange={setChurnRate}
            />
          </div>

          {/* Right: Results */}
          <div className="grid sm:grid-cols-2 gap-4">
            <ResultCard
              icon={<ClockIcon />}
              value={`${reportHoursSaved}h`}
              label="Report hours saved per month"
              delay="0.1s"
            />
            <ResultCard
              icon={<UsersIcon />}
              value={`+${extraPatients}`}
              label="Extra patient capacity"
              delay="0.2s"
            />
            <ResultCard
              icon={<CurrencyIcon />}
              value={formatCurrency(revenueImpact)}
              label="Estimated revenue impact / mo"
              delay="0.3s"
            />
            <ResultCard
              icon={<HeartIcon />}
              value={`+${patientsRetained}`}
              label="Patients retained per month"
              delay="0.4s"
            />
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center font-body text-sm text-calm-charcoal/50 mt-12 max-w-2xl mx-auto animate-fade-in">
          Based on average clinical data. Your results may vary. Start a free
          pilot to measure your real impact.
        </p>
      </div>
    </section>
  );
};

export default ROICalculatorSection;
