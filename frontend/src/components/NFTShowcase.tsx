import { motion } from 'framer-motion';

const nfts = [
  {
    id: 1,
    name: "Dante's Sword",
    image: "/images/nfts/sword.png",
    rarity: "Legendary",
    bonus: "+10% Trading Volume"
  },
  {
    id: 2,
    name: "Virgil's Guide",
    image: "/images/nfts/guide.png",
    rarity: "Epic",
    bonus: "+5% Success Rate"
  },
  {
    id: 3,
    name: "Infernal Map",
    image: "/images/nfts/map.png",
    rarity: "Rare",
    bonus: "Circle Skip Chance"
  }
];

const NFTShowcase = () => {
  return (
    <section className="py-16">
      <h2 className="text-4xl font-medieval text-center mb-12">Legendary NFTs</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {nfts.map((nft, index) => (
          <motion.div
            key={nft.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
          >
            <div className="relative aspect-square">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" />
              <img
                src={nft.image}
                alt={nft.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-medieval text-red-500 mb-2">{nft.name}</h3>
              <p className="text-sm text-gray-400 mb-2">Rarity: {nft.rarity}</p>
              <p className="text-green-500">{nft.bonus}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default NFTShowcase; 