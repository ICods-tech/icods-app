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
    navigationTo: string;
    color?: 'blue' | 'white';
}

export function BackButton({ navigationTo, color }: BackButtonProps){
    const navigation = useNavigation();
    return(
        <Container
            color={color}
        >
            <Button
                onPress={() => { navigation.goBack()}}
                >
                    {color === 'white' ?
                        <BackWhiteIcon />
                        :
                        <BackBlueIcon/>
                    }
            </Button>
        </Container>
    );
}