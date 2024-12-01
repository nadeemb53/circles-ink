import { motion } from 'framer-motion';

const ChallengePreview = () => {
  return (
    <section className="py-16">
      <h2 className="text-4xl font-medieval text-center mb-12">Current Challenge</h2>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gray-800 rounded-lg p-8 shadow-lg max-w-4xl mx-auto"
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-medieval text-red-500 mb-4">Trading Challenge</h3>
            <p className="text-gray-300 mb-4">
              Trade with precision and strategy to overcome the challenges of the current circle.
              Each success brings you closer to the next level.
            </p>
            <ul className="space-y-2 text-gray-400">
              <li>• Minimum Trade Volume: 100 USDT</li>
              <li>• Time Limit: 60 minutes</li>
              <li>• Required Success Rate: 65%</li>
            </ul>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/10 rounded-lg animate-pulse" />
            <div className="relative p-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-red-500 mb-2">$1,000</div>
                <div className="text-gray-400">Current Prize Pool</div>
              </div>
              <div className="mt-8">
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg
                                 transform transition hover:scale-105 font-bold">
                  Accept Challenge
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ChallengePreview; 