import { IDay } from './../interfaces/IDay';
import { useState } from 'react'

export const useCalendar = () => {
    const DAYS_IN_WEEK = 7;

    const [calenarShow, setCalenarShow] = useState<boolean>(false)

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
        const result: IDay[][] = [];
        let day = 1; // первый день месяца

        for (let i = 0; i < numberOfWeeks(year, month); i++) {
            result[i] = [];

            for (let j = 0; j < DAYS_IN_WEEK; j++) {
                const date = new Date(year, month, day);
                const dayOfDate = date.getDate();

                if (i === 0 && j < dayOfWeek(year, month)) {
                    result[i][j] = {
                        day: new Date(year, month, j + 1 - dayOfWeek(year, month)).getDate(),
                        isThisDayofCurrentMonth: false
                    }

                } else {
                    date.getMonth() > month ?
                        result[i][j] = {
                            day: dayOfDate,
                            isThisDayofCurrentMonth: false
                        }
                        :
                        result[i][j] = {
                            day: dayOfDate,
                            isThisDayofCurrentMonth: true
                        }
                    day++
                }
            }
        }
        return result;
    }

    function getInputValue(year: number, month: number, day: number) {
        const date = new Date(year, month, day);
        return date.toLocaleDateString()
    }

    function getDateFromInputDate(inputDate: string | undefined) {
        const dateText = inputDate;
        const dateArr = dateText?.split('.');

        if (dateArr?.length !== 3) return false

        const year: string = dateArr[2];
        const isYearValid: Boolean = year.length === 4 && Number(year) > 0;

        const month: string = dateArr[1];
        const isMonthValid: Boolean = month.length === 2 && Number(month) >= 1 && Number(month) <= 12;

        const day: string = dateArr[0];
        const isDayValid: Boolean = day.length === 2 && Number(day) >= 1 && Number(day) <= daysInMonth(Number(year), Number(month));

        if (isYearValid && isMonthValid && isDayValid) return {
            year: Number(year),
            month: Number(month) - 1,
            day: Number(day)
        };
        return false
    }

    return { getMonthData, getInputValue, calenarShow, setCalenarShow, getDateFromInputDate }
}
