
import React, { useEffect, useRef, useState } from 'react';

const TerminalStack: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setRotation(scrollY * 0.1);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const terminals = Array.from({ length: 8 });

  return (
    <div className="relative h-[600px] w-full flex items-center justify-center perspective-[2000px] overflow-visible">
      <div 
        ref={containerRef}
        className="relative w-full h-full preserve-3d transition-transform duration-700 ease-out"
        style={{ transform: `rotateY(${rotation}deg) rotateX(10deg)` }}
      >
        {terminals.map((_, i) => (
          <div 
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass w-[85vw] md:w-[600px] h-[300px] rounded-lg border border-white/40 shadow-2xl flex flex-col p-4 overflow-hidden"
            style={{
              transform: `translate(-50%, -50%) rotateY(${i * 45}deg) translateZ(400px)`,
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-gray-600" />
              <div className="w-3 h-3 rounded-full bg-gray-400" />
              <div className="w-3 h-3 rounded-full bg-gray-200" />
              <span className="text-[10px] text-gray-500 ml-2">TERMINAL_INSTANCE_0x{i.toString(16)}</span>
            </div>
            
            <div className="flex-1 font-mono text-xs text-gray-700 space-y-2 opacity-80">
              <p>> INIT KAZA_LABS_CORE...</p>
              <p>> LOADING ASSETS... DONE</p>
              <p>> ESTABLISHING SECURE PROTOCOL...</p>
              <p className="text-gray-900">> ENCRYPTING BRAND_DNA...</p>
              <div className="h-4 w-full bg-gray-200/50 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-gray-200/50 rounded animate-pulse" />
            </div>

            <div className="mt-auto h-8 flex items-center overflow-hidden mask-fade-edges relative">
              <div className="whitespace-nowrap animate-marquee flex gap-12 text-[10px] uppercase font-bold tracking-widest text-brand-accent">
                <span>SYSTEM UPGRADE IN PROGRESS</span>
                <span>DECRYPTING DATA STREAMS</span>
                <span>KAZA X LABS | NEXT-GEN DIGITAL LAB</span>
                <span>SYSTEM UPGRADE IN PROGRESS</span>
                <span>DECRYPTING DATA STREAMS</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <style>{`
        .preserve-3d { transform-style: preserve-3d; }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default TerminalStack;
