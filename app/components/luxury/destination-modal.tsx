"use client";

import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Calendar,
  MapPin,
  Clock,
  Star,
  Sparkles,
  ArrowRight,
  Heart,
} from "lucide-react";
import Link from "next/link";

export interface DestinationDetails {
  id: string;
  name: string;
  season: string;
  image: string;
  description: string;
  tagline: string;
  price: string;
  duration: string;
  rating: number;
  highlights: string[];
  itinerary: { day: string; title: string; description: string }[];
  bestFor: string[];
}

interface DestinationModalProps {
  destination: DestinationDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DestinationModal({
  destination,
  isOpen,
  onClose,
}: DestinationModalProps) {
  if (!destination) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal panel */}
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 top-16 md:top-24 bg-background rounded-t-3xl z-50 overflow-hidden flex flex-col"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex-1 overflow-y-auto">
              {/* Hero image */}
              <div className="relative h-64 md:h-80">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-gold text-xs tracking-[0.2em] uppercase mb-2">
                    {destination.season}
                  </p>
                  <h2 className="font-serif text-4xl md:text-5xl text-white mb-2">
                    {destination.name}
                  </h2>
                  <p className="text-white/80 text-lg font-light">
                    {destination.tagline}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 space-y-8">
                {/* Stats row */}
                <div className="flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-gold">
                      <Star className="h-4 w-4 fill-gold" />
                      <span className="font-medium">{destination.rating}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{destination.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{destination.season}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground text-sm">
                      Starting from
                    </p>
                    <p className="text-2xl font-serif text-gold">
                      {destination.price}
                    </p>
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <h3 className="font-serif text-xl mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-gold" />
                    Experience Highlights
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {destination.highlights.map((highlight, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border/50"
                      >
                        <div className="h-2 w-2 rounded-full bg-gold" />
                        <span className="text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Itinerary */}
                <div>
                  <h3 className="font-serif text-xl mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-gold" />
                    Sample Itinerary
                  </h3>
                  <div className="space-y-4">
                    {destination.itinerary.map((item, i) => (
                      <div
                        key={i}
                        className="relative pl-8 pb-4 border-l-2 border-gold/30 last:border-transparent"
                      >
                        <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-gold" />
                        <p className="text-gold text-xs tracking-wider uppercase mb-1">
                          {item.day}
                        </p>
                        <p className="font-medium mb-1">{item.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Best For tags */}
                <div>
                  <h3 className="font-serif text-xl mb-4 flex items-center gap-2">
                    <Heart className="h-5 w-5 text-gold" />
                    Perfect For
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {destination.bestFor.map((tag, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 rounded-full bg-gold/10 text-gold text-sm border border-gold/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 pb-8">
                  <Link href="/" className="flex-1">
                    <button className="w-full px-6 py-3 bg-gold text-navy font-medium rounded-md hover:bg-gold-light transition-colors flex items-center justify-center gap-2">
                      Start Planning
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </Link>
                  <button
                    onClick={onClose}
                    className="flex-1 px-6 py-3 border border-gold/50 text-gold rounded-md hover:bg-gold/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <Heart className="h-4 w-4" />
                    Save for Later
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
