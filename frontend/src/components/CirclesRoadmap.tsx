import { motion } from 'framer-motion';
import Image from 'next/image';

const circles = [
  {
    name: "Limbo",
    description: "The First Challenge",
    theme: "The Dark Forest",
    challenge: "Convince Lyra to return your entry fee",
    reward: "20% of circle's pot",
    icon: "🌲",
    bgImage: "/assets/circles/limbo-forest.jpg"
  },
  {
    name: "Lust",
    description: "The Second Challenge",
    theme: "Whirlwind of Souls",
    challenge: "Navigate through temptation",
    reward: "20% of circle's pot",
    icon: "🌪️",
    bgImage: "/assets/circles/whirlwind.jpg"
  },
  {
    name: "Gluttony",
    description: "The Third Challenge",
    theme: "Eternal Rain",
    challenge: "Overcome excess",
    reward: "20% of circle's pot",
    icon: "🌧️",
    bgImage: "/assets/circles/eternal-rain.jpg"
  },
  {
    name: "Greed",
    description: "The Fourth Challenge",
    theme: "Golden Wasteland",
    challenge: "Master restraint",
    reward: "20% of circle's pot",
    icon: "💰",
    bgImage: "/assets/circles/golden-wasteland.jpg"
  },
  {
    name: "Anger",
    description: "The Fifth Challenge",
    theme: "River Styx",
    challenge: "Control your emotions",
    reward: "20% of circle's pot",
    icon: "🌊",
    bgImage: "/assets/circles/river-styx.jpg"
  },
  {
    name: "Heresy",
    description: "The Sixth Challenge",
    theme: "City of Dis",
    challenge: "Find your truth",
    reward: "20% of circle's pot",
    icon: "🏛️",
    bgImage: "/assets/circles/city-of-dis.jpg"
  },
  {
    name: "Violence",
    description: "The Seventh Challenge",
    theme: "River of Blood",
    challenge: "Face your demons",
    reward: "20% of circle's pot",
    icon: "🗡️",
    bgImage: "/assets/circles/river-of-blood.jpg"
  },
  {
    name: "Fraud",
    description: "The Eighth Challenge",
    theme: "Malebolge",
    challenge: "Uncover deception",
    reward: "20% of circle's pot",
    icon: "🎭",
    bgImage: "/assets/circles/malebolge.jpg"
  },
  {
    name: "Treachery",
    description: "The Final Challenge",
    theme: "Frozen Lake",
    challenge: "Face the ultimate test",
    reward: "60% of final pot",
    icon: "❄️",
    bgImage: "/assets/circles/frozen-lake.jpg"
  }
];

const CirclesRoadmap = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background Image - Dante's Inferno Map */}
      <div 
        className="absolute inset-0 bg-[url('/assets/backgrounds/inferno-map.jpg')] 
                   bg-cover bg-center opacity-20" 
      />
      
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
                {/* Circle Number & Icon */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2
                              w-12 h-12 rounded-full bg-gradient-to-br from-red-700 to-red-900
                              flex items-center justify-center text-xl font-medieval border-2 
                              border-red-500/30 shadow-lg shadow-red-900/50">
                  <span className="mr-1">{index + 1}</span>
                  <span className="text-lg">{circle.icon}</span>
                </div>
                
                {/* Content */}
                <div className={`space-y-2 ${index % 2 === 0 ? 'md:order-2' : ''}`}>
                  <h3 className="text-2xl font-medieval text-red-500 flex items-center gap-2">
                    {circle.name}
                    <span className="text-2xl">{circle.icon}</span>
                  </h3>
                  <p className="text-gray-400">{circle.theme}</p>
                  <div className="text-sm space-y-1">
                    <p className="text-gray-300">Challenge: {circle.challenge}</p>
                    <p className="text-green-500">Reward: {circle.reward}</p>
                  </div>
                </div>
                
                {/* Entry Fee */}
                <div className={`text-sm ${index % 2 === 0 ? 'md:order-1' : ''}`}>
                  <p className="text-yellow-500">
                    Entry Fee: {(0.001 * Math.pow(5, index)).toFixed(3)} ETH
                  </p>
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