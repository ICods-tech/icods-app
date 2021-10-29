import React, { useState } from 'react';
import DatePicker from 'react-native-modern-datepicker';

const MonthYearPicker = () => {
  const [date, setDate] = useState('');

  return (
    <DatePicker
      mode="monthYear"
      selectorStartingYear={new Date().getFullYear()}
      onMonthYearChange={(selectedDate: string) => setDate(selectedDate)}
    />
  );
};

export default MonthYearPicker;