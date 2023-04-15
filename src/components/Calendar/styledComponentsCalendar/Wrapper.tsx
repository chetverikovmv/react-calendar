import styled from 'styled-components'
import { forwardRef, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}
export type Ref = HTMLDivElement;

const StyledWrapper = styled.div`
  display: inline-block;
  position: relative;
  margin: 0;
`


export const Wrapper = forwardRef<Ref, Props>((props, ref) => (

  <StyledWrapper ref={ref} {...props} />

));



