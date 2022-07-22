import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {
  Footer,
  ModalContainer,
  ModalConfirmButtonText,
  ModalCancelButtonText,
  BottomButton,
  ColorsContainer,
  ColorOrderContainer,
  ColorOrderText,
  BlackIcon,
  CyanIcon,
  GreenIcon,
  PinkIcon,
  YellowIcon,
  RedIcon,
  NoColorIcon,
  BlueIcon,
} from './styles';
import {SvgProps} from 'react-native-svg';
import MonthSelectorCalendar from 'react-native-month-selector';
import moment, {Moment} from 'moment';
import {StyleSheet} from 'react-native';
import {ColorsSelect} from '../../ColorsSelect';
import {useTheme} from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import theme from '../../../global/styles/theme';
import {ChevronLeft, ChevronRight} from 'react-native-iconly';
import 'moment/locale/pt-br';

interface ModalInterface {
  visible: boolean;
  pressedOut: () => void;
  confirmedFilter: (data: FilterData) => Promise<void>;
  initialDateValue?: undefined;
  setSelectedColor: (color: Colors) => void;
  selectedColor: Colors;
  setSelectedDate: (date: Moment | undefined) => void;
  selectedDate: Moment | undefined;
}

interface FilterData {
  color: string;
  date: Date | undefined;
}

export interface colorsIconsProps {
  key: string;
  icon: React.FC<SvgProps>;
}

export const colorsIconsList = [
  {
    key: 'black',
    icon: BlackIcon,
  },

  {
    key: 'blue',
    icon: BlueIcon,
  },

  {
    key: 'cyan',
    icon: CyanIcon,
  },
  {
    key: 'green',
    icon: GreenIcon,
  },

  {
    key: 'pink',
    icon: PinkIcon,
  },

  {
    key: 'red',
    icon: RedIcon,
  },

  {
    key: 'yellow',
    icon: YellowIcon,
  },

  {
    key: 'noFilter' || 'noColor',
    icon: NoColorIcon,
  },
];

export function FilterModal({
  visible,
  pressedOut,
  confirmedFilter,
  setSelectedColor,
  selectedColor,
  setSelectedDate,
  selectedDate,
}: ModalInterface) {
  const theme = useTheme();
  const [calendarVisible, setCalendarVisible] = useState(false);

  function handleOpenCalendar() {
    setCalendarVisible(true);
  }

  function handleCloseCalendar() {
    const date = undefined;
    setCalendarVisible(false);
    setSelectedDate(date);
  }
  return (
    <Modal
      animationIn={'slideInRight'}
      animationOut={'slideOutRight'}
      isVisible={visible}
      onBackdropPress={pressedOut}
      useNativeDriver>
      <ModalContainer>
        <ColorsContainer>
          <ColorOrderContainer>
            <ColorOrderText>Ordenar por cor</ColorOrderText>
          </ColorOrderContainer>

          <ColorsSelect
            data={colorsIconsList}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        </ColorsContainer>

        <MonthSelectorCalendar
          localeLanguage="pt-br"
          selectedDate={selectedDate}
          currentDate={undefined}
          minDate={moment(new Date(2020, 0, 1))}
          nextIcon={
            <ChevronRight set="bold" size={32} color={theme.colors.dark_800} />
          }
          prevIcon={
            <ChevronLeft set="bold" size={32} color={theme.colors.dark_800} />
          }
          seperatorColor={theme.colors.primary}
          selectedBackgroundColor={theme.colors.white}
          onMonthTapped={(date: Moment) => setSelectedDate(date)}
          currentMonthTextStyle={calendarStyles.currentMonthText}
          selectedMonthTextStyle={
            selectedDate === undefined
              ? calendarStyles.monthText
              : calendarStyles.selectedMonth
          }
          containerStyle={calendarStyles.calendarContainer}
          monthTextStyle={calendarStyles.monthText}
          monthDisabledStyle={calendarStyles.monthDisabledText}
          yearTextStyle={calendarStyles.yearText}
        />

        <Footer>
          <BottomButton
            onPress={() => {
              handleCloseCalendar();
              pressedOut();
            }}>
            <ModalCancelButtonText>cancelar</ModalCancelButtonText>
          </BottomButton>

          <BottomButton
            onPress={() => {
              handleCloseCalendar();
              setSelectedDate(undefined);
              confirmedFilter({
                date: selectedDate?.toDate(),
                color: selectedColor,
              });
            }}>
            <ModalConfirmButtonText>confirmar</ModalConfirmButtonText>
          </BottomButton>
        </Footer>
      </ModalContainer>
    </Modal>
  );
}

const calendarStyles = StyleSheet.create({
  calendarContainer: {
    width: RFValue(250),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colors.text,
  },

  yearText: {
    fontSize: RFValue(24),
    fontFamily: theme.fonts.extra_bold,
    color: theme.colors.dark_800,
  },

  monthText: {
    fontSize: RFValue(14),
    fontFamily: theme.fonts.medium,
    color: theme.colors.subtitle,
  },

  currentMonthText: {
    fontSize: RFValue(14),
    fontFamily: theme.fonts.semi_bold,
    color: theme.colors.attention_light,
  },

  monthDisabledText: {
    fontSize: RFValue(14),
    fontFamily: theme.fonts.regular,
    color: theme.colors.medium_line,
  },

  calendarText: {
    fontSize: RFValue(14),
    fontFamily: theme.fonts.regular,
  },

  selectedMonth: {
    fontSize: RFValue(14),
    fontFamily: theme.fonts.bold,
    color: theme.colors.dark_800,
    textAlign: 'center',
    padding: RFValue(2),
    borderRadius: RFValue(16),
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  arrowCalendar: {
    fontSize: RFValue(32),
  },
});
