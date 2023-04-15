import styled from 'styled-components'
import { forwardRef, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  value: string;
  onChange: (e:any) => void;
  onFocus: () => void;
  width?: number;
  color?: string;
}
export type Ref = HTMLInputElement;

const StyledInput = styled.input`
  height: 30px;
  width: ${props => props.width + 'px'|| props.theme.width.primary + 'px'};
  border-radius: 4px;
  border: 1px solid #dbdbdb; 
  padding-left: 5px;

  &:focus {
      outline: 1px solid ${props => props.color || props.theme.colors.primary};
    }
`

export const Input = forwardRef<Ref, Props>((props, ref) => (
  <StyledInput ref={ref} {...props} type={'text'} value={props.value} onChange={props.onChange} onFocus={props.onFocus}/>
));
