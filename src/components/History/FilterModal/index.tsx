import React, { useState } from 'react';
import Modal from 'react-native-modal'
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Red from '../../../assets/images/Icons/colors/red.svg'
import Blue from '../../../assets/images/Icons/colors/blue.svg'
import Cyan from '../../../assets/images/Icons/colors/cyan.svg'
import Green from '../../../assets/images/Icons/colors/green.svg'
import Black from '../../../assets/images/Icons/colors/black.svg'
import Pink from '../../../assets/images/Icons/colors/pink.svg'
import Yellow from '../../../assets/images/Icons/colors/yellow.svg'
import NoColor from '../../../assets/images/Icons/colors/none.svg'
import styles from './styles'
import MonthPicker from 'react-native-month-year-picker';
import { Colors } from '../../../interfaces/colors';
import MonthSelectorCalendar from 'react-native-month-selector'; 
import moment, { Moment } from 'moment';


interface ModalInterface {
  visible: boolean,
  pressedOut: () => void,
  confirmedFilter: (data: FilterData) => Promise<void>,
  initialDateValue: undefined
}

interface FilterData {
  color: string,
  date: Date | undefined
}

export const colorsIconsList = [
  <Red key={'red'} />,
  <Green key={'green'} />,
  <Blue key={'blue'} />,
  <Yellow key={'yellow'} />,
  <Cyan key={'cyan'} />,
  <Pink key={'pink'} />,
  <Black key={'black'} />,
  <NoColor key={'noFilter'} />,
]


const FilterModal = ({ visible, pressedOut, confirmedFilter }: ModalInterface) => {
  const [selectedColor, setSelectedColor] = useState<Colors>('noFilter')
  const [calendarVisible, setCalendarVisible] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Moment | undefined>(undefined)

  return (
    <>
      <Modal
        style={visible ? styles.dropdownStyle : { display: 'none' }}
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        isVisible={visible}
        onBackdropPress={pressedOut}
      >
        <TouchableWithoutFeedback>
          <TouchableOpacity
            activeOpacity={1}
            onPressOut={() => { }}
          >
            <View style={styles.outerModalContainer}>
              <View style={styles.modalContainer}>
                <View style={styles.colorContainer}>
                  <TouchableOpacity style={styles.dropdownOptions}>
                    <Text style={styles.headerText}>Ordenar por cor</Text>
                  </TouchableOpacity>
                  <View style={styles.colorIconsContainer}>
                    {colorsIconsList.map(color => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedColor(color.key as Colors)
                          }}
                          style={selectedColor === color.key && styles.selectedColor}
                        >
                          {color}
                        </TouchableOpacity>
                      )
                    })}
                  </View>
                </View>
                <View style={styles.dateContainer}>
                  <Text style={[styles.headerText, styles.orderDataText]}>Ordenar por data</Text>
                  <MonthSelectorCalendar
                    selectedDate={selectedDate}
                    containerStyle={styles.calendarContainer}
                    minDate={moment(new Date(2020, 0, 1))}
                    nextIcon={<Text style={styles.arrowCalendar}>{'>'}</Text>}
                    prevIcon={<Text style={styles.arrowCalendar}>{'<'}</Text>}
                    seperatorColor={'#2B90D9'}
                    selectedBackgroundColor={'#fff'}
                    selectedMonthTextStyle={styles.selectedMonth}
                    currentMonthTextStyle={styles.monthText}
                    onMonthTapped={(date: Moment) => setSelectedDate(date)} 
                  />
                </View>
                <View style={styles.bottomContainer}>
                  <TouchableOpacity onPress={() => {
                    setCalendarVisible(false)
                    setSelectedDate(undefined)
                    pressedOut()
                  }}>
                    <Text style={[styles.bottomText, styles.cancelText]}>CANCELAR</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    setCalendarVisible(false)
                    confirmedFilter({
                      date: selectedDate?.toDate(),
                      color: selectedColor
                    })
                    setSelectedDate(undefined)
                  }}>
                    <Text style={styles.bottomText}>CONFIRMAR</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {calendarVisible && (
                <View style={{
                  opacity: 1,
                  width: 40,
                  height: 60,
                  backgroundColor: 'blue',
                  display: 'flex',
                  marginTop: 'auto',
                  alignSelf: 'flex-start'
                }}>
                  <Text>Eu peguei do git</Text>
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
                </View>
              )}
            </View>
          </TouchableOpacity>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  )
}

export default FilterModal