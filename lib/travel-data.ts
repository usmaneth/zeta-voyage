// ==============================================
// LUXURY TRAVEL DATA MODULE
// Typed interfaces + curated mock data for the
// AI travel concierge experience.
// ==============================================

export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  rating: number;
  priceRange: string;
  highlights: string[];
  bestTimeToVisit: string;
  category: "beach" | "city" | "mountain" | "cultural";
}

export interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: "upcoming" | "in-progress" | "completed";
  hotel: string;
  flights: { departure: string; arrival: string; airline: string }[];
  activities: string[];
}

export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

// --------------------------------------------------
//  CURATED DESTINATIONS
// --------------------------------------------------
export const LUXURY_DESTINATIONS: Destination[] = [
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    description:
      "Iconic whitewashed villages perched on volcanic cliffs overlooking the cerulean Aegean Sea. Experience world-class sunsets from Oia, volcanic wine tastings, and private catamaran cruises.",
    image: "/images/santorini.png",
    rating: 4.9,
    priceRange: "$$$$$",
    highlights: [
      "Caldera sunset views",
      "Volcanic wine tours",
      "Private yacht excursions",
      "Cliffside infinity pools",
    ],
    bestTimeToVisit: "April - October",
    category: "beach",
  },
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    description:
      "Ancient capital where thousand-year-old temples coexist with refined ryokan hospitality. Wander bamboo groves, attend private tea ceremonies, and dine on multi-course kaiseki.",
    image: "/images/destination-kyoto-spring.png",
    rating: 4.8,
    priceRange: "$$$$",
    highlights: [
      "Bamboo grove walks",
      "Private tea ceremonies",
      "Kaiseki dining",
      "Temple meditation",
    ],
    bestTimeToVisit: "March - May, October - November",
    category: "cultural",
  },
  {
    id: "maldives",
    name: "Maldives",
    country: "Maldives",
    description:
      "Over-water villas on pristine atolls surrounded by crystal-clear lagoons. Dive vibrant coral reefs, enjoy spa treatments over turquoise water, and dine beneath the stars on a private sandbank.",
    image: "/images/maldives.png",
    rating: 4.9,
    priceRange: "$$$$$",
    highlights: [
      "Over-water villas",
      "Coral reef diving",
      "Underwater dining",
      "Private island picnics",
    ],
    bestTimeToVisit: "November - April",
    category: "beach",
  },
  {
    id: "swiss-alps",
    name: "Swiss Alps",
    country: "Switzerland",
    description:
      "Majestic Alpine peaks, pristine glacial lakes, and world-renowned chalets. Ski powdery slopes, ride panoramic trains, and unwind in thermal spas with mountain views.",
    image: "/images/destination-swiss-alps.png",
    rating: 4.8,
    priceRange: "$$$$$",
    highlights: [
      "Glacier Express train",
      "Helicopter tours",
      "Thermal spa retreats",
      "Michelin-star dining",
    ],
    bestTimeToVisit: "December - March, June - September",
    category: "mountain",
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    description:
      "The City of Light offers timeless elegance—from haute couture ateliers and Michelin-starred bistros to private Louvre tours and champagne-soaked Seine cruises.",
    image: "/images/paris.png",
    rating: 4.7,
    priceRange: "$$$$",
    highlights: [
      "Private museum tours",
      "Haute couture shopping",
      "Seine river cruises",
      "Michelin-star restaurants",
    ],
    bestTimeToVisit: "April - June, September - October",
    category: "city",
  },
  {
    id: "amalfi",
    name: "Amalfi Coast",
    country: "Italy",
    description:
      "Dramatic coastal cliffs draped in lemon groves and pastel-colored villages. Cruise by private boat, sample limoncello straight from the source, and dine al fresco above the Mediterranean.",
    image: "/images/amalfi.png",
    rating: 4.8,
    priceRange: "$$$$",
    highlights: [
      "Coastal boat tours",
      "Cliffside dining",
      "Lemon grove visits",
      "Villa stays",
    ],
    bestTimeToVisit: "May - September",
    category: "beach",
  },
  {
    id: "safari",
    name: "Serengeti Safari",
    country: "Tanzania",
    description:
      "Witness the Great Migration across endless golden plains. Stay in luxury tented camps, enjoy private game drives at dawn, and dine under the African sky.",
    image: "/images/safari.png",
    rating: 4.9,
    priceRange: "$$$$$",
    highlights: [
      "Great Migration viewing",
      "Hot air balloon safaris",
      "Luxury tented camps",
      "Private game drives",
    ],
    bestTimeToVisit: "June - October",
    category: "cultural",
  },
];

// --------------------------------------------------
//  UPCOMING / SAMPLE TRIPS
// --------------------------------------------------
export const MOCK_TRIPS: Trip[] = [
  {
    id: "trip-1",
    destination: "Santorini, Greece",
    startDate: "2025-06-15",
    endDate: "2025-06-22",
    status: "upcoming",
    hotel: "Canaves Oia Epitome",
    flights: [
      {
        departure: "JFK 10:30 PM",
        arrival: "ATH 2:45 PM +1",
        airline: "Emirates First Class",
      },
      {
        departure: "ATH 5:30 PM",
        arrival: "JTR 6:15 PM",
        airline: "Aegean Airlines",
      },
    ],
    activities: [
      "Private sunset catamaran cruise",
      "Wine tasting at Santo Wines",
      "Helicopter tour over caldera",
      "Couples spa at Vedema Resort",
    ],
  },
  {
    id: "trip-2",
    destination: "Kyoto, Japan",
    startDate: "2025-09-01",
    endDate: "2025-09-10",
    status: "upcoming",
    hotel: "Aman Kyoto",
    flights: [
      {
        departure: "LAX 1:15 PM",
        arrival: "KIX 5:30 PM +1",
        airline: "Japan Airlines First Class",
      },
    ],
    activities: [
      "Private tea ceremony with tea master",
      "Guided bamboo grove meditation",
      "Nishiki Market food tour",
      "Traditional kaiseki dinner at Kikunoi",
    ],
  },
  {
    id: "trip-3",
    destination: "Swiss Alps, Switzerland",
    startDate: "2025-12-20",
    endDate: "2025-12-30",
    status: "upcoming",
    hotel: "The Chedi Andermatt",
    flights: [
      {
        departure: "JFK 7:00 PM",
        arrival: "ZRH 8:45 AM +1",
        airline: "Swiss First Class",
      },
    ],
    activities: [
      "Glacier Express panoramic journey",
      "Private ski instruction in Zermatt",
      "Alpine thermal spa day",
      "Fondue dinner in mountain chalet",
    ],
  },
];

// --------------------------------------------------
//  WEATHER DATA (for destination cards)
// --------------------------------------------------
export const MOCK_WEATHER: Record<string, WeatherData> = {
  santorini: {
    location: "Santorini, Greece",
    temperature: 28,
    condition: "Sunny",
    humidity: 45,
    windSpeed: 12,
    icon: "sun",
  },
  kyoto: {
    location: "Kyoto, Japan",
    temperature: 22,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 8,
    icon: "cloud-sun",
  },
  maldives: {
    location: "Maldives",
    temperature: 30,
    condition: "Tropical",
    humidity: 75,
    windSpeed: 15,
    icon: "sun",
  },
  "swiss-alps": {
    location: "Swiss Alps",
    temperature: -2,
    condition: "Snow",
    humidity: 80,
    windSpeed: 20,
    icon: "snowflake",
  },
  paris: {
    location: "Paris, France",
    temperature: 18,
    condition: "Clear",
    humidity: 55,
    windSpeed: 10,
    icon: "sun",
  },
  amalfi: {
    location: "Amalfi Coast, Italy",
    temperature: 26,
    condition: "Sunny",
    humidity: 50,
    windSpeed: 11,
    icon: "sun",
  },
  safari: {
    location: "Serengeti, Tanzania",
    temperature: 27,
    condition: "Clear",
    humidity: 40,
    windSpeed: 14,
    icon: "sun",
  },
};

// --------------------------------------------------
//  HERO IMAGES (for landing page carousel)
// --------------------------------------------------
export const HERO_IMAGES = [
  {
    src: "/images/hero-santorini-aerial.png",
    alt: "Aerial view of Santorini",
    label: "Santorini, Greece",
  },
  {
    src: "/images/hero-maldives-sunset.png",
    alt: "Maldives sunset over water villas",
    label: "Maldives",
  },
  {
    src: "/images/hero-private-jet.png",
    alt: "Private jet interior",
    label: "Travel in Style",
  },
];
