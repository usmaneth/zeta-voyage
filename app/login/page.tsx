"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";
import { RotatingLines } from "react-loader-spinner";

export default function LoginPage() {
  const { ready, authenticated, login } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && authenticated) {
      router.replace("/landing");
    }
  }, [ready, authenticated, router]);

  if (!ready) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <RotatingLines
          visible={true}
          width="32"
          strokeColor="hsl(43 90% 50%)"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="loading"
        />
      </div>
    );
  }

  if (authenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-muted-foreground">Redirecting...</div>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-santorini-aerial.png"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <h1 className="font-serif text-5xl font-bold text-white tracking-wide">
            Voyage<span className="text-gold">.</span>
          </h1>
          <p className="text-white/60 text-sm tracking-[0.2em] uppercase">
            Luxury Travel Concierge
          </p>
        </div>
        <Button
          onClick={() => login()}
          size="lg"
          className="bg-gold text-navy px-10 py-6 text-lg font-medium rounded-full hover:bg-gold-light transition-colors"
        >
          Begin Your Journey
        </Button>
        <p className="text-white/40 text-sm text-center max-w-sm">
          Sign in to access your personal AI travel concierge and discover extraordinary destinations.
        </p>
      </div>
    </div>
  );
}
