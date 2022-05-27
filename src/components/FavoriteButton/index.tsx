import React from 'react';
import { BorderlessButtonProps } from 'react-native-gesture-handler';
import { Heart2 } from 'react-native-iconly';
import { useTheme } from 'styled-components/native';
import { Button, FavoriteItemContainer } from './styles';

interface FavoriteButtonProps extends BorderlessButtonProps {
  favorite: boolean;
  background?: 'WHITE' | 'BLUE';
}

export function FavoriteButton({
  favorite,
  background,
  ...rest
}: FavoriteButtonProps) {
  const theme = useTheme();
  const iconColor = background! === 'WHITE' ? theme.colors.primary : 'white';
  const selectedIcon = <Heart2 set="bold" size={18} primaryColor={iconColor} />;
  const notSelectedIcon = <Heart2 size={18} primaryColor={iconColor} />;

  return (
    <Button {...rest}>
      <FavoriteItemContainer background={background!}>
        {favorite ? selectedIcon : notSelectedIcon}
      </FavoriteItemContainer>
    </Button>
  );
}
