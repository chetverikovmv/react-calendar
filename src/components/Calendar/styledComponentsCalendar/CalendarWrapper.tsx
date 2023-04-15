import styled from 'styled-components'
import { ReactNode } from "react";

interface Props {
    children?: ReactNode;
    wraperWidth?: number;
}

const StyledCalendarWrapper = styled.div<Props>`
    width: ${props => props.wraperWidth + 'px' || props.theme.width.primary + 'px'};
    padding: 5px;
    border-radius: 4px; 
    border: 1px solid #dbdbdb;
    background-color: #fff;
    position: absolute;
    top: 40px;

    &::before, &::after {
    content: ''; 
    position: absolute;
    left: 20px; top: -13px;
    border: 6px solid transparent;
    border-bottom: 6px solid #dbdbdb;
   }
   &::after {
    border-bottom: 6px solid white;
    top: -12px; 
   }
    
    header {
        display: flex;
        gap: 5px;
        justify-content: space-between;
        padding-top: 5px;
        padding-bottom: 5px;
    }
`
export const CalendarWrapper = (props: Props) => {
    return (
        <StyledCalendarWrapper {...props} />
    )
}