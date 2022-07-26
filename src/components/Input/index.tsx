import React, {
  forwardRef,
  useRef,
  useState,
  useImperativeHandle,
  useEffect,
} from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Container, IconContainer, InputText } from './styles';
import { useTheme } from 'styled-components/native';
import { User as IconProps } from 'react-native-iconly';
import { IRouteErrors } from '../../pages/Register';
import { SvgProps } from 'react-native-svg';

interface InputTextProps extends TextInputProps {
  iconSvg?: React.FC<SvgProps>;
  iconly?: typeof IconProps;
  isErrored?: boolean;
  value: string;
  isSignUpErrored?: IRouteErrors;
  setIsSignInErrored?: (errored: boolean) => void;
  setIsSignUpErrored?: (errored: IRouteErrors) => void;
}

interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputTextProps> = (
  {
    iconSvg: IconSvg,
    iconly: Iconly,
    isErrored = false,
    isSignUpErrored,
    setIsSignInErrored = () => { },
    setIsSignUpErrored = () => { },
    value,
    ...rest
  },
  ref,
) => {
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
        {(Iconly && (
          <Iconly
            width={RFValue(16)}
            height={RFValue(16)}
            color={iconColor}
            set="bold"
          />
        )) ||
          (IconSvg && (
            <IconSvg
              width={RFValue(16)}
              height={RFValue(16)}
              fill={iconColor}
            />
          ))}
      </IconContainer>

      <InputText
        ref={inputRef}
        placeholderTextColor={
          isErrored ? theme.colors.attention : theme.colors.subtitle
        }
        isErrored={isErrored}
        onFocus={() => (
          handleInputFocused(),
          setIsSignInErrored!(false),
          setIsSignUpErrored!(isSignUpErrored!)
        )}
        onBlur={handleInputBlur}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
