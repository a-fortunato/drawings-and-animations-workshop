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
import { createIdentityMatrix, rotateZ, scale3d, translate3d } from "../components/matrixMath";

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

function Movable({ children }: { children: ReactNode }) {
  const matrix = useSharedValue(createIdentityMatrix());

  const panGesture = Gesture.Pan().onChange((e) => {
    matrix.value = translate3d(matrix.value, e.changeX, e.changeY, 0)
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ matrix: matrix.value }],
  }));

  const rotateGesture = Gesture.Rotation().onChange((e) => {
    matrix.value = rotateZ(matrix.value, e.rotationChange, 0, 0, 0);
  });

  const scaleGesture = Gesture.Pinch().onChange((e) => {
    matrix.value = scale3d(
      matrix.value,
      e.scaleChange,
      e.scaleChange,
      1,
      0,
      0,
      0
    );
  });

  return (
    <GestureDetector gesture={Gesture.Simultaneous(rotateGesture, scaleGesture, panGesture)}>
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
