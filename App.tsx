import React, {useEffect, useState} from 'react';
import Navigation from './src/navigation/routes';
import SplashScreen from './src/screens/splash-screen';
import CurtainAnimation from './src/screens/curtain-animation';

const App: React.FC = () => {
  const [screen, setScreen] = useState<'curtain' | 'splash' | 'navigation'>(
    'curtain',
  );

  useEffect(() => {
    // Start CurtainAnimation
    const timer1 = setTimeout(() => {
      setScreen('splash');
    }, 1000); // CurtainAnimation duration

    // Transition to SplashScreen after 2 seconds
    const timer2 = setTimeout(() => {
      setScreen('navigation');
    }, 2000); // Total duration before showing Navigation

    // Clean up timers if the component unmounts before the timers complete
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  switch (screen) {
    case 'curtain':
      return <CurtainAnimation />;
    case 'splash':
      return <SplashScreen />;
    case 'navigation':
      return <Navigation />;
    default:
      return null;
  }
};

export default App;
