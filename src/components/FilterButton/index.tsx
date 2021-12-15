import React from 'react';
import { BorderlessButtonProperties } from 'react-native-gesture-handler';
import { Filter } from 'react-native-iconly'
import {
    Container, 
    FilterIcon,
    FilterItemContainer, 
} from './styles';

interface FilterButtonProps extends BorderlessButtonProperties{
}

export function FilterButton({...rest}: FilterButtonProps){
    return (
        <Container
            {...rest}
        >
            <FilterItemContainer>
                <Filter color='#fff' size={16} />
            </FilterItemContainer>
        </Container>
    );
}