import { useState, useEffect, useRef } from "react";
import {
  FileText,
  ArrowUpRight,
  ShieldCheck,
  AlertTriangle,
  Flame,
  Radio,
  type LucideIcon,
} from "lucide-react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { soundEngine } from "../../utils/soundEngine";

interface SensorDef {
  id: string;
  title: string;
  sensorType: string;
  detail: string;
  icon: LucideIcon;
}

const sensorsList: SensorDef[] = [
  {
    id: "gas",
    title: "Gas leak",
    sensorType: "MQ-2 / MQ-5 Semiconductor",
    detail: "High-sensitivity combustible gas detection threshold monitoring",
    icon: Radio,
  },
  {
    id: "flame",
    title: "Flame & smoke",
    sensorType: "Optical IR & Photoelectric",
    detail: "Fast flame flicker detection with particulate smoke sensing",
    icon: Flame,
  },
  {
    id: "pir",
    title: "Human presence",
    sensorType: "PIR Pyroelectric Sensor",
    detail: "Monitors kitchen presence to detect unattended stove operation",
    icon: AlertTriangle,
  },
  {
    id: "shutoff",
    title: "Automatic shutoff",
    sensorType: "Relay & Solenoid Valve",
    detail: "Immediate electro-mechanical gas isolation when thresholds trip",
    icon: ShieldCheck,
  },
];

export function StoveSafetySection() {
  const prefersReducedMotion = useReducedMotion();

  const [activeStep, setActiveStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeSensor, setActiveSensor] = useState<string>("gas");
  const simulationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isPlaying || prefersReducedMotion) return;

    simulationTimerRef.current = setTimeout(() => {
      setActiveStep((prev) => (prev >= 5 ? 1 : prev + 1));
    }, 2200);

    return () => {
      if (simulationTimerRef.current) clearTimeout(simulationTimerRef.current);
    };
  }, [activeStep, isPlaying, prefersReducedMotion]);

  const handleTriggerHazard = (sensorId: string) => {
    soundEngine.playSoftClick();
    if (simulationTimerRef.current) clearTimeout(simulationTimerRef.current);
    setActiveSensor(sensorId);
    setActiveStep(1);
    setIsPlaying(true);
  };

  const activeSensorMeta = sensorsList.find((s) => s.id === activeSensor) ?? sensorsList[0];

  return (
    <section
      className="p3d-section"
      id="engineering-project"
      aria-label="Smart multi-sensor stove safety system engineering showcase"
    >
      <div className="p3d-container">
        <div className="stove-section-grid">
          {/* LEFT: Project Narrative & Feature Cards */}
          <div className="stove-info-column">
            <p className="p3d-eyebrow">06 / ENGINEERING &amp; RESEARCH PROTOTYPE</p>
            <h2 className="p3d-heading">
              Smart multi-sensor<br />stove safety system
            </h2>
            <p className="p3d-description">
              Developed and tested an integrated hazard-detection prototype during my Green Resource
              Solutions internship — combining sensor telemetry analysis, automated alerts, and
              relay-controlled solenoid shutoff for LPG and biogas stoves.
            </p>

            {/* 4 Feature Sensors Cards */}
            <div className="stove-sensors-grid" role="region" aria-label="Detection capabilities">
              {sensorsList.map((sensor) => {
                const Icon = sensor.icon;
                const isActive = activeSensor === sensor.id;
                const isTripped = isActive && activeStep >= 1 && activeStep < 4;

                return (
                  <article
                    key={sensor.id}
                    className={`stove-sensor-card ${isActive ? "stove-sensor-card--active" : ""} ${
                      isTripped ? "stove-sensor-card--tripped" : ""
                    }`}
                    onClick={() => handleTriggerHazard(sensor.id)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Inspect ${sensor.title} capability`}
                    onKeyDown={(e) =>
                      (e.key === "Enter" || e.key === " ") && handleTriggerHazard(sensor.id)
                    }
                  >
                    <div className="stove-sensor-icon">
                      <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <div>
                      <strong>{sensor.title}</strong>
                      <span>{sensor.sensorType}</span>
                    </div>
                    <div className="stove-sensor-status">
                      <span className="pulse-dot" style={{ width: "5px", height: "5px" }} />
                      {isActive && activeStep >= 4
                        ? "SYSTEM SECURED"
                        : isTripped
                          ? "THRESHOLD CHECK"
                          : "MONITORING"}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Crisp SVG System Schematic (Illustrative Architecture) */}
          <div className="stove-schematic-panel">
            <div className="stove-schematic-header">
              <span className="stove-schematic-tag">CONCEPT TELEMETRY ARCHITECTURE</span>
              <span className="stove-schematic-note">Illustrative diagram · not live sensor feed</span>
            </div>

            <svg
              viewBox="0 0 560 320"
              className="stove-schematic-svg"
              role="img"
              aria-label="Illustrative signal flow from multi-sensor inputs through microcontroller ML logic to relay and solenoid shutoff"
            >
              <path
                d="M 155 62 L 245 148 M 155 156 L 245 156 M 155 250 L 245 164 M 345 156 L 405 156"
                stroke="rgba(223,208,166,0.45)"
                strokeWidth="2"
                strokeDasharray="5 5"
                fill="none"
              />

              <g>
                <rect
                  x="20"
                  y="32"
                  width="135"
                  height="58"
                  rx="12"
                  fill={activeSensor === "gas" ? "#2d2b30" : "#1f1e22"}
                  stroke={activeSensor === "gas" ? "#dfd0a6" : "rgba(255,255,255,0.12)"}
                />
                <text x="34" y="56" fill="#F4F1EA" fontSize="12" fontWeight="700">MQ-2 / MQ-5</text>
                <text x="34" y="75" fill="#B4B0A8" fontSize="10">LPG &amp; Biogas Sensor</text>
              </g>

              <g>
                <rect
                  x="20"
                  y="127"
                  width="135"
                  height="58"
                  rx="12"
                  fill={activeSensor === "flame" ? "#2d2b30" : "#1f1e22"}
                  stroke={activeSensor === "flame" ? "#dfd0a6" : "rgba(255,255,255,0.12)"}
                />
                <text x="34" y="151" fill="#F4F1EA" fontSize="12" fontWeight="700">IR &amp; Smoke</text>
                <text x="34" y="170" fill="#B4B0A8" fontSize="10">Flame / Particulate</text>
              </g>

              <g>
                <rect
                  x="20"
                  y="222"
                  width="135"
                  height="58"
                  rx="12"
                  fill={activeSensor === "pir" ? "#2d2b30" : "#1f1e22"}
                  stroke={activeSensor === "pir" ? "#dfd0a6" : "rgba(255,255,255,0.12)"}
                />
                <text x="34" y="246" fill="#F4F1EA" fontSize="12" fontWeight="700">PIR Sensor</text>
                <text x="34" y="265" fill="#B4B0A8" fontSize="10">Occupancy Monitor</text>
              </g>

              <g>
                <rect
                  x="220"
                  y="108"
                  width="130"
                  height="96"
                  rx="16"
                  fill="#29282c"
                  stroke="#dfd0a6"
                  strokeWidth="1.5"
                />
                <text x="285" y="142" textAnchor="middle" fill="#dfd0a6" fontSize="10" fontFamily="monospace">
                  MCU + ML LOGIC
                </text>
                <text x="285" y="163" textAnchor="middle" fill="#F4F1EA" fontSize="13" fontWeight="700">
                  Arduino Node
                </text>
                <text x="285" y="182" textAnchor="middle" fill="#B4B0A8" fontSize="10">
                  Anomaly Thresholding
                </text>
              </g>

              <g>
                <rect
                  x="402"
                  y="108"
                  width="138"
                  height="96"
                  rx="16"
                  fill={activeSensor === "shutoff" || activeStep >= 4 ? "#2d2b30" : "#1f1e22"}
                  stroke={
                    activeSensor === "shutoff" || activeStep >= 4
                      ? "#dfd0a6"
                      : "rgba(255,255,255,0.14)"
                  }
                />
                <text x="471" y="142" textAnchor="middle" fill="#8fd3b8" fontSize="10" fontFamily="monospace">
                  FAIL-SAFE ACTUATOR
                </text>
                <text x="471" y="163" textAnchor="middle" fill="#F4F1EA" fontSize="13" fontWeight="700">
                  Solenoid Valve
                </text>
                <text x="471" y="182" textAnchor="middle" fill="#B4B0A8" fontSize="10">
                  Relay Gas Isolation
                </text>
              </g>
            </svg>

            <div className="stove-schematic-footer">
              <div>
                <span className="stove-schematic-active-label">Selected module:</span>
                <strong>{activeSensorMeta.title}</strong>
                <p>{activeSensorMeta.detail}</p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM: Full-width Published Research Panel */}
        <article className="stove-publication-panel" aria-label="Published research details">
          <div className="stove-pub-icon">
            <FileText size={26} strokeWidth={1.75} aria-hidden="true" />
          </div>
          <div className="stove-pub-content">
            <span className="stove-pub-tag">PUBLISHED RESEARCH · DOI 10.47392/IRJAEH.2026.0301</span>
            <h3 className="stove-pub-title">
              Sensor-Based Smart Gas Leak, Flame, Smoke and Human Presence Detection System with Automatic Shutoff for Biogas and LPG Stoves
            </h3>
            <p className="stove-pub-meta">
              International Research Journal on Advanced Engineering Hub (IRJAEH) · Volume 04, Issue 04 · April 2026
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            <a
              href="https://doi.org/10.47392/IRJAEH.2026.0301"
              target="_blank"
              rel="noreferrer"
              onClick={() => soundEngine.playChime()}
              className="stove-pub-link"
            >
              <span>View publication</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a
              href="https://irjaeh.com/index.php/journal/article/view/1564"
              target="_blank"
              rel="noreferrer"
              onClick={() => soundEngine.playSoftClick()}
              className="stove-pub-link"
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                color: "#f4f1ea",
                border: "1px solid rgba(255, 255, 255, 0.14)",
              }}
            >
              <span>Journal Article</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
export default StoveSafetySection;
