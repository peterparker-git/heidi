import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import Password from './components/Password';
import Loading from './components/Loading';
import Intro from './components/Intro';
import Countdown from './components/Countdown';
import WishCards from './components/WishCards';
import CakeBuilder from './components/CakeBuilder';
import LightCandles from './components/LightCandles';
import ThreeWishes from './components/ThreeWishes';
import CandleBlow from './components/CandleBlow';
import FinalWishMoment from './components/FinalWishMoment';
import EndingScreen from './components/EndingScreen';
import PrayerVideo from './components/PrayerVideo';
import Credits from './components/Credits';

import CityBackground from './components/CityBackground';
import MusicPlayer from './components/MusicPlayer';
import CursorSparkle from './components/CursorSparkle';

export default function App() {
  const [currentStep, setCurrentStep] = useState('PASSWORD');
  const [cakeData, setCakeData] = useState({
    layers: ['Chocolate', 'Vanilla', 'Strawberry'],
    frosting: 'Pink',
    decorations: []
  });

  const navigateTo = (step) => {
    setCurrentStep(step);
    window.scrollTo(0, 0);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'PASSWORD':
        return <Password key="pw" onUnlock={() => navigateTo('LOADING')} />;
      case 'LOADING':
        return <Loading key="load" onNext={() => navigateTo('INTRO')} />;
      case 'INTRO':
        return <Intro key="intro" onNext={() => navigateTo('COUNTDOWN')} />;
      case 'COUNTDOWN':
        return <Countdown key="count" onNext={() => navigateTo('WISH_CARDS')} />;
      case 'WISH_CARDS':
        return <WishCards key="cards" onNext={() => navigateTo('CAKE_BUILDER')} />;
      case 'CAKE_BUILDER':
        return <CakeBuilder key="cake" onNext={() => navigateTo('LIGHT_CANDLES')} setCakeData={setCakeData} />;
      case 'LIGHT_CANDLES':
        return <LightCandles key="light" onNext={() => navigateTo('THREE_WISHES')} cakeData={cakeData} />;
      case 'THREE_WISHES':
        return <ThreeWishes key="three" onNext={() => navigateTo('BLOW_CANDLES')} />;
      case 'BLOW_CANDLES':
        return <CandleBlow key="blow" onNext={() => navigateTo('FINAL_WISH_MOMENT')} cakeData={cakeData} />;
      case 'FINAL_WISH_MOMENT':
        return <FinalWishMoment key="final_wish" onNext={() => navigateTo('ENDING_SCREEN')} />;
      case 'ENDING_SCREEN':
        return <EndingScreen key="end" onNext={() => navigateTo('PRAYER_VIDEO')} />;
      case 'PRAYER_VIDEO':
        return <PrayerVideo key="prayer" onCredits={() => navigateTo('CREDITS')} />;
      case 'CREDITS':
        return <Credits key="credits" />;
      default:
        return <Password key="pw" onUnlock={() => navigateTo('LOADING')} />;
    }
  };

  // Check if we should render global elements
  // We don't render music player on the password screen, only after unlock
  const showGlobals = currentStep !== 'PASSWORD';
  
  // The city darkens during final wish moment and ending screen
  const isDarkened = currentStep === 'FINAL_WISH_MOMENT' || currentStep === 'ENDING_SCREEN';

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center font-sans overflow-x-hidden">
      
      {showGlobals && <CityBackground isDarkened={isDarkened} />}
      {showGlobals && <MusicPlayer />}
      {showGlobals && <CursorSparkle />}

      <div className="w-full max-w-md mx-auto min-h-screen flex flex-col relative z-10">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>

    </div>
  );
}
