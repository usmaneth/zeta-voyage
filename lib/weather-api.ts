// Open-Meteo API integration — free, no API key needed
// Provides real-time weather data for destination cards and panels

interface GeocodingResult {
  latitude: number;
  longitude: number;
  name: string;
  country: string;
}

export interface LiveWeather {
  temperature: number;
  condition: string;
  windSpeed: number;
  humidity: number;
  isDay: boolean;
}

export interface DailyForecast {
  date: string;          // ISO date string e.g. "2026-02-05"
  dayName: string;       // e.g. "Mon", "Tue"
  tempMax: number;
  tempMin: number;
  condition: string;
  precipChance: number;  // 0-100
}

// WMO Weather interpretation codes → human-readable conditions
const WMO_CODES: Record<number, string> = {
  0: "Clear",
  1: "Mostly Clear",
  2: "Partly Cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Rime Fog",
  51: "Light Drizzle",
  53: "Drizzle",
  55: "Heavy Drizzle",
  61: "Light Rain",
  63: "Rain",
  65: "Heavy Rain",
  71: "Light Snow",
  73: "Snow",
  75: "Heavy Snow",
  77: "Snow Grains",
  80: "Light Showers",
  81: "Showers",
  82: "Heavy Showers",
  85: "Light Snow Showers",
  86: "Snow Showers",
  95: "Thunderstorm",
  96: "Thunderstorm + Hail",
  99: "Severe Thunderstorm",
};

// Known coordinates for our luxury destinations (avoids geocoding API call)
const DESTINATION_COORDS: Record<string, { lat: number; lon: number }> = {
  santorini: { lat: 36.3932, lon: 25.4615 },
  kyoto: { lat: 35.0116, lon: 135.7681 },
  maldives: { lat: 3.2028, lon: 73.2207 },
  "swiss-alps": { lat: 46.8182, lon: 8.2275 },
  paris: { lat: 48.8566, lon: 2.3522 },
  amalfi: { lat: 40.6340, lon: 14.6027 },
  safari: { lat: -2.3333, lon: 34.8333 },
};

// In-memory cache with 15-minute TTL
const weatherCache = new Map<string, { data: LiveWeather; timestamp: number }>();
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

export async function fetchLiveWeather(destinationId: string): Promise<LiveWeather | null> {
  // Check cache first
  const cached = weatherCache.get(destinationId);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const coords = DESTINATION_COORDS[destinationId];
  if (!coords) return null;

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,is_day&temperature_unit=fahrenheit`;

    const res = await fetch(url);
    if (!res.ok) return null;

    const json = await res.json();
    const current = json.current;

    const weather: LiveWeather = {
      temperature: Math.round(current.temperature_2m),
      condition: WMO_CODES[current.weather_code] || "Unknown",
      windSpeed: Math.round(current.wind_speed_10m),
      humidity: current.relative_humidity_2m,
      isDay: current.is_day === 1,
    };

    // Cache the result
    weatherCache.set(destinationId, { data: weather, timestamp: Date.now() });

    return weather;
  } catch {
    return null;
  }
}

// Fetch weather for multiple destinations at once
export async function fetchMultipleWeather(
  destinationIds: string[]
): Promise<Record<string, LiveWeather>> {
  const results: Record<string, LiveWeather> = {};
  const promises = destinationIds.map(async (id) => {
    const weather = await fetchLiveWeather(id);
    if (weather) results[id] = weather;
  });
  await Promise.all(promises);
  return results;
}

// 7-day forecast cache
const forecastCache = new Map<string, { data: DailyForecast[]; timestamp: number }>();

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export async function fetchDailyForecast(destinationId: string): Promise<DailyForecast[] | null> {
  const cached = forecastCache.get(destinationId);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const coords = DESTINATION_COORDS[destinationId];
  if (!coords) return null;

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max&timezone=auto&temperature_unit=fahrenheit`;

    const res = await fetch(url);
    if (!res.ok) return null;

    const json = await res.json();
    const daily = json.daily;

    const forecast: DailyForecast[] = daily.time.map((date: string, i: number) => {
      const d = new Date(date + "T00:00:00");
      return {
        date,
        dayName: i === 0 ? "Today" : DAY_NAMES[d.getDay()],
        tempMax: Math.round(daily.temperature_2m_max[i]),
        tempMin: Math.round(daily.temperature_2m_min[i]),
        condition: WMO_CODES[daily.weather_code[i]] || "Unknown",
        precipChance: daily.precipitation_probability_max[i] ?? 0,
      };
    });

    forecastCache.set(destinationId, { data: forecast, timestamp: Date.now() });
    return forecast;
  } catch {
    return null;
  }
}
