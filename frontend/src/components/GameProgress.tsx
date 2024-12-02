import { motion } from 'framer-motion';

const GameProgress = () => {
  const currentCircle = 1; // This would come from your game state
  const daysRemaining = 14; // This would be calculated based on circle start time

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-medieval text-red-500 mb-6">Current Progress</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg text-gray-300 mb-2">Active Circle</h3>
              <div className="text-3xl font-bold text-red-500">
                Circle {currentCircle}
              </div>
              <div className="text-sm text-gray-400 mt-1">
                {daysRemaining} days remaining
              </div>
            </div>
            
            <div>
              <h3 className="text-lg text-gray-300 mb-2">Entry Fee</h3>
              <div className="text-3xl font-bold text-red-500">
                {(0.001 * Math.pow(5, currentCircle - 1)).toFixed(3)} ETH
              </div>
              <div className="text-sm text-gray-400 mt-1">
                Next: {(0.001 * Math.pow(5, currentCircle)).toFixed(3)} ETH
              </div>
            </div>
            
            <div>
              <h3 className="text-lg text-gray-300 mb-2">NFT Boost</h3>
              <div className="text-sm space-y-1">
                <div className="flex items-center text-gray-400">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                  Virgil's Guidance Active
                </div>
                <div className="flex items-center text-gray-400">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                  2 Extra Attempts with Lyra
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-red-900/30">
            <div className="text-sm text-gray-400">
              💡 Tip: Having special NFTs in your wallet may grant you favor with Lyra
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GameProgress; 