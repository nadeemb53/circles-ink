import { motion } from 'framer-motion';
import Link from 'next/link';

const ChallengePreview = () => {
  return (
    <section className="py-12 md:py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-medieval text-center mb-8 md:mb-12">AI-Guided Journey</h2>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 md:p-8 shadow-lg 
                   max-w-4xl mx-auto border border-red-900/30"
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl md:text-2xl font-medieval text-red-500 mb-4">
              Interactive Story & Challenge
            </h3>
            <p className="text-sm md:text-base text-gray-300 mb-4">
              Our AI agent guides you through Dante's narrative, engaging you in conversation
              and presenting challenges based on each circle's theme.
            </p>
            <ul className="space-y-3 text-sm md:text-base text-gray-400">
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full mr-2" />
                Story-driven trading challenges
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full mr-2" />
                AI-powered narrative experience
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full mr-2" />
                Progressive difficulty & rewards
              </li>
            </ul>
          </div>
          <div className="relative mt-6 md:mt-0">
            <div className="absolute inset-0 bg-red-500/5 rounded-lg animate-pulse" />
            <div className="relative p-4 md:p-6">
              <div className="text-center mb-4 md:mb-6">
                <div className="text-4xl md:text-5xl font-bold text-red-500 mb-2">
                  <span className="text-xl md:text-2xl">$</span>1
                </div>
                <div className="text-sm md:text-base text-gray-400">Starting Entry Fee</div>
                <div className="text-xs md:text-sm text-gray-500 mt-1">
                  (Increases 5x per circle)
                </div>
              </div>
              <div className="space-y-2 mb-6 md:mb-8 text-xs md:text-sm">
                {[1, 2, 3].map((circle) => (
                  <div key={circle} className="flex justify-between">
                    <span className="text-gray-400">Circle {circle}</span>
                    <span className="text-red-400">${Math.pow(5, circle - 1)}</span>
                  </div>
                ))}
                <div className="flex justify-between font-medium">
                  <span className="text-gray-400">Circle 9</span>
                  <span className="text-red-400">${Math.pow(5, 8)}</span>
                </div>
              </div>
              <Link 
                href="https://app.circles.ink"
                target="_blank"
                className="block w-full"
              >
                <button className="w-full bg-gradient-to-r from-red-700 to-red-900 text-white 
                                 py-3 px-4 md:px-6 rounded-lg transform transition-all duration-300 
                                 hover:scale-105 font-bold text-sm md:text-base
                                 hover:from-red-600 hover:to-red-800 shadow-lg shadow-red-900/50">
                  Begin Your Journey
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ChallengePreview; 