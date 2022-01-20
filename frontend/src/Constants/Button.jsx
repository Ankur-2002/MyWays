import React from 'react';
import styled from 'styled-components';
const Button = props => {
  return (
    <Buttons
      onClick={props.onClick}
      color={props.Color}
      style={{
        ...props.style,
      }}
      backgroundColor={props.backgroundColor}
    >
      {props.title}
    </Buttons>
  );
};

export default Button;
const Buttons = styled.button`
  padding: 10px;
  padding-left: 30px;
  padding-right: 30px;
  border: 2px solid #3c5a5f;
  cursor: pointer;
  border-radius: 5px;
  background-color: ${props => props.backgroundColor}}; 
  font-size: 15.2px;
  color: ${props => props.color};
  outline: none;
  font-weight: bold;
  width: 100%;
  &:hover {
    transition: 0.5s;
    background-color: #3c5a5f;
    color: white; !important;
  }
`;
