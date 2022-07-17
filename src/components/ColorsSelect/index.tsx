import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { colorsIconsProps } from '../History/FilterModal';

import { ColorButton, ColorsButtonList, Container, Separator } from './styles';

interface ColorsSelectProps {
  data: colorsIconsProps[];
  setSelectedColor: (key: Colors) => void;
  selectedColor: Colors;
}
export function ColorsSelect({
  data,
  setSelectedColor,
  selectedColor,
}: ColorsSelectProps) {
  return (
    <Container>
      <ColorsButtonList
        data={data}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => {
          const { icon: Icon, key } = item;
          return (
            <ColorButton
              onPress={() => setSelectedColor(key as Colors)}
              selectedColor={selectedColor}
              color={key as Colors}>
              <Icon width={RFValue(32)} height={RFValue(32)} />
            </ColorButton>
          );
        }}
        ItemSeparatorComponent={() => <Separator />}
      />
    </Container>
  );
}
