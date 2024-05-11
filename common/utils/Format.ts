
/**
 * 
 * @param inputDate a Date
 * @param withYear a boolean that indicates whether the year should be specified
 * @returns a string in the following format: 'DayOfTheWeek XX Month (Year)' 
 *          for example: Mardi 07 Mai 2024
 */
function FormatDate(inputDate: Date, withYear: boolean): string {
    const daysOfWeek = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

    const dayOfWeek = daysOfWeek[inputDate.getDay()];
    const dayOfMonth = ("0" + inputDate.getDate()).slice(-2)
    const month = months[inputDate.getMonth()];
    const year = inputDate.getFullYear();

    if (withYear) {
        return `${dayOfWeek} ${dayOfMonth} ${month} ${year}`;
    }
    return `${dayOfWeek} ${dayOfMonth} ${month}`;
};


/**
 * 
 * @param inputDate a Date
 * @returns a string in the following format: 'Hour h Minutes'
 *          for example: 11h00
 */
const FormatHour = (inputDate: Date) => {
    let utc = inputDate.getTime() + (inputDate.getTimezoneOffset() * 60000);
    var utcDate = new Date(utc);

    let hours = ("0" + utcDate.getHours()).slice(-2)
    let minutes = ("0" + utcDate.getMinutes()).slice(-2)
    return `${hours}h${minutes}`
}

/**
 * if formating fails, the original phone number is returned.
 * 
 * @param phoneNumber
 * @returns the formatted phone number as follows: XX.XX.XX.XX.XX
 */
const FormatPhoneNumber = (phoneNumber: string) => {
    let splitPhoneNumber = phoneNumber.match(/.{1,2}/g);
    let formattedPhoneNumber = splitPhoneNumber?.join('.')
    return formattedPhoneNumber?formattedPhoneNumber:phoneNumber
}

export { FormatDate, FormatHour, FormatPhoneNumber }