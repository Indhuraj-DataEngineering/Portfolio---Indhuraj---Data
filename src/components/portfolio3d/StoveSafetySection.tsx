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

  // Simulation choreography
  useEffect(() => {
    if (!isPlaying || prefersReducedMotion) return;

    const runSimulationLoop = () => {
      simulationTimerRef.current = setTimeout(() => {
        setActiveStep((prev) => {
          const next = prev >= 5 ? 1 : prev + 1;
          return next;
        });
      }, 2200);
    };

    runSimulationLoop();

    return () => {
      if (simulationTimerRef.current) clearTimeout(simulationTimerRef.current);
    };
  }, [activeStep, isPlaying, prefersReducedMotion]);

  const handleReplay = () => {
    if (simulationTimerRef.current) clearTimeout(simulationTimerRef.current);
    setActiveStep(1);
    setIsPlaying(true);
  };

  const handleTriggerHazard = (sensorId: string) => {
    setActiveSensor(sensorId);
    handleReplay();
  };

  return (
    <section
      className="p3d-section p3d-section--tinted"
      id="engineering-project"
      aria-label="Smart multi-sensor stove safety system engineering showcase"
    >
      <div className="p3d-ambient-glow p3d-ambient-glow--orange" style={{ top: "15%", left: "10%", width: "450px", height: "450px" }} />
      <div className="p3d-ambient-glow p3d-ambient-glow--warm" style={{ bottom: "10%", right: "8%", width: "500px", height: "500px" }} />

      <div className="p3d-container">
        {/* Top 2-Column Showcase */}
        <div className="stove-section-grid">
          {/* LEFT: Project Narrative & Feature Cards */}
          <div className="stove-info-column">
            <span className="p3d-badge">
              <span className="pulse-dot" />
              ENGINEERING PROJECT · HARDWARE PROTOTYPE
            </span>
            <h2 className="p3d-heading">
              Smart multi-sensor<br />stove safety system.
            </h2>
            <p className="p3d-description">
              Developed and tested an integrated detection prototype with automatic electro-mechanical shutoff for LPG and biogas stoves. Engineered with fail-safe microcontrollers and multi-spectral sensors.
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
                    className={`stove-sensor-card ${isActive ? "stove-sensor-card--active" : ""} ${isTripped ? "stove-sensor-card--tripped" : ""}`}
                    onClick={() => handleTriggerHazard(sensor.id)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Test ${sensor.title} capability`}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleTriggerHazard(sensor.id)}
                  >
                    <div className="stove-sensor-icon">
                      <Icon size={20} />
                    </div>
                    <div>
                      <strong>{sensor.title}</strong>
                      <span>{sensor.sensorType}</span>
                    </div>
                    <div className="stove-sensor-status">
                      <span className="pulse-dot" style={{ width: "5px", height: "5px" }} />
                      {isActive && activeStep >= 4 ? "SYSTEM SECURED" : isTripped ? "ALERT SIGNAL" : "MONITORING"}
                    </div>
                  </article>
                );
              })}
            </div>

          </div>

        </div>

        {/* BOTTOM: Full-width Published Research Panel */}
        <article className="stove-publication-panel" aria-label="Published research details">
          <div className="stove-pub-icon">
            <FileText size={26} />
          </div>
          <div className="stove-pub-content">
            <span className="stove-pub-tag">PUBLISHED RESEARCH</span>
            <h3 className="stove-pub-title">
              Sensor-Based Smart Gas Leak, Flame, Smoke and Human Presence Detection System with Automatic Shutoff for Biogas and LPG Stoves
            </h3>
            <p className="stove-pub-meta">
              International Research Journal on Advanced Engineering Hub (IRJAEH) · Volume 04, Issue 04 · April 2026
            </p>
          </div>
          <a
            href="https://doi.org/10.47392/IRJAEH.2026.0301"
            target="_blank"
            rel="noreferrer"
            className="stove-pub-link"
          >
            <span>View publication</span>
            <ArrowUpRight size={16} />
          </a>
        </article>
      </div>
    </section>
  );
}
export default StoveSafetySection;
