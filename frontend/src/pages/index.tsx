import { useEffect, useState, StrictMode } from 'react';
import Head from 'next/head';
import HeroSection from '@/components/HeroSection';
import CircleStatus from '@/components/CircleStatus';
import PrizePool from '@/components/PrizePool';
import GameProgress from '@/components/GameProgress';
import NFTShowcase from '@/components/NFTShowcase';
import ChallengePreview from '@/components/ChallengePreview';
import CirclesRoadmap from '@/components/CirclesRoadmap';


import { createHmac } from 'crypto';
import { LaunchParams, useLaunchParams } from '@telegram-apps/sdk-react';

 //TODO: Fill env variables. 
 const BOT_TOKEN = ''
 const ClientId = ''
 const ClientSecret = ''

function MyHome() {
  var launchParams: LaunchParams;
  try {
    launchParams = useLaunchParams()
  } catch{
    console.log("Launch params not found")
  }
  const [prizePool, setPrizePool] = useState(156842);

  const [WebApp, setWebApp] = useState<any>(null);
  const [initDataRaw, setInitDataRaw] = useState<any>("");
  const [validUser, setValidUser] = useState<boolean>(true);

  useEffect(() => {
    // Import the SDK only on client side
    const initWebApp = async () => {
      const WebAppModule = await import('@twa-dev/sdk');
      setWebApp(WebAppModule.default);
    };
    
    initWebApp();
  }, []);
  
  useEffect(() => {
    // Initialize the web app
   if(WebApp) {
    
    WebApp.ready();
    // Expand to full screen
    WebApp.expand();
    
    
    // Set the main button properties
    // WebApp.MainButton.setText('CONFIRM');
    // WebApp.MainButton.show();
    
    // // Handle main button click
    // WebApp.MainButton.onClick(() => {
    //   // Send data back to Telegram
    //   WebApp.sendData(JSON.stringify({
    //     action: 'submit',
    //     data: 'Example data'
    //   }));
    // });
    const initWebApp = async () => {
      try {
        const WebAppModule = await import('@twa-dev/sdk');
        setWebApp(WebAppModule.default);
        
        // Import and use SDK hooks only after confirming we're on client side
        const params = launchParams?.initDataRaw;
        
        if(params){
          setValidUser(false);
          const validAuth = await verifyInitData(params)
          setValidUser(validAuth);
        }
        setInitDataRaw(params ?? '');
      } catch (error) {
        console.error('Error initializing:', error);
      }
    };
    
    initWebApp();
   }
  }, [WebApp]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-100">
      <Head>
        <title>Dante's Circles | Sinful web3 game</title>
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

export default function Home() {
  return (
    <StrictMode>
          <MyHome/>
  </StrictMode>
  )
}

export const verifyInitData = async (initDataRaw: string): Promise<boolean> => {
  try {
    const BOT_TOKEN = process.env.BOT_TOKEN;
    if (!BOT_TOKEN) {
      throw new Error('BOT_TOKEN is not defined');
    }

    // Parse initData
    const urlParams = new URLSearchParams(initDataRaw);
    const hash = urlParams.get('hash');
    if (!hash) {
      return false;
    }

    // Prepare data for hash verification
    urlParams.delete('hash');
    urlParams.sort();
    
    const params1: [string, string][] = Array.from(urlParams.entries());
    params1.sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
    
    // Create data check string from sorted params
    var dataCheckString = params1
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    // First hash verification
    const secret = createHmac('sha256', 'WebAppData').update(BOT_TOKEN);
    const calculatedHash = createHmac('sha256', secret.digest())
      .update(dataCheckString)
      .digest('hex');

    if (hash !== calculatedHash) {
      return false;
    }

    // Second hash generation with client credentials
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error('CLIENT_ID or CLIENT_SECRET is not defined');
    }

    urlParams.append('client_id', clientId);
    urlParams.sort();

    const params: [string, string][] = Array.from(urlParams.entries());
    params.sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
    
    // Create data check string from sorted params
    dataCheckString = params
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    const centralSecret = createHmac('sha256', 'WebAppData').update(clientSecret);
    const centralHash = createHmac('sha256', centralSecret.digest())
      .update(dataCheckString)
      .digest('hex');
    
    urlParams.append('hash', centralHash);

    return true;
  } catch (error) {
    console.error('Error verifying initData:', error);
    return false
  }
};
