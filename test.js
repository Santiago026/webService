function fecha1() {
    const dateString = "31/03/23";
    const parts = dateString.split("/");
    const year = 2000 + parseInt(parts[2]); // Sumar 2000 para convertir "23" en "2023"
    const month = parseInt(parts[1]) - 1; // Restar 1 para que el mes sea de 0 a 11 en lugar de 1 a 12
    const day = parseInt(parts[0]);
    const date1 = new Date(year, month, day);
    return (date1)
}


function parseDate(dateStr) {
    // Convierte una fecha en formato "dd/mm/aa" a un objeto Date
    const [day, month, year] = dateStr.split('/');
    return new Date(`${month}/${day}/${year}`);
}

function daysBetweenDates(date1, date2) {
    // Calcula la diferencia en días entre dos fechas
    const differenceInMs = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
}

function validateDateDifference(date1Str, date2Str, maxDaysDifference) {
    // Valida que la diferencia en días entre dos fechas no sea mayor a maxDaysDifference
    const date1 = parseDate(date1Str);
    const date2 = parseDate(date2Str);
    const difference = daysBetweenDates(date1, date2);
    return difference <= maxDaysDifference;
}
  
// Ejemplo de uso
const fecha1Input = '10/02/23';
const fecha2Input = '01/03/23';
const maxDaysDifference = 31;
  
if (!validateDateDifference(fecha1Input, fecha2Input, maxDaysDifference)) {
console.log(`La diferencia entre las dos fechas no puede ser mayor a ${maxDaysDifference} días.`);
}

////////////
    // const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{2}$/;
    // if(!regex.test(start_date) || !regex.test(end_date)){
    //   return res.status(400).json({message:"start_date and end_date must be in format dd/mm/yyyy"});
    // }
    // //Validate that the year of start_date are not major a year of end_date
    // else if(start_date.split("/")[2]>end_date.split("/")[2]){
    //   return res.status(400).json({message:"The year the start_date is major than end_date"});
    // }
    // /**Validate that the month of start_date are not major a month of end_date,
    // if the year of start_date are equal to the year of end_date and 
    // the day the start_date is major than the day of end_date
    // **/
    // else if(start_date.split("/")[1]>end_date.split("/")[1]&&
    //   start_date.split("/")[2]===end_date.split("/")[2]&&
    //   start_date.split("/")[0]>end_date.split("/")[0]
    // ){
    //   return res.status(400).json({message:"The month start_date not must be  major than the month of start_end"});
    // }
    // //Validate that start_date is less than end_date
    // else if(start_date>end_date){
    //   return res.status(400).json({message:"start_date must be less than end_date"});
    // }    


    ////////////////////7
    
