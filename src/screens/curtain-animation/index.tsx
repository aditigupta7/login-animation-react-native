import React, {useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import COLORS from '../../common/colors';

const {width, height} = Dimensions.get('window');

const CurtainAnimation = () => {
  // Define shared values for the animation
  const topViewTranslateY = useSharedValue(-height);
  const bottomViewTranslateY = useSharedValue(height);

  // Animation styles for the top view
  const topViewStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: topViewTranslateY.value}],
    };
  });

  // Animation styles for the bottom view
  const bottomViewStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: bottomViewTranslateY.value}],
    };
  });

  // Start the animation only once on component mount
  useEffect(() => {
    topViewTranslateY.value = withTiming(0, {duration: 1000});
    bottomViewTranslateY.value = withTiming(0, {duration: 1000});
  }, [topViewTranslateY, bottomViewTranslateY]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.view, styles.topView, topViewStyle]} />
      <Animated.View
        style={[styles.view, styles.bottomView, bottomViewStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  view: {
    position: 'absolute',
    width: width,
    height: height / 2,
    backgroundColor: COLORS.primary,
  },
  topView: {
    top: 0,
  },
  bottomView: {
    bottom: 0,
  },
});

export default CurtainAnimation;
