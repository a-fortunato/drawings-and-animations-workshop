import React, { useState } from "react";
import Icon from "@expo/vector-icons/MaterialIcons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { ColorValue, Pressable, View } from "react-native";

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const WIDTH = 50;

function Sticker({iconName, color, size}) {
  const [isSelected, setSelected] = useState(false);

  return (
    <Pressable onPress={() => setSelected(selected => !selected)}>
      <AnimatedIcon
        key={isSelected ? 1 : 0}
        name={iconName}
        size={size || WIDTH}
        // color={isSelected ? color || '#ffaaa8' : '#aaa'}
        color={color}
      />
    </Pressable>
  )
}

export default Sticker
