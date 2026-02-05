"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Compass, Star, Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpotlightSection } from "@/app/components/luxury/spotlight-section";
import { FlipCardGrid } from "@/app/components/luxury/flip-card";
import { TiltCard } from "@/app/components/luxury/tilt-card";
import {
  DestinationModal,
  type DestinationDetails,
} from "@/app/components/luxury/destination-modal";

// ------- Morphing text for hero -------
function MorphingText({
  prefix,
  texts,
  interval = 3500,
}: {
  prefix: string;
  texts: string[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % texts.length);
    }, interval);
    return () => clearInterval(timer);
  }, [texts.length, interval]);

  return (
    <>
      {prefix}{" "}
      <motion.span
        key={texts[index]}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
        className="italic text-gold inline-block"
      >
        {texts[index]}
      </motion.span>
    </>
  );
}

const destinations: DestinationDetails[] = [
  {
    id: "kyoto",
    name: "Kyoto",
    season: "Spring Equinox",
    image: "/images/destination-kyoto-spring.png",
    description: "Cherry blossoms and ancient temples",
    tagline: "Where tradition meets transcendence",
    price: "$5,800",
    duration: "7 nights",
    rating: 4.9,
    highlights: [
      "Private tea ceremony with a master",
      "Exclusive after-hours temple access",
      "Kaiseki dining with Michelin chefs",
      "Geisha district walking tour",
      "Zen meditation retreat",
      "Artisan sake tasting experience",
    ],
    itinerary: [
      { day: "Day 1-2", title: "Arrival & Ancient Temples", description: "Private transfer to ryokan, evening temple illumination tour" },
      { day: "Day 3-4", title: "Cultural Immersion", description: "Tea ceremony, calligraphy workshop, bamboo grove meditation" },
      { day: "Day 5-6", title: "Culinary Journey", description: "Nishiki Market tour, cooking class, Michelin dinner experience" },
      { day: "Day 7", title: "Departure", description: "Final shrine visit, private airport transfer with bento box" },
    ],
    bestFor: ["Cultural Enthusiasts", "Couples", "Solo Travelers", "Food Lovers"],
  },
  {
    id: "swiss",
    name: "Swiss Alps",
    season: "Winter Solstice",
    image: "/images/destination-swiss-alps.png",
    description: "Mountain lodges and pristine peaks",
    tagline: "Elevated luxury above the clouds",
    price: "$8,200",
    duration: "6 nights",
    rating: 4.8,
    highlights: [
      "Private helicopter glacier landing",
      "Ski-in/ski-out chalet experience",
      "Fondue dinner in ice grotto",
      "Alpine spa with mountain views",
      "Exclusive après-ski lounges",
      "Scenic train journey on Glacier Express",
    ],
    itinerary: [
      { day: "Day 1-2", title: "Mountain Welcome", description: "Helicopter transfer to chalet, welcome champagne, spa introduction" },
      { day: "Day 3-4", title: "Alpine Adventures", description: "Private ski instructor, glacier exploration, twilight snowshoe trek" },
      { day: "Day 5", title: "Scenic Wonder", description: "Glacier Express journey, gourmet lunch aboard, village exploration" },
      { day: "Day 6", title: "Farewell", description: "Sunrise breakfast, final spa session, scenic departure transfer" },
    ],
    bestFor: ["Adventure Seekers", "Ski Enthusiasts", "Romantic Getaways", "Wellness Travelers"],
  },
  {
    id: "santorini",
    name: "Santorini",
    season: "Summer Zenith",
    image: "/images/santorini.png",
    description: "Blue domes and Aegean sunsets",
    tagline: "Romance written in white and blue",
    price: "$6,400",
    duration: "5 nights",
    rating: 4.9,
    highlights: [
      "Private sunset catamaran cruise",
      "Cliffside villa with infinity pool",
      "Wine tasting at volcanic vineyards",
      "Private cooking class in Oia",
      "Exclusive beach club access",
      "Hot springs and volcano tour",
    ],
    itinerary: [
      { day: "Day 1", title: "Aegean Arrival", description: "Private yacht transfer, villa check-in, welcome dinner at sunset" },
      { day: "Day 2-3", title: "Island Discovery", description: "Volcanic wine tour, hot springs visit, Oia sunset photography" },
      { day: "Day 4", title: "Culinary & Cruise", description: "Morning cooking class, afternoon catamaran cruise with BBQ" },
      { day: "Day 5", title: "Leisurely Departure", description: "Spa morning, cliffside brunch, scenic transfer" },
    ],
    bestFor: ["Honeymooners", "Wine Lovers", "Photography Enthusiasts", "Beach Seekers"],
  },
  {
    id: "maldives",
    name: "Maldives",
    season: "Eternal Summer",
    image: "/images/maldives.png",
    description: "Overwater villas and crystal waters",
    tagline: "Paradise perfected, luxury redefined",
    price: "$12,500",
    duration: "8 nights",
    rating: 5.0,
    highlights: [
      "Overwater villa with glass floor",
      "Private island picnic experience",
      "Underwater restaurant dining",
      "Sunset dolphin cruise",
      "Personalized spa rituals",
      "Night snorkeling with manta rays",
    ],
    itinerary: [
      { day: "Day 1-2", title: "Island Paradise", description: "Seaplane arrival, villa orientation, sunset cruise welcome" },
      { day: "Day 3-4", title: "Ocean Adventures", description: "Snorkeling safari, diving excursion, underwater restaurant dinner" },
      { day: "Day 5-6", title: "Ultimate Relaxation", description: "Private island day, couples spa journey, stargazing dinner" },
      { day: "Day 7-8", title: "Blissful Farewell", description: "Sunrise yoga, dolphin watching, leisurely departure" },
    ],
    bestFor: ["Luxury Seekers", "Honeymooners", "Marine Life Enthusiasts", "Wellness Retreat"],
  },
];

const features = [
  {
    icon: Compass,
    title: "Curated Journeys",
    description: "Hand-selected experiences crafted by travel connoisseurs",
  },
  {
    icon: Star,
    title: "Exclusive Access",
    description: "Private viewings, reserved tables, and hidden gems",
  },
  {
    icon: Globe,
    title: "Global Concierge",
    description: "24/7 assistance wherever your journey takes you",
  },
  {
    icon: Sparkles,
    title: "AI-Powered",
    description: "Intelligent recommendations tailored to your preferences",
  },
];

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [selectedDestination, setSelectedDestination] =
    useState<DestinationDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExploreClick = (dest: DestinationDetails) => {
    setSelectedDestination(dest);
    setIsModalOpen(true);
  };

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 px-8 py-6"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-serif text-2xl font-bold text-white tracking-wide hover:opacity-80 transition-opacity cursor-pointer"
          >
            Voyage<span className="text-gold">.</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#destinations"
              className="text-white/80 hover:text-white transition-colors text-sm tracking-wider uppercase"
            >
              Destinations
            </a>
            <a
              href="#experience"
              className="text-white/80 hover:text-white transition-colors text-sm tracking-wider uppercase"
            >
              Experience
            </a>
            <Link href="/">
              <Button
                variant="outline"
                className="border-gold/50 text-gold backdrop-blur-sm hover:bg-gold/10"
              >
                Start Your Journey
              </Button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img
            src="/images/hero-maldives-sunset.png"
            alt="Luxury travel destination"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />
        </motion.div>

        <motion.div
          style={{ y: textY, opacity: heroOpacity }}
          className="relative h-full flex flex-col items-center justify-center text-center px-4"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gold text-sm tracking-[0.3em] uppercase mb-6"
          >
            Luxury Travel Concierge
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-light leading-tight max-w-4xl"
          >
            <MorphingText
              prefix="Explore"
              texts={["Kyoto", "Santorini", "Maldives", "Paris", "Swiss Alps"]}
              interval={3500}
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-white/70 text-lg md:text-xl max-w-xl mt-8 font-light"
          >
            Your journey begins with a single word. Let our AI concierge craft
            extraordinary experiences tailored to your desires.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-12"
          >
            <Link href="/">
              <Button
                size="lg"
                className="bg-gold text-navy px-8 py-6 text-lg group pulse-glow magnetic-hover hover:bg-gold-light"
              >
                Begin Your Journey
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-2 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Editorial Quote */}
      <section className="py-32 px-4 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <motion.blockquote
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="font-serif text-3xl md:text-5xl text-foreground/90 font-light italic leading-relaxed"
          >
            &ldquo;Travel is not about the destination, but the
            <span className="text-gold"> transformation</span> along the way.&rdquo;
          </motion.blockquote>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gold/80 mt-8 text-sm tracking-[0.2em] uppercase"
          >
            The Voyage Philosophy
          </motion.p>
        </div>
      </section>

      {/* Seasonal Destinations Grid */}
      <section id="destinations" className="py-20 px-4 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">
              Curated Escapes
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">
              Seasonal Destinations
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {destinations.map((dest, index) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <TiltCard
                  className="group relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer"
                  tiltAmount={8}
                  onClick={() => handleExploreClick(dest)}
                >
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-gold/80 text-xs tracking-[0.2em] uppercase">
                        {dest.season}
                      </p>
                      <span className="text-gold text-sm font-medium">
                        {dest.price}
                      </span>
                    </div>
                    <h3 className="font-serif text-3xl text-white mb-2">
                      {dest.name}
                    </h3>
                    <p className="text-white/60 text-sm">{dest.description}</p>

                    <button className="mt-4 flex items-center gap-2 text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm tracking-wide luxury-underline">
                        Explore
                      </span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Split Screen Feature */}
      <section className="relative min-h-screen flex flex-col md:flex-row">
        <div className="flex-1 relative overflow-hidden">
          <motion.img
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            src="/images/hero-private-jet.png"
            alt="Private jet interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="flex-1 flex items-center justify-center p-12 md:p-20 bg-background">
          <div className="max-w-lg">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gold text-sm tracking-[0.3em] uppercase mb-6"
            >
              The Experience
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl text-foreground leading-tight mb-8"
            >
              Welcome to
              <span className="block italic text-gold">the Exceptional</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg leading-relaxed mb-8"
            >
              From private jet transfers to exclusive resort access, every detail
              is orchestrated to perfection. Our AI concierge learns your preferences
              to deliver increasingly personalized recommendations.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link href="/">
                <Button
                  variant="outline"
                  className="border-gold text-gold group hover:bg-gold/10"
                >
                  Discover More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hidden Luxuries — Spotlight Reveal */}
      <SpotlightSection />

      {/* Flip Card Experiences */}
      <FlipCardGrid />

      {/* Features Grid */}
      <section id="experience" className="py-32 px-4 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">
              Why Voyage
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">
              Unparalleled Service
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-8 rounded-lg bg-card/50 border border-border/30 hover:border-gold/30 transition-colors group"
              >
                <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Width CTA */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-santorini-aerial.png"
            alt="Santorini aerial view"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-6xl text-white font-light mb-8"
          >
            Your journey begins with a
            <span className="block italic text-gold">word</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg mb-12 max-w-xl mx-auto"
          >
            Tell our AI concierge your dream destination, and watch as it crafts
            a bespoke itinerary tailored to your every desire.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/">
              <Button
                size="lg"
                className="bg-gold text-navy px-12 py-6 text-lg hover:bg-gold-light"
              >
                Start Planning
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-background border-t border-border/30">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-serif text-xl font-bold text-foreground">
            Voyage<span className="text-gold">.</span>
          </span>
          <p className="text-muted-foreground text-sm">Powered by Anuma SDK</p>
        </div>
      </footer>

      {/* Destination Explore Modal */}
      <DestinationModal
        destination={selectedDestination}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
