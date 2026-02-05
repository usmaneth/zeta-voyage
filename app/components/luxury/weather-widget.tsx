"use client";

import { motion } from "motion/react";
import { Sun, Cloud, CloudSnow, Wind, Droplets, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { WeatherData } from "@/lib/travel-data";

interface WeatherWidgetProps {
  weather: WeatherData;
  compact?: boolean;
}

const weatherIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  sun: Sun,
  "cloud-sun": Cloud,
  snowflake: CloudSnow,
};

export function WeatherWidget({ weather, compact = false }: WeatherWidgetProps) {
  const WeatherIcon = weatherIcons[weather.icon] || Sun;

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold/10 rounded-full border border-gold/20"
      >
        <WeatherIcon className="w-4 h-4 text-gold" />
        <span className="text-sm font-medium">{weather.temperature}°F</span>
        <span className="text-xs text-muted-foreground">{weather.location}</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="p-4 bg-gradient-to-br from-card via-card to-gold/5 border-gold/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{weather.location}</span>
              </div>
              <div className="flex items-end gap-1">
                <span className="font-serif text-4xl font-bold text-foreground">
                  {weather.temperature}
                </span>
                <span className="text-2xl text-gold mb-1">°F</span>
              </div>
            </div>
            <div className="p-3 bg-gold/10 rounded-xl">
              <WeatherIcon className="w-8 h-8 text-gold" />
            </div>
          </div>
          <p className="text-sm text-foreground font-medium mb-3 capitalize">
            {weather.condition}
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-blue-400" />
              <span>{weather.humidity}%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Wind className="w-4 h-4 text-gray-400" />
              <span>{weather.windSpeed} km/h</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
