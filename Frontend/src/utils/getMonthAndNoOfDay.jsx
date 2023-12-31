export const GetTheMonthAndNoOfDaysBasedOnInput = (currentMonth) => {
  // Specify the desired month (0-indexed)
  let desiredMonth = currentMonth - 1;

  // Create a new date object
  let d = new Date();

  // Set the date to the first day of the desired month
  d.setMonth(desiredMonth, 1);

  // Calculate the first day of the next month
  let firstDayOfNextMonth = new Date(d.getFullYear(), desiredMonth + 1, 1);

  // Calculate the last day of the current month (subtract one day from the first day of the next month)
  let lastDayOfMonth = new Date(firstDayOfNextMonth - 1);

  // Get the number of days in the desired month
  let numberOfDaysInMonth = lastDayOfMonth.getDate();
  const CurrentMonth = desiredMonth + 1; // Adding 1 because months are 0-indexed
  let currentYear = d.getFullYear();
  return { currentYear, CurrentMonth, numberOfDaysInMonth };
};

export const getCurrentMonthAndDays = () => {
  let d = new Date();

  // Get the current month (0-indexed)
  let currentMonth = d.getMonth();
  let currentYear = d.getFullYear();

  // Calculate the first day of the next month
  let firstDayOfNextMonth = new Date(d.getFullYear(), currentMonth + 1, 1);

  // Calculate the last day of the current month (subtract one day from the first day of the next month)
  let lastDayOfMonth = new Date(firstDayOfNextMonth - 1);

  // Get the number of days in the current month
  let numberOfDaysInMonth = lastDayOfMonth.getDate();

  return { currentYear, currentMonth: currentMonth + 1, numberOfDaysInMonth }; // Adding 1 because months are 0-indexed
};

// Get Months Name
export const getMonthNames = (monthNumber) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthShortForms = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  if (monthNumber >= 1 && monthNumber <= 12) {
    return {
      monthFullForm: months[monthNumber - 1],
      monthShortForm: monthShortForms[monthNumber - 1],
    };
  } else {
    return "Invalid Month Number";
  }
};
