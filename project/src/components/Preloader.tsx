import React, { useEffect, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface PreloaderProps {
  onComplete?: () => void;
  loadingText?: string;
  animationUrl?: string;
}

const Preloader: React.FC<PreloaderProps> = ({
  onComplete,
  loadingText = "Loading your laundry solution...",
  animationUrl = "https://lottie.host/cbde48a6-05df-4e8f-809e-db5a14488f9f/r2puV7voou.lottie"
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progInterval = setInterval(() => {
      setProgress(prev => prev >= 100 ? (clearInterval(progInterval), 100) : prev + 2);
    }, 50);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 3000);

    return () => {
      clearInterval(progInterval);
      clearTimeout(hideTimer);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center transition-opacity duration-500">
      <div className="w-[300px] h-[300px]">
        <DotLottieReact src={animationUrl} autoplay loop />
      </div>
      <div className="text-center mt-4">
        <h2 className="text-xl font-semibold text-gray-800">LaundryPro</h2>
        <p className="text-gray-600 mt-2">{loadingText}</p>
        <div className="w-48 h-1 bg-gray-200 rounded-full mt-4 overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
