import React from 'react';
import { BorderlessButtonProperties } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { BackIcon, Button, Container } from './styles';

interface BackButtonProps extends BorderlessButtonProperties {
    navigationTo: string;
}

export function BackButton({ navigationTo }: BackButtonProps){
    const navigation = useNavigation();
    return(
        <Container>
            <Button
                onPress={() => { navigation.navigate(navigationTo)}}
                >
                <BackIcon />
            </Button>
        </Container>
    );
}