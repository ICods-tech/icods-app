import Toast from "react-native-toast-message";

export const displayToast = ({ text1, type }: { text1: string; type: string }) => {
  return Toast.show({
    type,
    position: 'bottom',
    text1,
    text2: '',
    visibilityTime: 1000,
    bottomOffset: 100,
  });
};