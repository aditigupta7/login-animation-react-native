import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import {WD, HD} from '../../common/responsive';
import COLORS from '../../common/colors';
import {customFonts} from '../../common/custom-fonts';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {validateEmail, validatePassword} from '../../utils/validations';

export default function LoginScreen() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const {width, height} = Dimensions.get('window');

  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const imageOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const textTranslationY = useSharedValue(-100); // Start text above the screen

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translationX.value},
        {translateY: translationY.value},
      ],
      opacity: imageOpacity.value,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: textTranslationY.value}],
      opacity: textOpacity.value,
    };
  });

  const triggerTextAnimation = () => {
    textTranslationY.value = withSpring(0, {
      damping: 20,
      mass: 1,
      stiffness: 100,
      overshootClamping: false,
      restDisplacementThreshold: 0.1,
      restSpeedThreshold: 5,
    });
    textOpacity.value = withTiming(1, {duration: 2000}); // Slower fade in for text
  };

  const triggerImageAnimation = () => {
    translationX.value = withSpring(0, {
      damping: 20,
      mass: 1,
      stiffness: 10,
      overshootClamping: false,
      restDisplacementThreshold: 0.1,
      restSpeedThreshold: 5,
    });

    translationY.value = withSpring(0, {
      damping: 20,
      mass: 1,
      stiffness: 10,
      overshootClamping: false,
      restDisplacementThreshold: 0.1,
      restSpeedThreshold: 5,
    });

    imageOpacity.value = withTiming(1, {duration: 500}); // Slower fade in for image

    // Trigger text animation after a very short delay
    runOnJS(() => {
      setTimeout(() => {
        triggerTextAnimation();
      }, 1000); // 1 millisecond delay
    })();
  };

  useEffect(() => {
    // Start the image above the text inputs
    translationX.value = width / 2 - 40; // Center the image horizontally
    translationY.value = height / 3 - 40; // Start the image above the text inputs
    imageOpacity.value = 0; // Start image opacity at 0

    triggerImageAnimation();
  }, []);

  const handleSubmit = () => {
    if (!validateEmail(email)) {
      Toast.show('Enter a valid email', Toast.LONG);
      return;
    }
    if (!validatePassword(password)) {
      Toast.show(
        'Enter one captial letter, one small, one digit and one special character',
        Toast.LONG,
      );
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      Toast.show('Your credentails are valid', Toast.LONG);
    }, 5000);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar
        animated={true}
        backgroundColor={COLORS.white}
        barStyle="dark-content"
      />
      <View style={styles.container}>
        <View style={{marginHorizontal: WD(10)}}>
          <Animated.Image
            style={[
              {width: 80, height: 80, resizeMode: 'contain'},
              animatedImageStyle,
            ]}
            source={require('../../assets/images/logo.png')}
          />
          <Animated.Text style={[styles.headingText, animatedTextStyle]}>
            Welcome Back
          </Animated.Text>

          <Animated.Text style={[styles.smallHeading, animatedTextStyle]}>
            Log in to continue
          </Animated.Text>
        </View>

        <View style={styles.inputSection}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            underlineColorAndroid="transparent"
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>

        <View style={styles.inputSection}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            underlineColorAndroid="transparent"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.forgotPasswordStyles}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Btn} onPress={handleSubmit}>
          {isLoading ? (
            <ActivityIndicator size={'small'} color={'#fff'} />
          ) : (
            <Text style={styles.BtnText}>Log in</Text>
          )}
        </TouchableOpacity>
        <View style={styles.newUserText}>
          <Text style={{color: COLORS.dark, fontFamily: customFonts.bold}}>
            New User?
          </Text>
          <TouchableOpacity>
            <Text style={{color: COLORS.primary, fontFamily: customFonts.bold}}>
              {' '}
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

// styles
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    paddingTop: WD(5),
    paddingHorizontal: WD(10),
  },
  container: {
    position: 'absolute',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: WD(20),
    height: HD(100),
    width: WD(100),
  },
  headingText: {
    marginTop: WD(10),
    fontSize: HD(3.5),
    fontFamily: customFonts.extra_bold,
    color: COLORS.black,
  },
  input: {
    fontFamily: customFonts.regular,
    width: WD(80),
    color: COLORS.darkgray,
    fontSize: WD(4),
    paddingVertical: WD(2),
  },
  inputSection: {
    marginTop: WD(12),
    marginHorizontal: WD(10),
    backgroundColor: '#fff',
    paddingHorizontal: WD(2),
    width: '80%',
    borderBottomColor: COLORS.gainsboro,
    borderBottomWidth: 1,
  },
  Btn: {
    marginTop: WD(25),
    marginBottom: WD(1),
    marginHorizontal: WD(8),
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: WD(85),
    height: HD(6),
    shadowColor: '#CCCCCC',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 1.0,
    elevation: 20,
  },
  BtnText: {
    fontSize: WD(4),
    color: COLORS.white,
    fontFamily: customFonts.medium,
  },
  text: {
    color: COLORS.dark,
    fontSize: WD(4),
    marginTop: WD(0.5),
    fontFamily: customFonts.medium,
    textAlign: 'left',
  },
  forgotPasswordStyles: {
    color: COLORS.dark,
    textAlign: 'right',
    fontFamily: customFonts.regular,
    marginVertical: WD(4),
    marginRight: WD(8),
  },
  smallHeading: {
    fontSize: WD(3.5),
    marginTop: WD(3),
    fontFamily: customFonts.bold,
    color: COLORS.black,
  },
  newUserText: {
    marginTop: WD(7),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
