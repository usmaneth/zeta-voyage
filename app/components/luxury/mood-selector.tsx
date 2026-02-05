"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mountain,
  Heart,
  Waves,
  Landmark,
  Palmtree,
  ChefHat,
  Sparkles,
} from "lucide-react";

interface MoodSelectorProps {
  onSelect: (prompt: string) => void;
}

const moods = [
  {
    id: "adventure",
    label: "Adventure",
    icon: Mountain,
    color: "from-emerald-500/20 to-emerald-600/10",
    borderColor: "border-emerald-500/30",
    textColor: "text-emerald-400",
    prompt:
      "I'm looking for an adrenaline-packed luxury adventure trip. Think private helicopter tours, exclusive hiking expeditions, or diving in remote locations. Surprise me with something extraordinary!",
  },
  {
    id: "romance",
    label: "Romance",
    icon: Heart,
    color: "from-rose-500/20 to-rose-600/10",
    borderColor: "border-rose-500/30",
    textColor: "text-rose-400",
    prompt:
      "Plan the most romantic luxury getaway imaginable. I want intimate settings, breathtaking sunsets, couples spa treatments, and unforgettable dining experiences for two.",
  },
  {
    id: "relaxation",
    label: "Relaxation",
    icon: Waves,
    color: "from-sky-500/20 to-sky-600/10",
    borderColor: "border-sky-500/30",
    textColor: "text-sky-400",
    prompt:
      "I need the ultimate luxury relaxation escape. Private beaches, world-class spas, overwater villas, and complete tranquility. Help me find the perfect place to unwind.",
  },
  {
    id: "culture",
    label: "Culture",
    icon: Landmark,
    color: "from-amber-500/20 to-amber-600/10",
    borderColor: "border-amber-500/30",
    textColor: "text-amber-400",
    prompt:
      "I want a deeply immersive cultural journey. Private museum tours, ancient temples, exclusive local experiences, and authentic encounters that most travelers never get to see.",
  },
  {
    id: "beach",
    label: "Beach",
    icon: Palmtree,
    color: "from-teal-500/20 to-teal-600/10",
    borderColor: "border-teal-500/30",
    textColor: "text-teal-400",
    prompt:
      "Find me the world's most exclusive beach destination. Crystal-clear waters, private island access, overwater bungalows, and white sand beaches. Only the very best.",
  },
  {
    id: "culinary",
    label: "Culinary",
    icon: ChefHat,
    color: "from-orange-500/20 to-orange-600/10",
    borderColor: "border-orange-500/30",
    textColor: "text-orange-400",
    prompt:
      "Design an extraordinary culinary journey for me. I want Michelin-starred restaurants, private chef experiences, wine tastings at legendary estates, and local food discoveries.",
  },
];

export function MoodSelector({ onSelect }: MoodSelectorProps) {
  const [hoveredMood, setHoveredMood] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleSelect = (mood: (typeof moods)[0]) => {
    setSelectedMood(mood.id);
    setTimeout(() => onSelect(mood.prompt), 400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="mt-10"
    >
      <p className="text-muted-foreground text-sm text-center mb-5">
        Or select your travel mood
      </p>

      <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
        {moods.map((mood, i) => {
          const isSelected = selectedMood === mood.id;
          const Icon = mood.icon;

          return (
            <motion.button
              key={mood.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.07, duration: 0.3 }}
              onClick={() => handleSelect(mood)}
              onMouseEnter={() => setHoveredMood(mood.id)}
              onMouseLeave={() => setHoveredMood(null)}
              disabled={selectedMood !== null}
              className={`relative flex flex-col items-center gap-2 p-4 rounded-xl
                border transition-all duration-300 cursor-pointer
                ${
                  isSelected
                    ? `bg-gradient-to-b ${mood.color} ${mood.borderColor} scale-95`
                    : hoveredMood === mood.id
                      ? `bg-gradient-to-b ${mood.color} ${mood.borderColor}`
                      : "border-border/30 bg-card/30 hover:border-border/60"
                }
                ${selectedMood && !isSelected ? "opacity-40" : ""}
              `}
            >
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 rounded-xl border-2 border-gold/50"
                  />
                )}
              </AnimatePresence>

              <motion.div
                animate={
                  hoveredMood === mood.id
                    ? { scale: 1.15, rotate: [0, -5, 5, 0] }
                    : { scale: 1 }
                }
                transition={{ duration: 0.3 }}
              >
                <Icon
                  className={`h-6 w-6 ${hoveredMood === mood.id || isSelected ? mood.textColor : "text-muted-foreground"} transition-colors`}
                />
              </motion.div>

              <span
                className={`text-xs font-medium ${hoveredMood === mood.id || isSelected ? "text-foreground" : "text-muted-foreground"} transition-colors`}
              >
                {mood.label}
              </span>

              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="absolute -top-1 -right-1"
                >
                  <Sparkles className="h-4 w-4 text-gold" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
