import { useAuth } from "@/core/hooks/persistentHooks";
import { Pressable } from "react-native";
import Svg, { Path, SvgProps } from "react-native-svg";

const Logo = (props: SvgProps) => {
  return (
    <Svg width={92} height={109} fill="none" {...props}>
      <Path
        fill="#2D2D2D"
        d="M0 0v91.974h46.379c32.583 0 46.773-33.768 25.753-49.273C87.372 25.882 72.915 0 47.822 0H0ZM75.725 94.664a2.69 2.69 0 0 1 2.69-2.69h10.76a2.69 2.69 0 0 1 2.69 2.69v10.76a2.69 2.69 0 0 1-2.69 2.69h-10.76a2.69 2.69 0 0 1-2.69-2.69v-10.76Z"
      />
    </Svg>
  );
};

export default Logo;
