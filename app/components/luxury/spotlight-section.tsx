"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useTransform,
} from "motion/react";
import { Plane, Star, Diamond, Gem, Crown } from "lucide-react";

interface HiddenSecret {
  x: number;
  y: number;
  text: string;
  Icon: typeof Plane;
}

const hiddenSecrets: HiddenSecret[] = [
  { x: 15, y: 30, text: "Private jet transfers included", Icon: Plane },
  { x: 75, y: 25, text: "Michelin-star dining experiences", Icon: Star },
  { x: 25, y: 70, text: "24/7 personal concierge", Icon: Diamond },
  { x: 80, y: 65, text: "Exclusive VIP lounge access", Icon: Gem },
  { x: 50, y: 50, text: "Complimentary spa treatments", Icon: Crown },
];

function SecretCard({
  secret,
  index,
  springX,
  springY,
}: {
  secret: HiddenSecret;
  index: number;
  springX: ReturnType<typeof useSpring>;
  springY: ReturnType<typeof useSpring>;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardCenter, setCardCenter] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCardCenter = () => {
      if (cardRef.current) {
        const parent = cardRef.current.parentElement;
        if (parent) {
          const parentRect = parent.getBoundingClientRect();
          setCardCenter({
            x: (secret.x / 100) * parentRect.width,
            y: (secret.y / 100) * parentRect.height,
          });
        }
      }
    };

    updateCardCenter();
    window.addEventListener("resize", updateCardCenter);
    return () => window.removeEventListener("resize", updateCardCenter);
  }, [secret.x, secret.y]);

  const distance = useTransform(
    [springX, springY],
    ([x, y]: number[]) => {
      const dx = (x as number) - cardCenter.x;
      const dy = (y as number) - cardCenter.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
  );

  const opacity = useTransform(distance, [0, 100, 150, 200], [1, 1, 0.5, 0]);
  const scale = useTransform(distance, [0, 100, 200], [1.05, 1, 0.95]);

  const Icon = secret.Icon;

  return (
    <motion.div
      ref={cardRef}
      className="absolute z-10"
      style={{
        left: `${secret.x}%`,
        top: `${secret.y}%`,
        x: "-50%",
        y: "-50%",
        opacity,
        scale,
      }}
      initial={{ opacity: 0 }}
    >
      <div className="relative">
        <motion.div
          className="absolute -inset-4 blur-xl bg-gold/20 rounded-full"
          style={{ opacity }}
        />
        <div className="relative bg-card/90 backdrop-blur-sm border border-gold/30 rounded-lg p-4 min-w-[180px] shadow-lg">
          <Icon className="w-6 h-6 text-gold mb-2" />
          <p className="text-foreground text-sm font-medium">{secret.text}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function SpotlightSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 25 });

  const glowBackground = useMotionTemplate`radial-gradient(circle 200px at ${springX}px ${springY}px, rgba(212, 168, 83, 0.08) 0%, transparent 70%)`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-500);
    mouseY.set(-500);
  }, [mouseX, mouseY]);

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />

      <div className="relative max-w-7xl mx-auto px-4 text-center z-10">
        <p className="text-gold/60 text-sm tracking-[0.3em] uppercase mb-4">
          Move your cursor to discover
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
          Hidden Luxuries
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-16">
          Every Voyage package includes exclusive perks invisible to the
          ordinary traveler. Illuminate the darkness to reveal what awaits.
        </p>
      </div>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-[400px] max-w-5xl mx-auto"
      >
        {/* Grid pattern */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ opacity: 0.1 }}
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-gold"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {hiddenSecrets.map((secret, index) => (
          <SecretCard
            key={index}
            secret={secret}
            index={index}
            springX={springX}
            springY={springY}
          />
        ))}

        {/* Glow overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: glowBackground }}
        />

        {/* Spotlight ring */}
        <motion.div
          className="absolute pointer-events-none z-20"
          style={{
            width: 200,
            height: 200,
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        >
          <div
            className="w-full h-full rounded-full border border-gold/20"
            style={{
              background:
                "radial-gradient(circle, transparent 40%, rgba(0,0,0,0.3) 100%)",
              boxShadow:
                "inset 0 0 40px rgba(212, 168, 83, 0.15), 0 0 60px rgba(212, 168, 83, 0.05)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
