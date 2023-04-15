import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useCalendar } from '../../hooks/useCalendar'
import { IDate } from '../../interfaces/IDate'
import { IDay } from '../../interfaces/IDay'
import { RefObject } from 'react';
import { Wrapper } from './styledComponentsCalendar/Wrapper'
import { Input } from './styledComponentsCalendar/Input'
import { CalendarWrapper } from './styledComponentsCalendar/CalendarWrapper'
import { ICalendarProps } from '../../interfaces/ICalendarProps'
import { Button } from './styledComponentsCalendar/Button'
import { Select } from './styledComponentsCalendar/Select'
import { Flex } from './styledComponentsCalendar/Flex'
import { DayOfWeek } from './styledComponentsCalendar/DayOfWeek'
import { Day } from './styledComponentsCalendar/Day'

const MONTH_NAMES = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
const WEEK_DAY_NAMES = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

export const Calendar = ({ calendarWidth, inputWidth, mainColor }: ICalendarProps) => {
    const { getMonthData, getInputValue, calenarShow, setCalenarShow, getDateFromInputDate } = useCalendar();

    const initialDate = {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate()
    }

    const [date, setDate] = useState<IDate>(initialDate)
    const [selectedDate, setSelectedDate] = useState<IDate>(initialDate)
    const inputValue = getInputValue(selectedDate.year, selectedDate.month, selectedDate.day);
    const [inputTitle, setInputTitle] = useState(inputValue);

    useEffect(() => {
        setInputTitle(inputValue)
    }, [inputValue]);


    const YEARS = [date.year - 3, date.year - 2, date.year - 1, date.year, date.year + 1, date.year + 2, date.year + 3]

    const selectMonthCangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDate(date => ({ ...date, month: Number(event.target.value) }));
    }
    const selectYearCangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDate(date => ({ ...date, year: Number(event.target.value) }));
    }
    const changeDate = (numberOfDays: number) => {
        const newDate = new Date(date.year, date.month + numberOfDays);
        const newMonth = newDate.getMonth();
        const newYear = newDate.getFullYear();
        setDate(date => ({ ...date, month: newMonth, year: newYear }));
    }

    const prevMonthButtonClickHandler = () => changeDate(-1);
    const nextMonthButtonClickHandler = () => changeDate(+1);

    const dayClickHandler = (day: IDay) => {
        if (day.isThisDayofCurrentMonth) {
            setDate(date => ({ ...date, day: Number(day.day) }));
            setSelectedDate({
                year: date.year,
                month: date.month,
                day: day.day
            });
            setCalenarShow(false);
            if (!getDateFromInputDate(inputDate.current?.value)) {
                setInputTitle(inputValue);
            }
            console.log('selected date:', new Date(date.year, date.month, day.day))
        }
    }

    const inputFocusHandler = () => {
        setDate({
            year: selectedDate.year,
            month: selectedDate.month,
            day: selectedDate.day
        });
        setCalenarShow(true)
    }

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.target.value)

        const date = getDateFromInputDate(e.target.value);
        if (date) {
            setSelectedDate(date);
            setDate(date);
            console.log('selected date:', new Date(date.year, date.month, date.day))
        }
    }

    const monthData = getMonthData(date.year, date.month);

    const rootEl: RefObject<HTMLDivElement> = useRef(null);
    const inputDate: RefObject<HTMLInputElement> = useRef(null);
    
    const CALENAR_PADDING = 12;
    const daySize = calendarWidth && ((calendarWidth - CALENAR_PADDING) / 7)

    useEffect(() => {
        if (!calenarShow) return;
        const clickHandler = ({ target }: MouseEvent) => {
            if (!rootEl.current) return;
            if (!rootEl.current.contains(target as Node)) {
                setCalenarShow(false);

                if (!getDateFromInputDate(inputDate.current?.value)) {
                    setInputTitle(inputValue);
                }
            }
        }
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    }, [calenarShow, selectedDate]);

    useEffect(() => {
        if (!calenarShow) return;
        const keyHandler = (e: KeyboardEvent) => {
            if (e.key === 'Escape' || e.key === 'Enter') {
                setCalenarShow(false);

                if (!getDateFromInputDate(inputDate.current?.value)) {
                    setInputTitle(inputValue);
                }

                inputDate.current?.blur();
            }
        }
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    }, [calenarShow, selectedDate]);

    return (
        <Wrapper ref={rootEl}>
            <Input ref={inputDate} value={inputTitle} onChange={inputChangeHandler} onFocus={inputFocusHandler} width={inputWidth} color={mainColor} />
            {calenarShow && <CalendarWrapper wraperWidth={calendarWidth}>
                <header>
                    <Button onClick={prevMonthButtonClickHandler}>{'◀'}</Button>

                    <Select
                        value={date.month}
                        onChange={selectMonthCangeHandler}
                    >
                        {MONTH_NAMES.map((name: string, index: number) =>
                            <option key={name} value={index} >{name}</option>
                        )}
                    </Select>

                    <Select
                        value={date.year}
                        onChange={selectYearCangeHandler}
                    >
                        {YEARS.map(year =>
                            <option key={year} value={year}>{year}</option>
                        )}
                    </Select>

                    <Button onClick={nextMonthButtonClickHandler}>{'▶'}</Button>
                </header>

                <Flex>
                    {WEEK_DAY_NAMES.map((weekDay: string) =>
                        <DayOfWeek
                            key={weekDay}
                            daySize={daySize}
                        >
                            {weekDay}
                        </DayOfWeek>
                    )}
                </Flex>

                {monthData.map((week: IDay[], index: number) =>
                    <Flex key={index}>
                        {week.map((day: IDay, index: number) =>
                            <Day
                                key={index}
                                day={day}
                                onClickHandler={() => dayClickHandler(day)}
                                initialDate={initialDate}
                                date={date}
                                selectedDate={selectedDate}
                                color={mainColor}
                                size={daySize}
                            />
                        )}
                    </Flex>
                )}
            </CalendarWrapper>}
        </Wrapper>
    )
}


