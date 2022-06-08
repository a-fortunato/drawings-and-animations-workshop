/* eslint-disable @typescript-eslint/no-var-requires */
import { mix, Rect, SkMatrix } from "@shopify/react-native-skia";
import {
  Canvas,
  useImage,
  Image,
  useSharedValueEffect,
  useValue,
  Group,
} from "@shopify/react-native-skia";
import { useEffect } from "react";
import { Dimensions, View } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

import {
  createIdentityMatrix,
  scale3d,
  toSkMatrix,
  translate3d,
} from "../components/matrixMath";

const zurich = require("../assets/zurich.jpg");
const { width, height } = Dimensions.get("window");

export const PinchToZoom = () => {
  const x = useValue(0);
  const progress = useSharedValue(0);
  const transform = useValue(createIdentityMatrix())
  const matrix = useValue(createIdentityMatrix())
  const scale = useSharedValue(0);

  
  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 3000 }), -1, true);
  }, [progress]);
 
  useSharedValueEffect(() => {
    x.current = mix(progress.value, 0, 100);
  }, progress); // you can pass other shared values as extra parameters
 
  useSharedValueEffect(() => {
    // transform.current = translate3d(matrix.current, transform.x * scale.value, transform.y * scale.value, 0)
  }, scale)


  const scaleGesture = Gesture.Pinch().onChange((e) => {
    matrix.current = scale3d(
      matrix.current,
      e.scaleChange,
      e.scaleChange,
      1,
      0,
      0,
      0
    );
  });


  const image = useImage(zurich);
  if (!image) {
    return null;
  }
  return (
    <View style={{ flex: 1 }}>
      <GestureDetector>
        <Canvas style={{ flex: 1 }}>
          <Group>
            <Image
              x={0}
              y={0}
              width={width}
              height={height}
              image={image}
              fit="cover"
            />
          </Group>
        <Rect
          x={x}
          y={100}
          width={10}
          height={10}
          color="red"
        />
        </Canvas>
      </GestureDetector>
    </View>
  );
};
