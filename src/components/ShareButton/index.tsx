import React from 'react';
import {
  Button,
  ShareItemContainer
} from './styles'; 
import { Send } from 'react-native-iconly'


export function ShareButton({...rest }) {
    
    return (
        <Button
            {...rest}
        >
            <ShareItemContainer>
                <Send size={18} set='bold' color={'#2B90D9'}/>
            </ShareItemContainer>
        </Button>
    );
}