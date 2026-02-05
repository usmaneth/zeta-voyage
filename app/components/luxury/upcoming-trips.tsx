"use client";

import { motion } from "motion/react";
import { Calendar, Plane, Building2, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Trip } from "@/lib/travel-data";

interface UpcomingTripsProps {
  trips: Trip[];
}

const statusColors: Record<string, string> = {
  upcoming: "bg-green-500/20 text-green-400 border-green-500/30",
  completed: "bg-muted text-muted-foreground border-muted",
  "in-progress": "bg-gold/20 text-gold border-gold/30",
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function UpcomingTrips({ trips }: UpcomingTripsProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="font-serif text-lg font-semibold text-foreground">
          Your Journeys
        </h3>
        <Badge variant="outline" className="text-xs border-gold/30 text-gold">
          {trips.length} trips
        </Badge>
      </div>
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-3">
          {trips.map((trip, index) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="group p-0 overflow-hidden border-border/50 hover:border-gold/30 transition-all duration-300 cursor-pointer">
                <div className="flex gap-3 p-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-serif font-semibold text-foreground truncate text-sm">
                        {trip.destination}
                      </h4>
                      <Badge
                        variant="outline"
                        className={`text-[10px] px-1.5 py-0 flex-shrink-0 ${statusColors[trip.status] || ""}`}
                      >
                        {trip.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gold" />
                        <span>{formatDate(trip.startDate)}</span>
                      </div>
                      <div className="flex items-center gap-1 truncate">
                        <Building2 className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{trip.hotel}</span>
                      </div>
                    </div>
                    {trip.flights[0] && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1.5">
                        <Plane className="w-3 h-3 text-gold" />
                        <span>{trip.flights[0].departure}</span>
                      </div>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-gold transition-colors self-center flex-shrink-0" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
