import React from 'react';
import stlyed from 'styled-components';
const Input = props => {
  return (
    <div
      style={{
        marginBottom: '10px',
      }}
    >
      <DIV className={props.className}>
        {/* <label htmlFor={props.label}> {props.label}</label> */}
        <input
          className={props.className}
          value={props.value}
          type={props.type || 'text'}
          id={props.label}
          placeholder={props.placeholder}
          onChange={props.onchange}
        />
      </DIV>
      {props.error && <Error>{props.error}</Error>}
    </div>
  );
};

export default Input;
const DIV = stlyed.div`
    padding: 5px; 
    width: 100%;
    display: flex;
    justify-content: space-between; 
    align-items: center;    
    label {
        font-size: 1.2rem;
        font-weight: bold;
    }
    input{
        border: 1px solid #ccc;
        outline: none;
        width: 100%;
        padding : 10px;
        font-size: 1rem;
    }
`;

const Error = stlyed.div`
    // padding : 0 5px ;
    color: #000;
    font-size: 1.2rem;
    font-weight: bold;
    font-style: italic;
    background-color:  #ff00005c;
    padding : 5px;
    margin-left: 5px;
    width: 98%;
`;
