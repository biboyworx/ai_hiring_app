import Toast from "react-native-toast-message";

export const successToast = () => {
  Toast.show({
    type: "success",
    text1: "Hello",
    text2: "This is some something 👋",
  });
};

export const errorToast = () => {
  Toast.show({
    type: "error",
    text1: "Error",
    text2: "Something went wrong 👋",
  });
};

export const infoToast = () => {
  Toast.show({
    type: "info",
    text1: "Info",
    text2: "This is some information 👋",
  });
};
