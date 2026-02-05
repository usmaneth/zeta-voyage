"use client";

import { motion } from "motion/react";
import {
  Camera,
  CalendarDays,
  CreditCard,
  Map,
  Utensils,
  Hotel,
  Plane,
  Heart,
} from "lucide-react";

interface QuickActionChipsProps {
  messageContent: string;
  onAction: (prompt: string) => void;
  isLatestMessage: boolean;
}

interface ActionChip {
  label: string;
  icon: typeof Camera;
  prompt: string;
}

function detectActions(content: string): ActionChip[] {
  const lower = content.toLowerCase();
  const actions: ActionChip[] = [];

  const hasDestination =
    /maldives|paris|santorini|kyoto|bali|swiss|alps|amalfi|venice|safari|kenya|tanzania|bora bora|seychelles|fiji|greece|italy|japan|france/.test(
      lower
    );
  const hasHotel =
    /hotel|resort|villa|lodge|suite|accommodation|stay|property/.test(lower);
  const hasDining =
    /restaurant|dining|michelin|chef|cuisine|culinary|food|gastronomic/.test(
      lower
    );
  const hasItinerary =
    /itinerary|day\s?\d|schedule|plan|journey|trip|travel/.test(lower);
  const hasActivities =
    /experience|adventure|tour|excursion|activity|diving|hiking|safari|cruise|spa/.test(
      lower
    );
  const hasBooking = /book|reserve|arrange|secure|confirm/.test(lower);
  const hasRomantic = /romantic|honeymoon|couple|love|intimate/.test(lower);

  if (hasDestination && !hasItinerary) {
    actions.push({
      label: "View Itinerary",
      icon: CalendarDays,
      prompt:
        "Create a detailed day-by-day luxury itinerary for this destination",
    });
  }

  if (hasDestination && !hasDining) {
    actions.push({
      label: "Best Dining",
      icon: Utensils,
      prompt:
        "What are the finest restaurants and dining experiences at this destination?",
    });
  }

  if (hasDestination && !hasHotel) {
    actions.push({
      label: "Top Hotels",
      icon: Hotel,
      prompt:
        "Recommend the most exclusive luxury hotels and villas at this destination",
    });
  }

  if (hasHotel && !hasItinerary) {
    actions.push({
      label: "Plan My Stay",
      icon: CalendarDays,
      prompt: "Create a complete itinerary around this accommodation",
    });
  }

  if (hasItinerary || hasBooking) {
    actions.push({
      label: "Book Now",
      icon: CreditCard,
      prompt:
        "I'd like to proceed with booking this trip. What are the next steps?",
    });
  }

  if (hasActivities || hasDestination) {
    actions.push({
      label: "See Highlights",
      icon: Camera,
      prompt:
        "What are the must-see highlights and photo opportunities at this destination?",
    });
  }

  if (hasDestination) {
    actions.push({
      label: "Getting There",
      icon: Plane,
      prompt:
        "What are the best flight routes and private transfer options to get there?",
    });
  }

  if (hasRomantic || hasDestination) {
    actions.push({
      label: "Save Trip",
      icon: Heart,
      prompt:
        "This sounds perfect! Can you summarize this trip with pricing estimates?",
    });
  }

  if (actions.length === 0) {
    actions.push(
      {
        label: "Explore More",
        icon: Map,
        prompt: "Tell me more about luxury travel options",
      },
      {
        label: "Surprise Me",
        icon: Camera,
        prompt:
          "Suggest an unexpected, off-the-beaten-path luxury destination",
      }
    );
  }

  return actions.slice(0, 4);
}

export function QuickActionChips({
  messageContent,
  onAction,
  isLatestMessage,
}: QuickActionChipsProps) {
  if (!isLatestMessage) return null;

  const actions = detectActions(messageContent);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="flex flex-wrap gap-2 mt-3"
    >
      {actions.map((action, i) => (
        <motion.button
          key={action.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 + i * 0.08 }}
          onClick={() => onAction(action.prompt)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full
            bg-gold/10 text-gold border border-gold/20
            hover:bg-gold/20 hover:border-gold/40
            active:scale-95 transition-all duration-200"
        >
          <action.icon className="h-3 w-3" />
          {action.label}
        </motion.button>
      ))}
    </motion.div>
  );
}
