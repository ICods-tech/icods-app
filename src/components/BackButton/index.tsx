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
}

export function BackButton({ navigationTo, customFunction, color }: BackButtonProps){
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