interface PrizePoolProps {
  value: number;
}

const PrizePool = ({ value }: PrizePoolProps) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-medieval mb-4">Prize Pool</h2>
      <div className="text-4xl font-bold text-green-500">
        ${value.toLocaleString()}
      </div>
    </div>
  );
};

export default PrizePool; 