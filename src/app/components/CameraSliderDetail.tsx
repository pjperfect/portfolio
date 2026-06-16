import { useState, useEffect } from 'react';
import { ArrowLeft, Copy } from 'lucide-react';
import { Link } from 'react-router-dom';
const BASE = "https://philip-portfolio-assets.s3.eu-north-1.amazonaws.com";
const fig1 = `${BASE}/Figure_1_Motorized_Camera_Slider_Prototype.png`;
const fig2 = `${BASE}/Figure_2_Electronics_Enclosure_Under_Sliding_Platform.png`;
const fig3 = `${BASE}/Figure_3_NEMA_17_Drive_System_Detail.png`;
const fig4 = `${BASE}/Figure_4_Camera_Carriage_and_Belt_Attachment.png`;
const fig5 = `${BASE}/Figure_5_Arduino-Based_Slider_Control_Circuit.png`;
const fig6 = `${BASE}/Figure_6_Motorized_Camera_Slider_in_Operation.png`;

export function CameraSliderDetail() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const code = `#include <Stepper.h>
const int stepsPerRevolution = 200;
Stepper myStepper(stepsPerRevolution, 4, 3, 7, 8);
int Pin10 = 10;
bool s10;

void setup() {
  pinMode(Pin10, INPUT);
}

void loop() {
  s10 = digitalRead(Pin10);
  int sensorReading = analogRead(A0);
  int motorSpeed = map(sensorReading, 0, 1023, 0, 100);

  if (motorSpeed > 0) {
    myStepper.setSpeed(motorSpeed);
    if (s10 == LOW)  { myStepper.step(-stepsPerRevolution / 100); }
    if (s10 == HIGH) { myStepper.step( stepsPerRevolution / 100); }
  }
}`;

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="top"
      style={{ backgroundColor: '#0D1117', minHeight: '100vh', paddingTop: 64 }}
    >
      {/* Hero Block */}
      <section
        style={{
          backgroundColor: '#1A2B4A',
          padding: '80px 24px',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Link
            to="/#projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              color: '#0D7377',
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              marginBottom: 24,
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = '#14A8AD')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = '#0D7377')
            }
          >
            <ArrowLeft size={16} /> Back to Projects
          </Link>

          <h1
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              color: '#FFFFFF',
              fontSize: 48,
              marginBottom: 12,
            }}
          >
            Motorized Camera Slider
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#C9D1D9',
              fontSize: 18,
              marginBottom: 20,
              opacity: 0.8,
            }}
          >
            Undergraduate Final Year Project — Eastern Mediterranean University,
            January 2022
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginBottom: 32,
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                padding: '6px 14px',
                background: 'linear-gradient(135deg, #FFB800, #FFA726)',
                borderRadius: 100,
                color: '#1A2B4A',
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                boxShadow: '0 2px 8px rgba(255,184,0,0.3)',
              }}
            >
              🏆 2nd Place — EMU Final Year Project Competition
            </span>
            <div
              style={{
                display: 'flex',
                gap: 12,
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: '#C9D1D9',
              }}
            >
              <span>Team of 3</span>
              <span>·</span>
              <span>Hardware + Software</span>
              <span>·</span>
              <span>Arduino / C++</span>
            </div>
          </div>

          <div
            style={{
              width: '100%',
              height: 500,
              borderRadius: 12,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <img
              src={fig6}
              alt="Motorized Camera Slider in Operation"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(13,17,23,0.6) 0%, transparent 60%)',
              }}
            />
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section style={{ backgroundColor: '#0D1117', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              color: '#FFFFFF',
              fontSize: 32,
              marginBottom: 20,
            }}
          >
            The Problem
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#C9D1D9',
              fontSize: 16,
              lineHeight: 1.8,
              maxWidth: 900,
            }}
          >
            During the COVID-19 plandemic, lecturers were forced to move
            education online but existing software solutions couldn't replicate
            the natural experience of a lecturer writing equations on a
            blackboard. Manual camera handling was impractical. A low-cost,
            automated camera tracking solution was needed — accessible to
            educational institutions, not just film professionals.
          </p>
        </div>
      </section>

      {/* The Solution */}
      <section style={{ backgroundColor: '#1A2B4A', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              color: '#FFFFFF',
              fontSize: 32,
              marginBottom: 20,
            }}
          >
            The Solution
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#C9D1D9',
              fontSize: 16,
              lineHeight: 1.8,
              maxWidth: 900,
            }}
          >
            A 1-metre motorised camera slider built from copper pipes, MDF wood,
            a NEMA 17 stepper motor, and an Arduino Nano. The slider moves the
            camera back and forth along the rail at variable speed, controlled
            by a potentiometer. Direction is managed by a limit switch. Speed is
            mapped from an analogue sensor input (0–1023) to a motor speed range
            (0–100 RPM). The entire build cost approximately $200 — deliberately
            designed to be affordable and replicable by any educational
            institution.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ backgroundColor: '#0D1117', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              color: '#FFFFFF',
              fontSize: 32,
              marginBottom: 40,
            }}
          >
            How It Works
          </h2>
          <div
            style={{ display: 'grid', gap: 24 }}
            className="how-it-works-grid"
          >
            {[
              {
                title: 'Speed Control',
                description:
                  'A 10kΩ potentiometer reads an analogue voltage (0–5V) mapped to motor speed (0–100 RPM). The user turns the dial to control how fast the camera slides.',
              },
              {
                title: 'Direction Control',
                description:
                  'A limit switch on Pin 10 of the Arduino reads HIGH or LOW. When LOW, the motor steps in the negative direction. When HIGH, it steps in the positive direction — creating the back-and-forth sliding motion.',
              },
              {
                title: 'Motor Drive',
                description:
                  'The NEMA 17 bipolar stepper motor (1.8° step angle, 200 steps/revolution) is driven via an A4988 stepper driver powered by a 12V battery pack. The Arduino sends step and direction signals to the driver over 2 pins.',
              },
            ].map((card, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#1A2B4A',
                  borderTop: '3px solid #0D7377',
                  borderRadius: 8,
                  padding: 24,
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700,
                    color: '#FFFFFF',
                    fontSize: 18,
                    marginBottom: 12,
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: '#C9D1D9',
                    fontSize: 14,
                    lineHeight: 1.7,
                  }}
                >
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack & Components */}
      <section style={{ backgroundColor: '#1A2B4A', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              color: '#FFFFFF',
              fontSize: 32,
              marginBottom: 40,
            }}
          >
            Tech Stack & Components
          </h2>
          <div style={{ display: 'grid', gap: 24 }} className="tech-stack-grid">
            <div
              style={{
                backgroundColor: '#0D1117',
                borderTop: '3px solid #0D7377',
                borderRadius: 8,
                padding: 28,
              }}
            >
              <h3
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  color: '#0D7377',
                  fontSize: 16,
                  marginBottom: 20,
                }}
              >
                Software
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {[
                  'Arduino IDE',
                  'C++ (Stepper.h library)',
                  'Multisim (circuit simulation)',
                  'AutoCAD (virtual design)',
                ].map((item) => (
                  <span
                    key={item}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 100,
                      border: '1px solid rgba(13,115,119,0.5)',
                      color: '#0D7377',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div
              style={{
                backgroundColor: '#0D1117',
                borderTop: '3px solid #0D7377',
                borderRadius: 8,
                padding: 28,
              }}
            >
              <h3
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  color: '#0D7377',
                  fontSize: 16,
                  marginBottom: 20,
                }}
              >
                Hardware
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {[
                  'Arduino Nano',
                  'NEMA 17 Stepper Motor',
                  'A4988 Stepper Driver',
                  '10kΩ Potentiometer',
                  'Limit Switch',
                  'GT2 Timing Belt & Pulleys',
                  '22mm Copper Pipes (1m × 2)',
                  'MDF Wood frame',
                  '12V AA Battery Pack',
                ].map((item) => (
                  <span
                    key={item}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 100,
                      border: '1px solid rgba(13,115,119,0.5)',
                      color: '#0D7377',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Code */}
      <section style={{ backgroundColor: '#0D1117', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              color: '#FFFFFF',
              fontSize: 32,
              marginBottom: 20,
            }}
          >
            The Code
          </h2>
          <div
            style={{
              position: 'relative',
              backgroundColor: '#0D1117',
              border: '1px solid rgba(13,115,119,0.3)',
              borderRadius: 8,
              padding: 24,
              overflow: 'auto',
            }}
          >
            <button
              onClick={copyCode}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                backgroundColor: copied ? '#0D7377' : 'rgba(13,115,119,0.2)',
                border: '1px solid #0D7377',
                borderRadius: 6,
                padding: '6px 12px',
                color: '#fff',
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transition: 'all 0.2s',
              }}
            >
              <Copy size={14} /> {copied ? 'Copied!' : 'Copy'}
            </button>
            <pre
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 14,
                color: '#C9D1D9',
                margin: 0,
                overflowX: 'auto',
              }}
            >
              <code>{code}</code>
            </pre>
          </div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              color: '#C9D1D9',
              marginTop: 12,
              fontStyle: 'italic',
              opacity: 0.7,
            }}
          >
            Full Arduino sketch — stepper motor direction and speed control via
            potentiometer and limit switch.
          </p>
        </div>
      </section>

      {/* Build Gallery */}
      <section style={{ backgroundColor: '#1A2B4A', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              color: '#FFFFFF',
              fontSize: 32,
              marginBottom: 40,
            }}
          >
            Build Gallery
          </h2>
          <div
            style={{
              display: 'flex',
              gap: 16,
              overflowX: 'auto',
              paddingBottom: 16,
            }}
            className="gallery-scroll"
          >
            {[
              {
                src: fig1,
                caption: 'Figure 1 — Motorized Camera Slider Prototype',
              },
              {
                src: fig2,
                caption:
                  'Figure 2 — Electronics Enclosure Under Sliding Platform',
              },
              { src: fig3, caption: 'Figure 3 — NEMA 17 Drive System Detail' },
              {
                src: fig4,
                caption: 'Figure 4 — Camera Carriage and Belt Attachment',
              },
              {
                src: fig5,
                caption: 'Figure 5 — Arduino-Based Slider Control Circuit',
              },
              {
                src: fig6,
                caption: 'Figure 6 — Motorized Camera Slider in Operation',
              },
            ].map(({ src, caption }) => (
              <div
                key={caption}
                style={{
                  minWidth: 320,
                  height: 240,
                  borderRadius: 8,
                  overflow: 'hidden',
                  position: 'relative',
                  flexShrink: 0,
                }}
              >
                <img
                  src={src}
                  alt={caption}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background:
                      'linear-gradient(to top, rgba(13,17,23,0.85) 0%, transparent 100%)',
                    padding: '16px 12px 12px',
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12,
                      color: '#C9D1D9',
                      margin: 0,
                    }}
                  >
                    {caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section style={{ backgroundColor: '#0D1117', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              color: '#FFFFFF',
              fontSize: 32,
              marginBottom: 40,
            }}
          >
            Project Details
          </h2>
          <div
            style={{ display: 'grid', gap: 24 }}
            className="project-details-grid"
          >
            {[
              {
                label: 'University',
                value: 'Eastern Mediterranean University',
              },
              {
                label: 'Department',
                value: 'Electrical & Electronics Engineering',
              },
              { label: 'Supervisor', value: 'Prof. Dr. Erhan İnce' },
              {
                label: 'Team',
                value: 'Amro Mohamedain, Philip Olembo, Canberk Balkir',
              },
              { label: 'Jury Date', value: '31 January 2022' },
              {
                label: 'Result',
                value: '2nd Place — Final Year Project Competition',
              },
              { label: 'Total Build Cost', value: '~$200' },
              {
                label: 'Build Duration',
                value: 'October 2021 – January 2022 (4 months)',
              },
            ].map((detail) => (
              <div
                key={detail.label}
                style={{
                  padding: '16px 0',
                  borderBottom: '1px solid rgba(13,115,119,0.2)',
                }}
              >
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    color: '#0D7377',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    marginBottom: 6,
                    fontWeight: 600,
                  }}
                >
                  {detail.label}
                </p>
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 16,
                    color: '#FFFFFF',
                    fontWeight: 700,
                  }}
                >
                  {detail.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Back Navigation */}
      <section style={{ backgroundColor: '#1A2B4A', padding: '40px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
          <Link
            to="/#projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              color: '#0D7377',
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = '#14A8AD')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = '#0D7377')
            }
          >
            <ArrowLeft size={18} /> Back to Projects
          </Link>
        </div>
      </section>

      <style>{`
        .how-it-works-grid { grid-template-columns: repeat(3, 1fr); }
        .tech-stack-grid { grid-template-columns: repeat(2, 1fr); }
        .project-details-grid { grid-template-columns: repeat(3, 1fr); }
        .gallery-scroll::-webkit-scrollbar { height: 8px; }
        .gallery-scroll::-webkit-scrollbar-track { background: rgba(13,115,119,0.1); border-radius: 4px; }
        .gallery-scroll::-webkit-scrollbar-thumb { background: #0D7377; border-radius: 4px; }

        @media (max-width: 1023px) {
          .how-it-works-grid { grid-template-columns: 1fr !important; }
          .tech-stack-grid { grid-template-columns: 1fr !important; }
          .project-details-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        @media (max-width: 767px) {
          .project-details-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
