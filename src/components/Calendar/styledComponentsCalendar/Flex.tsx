import styled from 'styled-components'
import { ReactNode } from "react";

interface Props {
    children?: ReactNode;
}

const StyledFlex = styled.div`
display: flex;
`

export const Flex = (props:Props) => {
    return (       
        <StyledFlex {...props}/>       
    )
}