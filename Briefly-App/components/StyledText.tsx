// import { Text, TextProps } from './Themed';

// export function MonoText(props: TextProps) {
//   return <Text {...props} style={[props.style, { fontFamily: 'SpaceMono' }]} />;
// }

import { Text as ThemedText, TextProps } from "./Themed";
export function Heading(props: TextProps & { size?: number }) {
  return <ThemedText {...props} style={[props.style, { fontFamily: "Inter_700Bold", fontSize: props.size || 32 }]} />;
}

export function Heading2(props: TextProps & { size?: number }) {
  return (
    <ThemedText {...props} style={[props.style, { fontFamily: "Inter_600SemiBold", fontSize: props.size || 24 }]} />
  );
}

export function Heading3(props: TextProps & { size?: number }) {
  return <ThemedText {...props} style={[props.style, { fontFamily: "Inter_500Medium", fontSize: props.size || 20 }]} />;
}

export function Text(props: TextProps & { size?: number }) {
  return (
    <ThemedText {...props} style={[props.style, { fontFamily: "Inter_400Regular", fontSize: props.size || 16 }]} />
  );
}

export function MutedText(props: TextProps & { size?: number }) {
  return (
    <ThemedText
      {...props}
      style={[props.style, { fontFamily: "Inter_400Regular", fontSize: props.size || 16 }]}
      colorName="textMuted"
    />
  );
}
