import React from 'react';
import {BorderlessButtonProps} from 'react-native-gesture-handler';
import {Filter} from 'react-native-iconly';
import {useTheme} from 'styled-components/native';
import {Container, FilterItemContainer} from './styles';

interface FilterButtonProps extends BorderlessButtonProps {}

export function FilterButton({...rest}: FilterButtonProps) {
  const theme = useTheme();
  return (
    <Container {...rest}>
      <FilterItemContainer>
        <Filter color={theme.colors.shape} size={16} />
      </FilterItemContainer>
    </Container>
  );
}
