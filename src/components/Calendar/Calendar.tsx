import { useState } from 'react'
import { useCalendar } from '../../hooks/useCalendar'
import { IDate } from '../../interfaces/IDate'

const MONTH_NAMES = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
const WEEK_DAY_NAMES = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

export const Calendar = () => {

    const { getMonthData } = useCalendar();

    const initialDate = {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate()
    }

    const [date, setDate] = useState<IDate>(initialDate)

    const YEARS = [date.year - 3, date.year - 2, date.year - 1, date.year, date.year + 1, date.year + 2, date.year + 3]

    // console.log(getMonthData(date.year, date.month));

    const selectMonthCangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDate(date => ({ ...date, month: Number(event.target.value) }));
    }
    const selectYearCangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDate(date => ({ ...date, year: Number(event.target.value) }));
    }
    const prevMonthButtonClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        const newDate = new Date(date.year, date.month - 1);
        const newMonth = newDate.getMonth();
        const newYear = newDate.getFullYear();
        setDate(date => ({ ...date, month: newMonth, year: newYear}));
    }
    const nextMonthButtonClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        const newDate = new Date(date.year, date.month + 1);
        const newMonth = newDate.getMonth();
        const newYear = newDate.getFullYear();
        setDate(date => ({ ...date, month: newMonth, year: newYear}));
    }

    const monthData = getMonthData(date.year, date.month)

    return (
        <div className="calendar">
            <header>
                <button onClick={prevMonthButtonClickHandler}>{'<'}</button>

                <select
                    value={date.month}
                    onChange={selectMonthCangeHandler}
                >
                    {MONTH_NAMES.map((name: string, index: number) =>
                        <option key={name} value={index} >{name}</option>
                    )}
                </select>

                <select
                    value={date.year}
                    onChange={selectYearCangeHandler}
                >
                    {YEARS.map(year =>
                        <option key={year} value={year}>{year}</option>
                    )}
                </select>

                <button onClick={nextMonthButtonClickHandler}>{'>'}</button>
            </header>
            <div className="table">
                <div className="table-header">
                    {WEEK_DAY_NAMES.map((month: string, index: number) =>
                        <div className="day" key={month}>{month}</div>
                    )}
                </div>


                {monthData.map((week: number[], index: number) =>
                    <div key={index} className="table-row">
                        {week.map((day: number, index: number) =>
                            <div className="day" key={index}>{day}</div>
                        )}
                    </div>
                )}

            </div>
        </div>
    )
}
