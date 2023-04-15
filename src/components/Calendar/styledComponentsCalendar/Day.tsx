import { IDayProps } from "../../../interfaces/IDayProps"
import styled, { css } from 'styled-components'
import { ReactNode } from "react";

interface Props {
    children?: ReactNode;
    onClick?: () => void;
    dayColor?: string;
    daySize?: number;
}

const commonStyles = css<Props>`
    width: ${props => props.daySize  + 'px' || props.theme.size.primary + 'px'};
    height: ${props => props.daySize  + 'px' || props.theme.size.primary + 'px'};
    font-family: Helvetica Neue,helvetica,arial,sans-serif;    
    font-size: 12px;     
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid transparent;
    border-radius: 4px;

    color: #363636;
    cursor: pointer;

    &:hover {
    background-color: #dbdbdb;
    }
`
const StyledDayNormal = styled.div<Props>`
    ${commonStyles}
`
const StyledDayNotOfCurrentMonth = styled.div<Props>`
    ${commonStyles}

    color: #c7c7c7;
    cursor: default;
`
const StyledDayIsToday = styled.div<Props>`
    ${commonStyles}
    font-weight: bold;
    color: white;
    background-color: ${props => props.dayColor || props.theme.colors.primary};
`
const StyledDaySelected = styled.div<Props>`
    ${commonStyles}
    border: 2px solid ${props => props.dayColor || props.theme.colors.primary};
`

export const Day = ({ day, onClickHandler, initialDate, date, selectedDate, color, size }: IDayProps) => {
    
    const isToday = (day: number) => day === initialDate.day && date.month === initialDate.month && date.year === initialDate.year;
    const isSelectedDay = (day: number) => day === selectedDate.day && date.month === selectedDate.month && date.year === selectedDate.year;

    return (
        <>
            {!day.isThisDayofCurrentMonth &&
                <StyledDayNotOfCurrentMonth
                    daySize={size}
                >
                    {day.day}
                </StyledDayNotOfCurrentMonth>}
            {isToday(day.day) && day.isThisDayofCurrentMonth &&
                <StyledDayIsToday
                    onClick={onClickHandler}
                    dayColor={color}
                    daySize={size}
                >
                    {day.day}
                </StyledDayIsToday>}
            {isSelectedDay(day.day) && !isToday(day.day) && day.isThisDayofCurrentMonth &&
                <StyledDaySelected
                    onClick={onClickHandler}
                    dayColor={color}
                    daySize={size}
                >
                    {day.day}
                </StyledDaySelected>}
            {day.isThisDayofCurrentMonth && !isToday(day.day) && !isSelectedDay(day.day) &&
                <StyledDayNormal
                    onClick={onClickHandler}
                    daySize={size}
                >
                    {day.day}
                </StyledDayNormal>}
        </>
    )
}
