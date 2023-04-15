import styled from 'styled-components'
import { ReactNode } from "react";

interface Props {
    children?: ReactNode;
    onClick: () => void;
}

const StyledButton = styled.button<Props>`
    width: 30px;
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
export const Button = (props: Props) => {
    return (
        <StyledButton {...props} onClick={props.onClick}/>
    )
}