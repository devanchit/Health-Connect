//   console.log(date);
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const DateTimePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(date);
  };



  const isTimeValid = (date) => {
    const selectedMoment = moment(date);
    const startMoment = moment(date).hour(12).minute(0);
    const endMoment = moment(date).hour(14).minute(0);

    return selectedMoment.isSameOrAfter(startMoment) && selectedMoment.isSameOrBefore(endMoment);
  };

  const filterPassedTime = (time) => {
    const currentDate = moment();
    const selectedDate = moment(time);

    // Check if the selected date and time are not in the past and are valid
    return selectedDate.isSameOrAfter(currentDate) && isTimeValid(selectedDate);
  };

  return (
    <div>
      <h2>Date and Time Picker</h2>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={30}
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="Select date and time"
        minTime={moment().hour(12).minute(0)}
        maxTime={moment().hour(14).minute(0)}
        filterTime={filterPassedTime}
      />
      {selectedDate && (
        <p>You selected: {moment(selectedDate).format('MMMM D, YYYY h:mm A')}</p>
      )}
    </div>
  );
};

export default DateTimePicker;

