import { BaseToastProps } from 'react-native-toast-message';

const getCustomToastProps = () => {
  const customProps: BaseToastProps = {
    text1Style: {
      fontSize: 16,
    },
    text2Style: {
      fontSize: 16,
      fontWeight: '400',
    },
  };

  return customProps;
};

export { getCustomToastProps };
