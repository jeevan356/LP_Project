import React, { useEffect, useRef, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

interface PreloaderProps {
  onComplete?: () => void;
  loadingText?: string;
  animationData?: object;
}

const Preloader: React.FC<PreloaderProps> = ({ 
  onComplete, 
  loadingText = "Loading your laundry solution...",
  animationData 
}) => {
  const playerRef = useRef<Player>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animation progress updater
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Auto-hide timer
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center transition-opacity duration-500">
      {/* Lottie Animation Player */}
      <Player
        ref={playerRef}
        autoplay
        loop={false}
        src={animationData || "/laundry-preloader.json"}
        style={{ 
          height: '300px', 
          width: '300px',
          display: 'block' // Ensure proper rendering
        }}
        onEvent={event => {
          if (event === 'complete') {
            setIsVisible(false);
            onComplete?.();
          }
        }}
      />
      
      {/* Text Content */}
      <div className="text-center mt-4">
        <h2 className="text-xl font-semibold text-gray-800">LaundryPro</h2>
        <p className="text-gray-600 mt-2">{loadingText}</p>
        
        {/* Progress Bar */}
        <div className="w-48 h-1 bg-gray-200 rounded-full mt-4 overflow-hidden">
          <div 
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{
              width: `${progress}%`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;