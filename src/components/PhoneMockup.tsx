import React, { useState, useEffect, useRef } from "react";
import {
  Bell,
  BarChart3,
  MessageCircle,
  Calendar,
  TrendingUp,
} from "lucide-react";

const PhoneMockup = () => {
  const [selectedMood, setSelectedMood] = useState<number>(3);
  const [showNotificationDot, setShowNotificationDot] = useState(false);
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setShowNotificationDot(true), 1000);
        } else {
          setShowNotificationDot(false);
        }
      },
      { threshold: 0.5 },
    );

    if (phoneRef.current) {
      observer.observe(phoneRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      <div className="flex justify-center items-center space-x-4">
        {/* Main Phone Mockup */}
        <div
          ref={phoneRef}
          className="relative transform rotate-3 hover:rotate-0 transition-transform duration-300"
        >
          <div className="w-64 h-[500px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
            <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
              {/* Status Bar */}
              <div className="flex justify-between items-center px-6 py-2 bg-white">
                <span className="text-sm font-semibold">9:41</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-800">
                      Session Overview
                    </h4>
                    <p className="text-sm text-gray-600">
                      John Smith - Week 12
                    </p>
                  </div>
                  <div className="relative group">
                    <div className="relative w-8 h-8 bg-calm-lavender rounded-full flex items-center justify-center cursor-pointer">
                      <Bell className="w-4 h-4 text-white" />
                      {showNotificationDot && (
                        <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full animate-notification-pulse">
                          <span className="absolute inset-0 flex items-center justify-center text-white text-[8px] font-semibold">
                            1
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="absolute right-0 w-48 p-2 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10 border border-gray-100">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">👋</span>
                        <p className="text-xs text-gray-700">
                          Hey, this is your UpSpeech buddy! Let's practice!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Card */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-semibold text-gray-800 text-sm">
                      Weekly Progress
                    </h5>
                    <span className="text-calm-navy font-bold text-xs">
                      87%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-calm-navy rounded-full h-2"
                      style={{ width: "87%" }}
                    ></div>
                  </div>
                </div>

                {/* Mood Selection */}
                <div className="bg-calm-lavender/20 rounded-2xl p-4 mb-4">
                  <p className="text-xs text-gray-600 text-center mb-1">
                    How is your stuttering today?
                  </p>
                  <div className="flex justify-between items-center">
                    {["😢", "😐", "😊", "😊", "😄"].map((emoji, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedMood(index)}
                        className={`w-8 h-8 cursor-pointer transition-colors duration-200 ${
                          selectedMood === index
                            ? "bg-calm-lavender"
                            : "hover:bg-calm-lavender/50"
                        } rounded-full flex items-center justify-center`}
                      >
                        <span
                          className={`text-xs ${
                            selectedMood === index
                              ? "text-white"
                              : "text-gray-600"
                          }`}
                        >
                          {emoji}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Today's Session Card */}
                <div className="bg-gray-800 rounded-xl p-4 text-white mb-4">
                  <h5 className="text-sm font-semibold mb-1">
                    Today's Session
                  </h5>
                  <p className="text-xs text-gray-300">
                    Breathing exercises to help reduce anxiety
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-calm-lavender/30 rounded-xl p-3 text-center">
                    <div className="w-8 h-8 bg-calm-lavender rounded-full mx-auto mb-2 flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs font-semibold text-gray-700">
                      View Analytics
                    </p>
                  </div>
                  <div className="bg-calm-navy/20 rounded-xl p-3 text-center">
                    <div className="w-8 h-8 bg-calm-navy rounded-full mx-auto mb-2 flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs font-semibold text-gray-700">
                      Get Support
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Cards */}
        <div className="absolute -top-4 -right-8 transform rotate-12">
          <div className="bg-white rounded-xl p-4 shadow-lg border border-calm-light w-48">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-calm-navy rounded-full flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <h6 className="font-semibold text-sm text-gray-800">
                  Progress Report
                </h6>
                <p className="text-xs text-gray-600">
                  +23% improvement this month
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-8 -left-8 transform -rotate-12">
          <div className="bg-white rounded-xl p-4 shadow-lg border border-calm-light w-44">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-calm-lavender rounded-full flex items-center justify-center">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <div>
                <h6 className="font-semibold text-sm text-gray-800">
                  Next Session
                </h6>
                <p className="text-xs text-gray-600">Thursday, 2:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;
