import { useEffect, useRef } from 'react';
import Link from 'next/link';

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
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden px-4 py-16 md:py-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 text-center w-full max-w-4xl mx-auto">
        <div className="mb-6 md:mb-8 animate-pulse">
          <span className="text-red-500 font-medieval text-lg md:text-xl">Powered by</span>
          <Link 
            href="https://github.com/nadeemb53/circles-ink/blob/main/virality-framework-doc/README.md" 
            target="_blank"
            className="ml-2 text-lg md:text-xl font-medieval text-red-400 hover:text-red-300 transition-colors"
          >
            The Virality Framework
          </Link>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-8xl font-medieval mb-4 md:mb-6 text-red-500 animate-glow px-4">
          Dante's Circles
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 mx-auto text-gray-300 leading-relaxed 
                     max-w-[90%] sm:max-w-2xl md:max-w-3xl">
          Journey through nine circles guided by our AI agent, exploring Dante's Inferno 
          while facing increasingly challenging trading trials. Each circle unlocks new 
          chapters of the story and tests your trading prowess.
        </p>
        
        <div className="flex flex-col items-center space-y-4 px-4">
          <Link 
            href="https://app.circles.ink"
            target="_blank"
            className="w-full sm:w-auto"
          >
            <button className="w-full sm:w-auto bg-gradient-to-r from-red-700 to-red-900 text-white 
                             px-8 py-4 rounded-lg transform transition-all duration-300 
                             hover:scale-105 hover:from-red-600 hover:to-red-800
                             font-bold text-lg shadow-lg shadow-red-900/50 animate-float">
              Enter the First Circle ($1)
            </button>
          </Link>
          
          <div className="text-sm md:text-base text-gray-400">
            Entry fee increases 5x in subsequent circles
          </div>
        </div>
      </div>

      {/* Flame effects at the bottom */}
      <div className="absolute bottom-0 w-full h-16 md:h-24 overflow-hidden">
        <div className="relative w-full h-full">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0 w-6 md:w-8 h-12 md:h-16 
                       bg-gradient-to-t from-red-600 to-transparent
                       animate-flame opacity-75"
              style={{
                left: `${(i * 16.67) + Math.random() * 5}%`,
                animationDelay: `${Math.random() * 2}s`,
                transform: 'scaleX(2)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 