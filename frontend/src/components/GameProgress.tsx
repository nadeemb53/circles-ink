import { motion } from 'framer-motion';

const circles = [
  { name: "Limbo", description: "The First Trading Challenge" },
  { name: "Lust", description: "Quick Trading Decisions" },
  { name: "Gluttony", description: "Volume Trading Challenge" },
  { name: "Greed", description: "Profit Maximization" },
  { name: "Anger", description: "Volatile Market Trading" },
  { name: "Heresy", description: "Contrarian Trading" },
  { name: "Violence", description: "High-Risk Trading" },
  { name: "Fraud", description: "Complex Trading Patterns" },
  { name: "Treachery", description: "Final Trading Challenge" }
];

const GameProgress = () => {
  return (
    <section className="py-16">
      <h2 className="text-4xl font-medieval text-center mb-12">The Nine Circles</h2>
      <div className="relative">
        <div className="absolute left-1/2 h-full w-1 bg-red-800 transform -translate-x-1/2" />
        
        {circles.map((circle, index) => (
          <motion.div
            key={circle.name}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`flex items-center mb-8 ${
              index % 2 === 0 ? 'justify-end' : 'justify-start'
            }`}
          >
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg max-w-md relative">
              <div className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full
                            shadow-lg shadow-red-500/50"
                   style={{ [index % 2 === 0 ? 'right' : 'left']: '-2rem' }} />
              <h3 className="text-2xl font-medieval text-red-500 mb-2">
                Circle {index + 1}: {circle.name}
              </h3>
              <p className="text-gray-300">{circle.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default GameProgress; 