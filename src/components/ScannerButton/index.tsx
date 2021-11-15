import React from 'react';
import { BorderlessButtonProperties } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

import {
    Button, 
    Title
} from './styles';

import ScannerImg from '../../assets/images/ícone-qr-code.svg';


interface ScannerButtonProps extends BorderlessButtonProperties {
    selected?: boolean;
}
export function ScannerButton({selected,...rest}: ScannerButtonProps){
    return (
        <Button
            {...rest}
        >
            <ScannerImg 
                width={RFValue(56)}
                height={RFValue(56)}
                style={{marginBottom: RFValue(4)}}
            />
            <Title selected={selected}>Escanear</Title>

        </Button>
    );
}