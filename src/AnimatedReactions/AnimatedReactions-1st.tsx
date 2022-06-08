import React, { useState } from "react";
import Animated, {
  withTiming,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
} from "react-native-reanimated";
import { Pressable } from "react-native";

import { CenterScreen } from "../components/CenterScreen";

function Heart() {
  const sharedVal = useSharedValue(1)
  const [count, setCount] = useState(0)
  const style = useAnimatedStyle(() => ({
    width: 50 * sharedVal.value,
    height: 50 * sharedVal.value,
  }))

  return (
    <Pressable onPress={() => {
      if (count === 5) {
        sharedVal.value = withTiming(1)
        setCount(0)
      } else {
        sharedVal.value = withTiming(sharedVal.value + 1)
        setCount(count + 1)
      }
      // sharedVal.value = withSequence(withTiming(sharedVal.value + 1), withTiming(sharedVal.value))
      }}>
      <Animated.View
        style={[{ backgroundColor: "#ffaaa8" }, style]}
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
