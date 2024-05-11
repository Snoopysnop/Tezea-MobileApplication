type FontWeightType = {
  bold: "bold" | "600" | "normal" | "100" | "200" | "300" | "400" | "500" | "700" | "800" | "900" | undefined
}

/* Font */
// export const FontSize = {
//   size_base: 14,
//   size_xl: 18,
//   size_l: 17,
//   size_xs: 12,
// };

export const FontWeight = {
  bold: '600',
} as const satisfies FontWeightType

/* Colors */
export const Color = {
  blue: '#008FE3',
  light_blue: '#76C3F0',

  red: '#E15656',

  green: '#8FBE40',

  black: '#000',
  white: '#FFF',

  light_gray: '#CCC',
  gray: '#7D7D7D'
};

/* Border Radiuses */
export const Border = {
  default_radius: 5,
  secondary_radius: 5,
  rounded_end: 100,
};

/* Others */
export const Others = {
  elevation: 3,
  shadow_color: 'rgba(0, 0, 0, 0.8)'
};
