import React, {useState} from "react";

function DateField({defaultDate}) {
  const [date, setDate] = useState(defaultDate); // set the initial value to the default date value passed as a prop

  // console.log(date, "date");
  const handleDateChange = (event) => {
    setDate(event.target.value); // update the state with the new value
  };

  return (
    <form>
      <label htmlFor="date">Register Date:</label>
      <input
        type="date"
        id="date"
        name="date"
        value={date}
        onChange={handleDateChange}
      />
    </form>
  );
}

export default DateField;
