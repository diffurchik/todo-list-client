import styled from "styled-components";
type variant = 'empty' | 'danger-filled' | 'filled'
type size = 'small' | 'medium' | 'large'


export const Button = styled.button<{variant: variant, size: size }>`
  background-color:  ${({ variant }) => (variant === "empty" ? 'transparent' : variant === "danger-filled"? "red" : variant === 'filled'? 'blue' : 'grey')}; ;
  opacity: 0.65;
  width: ${({ size }) => (size === 'small' ? '150px' : size === 'medium' ? 'auto' : '100%')};
  display: 'flex';
  alignItems: 'center';
  justifyContent: 'center';
  padding: ${({ size }) => size === 'small' ? 4 : size === 'medium' ? 8 : 12}px;
  margin: 12px
  color: ${({variant}) => (variant === "danger-filled"? "black" : "grey")}
`;


