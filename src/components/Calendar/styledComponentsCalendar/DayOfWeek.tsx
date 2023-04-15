import styled from 'styled-components'
import { ReactNode } from "react";

interface Props {
    children?: ReactNode;
    daySize?: number;
}

const StyledDayOfWeek= styled.div<Props>`
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
    font-weight: bold;

    &:hover {
    background-color: inherit;
    cursor: default;
    }
`
export const DayOfWeek = (props: Props) => {
    return (
        <StyledDayOfWeek {...props}/>
    )
}