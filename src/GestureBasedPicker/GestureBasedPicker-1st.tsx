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
import { GestureDetector, Gesture } from "react-native-gesture-handler";

import { CenterScreen } from "../components/CenterScreen";

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const WIDTH = 50;

function Sticker({iconName, color}) {
  const [isSelected, setSelected] = useState(false);

  return (
    <Pressable onPress={() => setSelected(selected => !selected)}>
      <AnimatedIcon
        key={isSelected ? 1 : 0}
        name={iconName}
        size={WIDTH}
        // color={isSelected ? color || '#ffaaa8' : '#aaa'}
        color='#aaa'
      />
    </Pressable>
  )
}

function Toolbar() {
  const position = useSharedValue(0);

  const panGesture = Gesture.Pan().onChange((e) => {
    position.value += e.changeX;
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  return (
    <View
      style={{
        overflow: "visible",
        width: 0,
      }}
    >
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            { flexDirection: "row", width: WIDTH * 4, marginLeft: -WIDTH / 2 },
            animatedStyle,
          ]}
        >
          <Sticker iconName="favorite" color="#ffaaa8" />
          <Sticker iconName="grade" color="#001a72" />
          <Sticker iconName="thumb-up" color="#ffee86" />
          <Sticker iconName="emoji-events" color="#8ed3ef" />
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

export function GestureBasedPicker() {
  return (
    <CenterScreen>
      <Toolbar />
    </CenterScreen>
  );
}
