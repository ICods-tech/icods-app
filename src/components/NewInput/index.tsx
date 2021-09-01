import React, { useRef, useState } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SvgProps } from 'react-native-svg';
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

export function NewInput({
    icon: Icon, 
    passwordStyleInput, 
    secure, 
    setSecure, 
    ...rest
}: InputTextProps ){
    const [toggleEye, setToggleEye] = useState(true); 
    const inputRef = useRef<TextInput>(null)
    
    function handleToggleSecure(){
        setToggleEye(!toggleEye);
        setSecure!(!secure) 
    }
    return(
        <Container>
                {
                    Icon ? 
                        <IconContainer
                            onPress={() => inputRef.current?.focus()}
                        > 
                            <Icon 
                                width={RFValue(16)}
                                height={RFValue(16)}
                            /> 
                        </IconContainer>
                        : null  
                }

                <InputText 
                    ref={inputRef}
                    {...rest} 
                /> 

                <ButtonEye
                    activate={passwordStyleInput}
                    onPress={() => handleToggleSecure()}>
                        { toggleEye ?
                            <ClosedEyeIcon 
                                activate={passwordStyleInput}
                            />
                        :
                            <OpenEyeIcon  
                                activate={passwordStyleInput}
                            />
                        }
                </ButtonEye>
        </Container>
    )
}