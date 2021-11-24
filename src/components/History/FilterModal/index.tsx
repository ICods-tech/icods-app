import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { 
  Container, 
  Footer, 
  ModalContainer, 
  ModalConfirmButtonText,
  ModalCancelButtonText,
  BottomButton,
  ColorsButtonList,
  ColorsContainer,
  ColorOrderContainer,
  ColorOrderText,
  Separator,
  ColorButton,
  BlackIcon,
  CyanIcon,
  GreenIcon,
  PinkIcon,
  YellowIcon,
  RedIcon,
  NoColorIcon,
  BlueIcon,
  DataContainer,
  DataText,
  SubmitButton,
  SubmitButtonText,
  calendarStyles
} from './styles';
import { SvgProps } from 'react-native-svg';
import MonthSelectorCalendar from 'react-native-month-selector'; 
import moment, { Moment } from 'moment';
import { Text } from 'react-native';
import { ColorsSelect } from '../../ColorsSelect';

interface ModalInterface {
  visible: boolean,
  pressedOut: () => void,
  confirmedFilter: (data: FilterData) => Promise<void>,
  initialDateValue?: undefined
}

interface FilterData {
  color: string,
  date: Date | undefined
}

export interface colorsIconsProps {
  key: string;
  icon:  React.FC<SvgProps>;
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
  }
]

export function FilterModal({
    visible, 
    pressedOut, 
    confirmedFilter 
  }: ModalInterface){
  const [selectedColor, setSelectedColor] = useState<Colors>('noFilter')
  const [calendarVisible, setCalendarVisible] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Moment | undefined>(undefined)

  function handleOpenCalendar(){
    setCalendarVisible(true)
  }

  function handleCloseCalendar(){
    setCalendarVisible(false)
  }
  return (
    <Container>
      <Modal
        style={{alignSelf: 'center'}}
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        isVisible={visible}
        onBackdropPress={pressedOut}
      >
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
            selectedDate={selectedDate}
            currentDate={undefined}
            containerStyle={calendarStyles.calendarContainer}
            minDate={moment(new Date(2020, 0, 1))}
            nextIcon={<Text style={calendarStyles.arrowCalendar}>{'>'}</Text>}
            prevIcon={<Text style={calendarStyles.arrowCalendar}>{'<'}</Text>}
            seperatorColor={'#2B90D9'}
            selectedBackgroundColor={'#fff'}
            selectedMonthTextStyle={(selectedDate === undefined)
              ? calendarStyles.monthText
              : calendarStyles.selectedMonth}
            currentMonthTextStyle={calendarStyles.monthText}
            onMonthTapped={(date: Moment) => setSelectedDate(date)} 
          />

          <Footer>
            <BottomButton 
              onPress={() => {
                handleCloseCalendar()
                pressedOut()
            }}>
              <ModalCancelButtonText>cancelar</ModalCancelButtonText>
            </BottomButton>
            
            <BottomButton
              onPress={() => {
                handleCloseCalendar()
                setSelectedDate(undefined)
                confirmedFilter({
                  date: selectedDate?.toDate(),
                  color: selectedColor
                })
              }}
              >
              <ModalConfirmButtonText>confirmar</ModalConfirmButtonText>
            </BottomButton>
          </Footer>
        </ModalContainer>
              {/* {calendarVisible && (
                <CalendarContainer>
                  <MonthPicker
                    okButton="Filtrar pelo mês"
                    cancelButton="Cancelar"
                    onChange={(event: any, newDate: any) => {
                      setSelectedDate(newDate)
                    }}
                    value={selectedDate ? selectedDate : new Date()}
                    maximumDate={new Date()}
                    locale="pt-BR"
                  />
                </CalendarContainer>
              )} */}
      </Modal>
    </Container>
  )
}