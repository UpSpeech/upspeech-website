import React, { useState } from "react";

const ValueCycleSection = () => {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const cycleNodes = [
    {
      title: "Equal Access to Care",
      description: "Speech therapy for everyone, everywhere",
      icon: "🌍",
      color: "calm-lavender",
    },
    {
      title: "Personalization",
      description: "AI-powered adaptation to individual needs",
      icon: "🎯",
      color: "calm-navy",
    },
    {
      title: "Reduce Admin Burden",
      description: "Automated reports free up therapist time",
      icon: "⚡",
      color: "calm-charcoal",
    },
    {
      title: "Accelerate Diagnosis",
      description: "Data-driven insights for faster results",
      icon: "📊",
      color: "calm-lavender",
    },
    {
      title: "Remote & Hybrid Models",
      description: "Care beyond the clinic walls",
      icon: "💻",
      color: "calm-navy",
    },
    {
      title: "More Opportunities",
      description: "Better outcomes create growth",
      icon: "🚀",
      color: "calm-charcoal",
    },
  ];

  // Calculate positions for nodes in a circle
  const centerX = 200;
  const centerY = 200;
  const radius = 140;

  const getNodePosition = (index: number, total: number) => {
    // Start at top (270 degrees) and go clockwise
    const angle = (270 + (360 / total) * index) * (Math.PI / 180);
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  // Generate SVG path for connecting nodes in a circle
  const generateCirclePath = () => {
    const points = cycleNodes.map((_, i) =>
      getNodePosition(i, cycleNodes.length)
    );

    // Create a smooth circular path through all points
    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length; i++) {
      const current = points[i];
      const next = points[(i + 1) % points.length];

      // Calculate control points for smooth curve
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

  // Generate arrow paths between nodes
  const generateArrows = () => {
    return cycleNodes.map((_, i) => {
      const start = getNodePosition(i, cycleNodes.length);
      const end = getNodePosition((i + 1) % cycleNodes.length, cycleNodes.length);

      // Calculate midpoint and angle for arrow
      const midX = (start.x + end.x) / 2;
      const midY = (start.y + end.y) / 2;
      const angle = Math.atan2(end.y - start.y, end.x - start.x);

      // Arrow points
      const arrowSize = 8;
      const arrowX = midX + 15 * Math.cos(angle);
      const arrowY = midY + 15 * Math.sin(angle);
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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-calm-navy/5 via-white to-calm-lavender/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 bg-calm-navy/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-10 right-10 w-32 h-32 bg-calm-lavender/15 rounded-full blur-3xl animate-float-delayed"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-nunito font-bold text-3xl sm:text-4xl text-calm-charcoal mb-4">
            The UpSpeech{" "}
            <span className="text-transparent bg-gradient-to-r from-calm-navy via-calm-lavender to-calm-navy bg-clip-text">
              Value Cycle
            </span>
          </h2>
          <p className="font-nunito text-lg text-calm-charcoal/70 max-w-2xl mx-auto">
            Creating value for patients, therapists, and healthcare systems
          </p>
        </div>

        {/* Desktop: Circular Diagram */}
        <div className="hidden lg:block">
          <div className="relative mx-auto" style={{ width: "600px", height: "600px" }}>
            {/* SVG Container */}
            <svg
              viewBox="0 0 400 400"
              className="absolute inset-0 w-full h-full"
              style={{ filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))" }}
            >
              {/* Connecting Circle Path */}
              <path
                d={generateCirclePath()}
                fill="none"
                stroke="url(#cycle-gradient)"
                strokeWidth="3"
                strokeDasharray="8 4"
                className="animate-pulse"
                opacity="0.3"
              />

              {/* Arrows */}
              {generateArrows().map((arrow) => (
                <path
                  key={arrow.id}
                  d={arrow.path}
                  stroke="#98A5FE"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="transition-all duration-300"
                  opacity={hoveredNode === arrow.id || hoveredNode === null ? "0.7" : "0.2"}
                />
              ))}

              {/* Gradient Definition */}
              <defs>
                <linearGradient id="cycle-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#293587" />
                  <stop offset="50%" stopColor="#98A5FE" />
                  <stop offset="100%" stopColor="#4B4E4E" />
                </linearGradient>
              </defs>
            </svg>

            {/* Nodes */}
            {cycleNodes.map((node, index) => {
              const pos = getNodePosition(index, cycleNodes.length);
              const isHovered = hoveredNode === index;

              return (
                <div
                  key={index}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                  style={{
                    left: `${(pos.x / 400) * 100}%`,
                    top: `${(pos.y / 400) * 100}%`,
                  }}
                  onMouseEnter={() => setHoveredNode(index)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <div
                    className={`relative group cursor-pointer transition-all duration-300 ${
                      isHovered ? "scale-110 z-20" : "scale-100 z-10"
                    }`}
                  >
                    {/* Node Circle */}
                    <div
                      className={`w-24 h-24 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                        isHovered
                          ? "bg-calm-lavender shadow-2xl"
                          : "bg-white border-4 border-calm-light"
                      }`}
                    >
                      <span className={`text-3xl transition-transform duration-300 ${isHovered ? "scale-110" : ""}`}>
                        {node.icon}
                      </span>
                    </div>

                    {/* Number Badge */}
                    <div
                      className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center font-nunito font-bold text-sm transition-all duration-300 ${
                        isHovered
                          ? "bg-calm-navy text-white"
                          : "bg-calm-lavender text-white"
                      }`}
                    >
                      {index + 1}
                    </div>

                    {/* Tooltip */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 transition-all duration-300 ${
                        isHovered
                          ? "opacity-100 visible top-full mt-4"
                          : "opacity-0 invisible top-full mt-2"
                      }`}
                    >
                      <div className="bg-white rounded-xl shadow-xl border border-calm-light p-4 w-64">
                        <h4 className="font-nunito font-bold text-base text-calm-charcoal mb-2 text-center">
                          {node.title}
                        </h4>
                        <p className="font-nunito text-sm text-calm-charcoal/70 text-center">
                          {node.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Center Logo/Icon */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-calm-navy via-calm-lavender to-calm-charcoal flex items-center justify-center shadow-xl">
                <span className="text-white font-nunito font-bold text-xl">UP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet: Stacked Cards */}
        <div className="lg:hidden grid sm:grid-cols-2 gap-6">
          {cycleNodes.map((node, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-calm-light p-6 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Number Badge */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-calm-lavender rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-2xl">{node.icon}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-calm-navy text-white flex items-center justify-center font-nunito font-bold text-sm">
                  {index + 1}
                </div>
              </div>

              {/* Content */}
              <h4 className="font-nunito font-bold text-lg text-calm-charcoal mb-2">
                {node.title}
              </h4>
              <p className="font-nunito text-sm text-calm-charcoal/70">
                {node.description}
              </p>

              {/* Arrow indicator for flow */}
              {index < cycleNodes.length - 1 && (
                <div className="mt-4 flex justify-end">
                  <div className="text-calm-lavender">→</div>
                </div>
              )}
              {index === cycleNodes.length - 1 && (
                <div className="mt-4 flex justify-end">
                  <div className="text-calm-lavender">↺</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <p className="font-nunito text-base text-calm-charcoal/70 max-w-3xl mx-auto">
            Each element of our platform contributes to a virtuous cycle that benefits everyone —
            from patients gaining confidence, to therapists saving time, to clinics delivering
            better care at scale.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ValueCycleSection;
