import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
import { useThemeColor, ThemeProps } from "./Themed";
import Colors from "@/constants/Colors";

interface iProps extends SvgProps {
  colorInverted?: boolean;
}

const theme = { light: Colors.light.primary, dark: Colors.dark.primary };

const Tech = (props: iProps) => {
  const fill = useThemeColor(theme, "primary", props.colorInverted);
  return (
    <Svg width={props.width || 32} height={props.height || 32} viewBox="0 0 50 50">
      <Path
        fill={props.fill || fill}
        d="M7 4C5.355 4 4 5.355 4 7v36.123c0 1.645 1.355 3 3 3l24.357.002c5.913 0 10.555.002 10.555.002a1 1 0 0 0 .719-1.695l-6.21-6.424a1 1 0 0 0-1.062-.246 4.022 4.022 0 0 1-2.064.18c-1.627-.275-2.983-1.649-3.242-3.28-.438-2.763 1.836-5.042 4.597-4.611 1.635.255 3.014 1.613 3.29 3.242.126.743.049 1.442-.178 2.07a1 1 0 0 0 .234 1.047c-.053-.053.108.112.285.295l.721.744 2.144 2.219 3.09 3.195a1 1 0 0 0 1.72-.693l-.003-35.168c0-1.645-1.354-3-3-3L29.955 4a1 1 0 0 0-.709.295l-9.252 9.297a1 1 0 0 0-.232 1.047c.227.626.303 1.324.177 2.068-.275 1.628-1.65 2.984-3.283 3.24-2.76.435-5.036-1.838-4.605-4.597.255-1.634 1.613-3.014 3.242-3.29a4.037 4.037 0 0 1 2.068.178 1 1 0 0 0 1.045-.23c.091-.09.433-.437 1.024-1.031l2.144-2.16 3.09-3.112A1 1 0 0 0 23.955 4H7zm0 2h14.553l-1.399 1.408-2.144 2.16-.719.723c-.751-.17-1.513-.342-2.332-.203-2.505.424-4.494 2.445-4.885 4.953-.627 4.024 2.868 7.516 6.893 6.883a5.99 5.99 0 0 0 4.945-4.885c.138-.82-.034-1.581-.205-2.334L30.371 6l12.582.002c.565 0 1 .436 1 1l.002 32.693-1.371-1.418-2.145-2.218-.72-.746-.012-.012c.172-.754.345-1.52.205-2.342a5.99 5.99 0 0 0-4.953-4.885c-4.027-.627-7.52 2.873-6.88 6.9.396 2.504 2.383 4.516 4.884 4.938a1 1 0 0 0 0 .002c.813.136 1.571-.036 2.32-.205l4.274 4.418c-1.48 0-3.606-.002-8.2-.002L7 44.123c-.565 0-1-.435-1-1V7c0-.565.435-1 1-1zm27 4c-3.302 0-6 2.698-6 6 0 .47.133.906.236 1.35L17.35 28.236C16.907 28.132 16.472 28 16 28c-3.302 0-6 2.698-6 6s2.698 6 6 6 6-2.698 6-6c0-.472-.133-.906-.236-1.348L32.65 21.766c.443.103.877.234 1.35.234 3.302 0 6-2.698 6-6s-2.698-6-6-6zm0 2c2.22 0 4 1.78 4 4 0 2.22-1.78 4-4 4-.48 0-.94-.083-1.37-.236a1 1 0 0 0-1.04.234L19.996 31.592a1 1 0 0 0-.234 1.047c.153.424.238.88.238 1.361 0 2.22-1.78 4-4 4-2.22 0-4-1.78-4-4 0-2.22 1.78-4 4-4 .48 0 .938.084 1.361.238a1 1 0 0 0 1.047-.232L30.004 18.41a1 1 0 0 0 .234-1.047A3.993 3.993 0 0 1 30 16c0-2.22 1.78-4 4-4zm-18 2a2 2 0 0 0-2 2 2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0-2-2zm18 0a2 2 0 0 0-2 2 2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0-2-2zM16 32a2 2 0 0 0-2 2 2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0-2-2zm18 0a2 2 0 0 0-2 2 2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0-2-2z"
      />
    </Svg>
  );
};
const Sports = (props: iProps) => {
  const fill = useThemeColor(theme, "primary", props.colorInverted);
  return (
    <Svg width={props.width || 32} height={props.height || 32} viewBox="0 0 50 50">
      <Path
        fill={props.fill || fill}
        d="M24.715 2a22.86 22.86 0 0 0-6.824 1.125C5.824 7.047-.797 20.039 3.125 32.109c3.922 12.067 16.914 18.688 28.984 14.766 12.008-3.902 18.602-16.785 14.805-28.8a.96.96 0 0 0-.039-.184C43.934 8.84 35.891 2.855 26.961 2.082A22.587 22.587 0 0 0 24.715 2Zm-5.027 2.688 4.34 2.703v8.316l-7.497 5.445c-.02-.011-.039-.015-.062-.023l-7.93-2.55-1.219-4.915a20.917 20.917 0 0 1 12.367-8.976Zm10.62 0A21.021 21.021 0 0 1 42.68 13.66l-1.23 4.965-7.981 2.527-7.442-5.406V7.36ZM7.95 20.488l7.91 2.543c.02.008.04.016.063.02l2.848 8.777-4.97 6.84-5.042-.355A21.047 21.047 0 0 1 4.03 23.782Zm34.14.028 3.88 3.265c.316 5.332-1.442 10.508-4.739 14.532l-5.085.359-4.91-6.856 2.843-8.761ZM20.392 33h9.23l4.922 6.871-1.902 4.688a20.906 20.906 0 0 1-15.281.004l-1.922-4.747Z"
      />
    </Svg>
  );
};

const Politics = (props: iProps) => {
  const fill = useThemeColor(theme, "primary", props.colorInverted);
  return (
    <Svg width={props.width || 32} height={props.height || 32} viewBox="0 0 50 50">
      <Path
        fill={props.fill || fill}
        d="M24.229.01a6.841 6.841 0 0 0-1.188.094c-1.822.303-3.696 1.286-4.55 3.162-.896 1.964-1.38 4.32-.526 6.761l.06-.076.002-.002c-.025.032-.024.133-.05.17.01.03-.002.058.01.088l-.022-.055c-.27.388-.588.967-.526 1.73v.003a1 1 0 0 0 .002.011 1 1 0 0 0 0 .004 1 1 0 0 0 .008.106c.112.765.337 1.445.748 2.004a1 1 0 0 0 .4.32c.1.045.152.058.153.059.048.017.069.028.098.04.136.79.345 1.55.668 2.184a1 1 0 0 0 .002 0c.203.4.388.72.597 1.004a1 1 0 0 0 .13.145c.124.114.116.096.099.082a1 1 0 0 0 .01.008l.035.029.004.351a1 1 0 0 0 0 .002c.01.728.013 1.36-.073 2.116-.22.56-.842 1.016-1.52 1.369v-.002c-.556.289-1.255.577-2.02.89-.426.174-.871.356-1.325.553a1 1 0 0 0 0 .002c-1.105.481-2.453 1.134-3.56 2.268-1.154 1.18-1.8 2.728-1.893 4.453a1 1 0 0 0-.002.053V39H9c-1.645 0-3 1.355-3 3v2a1 1 0 0 0 1 1h3v3a1 1 0 1 0 2 0v-3h26v3a1 1 0 1 0 2 0v-3h3a1 1 0 0 0 1-1v-2c0-1.645-1.355-3-3-3h-1v-9.06a1 1 0 0 0-.002-.053c-.093-1.737-.727-3.285-1.87-4.46-1.106-1.138-2.455-1.788-3.56-2.267a44.516 44.516 0 0 0-1.511-.613c-.702-.274-1.34-.526-1.86-.787a5.298 5.298 0 0 1-.896-.569l.013.012.038.043a1 1 0 0 0-.051-.055c-.001 0-.003 0-.004-.002a1 1 0 0 0-.002-.002 1 1 0 0 0-.004-.003l-.004-.006a1 1 0 0 0-.004-.004 1 1 0 0 0-.004-.004 1 1 0 0 0-.008-.008 1 1 0 0 0-.244-.205 1.835 1.835 0 0 1-.412-.555 42.772 42.772 0 0 1-.064-2.49c.014-.014.014-.015.035-.033a1 1 0 0 0 .012-.008c-.032.029.02-.005.132-.129a1 1 0 0 0 .079-.097c.207-.3.407-.646.586-1.014.304-.625.53-1.349.687-2.08.035-.014.06-.027.111-.045.044-.015.083-.024.196-.072a1 1 0 0 0 .41-.327c.429-.582.594-1.284.672-2.127a1 1 0 0 0 0-.005c.047-.55.023-1.06-.18-1.547a1 1 0 0 0-.004-.006c-.086-.204-.106-.2-.139-.248l-.027-.041-.064.138c.023-.05.02-.116.043-.167a5.85 5.85 0 0 0 .44-1.688v-.002a8.991 8.991 0 0 0-.214-3.154c-.298-1.162-.848-2.189-1.637-2.955a1 1 0 0 0-.002 0c-.76-.737-1.795-1.155-2.94-1.272a1 1 0 0 0-.003 0L27.4.998c-.892-.65-2-.977-3.171-.988zm.136 2.002c.97.031 1.817.327 2.16.677a1 1 0 0 0 .614.293l.404.041c.792.081 1.378.354 1.752.717.476.464.872 1.157 1.094 2.018a7.06 7.06 0 0 1 .162 2.449 1 1 0 0 0 0 .004 3.86 3.86 0 0 1-.309 1.219 1 1 0 0 0 0 .002l-.18.386a1 1 0 0 0 .092.996l.244.348.034.047a1 1 0 0 0 .006.01l.007.011c.022.063.062.234.034.569-.051.547-.16.783-.243.943-.058.025-.088.029-.154.063l-.316.162a1 1 0 0 0-.526.693l-.07.35a1 1 0 0 0 0 .002 7.545 7.545 0 0 1-.574 1.744 1 1 0 0 0 0 .004 5.641 5.641 0 0 1-.397.683c-.071.064-.144.128-.232.23l-.178.206a1 1 0 0 0-.24.652v.274c0 .754.015 1.476.05 2.273L25 20.945l-2.654-.884c.047-.665.055-1.277.047-1.854v-.002l-.006-.463-.004-.287a1 1 0 0 0-.272-.676l-.197-.209c-.084-.089-.155-.145-.227-.205a5.163 5.163 0 0 1-.388-.658c-.217-.427-.418-1.068-.522-1.736l-.054-.346a1 1 0 0 0-.483-.71l-.304-.177a1 1 0 0 0 0-.002c-.08-.046-.117-.052-.186-.084a2.42 2.42 0 0 1-.316-.922l-.002-.01v-.001c-.03-.364 0-.324.152-.512a1 1 0 0 0 0-.002l.266-.328a1 1 0 0 0 .156-.98l-.149-.395a1 1 0 0 0-.002-.002c-.714-1.888-.34-3.659.456-5.404.495-1.089 1.711-1.796 3.058-2.02a5.08 5.08 0 0 1 .996-.064zm-5.564 12.267c.007.05.032.088.04.137l-.02-.014-.02-.123zm12.33.123-.026.125-.02.01c.011-.047.036-.087.046-.135zm-10.744 3.366.002.101-.002-.002v-.1zm1.314 4.187 1.95.65L24 24l-.473 2.002-2.332-3.498c.179-.164.351-.344.506-.549zm6.559.014c.124.155.249.31.396.45a1 1 0 0 0 .012.01l.072.071a1 1 0 0 0 .043.035l-2.31 3.467L26 24l.35-1.395 1.91-.636zm-8.744 1.62 4.568 6.852a1 1 0 0 0 .826.58 1 1 0 0 0 .094.004 1 1 0 0 0 .016 0 1 1 0 0 0 .007 0 1 1 0 0 0 .887-.582l4.549-6.822c.595.288 1.223.538 1.867.79.481.187.968.377 1.443.583 1.032.447 2.125 1.007 2.922 1.828.8.822 1.232 1.834 1.305 3.162V39h-2v-1.5c0-1.642-.448-3.14-1.262-4.256.17-.398.262-.821.262-1.244a3.05 3.05 0 0 0-.752-2.04C33.731 29.38 32.917 29 32 29c-.917 0-1.731.38-2.248.96A3.05 3.05 0 0 0 29 32c0 .722.235 1.458.752 2.04.517.58 1.331.96 2.248.96.467 0 .906-.1 1.295-.273.406.706.705 1.672.705 2.773V39h-8v-1.174c.495-.164.932-.43 1.248-.787A3.05 3.05 0 0 0 28 35a3.05 3.05 0 0 0-.752-2.04C26.731 32.38 25.917 32 25 32c-.917 0-1.731.38-2.248.96A3.05 3.05 0 0 0 22 35c0 .722.235 1.458.752 2.04.316.355.753.622 1.248.786V39h-8v-1.5c0-1.19.276-2.132.594-2.857A3.08 3.08 0 0 0 18 35c.917 0 1.731-.38 2.248-.96A3.05 3.05 0 0 0 21 32a3.05 3.05 0 0 0-.752-2.04C19.731 29.38 18.917 29 18 29c-.917 0-1.731.38-2.248.96A3.05 3.05 0 0 0 15 32c0 .295.225.546.307.834C14.457 33.996 14 35.613 14 37.5V39h-2v-9.02c.073-1.306.51-2.319 1.326-3.154.802-.82 1.897-1.383 2.928-1.832.428-.186.858-.362 1.281-.535a1 1 0 0 0 .002 0c.69-.282 1.356-.56 1.979-.87zM18 31c.417 0 .602.12.752.29.15.168.248.432.248.71 0 .278-.098.542-.248.71-.15.17-.335.29-.752.29s-.602-.12-.752-.29A1.095 1.095 0 0 1 17 32c0-.278.098-.542.248-.71.15-.17.335-.29.752-.29zm14 0c.417 0 .602.12.752.29.15.168.248.432.248.71 0 .278-.098.542-.248.71-.15.17-.335.29-.752.29s-.602-.12-.752-.29A1.095 1.095 0 0 1 31 32c0-.278.098-.542.248-.71.15-.17.335-.29.752-.29zm-7 3c.417 0 .602.12.752.29.15.168.248.432.248.71 0 .278-.098.542-.248.71-.15.17-.335.29-.752.29s-.602-.12-.752-.29A1.095 1.095 0 0 1 24 35c0-.278.098-.542.248-.71.15-.17.335-.29.752-.29zM9 41h32c.565 0 1 .435 1 1v1H8v-1c0-.565.435-1 1-1z"
      />
    </Svg>
  );
};

const Money = (props: iProps) => {
  const fill = useThemeColor(theme, "primary", props.colorInverted);
  return (
    <Svg width={props.width || 32} height={props.height || 32} viewBox="0 0 50 50">
      <Path
        fill={props.fill || fill}
        d="M18 7C8.062 7 0 15.063 0 25c0 9.938 8.063 18 18 18 1.223 0 2.41-.145 3.563-.375 1.05.188 2.218.375 3.437.375 1.223 0 2.41-.145 3.563-.375 1.05.188 2.218.375 3.437.375 9.938 0 18-8.063 18-18 0-9.938-8.063-18-18-18-1.152 0-2.309.102-3.438.375A18.124 18.124 0 0 0 25 7c-1.152 0-2.309.102-3.438.375A18.124 18.124 0 0 0 18 7Zm0 2c1.043 0 2.047.094 3.031.281.172.098.367.14.563.125C28.707 11.036 34 17.38 34 25c0 7.64-5.324 13.988-12.469 15.594a1.037 1.037 0 0 0-.468.125C20.066 40.91 19.055 41 18 41 9.14 41 2 33.86 2 25S9.14 9 18 9Zm8.375.094c.559.047 1.113.082 1.656.187.172.098.367.14.563.125C35.707 11.036 41 17.38 41 25c0 7.64-5.324 13.988-12.469 15.594a1.037 1.037 0 0 0-.468.125c-.551.105-1.118.14-1.688.187C32.098 37.891 36 31.918 36 25c0-6.918-3.902-12.89-9.625-15.906Zm7 0C41.582 9.797 48 16.609 48 25c0 8.39-6.418 15.203-14.625 15.906C39.098 37.891 43 31.918 43 25c0-6.918-3.902-12.89-9.625-15.906ZM17 14v2.188c-1.602.199-4.5 1.601-4.5 5 0 6.398 9.313 3.105 9.313 7.906 0 1.601-.711 3.093-3.813 3.093-3.102 0-4-2.386-4-3.687h-2c.3 4.3 3.3 5.293 5 5.594V36h2v-1.906c1.5-.102 5-1.188 5-5.188 0-3.3-2.71-4.21-5.313-4.812-2.101-.5-4-.992-4-3.094 0-.898.407-2.906 3.407-2.906 2.101 0 3.105 1.304 3.406 2.906h2c-.602-2.2-1.602-4.188-4.5-4.688V14Z"
      />
    </Svg>
  );
};

export default { Tech, Sports, Politics, Money };