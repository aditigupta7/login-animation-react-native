import React, {useEffect} from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import COLORS from '../../common/colors';

export default function SplashScreen() {
  const scale = useSharedValue(1); // Start with the original scale
  const rotate = useSharedValue(180); // Rotation shared value
  const opacity = useSharedValue(1); // Opacity shared value

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {scale: scale.value}, // Apply scale transformation
        {rotate: `${rotate.value}deg`}, // Apply rotation transformation
      ],
      opacity: opacity.value, // Apply opacity transformation
    };
  });

  useEffect(() => {
    opacity.value = withTiming(1, {duration: 2000}); // Fade in

    scale.value = withSequence(
      withTiming(1.5, {duration: 800}), // Scale up to 1.5x
      withTiming(1, {duration: 800}), // Scale back down to original size
    );

    rotate.value = withSequence(
      withTiming(360, {duration: 1000}), // Rotate 360 degrees
    );
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={COLORS.primary}
        barStyle="light-content"
      />
      <View style={styles.viewStyles}>
        <Animated.Image
          source={require('../../assets/images/bg-color.png')}
          style={[styles.imageStyle, animatedStyle]}
        />
      </View>
    </View>
  );
}
// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
  },
  viewStyles: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});
