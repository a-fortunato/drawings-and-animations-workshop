import React, { useEffect, useState } from "react";
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
  const time = useSharedValue(0)
  const [isSelected, setSelected] = useState(false)
  const style = useAnimatedStyle(() => {
    // const x = vx * t;
     // const y = vy * t + (-g * t * t) / 2;
    return {
      transform: [{
        // scale: isSelected ? withSequence(withTiming(1.5), withTiming(1)) : 1,
        // translateX: withSequence(1, withTiming(1 * time.value)),
        translateX: 100 * (time.value),
      }]
    }
  })
  // useAnimatedReaction -> it's like using useEffect for animations
  // since it listens to changes in a variable
  const color = useSharedValue('#aaa');
  const iconProps = useAnimatedProps(() => ({
    color: withTiming(isSelected ? '#ffaaa8' : '#aaa'),
  }))

  const duration = 30; // in seconds
  useEffect(() => {
    time.value = withTiming(duration, {
      duration: duration * 1000,
      easing: Easing.linear,
    });
  }, []);


  return (
    <Pressable onPress={() => {
        setSelected(selected => !selected);
      }}>
      <AnimatedIcon
        name="star"
        size={73}
        animatedProps={iconProps}
        style={style}
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
