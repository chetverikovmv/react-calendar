import styled from 'styled-components'
import { ReactNode } from "react";

interface Props {
    children?: ReactNode;
    onChange: (e:any) => void;
    value: number
}

const StyledSelect = styled.select<Props>`
    flex: 1;
    height: 30px;
    border-radius: 4px;
    font-size: 12px;
    color: #363636;
    cursor: pointer;
    background-color: #fff;
    border: 1px solid #dbdbdb;

    &:focus {
    outline: none;
     }  
    &:hover {
    border: 1px solid #a7a7a7;
    }
`
export const Select = (props: Props) => {
    return (
        <StyledSelect {...props} onChange={props.onChange} value={props.value}/>
    )
}