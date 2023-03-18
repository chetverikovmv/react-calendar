export const useCalendar = () => {
    const DAYS_IN_WEEK = 7;

    function daysInMonth(year: number, month: number) {
        let day = 28; // минимальное количество дней в месяце
        while (new Date(year, month, day + 1).getDate() > new Date(year, month, day).getDate()) {
            day++
        }
        return new Date(year, month, day).getDate()
    }

    function dayOfWeek(year: number, month: number) {
        const date = new Date(year, month);
        const dayOfWeekInJs = date.getDay();
        return dayOfWeekInJs === 0 ? 6 : dayOfWeekInJs - 1 // т.к. день недели в JS начинается с воскресенья
    }

    function numberOfWeeks(year: number, month: number) {
        return (daysInMonth(year, month) + dayOfWeek(year, month)) / DAYS_IN_WEEK
    }

    function getMonthData(year: number, month: number) {
        const result: number[][] = [];
        let day = 1; // первый день месяца

        for (let i = 0; i < numberOfWeeks(year, month); i++) {
            result[i] = [];

            for (let j = 0; j < DAYS_IN_WEEK; j++) {
                const date = new Date(year, month, day);
                const dayOfDate = date.getDate();

                if (i === 0 && j < dayOfWeek(year, month)) {
                    result[i][j] = new Date(year, month, j + 1 - dayOfWeek(year, month)).getDate()
                } else {
                    result[i][j] = dayOfDate;
                    day++
                }
            }
        }
        return result;
    }
    return { getMonthData }
}
