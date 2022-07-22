import { Dimensions } from "react-native";

export function setLetterSpacing(spacing: number = 0) {
  return Dimensions.get('window').width * spacing;
}