import { motion } from 'framer-motion';

const nfts = [
  {
    id: 1,
    name: "Dante's Sword",
    image: "/assets/nfts/sword.png",
    rarity: "Legendary",
    bonus: "Increased chance of persuading Lyra"
  },
  {
    id: 2,
    name: "Virgil's Guidance",
    image: "/assets/nfts/virgil.png",
    rarity: "Epic",
    bonus: "Extra attempts with Lyra"
  },
  {
    id: 3,
    name: "Map of Inferno",
    image: "/assets/nfts/map.png",
    rarity: "Rare",
    bonus: "Reveals circle secrets"
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