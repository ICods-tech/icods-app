import Toast from "react-native-toast-message";

interface IToastProps {
  message1: string;
  type: "success" | "error" | "warning" | "info";
  message2?: string;
  duration?: number;
}

export const displayToast = ({ message1, type, message2, duration }: IToastProps) => {
  return Toast.show({
    type,
    position: 'bottom',
    text1: message1,
    text2: message2 ? message2 : '',
    visibilityTime: duration ? duration : 2500,
    bottomOffset: 100,
  });
};