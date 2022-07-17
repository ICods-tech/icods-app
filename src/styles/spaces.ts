import { Dimensions } from "react-native";

export function letterSpacing(spacing: number = 0.0002) {
  return Dimensions.get('window').width * spacing;
}