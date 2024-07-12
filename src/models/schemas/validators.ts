/**
 * throws error if the date is more than a minute before current time
 * @param date date
 */
export function isAfterNow(date: Date) {
    const now = new Date();
    const ONE_MINUTE = 60 * 1000;
    if (date.getTime() - now.getTime() < ONE_MINUTE) {
        throw Error("Car availability date cannot start from the past");
    }
}
