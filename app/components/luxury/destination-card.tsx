"use client";

import { motion } from "motion/react";
import { MapPin, Thermometer, Cloud } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Destination, WeatherData } from "@/lib/travel-data";

interface DestinationCardProps {
  destination: Destination;
  weather?: WeatherData;
  index?: number;
}

export function DestinationCard({ destination, weather, index = 0 }: DestinationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500">
        <div className="relative h-48 overflow-hidden">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="font-serif text-2xl font-bold text-white mb-1 drop-shadow-lg">
              {destination.name}
            </h3>
            <div className="flex items-center gap-1 text-white/90 text-sm">
              <MapPin className="w-3 h-3" />
              <span>{destination.country}</span>
            </div>
          </div>
          <Badge className="absolute top-4 right-4 bg-gold/90 text-navy border-0 font-medium text-xs">
            {destination.priceRange}
          </Badge>
        </div>
        <div className="p-4 space-y-3">
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
            {destination.description}
          </p>
          {weather && (
            <div className="flex items-center gap-4 pt-2 border-t border-border/50">
              <div className="flex items-center gap-1.5 text-sm">
                <Thermometer className="w-4 h-4 text-gold" />
                <span className="font-medium">{weather.temperature}°F</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Cloud className="w-4 h-4" />
                <span>{weather.condition}</span>
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
