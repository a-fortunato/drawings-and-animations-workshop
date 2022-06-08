import type { ReactNode } from "react";
import React from "react";
import { View } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Sticker from "../components/Sticker";

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

function Movable({ children }: { children: ReactNode }) {
  const position = useSharedValue({ x: 0, y: 0 });

  const panGesture = Gesture.Pan().onChange((e) => {
    const { x, y } = position.value;
    position.value = { x: x + e.changeX, y: y + e.changeY };
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value.x}, { translateY: position.value.y }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View>
        <Animated.View style={[{ position: "absolute" }, animatedStyle]}>
          {children}
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}

export function AllTheGestures() {

  return (
    <View style={{ flex: 1, borderWidth: 1, borderColor: 'purple' }}>
      <Movable>
        <Sticker iconName="favorite" color="#ffaaa8" size={150} />
      </Movable>
    </View>
  );
}
