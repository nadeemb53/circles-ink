import { motion } from 'framer-motion';
import Image from 'next/image';

const circles = [
  {
    name: "Limbo",
    description: "The First Trading Challenge",
    theme: "The Dark Forest",
    challenge: "Basic trading patterns",
    reward: "20% pot eligibility"
  },
  {
    name: "Lust",
    description: "Quick Trading Decisions",
    theme: "Whirlwind of Souls",
    challenge: "Rapid market movements",
    reward: "Free entry to Circle 3"
  },
  {
    name: "Gluttony",
    description: "Volume Trading Challenge",
    theme: "Eternal Rain",
    challenge: "High volume trading",
    reward: "Exclusive NFT drop"
  },
  {
    name: "Greed",
    description: "Profit Maximization",
    theme: "Golden Wasteland",
    challenge: "Maximum profit targets",
    reward: "Share in Circle 4 pot"
  },
  {
    name: "Anger",
    description: "Volatile Market Trading",
    theme: "River Styx",
    challenge: "Volatile market conditions",
    reward: "Special badge + benefits"
  },
  {
    name: "Heresy",
    description: "Contrarian Trading",
    theme: "City of Dis",
    challenge: "Counter-trend trading",
    reward: "$DANTE token allocation"
  },
  {
    name: "Violence",
    description: "High-Risk Trading",
    theme: "River of Blood",
    challenge: "High-risk position management",
    reward: "Increased pot share"
  },
  {
    name: "Fraud",
    description: "Complex Trading Patterns",
    theme: "Malebolge",
    challenge: "Advanced trading strategies",
    reward: "Circle 9 direct entry"
  },
  {
    name: "Treachery",
    description: "Final Trading Challenge",
    theme: "Frozen Lake",
    challenge: "Ultimate trading test",
    reward: "60% of final pot"
  }
];

const CirclesRoadmap = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Dark Forest Background */}
      <div className="absolute inset-0 bg-[url('/images/dark-forest.jpg')] bg-cover bg-center opacity-20" />
      
      {/* Fog Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />
      
      <div className="relative z-10 container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-medieval text-center mb-16 text-red-500 animate-glow">
          Journey Through The Nine Circles
        </h2>
        
        <div className="relative">
          {/* Central Spiral Path */}
          <div className="absolute left-1/2 h-full w-1 bg-gradient-to-b from-red-900 via-red-600 to-red-900 
                        transform -translate-x-1/2 rounded-full shadow-lg shadow-red-500/50" />
          
          {circles.map((circle, index) => (
            <motion.div
              key={circle.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex items-center mb-16 ${index % 2 === 0 ? 'justify-end' : ''}`}
            >
              <div className={`relative grid md:grid-cols-2 gap-4 bg-black/40 backdrop-blur-sm 
                            rounded-lg p-6 border border-red-900/30 shadow-xl max-w-2xl
                            ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                {/* Circle Number */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2
                              w-12 h-12 rounded-full bg-gradient-to-br from-red-700 to-red-900
                              flex items-center justify-center text-2xl font-medieval border-2 
                              border-red-500/30 shadow-lg shadow-red-900/50">
                  {index + 1}
                </div>
                
                {/* Content */}
                <div className={`space-y-2 ${index % 2 === 0 ? 'md:order-2' : ''}`}>
                  <h3 className="text-2xl font-medieval text-red-500">{circle.name}</h3>
                  <p className="text-gray-400">{circle.theme}</p>
                  <div className="text-sm space-y-1">
                    <p className="text-gray-300">Challenge: {circle.challenge}</p>
                    <p className="text-green-500">Reward: {circle.reward}</p>
                  </div>
                </div>
                
                {/* Themed Icon/Image */}
                <div className={`relative h-32 rounded-lg overflow-hidden 
                              ${index % 2 === 0 ? 'md:order-1' : ''}`}>
                  <Image
                    src={`/images/circles/circle-${index + 1}.jpg`}
                    alt={circle.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-500/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default CirclesRoadmap; 