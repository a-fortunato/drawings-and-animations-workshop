import {
  Canvas,
  Fill,
  Circle,
  Oval,
  rect,
  vec,
  Group,
  SweepGradient,
  RadialGradient,
  BlurMask,
} from "@shopify/react-native-skia";
import React from "react";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const ellipsisAspectRatio = 180 / 470;
const PADDING = 32;
const rx = width / 2 - PADDING;
const ry = rx * ellipsisAspectRatio;

// Origin of the Logo
const center = vec(width / 2, height / 2);
// Radius of the middle circle
const r = 0.75 * PADDING;
// Rectangle to draw the oval in
const rct = rect(center.x - rx, center.y - ry, rx * 2, ry * 2);
// Some colors
const c1 = "#3884FF";
const c2 = "#51D3ED";
const strokeWidth = r;

export const ReactLogo = () => {
  return (
    <Canvas style={{ flex: 1 }}>
      <Fill color="white" />
      <Circle c={center} r={r} color={c1} />
      <Group>
      <Oval rect={rct} color={c1} style="stroke" strokeWidth={strokeWidth} />
      <Group transform={[ {rotate: -Math.PI/3 }]} origin={center}>
        <Oval rect={rct} color={c1} style="stroke" strokeWidth={strokeWidth} />
      </Group>
      </Group>
      <Group transform={[ {rotate: Math.PI/3 }]} origin={center}>
      <Oval rect={rct} color={c1} style="stroke" strokeWidth={strokeWidth} />
      </Group>
    </Canvas>
  );
};
