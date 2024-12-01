import { useEffect, useState } from 'react';
import Head from 'next/head';
import HeroSection from '@/components/HeroSection';
import CircleStatus from '@/components/CircleStatus';
import PrizePool from '@/components/PrizePool';
import GameProgress from '@/components/GameProgress';
import NFTShowcase from '@/components/NFTShowcase';
import ChallengePreview from '@/components/ChallengePreview';
import CirclesRoadmap from '@/components/CirclesRoadmap';

export default function Home() {
  const [prizePool, setPrizePool] = useState(156842);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-100">
      <Head>
        <title>Dante's Circles | Web3 Trading Game</title>
        <meta name="description" content="Journey through nine circles of trading challenges in this Web3 game inspired by Dante's Inferno" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <main className="relative">
        <div className="fixed inset-0 bg-[url('/images/noise.png')] opacity-5 pointer-events-none mix-blend-overlay" />
        
        <HeroSection />
        
        <CirclesRoadmap />
        
        <div className="container mx-auto px-4">
          <div className="space-y-24 py-16">
            <div className="grid md:grid-cols-2 gap-8">
              <PrizePool value={prizePool} />
              <CircleStatus />
            </div>
            
            {/* <GameProgress /> */}
            <NFTShowcase />
            <ChallengePreview />
          </div>
        </div>
      </main>
    </div>
  );
} 