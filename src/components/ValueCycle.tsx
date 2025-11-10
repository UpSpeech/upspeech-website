import React, { useState } from "react";
import { Globe, Target, Zap, TrendingUp, Monitor, Rocket } from "lucide-react";

const ValueCycle = () => {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const cycleNodes = [
    {
      title: "Equal Access",
      description: "Speech therapy for everyone, everywhere",
      icon: Globe,
      color: "calm-lavender",
    },
    {
      title: "Personalization",
      description: "AI-powered adaptation to individual needs",
      icon: Target,
      color: "calm-navy",
    },
    {
      title: "Reduce Admin",
      description: "Automated reports free up therapist time",
      icon: Zap,
      color: "calm-charcoal",
    },
    {
      title: "Faster Results",
      description: "Data-driven insights for faster results",
      icon: TrendingUp,
      color: "calm-lavender",
    },
    {
      title: "Remote Care",
      description: "Care beyond the clinic walls",
      icon: Monitor,
      color: "calm-navy",
    },
    {
      title: "Growth",
      description: "Better outcomes create growth",
      icon: Rocket,
      color: "calm-charcoal",
    },
  ];

  // Calculate positions for circular diagram
  const centerX = 50;
  const centerY = 50;
  const radius = 35;

  const getNodePosition = (index: number, total: number) => {
    const angle = (270 + (360 / total) * index) * (Math.PI / 180);
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  const generateCirclePath = () => {
    const points = cycleNodes.map((_, i) =>
      getNodePosition(i, cycleNodes.length)
    );
    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length; i++) {
      const current = points[i];
      const next = points[(i + 1) % points.length];
      const angle = Math.atan2(next.y - current.y, next.x - current.x);
      const distance = Math.sqrt(
        Math.pow(next.x - current.x, 2) + Math.pow(next.y - current.y, 2)
      );
      const cp1x = current.x + (distance / 3) * Math.cos(angle);
      const cp1y = current.y + (distance / 3) * Math.sin(angle);
      const cp2x = next.x - (distance / 3) * Math.cos(angle);
      const cp2y = next.y - (distance / 3) * Math.sin(angle);
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
    }

    return path;
  };

  const generateArrows = () => {
    return cycleNodes.map((_, i) => {
      const start = getNodePosition(i, cycleNodes.length);
      const end = getNodePosition(
        (i + 1) % cycleNodes.length,
        cycleNodes.length
      );
      const midX = (start.x + end.x) / 2;
      const midY = (start.y + end.y) / 2;
      const angle = Math.atan2(end.y - start.y, end.x - start.x);
      const arrowSize = 1.5;
      const arrowX = midX + 3 * Math.cos(angle);
      const arrowY = midY + 3 * Math.sin(angle);
      const arrowLeft = {
        x: arrowX - arrowSize * Math.cos(angle - Math.PI / 6),
        y: arrowY - arrowSize * Math.sin(angle - Math.PI / 6),
      };
      const arrowRight = {
        x: arrowX - arrowSize * Math.cos(angle + Math.PI / 6),
        y: arrowY - arrowSize * Math.sin(angle + Math.PI / 6),
      };

      return {
        id: i,
        path: `M ${arrowX} ${arrowY} L ${arrowLeft.x} ${arrowLeft.y} M ${arrowX} ${arrowY} L ${arrowRight.x} ${arrowRight.y}`,
      };
    });
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-full max-w-md aspect-square">
        {/* SVG Container */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
          {/* Connecting Path */}
          <path
            d={generateCirclePath()}
            fill="none"
            stroke="url(#cycle-gradient)"
            strokeWidth="0.5"
            strokeDasharray="2 1"
            className="animate-pulse"
            opacity="0.4"
          />

          {/* Arrows */}
          {generateArrows().map(arrow => (
            <path
              key={arrow.id}
              d={arrow.path}
              stroke="#98A5FE"
              strokeWidth="0.4"
              strokeLinecap="round"
              opacity={
                hoveredNode === arrow.id || hoveredNode === null ? "0.6" : "0.2"
              }
            />
          ))}

          {/* Gradient Definition */}
          <defs>
            <linearGradient
              id="cycle-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#293587" />
              <stop offset="50%" stopColor="#98A5FE" />
              <stop offset="100%" stopColor="#4B4E4E" />
            </linearGradient>
          </defs>
        </svg>

        {/* Nodes */}
        {cycleNodes.map((node, index) => {
          const pos = getNodePosition(index, cycleNodes.length);
          const Icon = node.icon;
          const isHovered = hoveredNode === index;

          return (
            <div
              key={index}
              className="absolute"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: "translate(-50%, -50%)",
                zIndex: isHovered ? 30 : 20,
              }}
              onMouseEnter={() => setHoveredNode(index)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <div
                className={`relative cursor-pointer transition-all duration-300 ${
                  isHovered ? "scale-110" : "scale-100"
                }`}
              >
                {/* Node Circle */}
                <div
                  className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                    isHovered
                      ? "bg-calm-lavender scale-110"
                      : "bg-white border-2 border-calm-light"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 md:w-6 md:h-6 transition-colors ${
                      isHovered ? "text-white" : "text-calm-navy"
                    }`}
                    strokeWidth={2}
                  />
                </div>

                {/* Number Badge */}
                <div
                  className={`absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center font-nunito font-bold text-xs transition-all duration-300 ${
                    isHovered ? "bg-calm-navy" : "bg-calm-lavender"
                  } text-white`}
                >
                  {index + 1}
                </div>

                {/* Label - Always Visible */}
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none">
                  <p
                    className={`font-nunito text-xs md:text-sm font-semibold text-calm-charcoal transition-all ${
                      isHovered ? "scale-110" : ""
                    }`}
                  >
                    {node.title}
                  </p>
                </div>

                {/* Tooltip Card - Shows on Hover */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 transition-all duration-300 pointer-events-none ${
                    isHovered
                      ? "opacity-100 visible bottom-full mb-6 md:mb-8"
                      : "opacity-0 invisible bottom-full mb-2 md:mb-2"
                  }`}
                  style={{ zIndex: 40 }}
                >
                  <div className="bg-white rounded-xl shadow-2xl border border-calm-light p-4 w-56 md:w-64">
                    <div className="flex items-start space-x-3 mb-2">
                      <div className="w-8 h-8 bg-calm-lavender rounded-lg flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                      </div>
                      <h4 className="font-nunito font-bold text-base text-calm-charcoal">
                        {node.title}
                      </h4>
                    </div>
                    <p className="font-nunito text-sm text-calm-charcoal/70 pl-11">
                      {node.description}
                    </p>
                  </div>
                  {/* Arrow pointing down to node */}
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-2">
                    <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white filter drop-shadow-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Center Logo */}
        <div
          className="absolute top-1/2 left-1/2 pointer-events-none"
          style={{ transform: "translate(-50%, -50%)", zIndex: 10 }}
        >
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center shadow-xl p-2">
            <img
              src="/favicon.png"
              alt="UpSpeech Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueCycle;
