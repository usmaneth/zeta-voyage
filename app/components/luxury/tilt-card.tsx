"use client";

import { useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "motion/react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltAmount?: number;
  glareEnabled?: boolean;
  onClick?: () => void;
}

export function TiltCard({
  children,
  className = "",
  tiltAmount = 10,
  glareEnabled = true,
  onClick,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 20 });

  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(212, 168, 83, 0.15) 0%, transparent 60%)`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const newRotateX = (-mouseY / (rect.height / 2)) * tiltAmount;
      const newRotateY = (mouseX / (rect.width / 2)) * tiltAmount;

      rotateX.set(newRotateX);
      rotateY.set(newRotateY);

      if (glareEnabled) {
        const gX = ((e.clientX - rect.left) / rect.width) * 100;
        const gY = ((e.clientY - rect.top) / rect.height) * 100;
        glareX.set(gX);
        glareY.set(gY);
      }
    },
    [tiltAmount, glareEnabled, rotateX, rotateY, glareX, glareY]
  );

  const handleMouseEnter = useCallback(() => {
    glareOpacity.set(1);
  }, [glareOpacity]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    glareOpacity.set(0);
  }, [rotateX, rotateY, glareOpacity]);

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className={`relative ${className}`}
    >
      {children}

      {glareEnabled && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden"
          style={{
            opacity: glareOpacity,
            background: glareBackground,
          }}
        />
      )}
    </motion.div>
  );
}
