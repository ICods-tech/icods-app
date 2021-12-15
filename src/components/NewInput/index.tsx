import React, { 
    forwardRef, 
    useRef, 
    useState, 
    useImperativeHandle 
} from 'react';
import { Keyboard, TextInput, TextInputProps, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SvgProps } from 'react-native-svg';
import { Show, Hide } from 'react-native-iconly'
import { 
    ButtonEye, 
    ClosedEyeIcon, 
    Container, 
    IconContainer, 
    InputText, 
    OpenEyeIcon 
} from './styles';

interface InputTextProps extends TextInputProps{
    icon?: React.FC<SvgProps>;
    passwordStyleInput?: boolean;
    setSecure?: (secure: boolean) => void;
    secure?: boolean;
}

interface InputRef {
    focus(): void;
}

const NewInput: React.ForwardRefRenderFunction<InputRef, InputTextProps> = ({
    icon: Icon, 
    passwordStyleInput, 
    secure, 
    setSecure, 
    ...rest
}, ref ) => {
    
    const [toggleEye, setToggleEye] = useState(true); 
    const inputRef = useRef<TextInput>(null)

    function handleToggleSecure(){
        setToggleEye(!toggleEye);
        setSecure!(!secure);
        // Keyboard.emit('keyboardWillShow');
        //Esse !() indica que essa propriedade sempre existirá quando função for chamada
        // ou seja, nunca será undefined quando essa função for chamada
        // não tem nada haver com inverter true ou false.
    }

    useImperativeHandle(ref, () => ({
        focus(){
            inputRef.current?.focus();
        }
    }));

    return(
        <Container>
                {
                    Icon ? 
                            <View>

                        <IconContainer
                            onPress={() => inputRef.current?.focus()}
                            > 
                            <Icon 
                                width={RFValue(16)}
                                height={RFValue(16)}
                                /> 
                        </IconContainer>
                    </View>
                        : null  
                }

                <InputText 
                    ref={inputRef}
                    {...rest} 
                /> 

                <ButtonEye
                    activate={passwordStyleInput}
                    onPress={() => handleToggleSecure()}
                    >
                        { toggleEye ?
                            <Hide color='rgba(0, 0, 0, 0.3)'/>
                        :
                            <Show color='rgba(0, 0, 0, 0.3)'/>
                        }
                </ButtonEye>
        </Container>
    )
}

export default forwardRef(NewInput);