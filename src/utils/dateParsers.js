let dates = (date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (day < 10) {
        day =  `0${day}`
    }

    if (month < 10) {
        month =  `0${month}`
    }

    return {
        day,
        month,
        year
    }

  }
  
  // Devuelve string -> dd/mm/yyyy - hh:mm:ss
  export const dateToString = (date) => {
    const { day, month, year } = dates(date);
    return `${year}-${month}-${day}`;
  }