import React, {
  forwardRef,
  useRef,
  useState,
  useImperativeHandle,
  useEffect,
} from 'react';
import {Keyboard, TextInput, TextInputProps, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {SvgProps} from 'react-native-svg';
import {Show, Hide} from 'react-native-iconly';
import {
  ButtonEye,
  ClosedEyeIcon,
  Container,
  IconContainer,
  InputText,
  OpenEyeIcon,
} from './styles';
import {useTheme} from 'styled-components/native';

interface InputTextProps extends TextInputProps {
  icon?: React.FC<SvgProps>;
  passwordStyleInput?: boolean;
  setSecure?: (secure: boolean) => void;
  secure?: boolean;
  isErrored?: boolean;
}

interface InputRef {
  focus(): void;
}

const NewInput: React.ForwardRefRenderFunction<InputRef, InputTextProps> = (
  {
    icon: Icon,
    passwordStyleInput,
    secure,
    setSecure,
    isErrored = false,
    ...rest
  },
  ref,
) => {
  const [toggleEye, setToggleEye] = useState(true);
  const inputRef = useRef<TextInput>(null);
  const theme = useTheme();

  function handleToggleSecure() {
    setToggleEye(!toggleEye);
    setSecure!(!secure);
  }

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current?.focus();
    },
  }));

  return (
    <Container isErrored={isErrored}>
      {Icon ? (
        <View>
          <IconContainer onPress={() => inputRef.current?.focus()}>
            <Icon width={RFValue(16)} height={RFValue(16)} />
          </IconContainer>
        </View>
      ) : null}

      <InputText
        ref={inputRef}
        placeholderTextColor={
          isErrored ? theme.colors.attention : theme.colors.subtitle
        }
        isErrored={isErrored}
        {...rest}
      />

      <ButtonEye
        activate={passwordStyleInput}
        onPress={() => handleToggleSecure()}>
        {toggleEye ? (
          <Hide color="rgba(0, 0, 0, 0.3)" />
        ) : (
          <Show color="rgba(0, 0, 0, 0.3)" />
        )}
      </ButtonEye>
    </Container>
  );
};

export default forwardRef(NewInput);
