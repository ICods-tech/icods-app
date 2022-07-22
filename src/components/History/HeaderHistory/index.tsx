import {Moment} from 'moment';
import React, {useState} from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import {useTheme} from 'styled-components';
import {FavoriteButton} from '../../FavoriteButton';
import {FilterButton} from '../../FilterButton';
import Header from '../../Header';
import {SearchInput} from '../../SearchInput';
import {FilterModal} from '../FilterModal';
import {Container, OptionalButtonsContainer, SearchContainer} from './styles';

interface HeaderHistoryProps {
  favorite: boolean;
  qrCodeDetails?: boolean;
  setFavorite: () => void;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setColorAndDate: ({date, color}: ColorAndDateProps) => void;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSelectedColor?: (color: Colors) => void;
  selectedColor?: Colors;
  backButtonPressed?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSelectedDate?: (date: Moment | undefined) => void;
  selectedDate?: Moment | undefined;
}

interface ColorAndDateProps {
  color: string;
  date: Date | undefined;
}

export function HeaderHistory({
  setColorAndDate,
  setFavorite,
  favorite,
  qrCodeDetails,
  setSelectedColor,
  backButtonPressed,
  selectedColor,
  setSelectedDate,
  selectedDate,
}: HeaderHistoryProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const theme = useTheme();
  const [searchEntry, setSearchEntry] = useState('');

  function SearchInputSubmitTest() {
    setSearchEntry('Input do Histórico funcionando');
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header
          title="Histórico"
          navigate="back"
          customBackBehavior={backButtonPressed}
        />
        {!qrCodeDetails && (
          <SearchContainer>
            <SearchInput
              autoCorrect
              autoCapitalize="none"
              placeholder="Procurar"
              placeholderTextColor={theme.colors.subtitle}
              onChangeText={(text) => setSearchEntry(text)}
              onSubmitEditing={() => SearchInputSubmitTest()}
              submitFunction={() => SearchInputSubmitTest()}
              value={searchEntry}
              returnKeyType="send"
            />

            <OptionalButtonsContainer>
              <FavoriteButton
                onPress={() => setFavorite()}
                favorite={favorite}
              />
              <FilterButton onPress={() => setModalVisible(!modalVisible)} />
              <FilterModal
                visible={modalVisible}
                setSelectedColor={setSelectedColor!}
                selectedColor={selectedColor!}
                pressedOut={() => setModalVisible(!modalVisible)}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate!}
                confirmedFilter={async ({date, color}) => {
                  setModalVisible(false);
                  setColorAndDate({date, color});
                }}
              />
            </OptionalButtonsContainer>
          </SearchContainer>
        )}
      </Container>
    </TouchableWithoutFeedback>
  );
}
