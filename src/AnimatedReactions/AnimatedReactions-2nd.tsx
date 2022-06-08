import React, { useState } from "react";
import Icon from '@expo/vector-icons/MaterialIcons';
import Animated, {
  withTiming,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  useAnimatedProps,
} from "react-native-reanimated";
import { Pressable } from "react-native";

import { CenterScreen } from "../components/CenterScreen";

const AnimatedIcon = Animated.createAnimatedComponent(Icon)

function Heart() {
  const sharedVal = useSharedValue(1)
  const style = useAnimatedStyle(() => ({
    width: 50 * sharedVal.value,
    height: 50 * sharedVal.value,
  }))
  const color = useSharedValue('#aaa');
  const iconProps = useAnimatedProps(() => ({
    color: color.value,
    size: 50 * sharedVal.value,
  }))

  return (
    <Pressable onPress={() => {
        sharedVal.value = withSequence(withTiming(sharedVal.value + 0.5), withTiming(sharedVal.value))
        color.value = withTiming('#ffaaa8');
      }}>
      <Animated.View
        style={[{ backgroundColor: "#ffaaa8" }, style]}
      />
      <AnimatedIcon name="favorite" animatedProps={iconProps} />
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
