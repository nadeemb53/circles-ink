import { useEffect, useRef } from 'react';

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Spiral animation
    let angle = 0;
    const drawSpiral = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#ff444422';
      ctx.lineWidth = 2;
      
      for (let i = 0; i < 200; i++) {
        const radius = i * 2;
        const x = canvas.width / 2 + Math.cos(angle + i * 0.1) * radius;
        const y = canvas.height / 2 + Math.sin(angle + i * 0.1) * radius;
        
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      angle += 0.005;
    };

    const animate = () => {
      drawSpiral();
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80" />
      
      <div className="relative z-10 text-center px-4">
        <h1 className="text-6xl md:text-8xl font-medieval mb-6 text-red-500 animate-glow">
          Dante's Circles
        </h1>
        <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto text-gray-300 leading-relaxed">
          Journey through nine circles of trading challenges, 
          inspired by Dante's Divine Comedy
        </p>
        
        <button className="bg-gradient-to-r from-red-700 to-red-900 text-white px-8 py-4 rounded-lg 
          transform transition-all duration-300 hover:scale-105 hover:from-red-600 hover:to-red-800
          font-bold text-lg shadow-lg shadow-red-900/50 animate-float">
          Enter the First Circle ($1)
        </button>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <span className="sr-only">Scroll down</span>
        <svg 
          className="w-6 h-6 text-red-500"
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection; 