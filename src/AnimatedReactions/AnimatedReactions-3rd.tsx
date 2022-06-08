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
  const [isSelected, setSelected] = useState(false)
  const style = useAnimatedStyle(() => ({
    transform: [{
      scale: withTiming(isSelected ? 1.5 : 1),
    }]
  }))
  const color = useSharedValue('#aaa');
  const iconProps = useAnimatedProps(() => ({
    color: withTiming(isSelected ? '#ffaaa8' : '#aaa'),
  }))

  return (
    <Pressable onPress={() => {
        sharedVal.value = withSequence(withTiming(sharedVal.value + 0.5), withTiming(sharedVal.value))
        setSelected(selected => !selected);
      }}>
      <AnimatedIcon name="favorite" animatedProps={iconProps} style={style} />
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
