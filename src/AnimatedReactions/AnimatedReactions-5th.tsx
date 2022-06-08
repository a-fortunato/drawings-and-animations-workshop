import React, { useState } from "react";
import Icon from '@expo/vector-icons/MaterialIcons';
import Animated, {
  withTiming,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  useAnimatedProps,
  BounceIn,
  Keyframe,
  Easing,
  FadeOut,
  PinwheelOut,
} from "react-native-reanimated";
import { Pressable } from "react-native";

import { CenterScreen } from "../components/CenterScreen";

const AnimatedIcon = Animated.createAnimatedComponent(Icon)

function Heart() {
  const sharedVal = useSharedValue(1)
  const [isSelected, setSelected] = useState(false)
  const style = useAnimatedStyle(() => ({
    transform: [{
      scale: isSelected ? withSequence(withTiming(1.5), withTiming(1)) : 1,
    }]
  }))
  // useAnimatedReaction -> it's like using useEffect for animations
  // since it listens to changes in a variable
  const color = useSharedValue('#aaa');
  const iconProps = useAnimatedProps(() => ({
    color: withTiming(isSelected ? '#ffaaa8' : '#aaa'),
  }))

  const enteringAnimation = new Keyframe({
    0: {
      originX: 50,
      transform: [{ rotate: '45deg' }],
    },
    30: {
      originX: 10,
      transform: [{ rotate: '-90deg' }],
    },
    100: {
      originX: 0,
      transform: [{ rotate: '0deg' }],
      easing: Easing.quad,
    },
  }).duration(2000);

  const exitingAnimation = new Keyframe({
    0: {
      opacity: 1,
      transform: [{ skewX: '0deg' }],
    },
    30: {
      opacity: 0.5,
      transform: [{ skewX: '40deg' }],
      easing: Easing.exp,
    },
    100: {
      opacity: 0,
      transform: [{ skewX: '-10deg' }],
    },
  }).duration(2000);


  return (
    <Pressable onPress={() => {
        sharedVal.value = withSequence(withTiming(1), withTiming(sharedVal.value))
        setSelected(selected => !selected);
      }}>
      <AnimatedIcon
        key={isSelected ? 1 : 0}
        entering={BounceIn.duration(700)}
        exiting={PinwheelOut.duration(700)}
        // exiting={exitingAnimation}
        name="favorite"
        size={50}
        animatedProps={iconProps}
      />
    </Pressable>
  );
}

export function AnimatedReactions() {
  return (
    <CenterScreen>
      <Heart />
    </CenterScreen>
  );
}
