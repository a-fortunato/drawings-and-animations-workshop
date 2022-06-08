/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Canvas,
  Circle,
  Image,
  Path,
  Skia,
  useImage,
  useTouchHandler,
  useValue,
} from "@shopify/react-native-skia";
import { Dimensions } from "react-native";

const zurich = require("../assets/zurich.jpg");
const { width, height } = Dimensions.get("window");
export const Drawings = () => {
  const path = useValue(Skia.Path.Make());

  const image = useImage(zurich);

  const cx = useValue(100);
  const cy = useValue(100);
 
  const touchHandler = useTouchHandler({
    onStart: ({x,y}) => {
      path.current.moveTo(x, y)
    },
    onActive: ({ x, y }) => {
      cx.current = x;
      cy.current = y;
      const lastPt = path.current.getLastPt();
      const xMid = (lastPt.x + x) / 2;
      const yMid = (lastPt.y + y) / 2;
      path.current.quadTo(lastPt.x, lastPt.y, xMid, yMid);
    },
  });

  if (!image) {
    return null;
  }
  return (
    <Canvas style={{ flex: 1 }} onTouch={touchHandler}>
      <Image
        x={0}
        y={0}
        width={width}
        height={height}
        image={image}
        fit="cover"
      />
      <Circle cx={cx} cy={cy} r={10} color="red" />
      <Path
        
        path={path}
        style="stroke"
        strokeWidth={8}
        color="lightblue"
        strokeJoin="round"
        strokeCap="round"
      />
    </Canvas>
  );
};
