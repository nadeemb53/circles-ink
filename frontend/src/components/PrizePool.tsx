import { motion } from 'framer-motion';

interface PrizePoolProps {
  value: number;
}

const PrizePool = ({ value }: PrizePoolProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-red-900/30"
    >
      <h3 className="text-xl font-medieval text-red-500 mb-4">Prize Distribution</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Current Circle Pot</span>
          <span className="text-xl font-bold text-red-500">{value} ETH</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Circle Clearance (20%)</span>
            <span className="text-green-500">{(value * 0.2).toFixed(2)} ETH</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Final Circle (60%)</span>
            <span className="text-green-500">{(value * 0.6).toFixed(2)} ETH</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Development (20%)</span>
            <span className="text-green-500">{(value * 0.2).toFixed(2)} ETH</span>
          </div>
        </div>

        <div className="pt-4 border-t border-red-900/30">
          <div className="text-sm text-gray-400">
            Winners announced in Twitter Spaces
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PrizePool; 