import { useState, useEffect } from 'react';

const CircleStatus = () => {
  const [currentCircle, setCurrentCircle] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 1 hour in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-medieval mb-4">Current Circle</h2>
      <div className="flex items-center space-x-4">
        <div className="text-4xl font-bold text-red-500">
          Circle {currentCircle}
        </div>
        <div className="text-xl">
          Time Remaining: {formatTime(timeRemaining)}
        </div>
      </div>
    </div>
  );
};

export default CircleStatus; 