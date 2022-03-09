import React, {
  forwardRef,
  useRef,
  useState,
  useImperativeHandle,
  useEffect,
} from 'react';
import {TextInput, TextInputProps} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Show, Hide} from 'react-native-iconly';
import {ButtonEye, Container, IconContainer, InputText} from './styles';
import {useTheme} from 'styled-components/native';
import {IRouteErrors} from '../../pages/Register';

interface InputTextProps extends TextInputProps {
  iconly: typeof Show;
  isErrored?: boolean;
  value: string;
  isSignUpErrored?: IRouteErrors;
  setIsSignInErrored?: (errored: boolean) => void;
  setIsSignUpErrored?: (errored: IRouteErrors) => void;
}

interface InputRef {
  focus(): void;
}

const PasswordInput: React.ForwardRefRenderFunction<
  InputRef,
  InputTextProps
> = (
  {
    iconly: Icon,
    isErrored = false,
    isSignUpErrored,
    setIsSignInErrored = () => {},
    setIsSignUpErrored = () => {},
    value,
    ...rest
  },
  ref,
) => {
  const [toggleEye, setToggleEye] = useState(true);
  const inputRef = useRef<TextInput>(null);
  const theme = useTheme();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [iconColor, setIconColor] = useState(theme.colors.gray);

  function handleInputFocused() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }
  function handleChangeEye() {
    setToggleEye(!toggleEye);
  }

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current?.focus();
    },
  }));

  function handleiconColor() {
    setIconColor(theme.colors.gray);

    if (isErrored) {
      setIconColor(theme.colors.attention_light);
    } else if (isFocused || isFilled) {
      setIconColor(theme.colors.primary);
    }
  }

  useEffect(() => {
    handleiconColor();
  }, [isFocused, isErrored, isFilled]);

  return (
    <Container isErrored={isErrored}>
      <IconContainer onPress={() => inputRef.current?.focus()}>
        <Icon
          width={RFValue(16)}
          height={RFValue(16)}
          color={iconColor}
          set="bold"
        />
      </IconContainer>

      <InputText
        ref={inputRef}
        placeholderTextColor={
          isErrored ? theme.colors.attention : theme.colors.subtitle
        }
        secureTextEntry={toggleEye}
        isErrored={isErrored}
        onFocus={() => (
          handleInputFocused(),
          setIsSignInErrored!(false),
          setIsSignUpErrored!({
            ...isSignUpErrored!,
            password: false,
          })
        )}
        onBlur={handleInputBlur}
        {...rest}
      />

      <ButtonEye onPress={() => handleChangeEye()}>
        {toggleEye ? (
          <Hide color={theme.colors.medium_line} set="light" />
        ) : (
          <Show color={theme.colors.medium_line} set="light" />
        )}
      </ButtonEye>
    </Container>
  );
};

export default forwardRef(PasswordInput);
