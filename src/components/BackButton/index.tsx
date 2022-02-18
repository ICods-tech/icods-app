import React from 'react';
import { BorderlessButtonProperties } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {
    BackBlueIcon,
    BackWhiteIcon, 
    Button, 
    Container 
} from './styles';

interface BackButtonProps extends BorderlessButtonProperties {
    navigationTo: any;
    customFunction?: () => void;
    color?: 'blue' | 'white';
    isKeyboardVisible?: boolean;
}

export function BackButton({ navigationTo, customFunction, color, isKeyboardVisible = false }: BackButtonProps){
    const navigation = useNavigation();
    return(
        <Container
            color={color}
        >
            <Button
                onPress={navigationTo === 'WAIT' ? customFunction : (() => navigation.goBack())}
            >
                {color === 'white' ?
                    <BackWhiteIcon/>
                    :
                    <BackBlueIcon/>
                }
            </Button>
        </Container>
    );
}