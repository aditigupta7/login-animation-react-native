import React, {useRef} from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {HD, WD} from '../../common/responsive';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import tw from '../../styles/tailwind';
import {customFonts} from '../../common/custom-fonts';

const AnimatedInputField = ({
  value,
  onChangeText,
  title,
  editable,
  forInputTag = true,
  forDropDown,
  maxLength,
  keyboardType = 'default',
  labelStyles,
  inputStyles,
  onPressDropDown,
}) => {
  const floatingLabelAnimation = useRef(
    new Animated.Value(value ? 1 : 0),
  ).current;

  const handleFocus = () => {
    // Animate the label up and reduce its size when input is focus
    Animated.timing(floatingLabelAnimation, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    // If the input is empty, animate the floating label back to its original position
    if (!value) {
      Animated.timing(floatingLabelAnimation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  };

  // Define animated styles for the floating label
  const floatingLabelStyle = {
    top: floatingLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [10, -5], // top value
    }),
    fontSize: floatingLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [13, 10], // font size
    }),
    color: floatingLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['#888888', '#FFFFFF'], // Change the color dynamically if needed
    }),
  };

  return (
    <View style={styles.container}>
      {forInputTag && (
        <Animated.Text style={[styles.label, floatingLabelStyle]}>
          {title}
        </Animated.Text>
      )}

      {forDropDown && (
        <Animated.Text
          style={[styles.label, labelStyles, !value && floatingLabelStyle]}>
          {title}
        </Animated.Text>
      )}

      <TextInput
        style={[styles.input, inputStyles]}
        value={value}
        onChangeText={onChangeText}
        placeholderText=""
        placeholderTextColor="#dedede"
        onFocus={handleFocus}
        onBlur={handleBlur}
        editable={editable}
        keyboardType={keyboardType}
        maxLength={maxLength}
      />
      {forDropDown && (
        <TouchableOpacity
          hitSlop={{right: 30, left: 30, top: 30, bottom: 30}}
          style={tw`absolute right-6 mt-6 mx-2`}
          onPress={onPressDropDown}>
          <EvilIcons name="chevron-down" size={24} color="#808080" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: WD(4),
    fontFamily: customFonts.regular,
  },
  input: {
    marginTop: WD(3),
    paddingVertical: Platform.OS === 'ios' ? WD(3) : WD(2),
    fontFamily: customFonts.regular,
    color: '#CCCCCC',
    borderBottomWidth: 0.8,
    borderColor: '#CCCCCC',
    fontSize: HD(1.8),
    marginHorizontal: WD(8),
  },
  label: {
    marginHorizontal: WD(8),
    fontFamily: customFonts.regular,
    color: '#808080',
    paddingTop: WD(3),
    paddingBottom: WD(2),
    position: 'absolute',
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontSize: HD(1),
  },
});

export default AnimatedInputField;
