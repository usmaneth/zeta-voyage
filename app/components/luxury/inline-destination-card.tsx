"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  Thermometer,
  Cloud,
  Plane,
  ChevronDown,
  Droplets,
  Sun,
  CloudRain,
  Snowflake,
  CloudLightning,
  CloudFog,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Destination } from "@/lib/travel-data";
import {
  fetchLiveWeather,
  fetchDailyForecast,
  type LiveWeather,
  type DailyForecast,
} from "@/lib/weather-api";

interface InlineDestinationCardProps {
  destination: Destination;
  index?: number;
}

function getWeatherIcon(condition: string) {
  const c = condition.toLowerCase();
  if (c.includes("thunder") || c.includes("lightning")) return CloudLightning;
  if (c.includes("snow") || c.includes("ice") || c.includes("rime")) return Snowflake;
  if (c.includes("rain") || c.includes("drizzle") || c.includes("shower")) return CloudRain;
  if (c.includes("fog")) return CloudFog;
  if (c.includes("cloud") || c.includes("overcast")) return Cloud;
  return Sun;
}

export function InlineDestinationCard({ destination, index = 0 }: InlineDestinationCardProps) {
  const [weather, setWeather] = useState<LiveWeather | null>(null);
  const [forecast, setForecast] = useState<DailyForecast[] | null>(null);
  const [showForecast, setShowForecast] = useState(false);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    fetchLiveWeather(destination.id).then(setWeather);
  }, [destination.id]);

  // Fetch forecast lazily on first expand
  useEffect(() => {
    if (showForecast && !forecast) {
      fetchDailyForecast(destination.id).then(setForecast);
    }
  }, [showForecast, forecast, destination.id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <Card className="group relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500 max-w-sm">
        {/* Image Section */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="font-serif text-2xl font-bold text-white mb-0.5 drop-shadow-lg">
              {destination.name}
            </h3>
            <div className="flex items-center gap-1 text-white/90 text-xs">
              <MapPin className="w-3 h-3" />
              <span>{destination.country}</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3">
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
            {destination.description}
          </p>

          {/* Current Weather Row */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-sm">
                <Thermometer className="w-4 h-4 text-gold" />
                <span className="font-medium">
                  {weather ? `${weather.temperature}°F` : "—"}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Cloud className="w-4 h-4" />
                <span>{weather?.condition || "Loading..."}</span>
              </div>
            </div>
            {/* Show More toggle */}
            <button
              onClick={() => setShowForecast(!showForecast)}
              className="flex items-center gap-1 text-xs text-gold/80 hover:text-gold transition-colors"
            >
              <span>{showForecast ? "Hide" : "7-day"}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-300 ${
                  showForecast ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* 7-Day Forecast (expandable) */}
          <AnimatePresence>
            {showForecast && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-1 pb-1 space-y-1">
                  {forecast ? (
                    forecast.map((day, i) => {
                      const Icon = getWeatherIcon(day.condition);
                      return (
                        <motion.div
                          key={day.date}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                          className={`flex items-center gap-3 py-1.5 px-2 rounded-md text-xs ${
                            i === 0
                              ? "bg-gold/10 border border-gold/20"
                              : "hover:bg-muted/50"
                          }`}
                        >
                          <span className={`w-10 font-medium ${i === 0 ? "text-gold" : "text-foreground"}`}>
                            {day.dayName}
                          </span>
                          <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${i === 0 ? "text-gold" : "text-muted-foreground"}`} />
                          <span className="flex-1 text-muted-foreground truncate">
                            {day.condition}
                          </span>
                          {day.precipChance > 0 && (
                            <span className="flex items-center gap-0.5 text-blue-400">
                              <Droplets className="w-3 h-3" />
                              {day.precipChance}%
                            </span>
                          )}
                          <span className="text-right w-16 tabular-nums">
                            <span className="font-medium">{day.tempMax}°</span>
                            <span className="text-muted-foreground"> / {day.tempMin}°</span>
                          </span>
                        </motion.div>
                      );
                    })
                  ) : (
                    <div className="flex items-center justify-center py-4">
                      <span className="inline-block size-3 rounded-full bg-gold animate-[scale-pulse_1.5s_ease-in-out_infinite]" />
                      <span className="text-xs text-muted-foreground ml-2">Loading forecast...</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Book Now Button */}
          <button
            onClick={() => setBooked(true)}
            disabled={booked}
            className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
              booked
                ? "bg-green-500/20 text-green-400 border border-green-500/30 cursor-default"
                : "bg-gold/10 text-gold border border-gold/30 hover:bg-gold/20 hover:border-gold/50 active:scale-[0.98]"
            }`}
          >
            {booked ? (
              <span className="flex items-center justify-center gap-2">
                <Plane className="w-4 h-4" />
                Booking Requested
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Plane className="w-4 h-4" />
                Book Now
              </span>
            )}
          </button>
        </div>
      </Card>
    </motion.div>
  );
}
