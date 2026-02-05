"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Star, Clock, Users, Sparkles, Diamond } from "lucide-react";

interface FlipCardProps {
  frontImage: string;
  frontTitle: string;
  frontSubtitle: string;
  backTitle: string;
  backTips: string[];
  price: string;
  rating: number;
  duration: string;
  groupSize: string;
}

function FlipCard({
  frontImage,
  frontTitle,
  frontSubtitle,
  backTitle,
  backTips,
  price,
  rating,
  duration,
  groupSize,
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-full aspect-[3/4] cursor-pointer"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={frontImage}
            alt={frontTitle}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-gold/80 text-xs tracking-[0.2em] uppercase mb-2">
              {frontSubtitle}
            </p>
            <h3 className="font-serif text-2xl text-white mb-3">
              {frontTitle}
            </h3>
            <div className="flex items-center gap-4 text-white/60 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-gold fill-gold" />
                <span>{rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{duration}</span>
              </div>
            </div>
          </div>

          <div className="absolute top-4 right-4 bg-gold text-background px-3 py-1 rounded-full text-sm font-medium">
            {price}
          </div>

          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
            <p className="text-white text-sm tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold" />
              Hover to reveal insider tips
            </p>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden bg-gradient-to-br from-card via-card to-background border border-gold/20"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Dot pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%">
              <defs>
                <pattern
                  id="flipDots"
                  width="30"
                  height="30"
                  patternUnits="userSpaceOnUse"
                >
                  <circle
                    cx="15"
                    cy="15"
                    r="1"
                    fill="currentColor"
                    className="text-gold"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#flipDots)" />
            </svg>
          </div>

          <div className="relative h-full p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-gold" />
              <p className="text-gold text-xs tracking-[0.2em] uppercase">
                Insider Tips
              </p>
            </div>

            <h3 className="font-serif text-xl text-foreground mb-4">
              {backTitle}
            </h3>

            <ul className="space-y-3 flex-1">
              {backTips.map((tip, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: isFlipped ? 1 : 0,
                    x: isFlipped ? 0 : -10,
                  }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <Diamond className="w-3 h-3 text-gold mt-1 flex-shrink-0" />
                  <span>{tip}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-auto pt-4 border-t border-gold/10">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{groupSize}</span>
                </div>
                <div className="text-gold font-serif text-lg">{price}</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const flipCardData: FlipCardProps[] = [
  {
    frontImage: "/images/paris.png",
    frontTitle: "Parisian Romance",
    frontSubtitle: "France",
    backTitle: "Secret Paris Tips",
    backTips: [
      "Book the hidden speakeasy at Le Marais — password changes weekly",
      "Private after-hours Louvre tour available through our concierge",
      "Chef's table at a 3-star restaurant with no public reservations",
      "Exclusive rooftop champagne at sunset, no crowds",
    ],
    price: "$4,500",
    rating: 4.9,
    duration: "5 nights",
    groupSize: "2-4 guests",
  },
  {
    frontImage: "/images/santorini.png",
    frontTitle: "Santorini Bliss",
    frontSubtitle: "Greece",
    backTitle: "Local Secrets",
    backTips: [
      "Private yacht to hidden beaches only locals know",
      "Wine tasting in a 400-year-old cave cellar",
      "Sunrise yoga on a cliffside villa terrace",
      "Traditional cooking with a Greek grandmother",
    ],
    price: "$5,200",
    rating: 4.8,
    duration: "6 nights",
    groupSize: "2-6 guests",
  },
  {
    frontImage: "/images/destination-kyoto-spring.png",
    frontTitle: "Kyoto Immersion",
    frontSubtitle: "Japan",
    backTitle: "Hidden Kyoto",
    backTips: [
      "Access to members-only whisky bar in Gion",
      "Private tea ceremony with a living national treasure",
      "Midnight ramen tour with off-menu items",
      "Dawn meditation at a temple closed to visitors",
    ],
    price: "$6,800",
    rating: 5.0,
    duration: "7 nights",
    groupSize: "1-4 guests",
  },
  {
    frontImage: "/images/maldives.png",
    frontTitle: "Maldives Escape",
    frontSubtitle: "Indian Ocean",
    backTitle: "Paradise Perks",
    backTips: [
      "Private sandbank dinner under the stars",
      "Bioluminescent night snorkeling experience",
      "Personal marine biologist for reef exploration",
      "Underwater spa treatment in glass pavilion",
    ],
    price: "$8,500",
    rating: 4.9,
    duration: "5 nights",
    groupSize: "2 guests",
  },
];

export function FlipCardGrid() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">
            Exclusive Packages
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Curated Experiences
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Hover over each card to reveal insider tips and exclusive perks only
            available to Voyage members
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flipCardData.map((card, index) => (
            <motion.div
              key={card.frontTitle}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <FlipCard {...card} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
