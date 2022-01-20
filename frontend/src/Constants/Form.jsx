import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { blogs, setUser } from '../Store/Action';
import Input from './Input';
import { Fetch } from './api';

const validateEmail = email => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const Form = props => {
  const Dispatch = useDispatch();
  const state = useSelector(state => state);
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Name, setName] = useState('');
  const [Phone, setPhone] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [Refer, setRefer] = useState('');

  const [EmailError, setEmailError] = useState('');
  const [PasswordError, setPasswordError] = useState('');
  const [NameError, setNameError] = useState('');
  const [PhoneError, setPhoneError] = useState('');
  const [ConfirmPasswordError, setConfirmPasswordError] = useState('');

  const submit = async () => {
    if (!validateEmail(Email)) {
      setEmailError('Email is not valid');
      return;
    }
    if (Email === '') {
      setEmailError('Email is required');
      return;
    }
    if (Password === '') {
      setPasswordError('Password is required');
      return;
    }
    if (props.Tab === 1) {
      if (Name === '') {
        setNameError('Name is required');
        return;
      }
      if (Phone.length > 10) {
        setPhoneError('Phone is not valid');
        return;
      }
      if (Phone === '') {
        setPhoneError('Phone is required');
        return;
      }
      if (ConfirmPassword === '') {
        setConfirmPasswordError('Confirm Password is required');
        return;
      }

      if (Password !== ConfirmPassword) {
        setConfirmPasswordError('Password and Confirm Password must be same');
        return;
      }
    }

    const LoginData = {
      Email,
      Password,
    };
    const RegisterData = {
      Email,
      Password,
      Name,
      Phone,
      ConfirmPassword,
      Refer,
    };
    const data = await Fetch(
      props.Tab === 0 ? '/user/login' : '/user/register',
      'POST',
      props.Tab === 0 ? LoginData : RegisterData
    );
    const { token, user } = data;
    if (!token) {
      alert(data.message);
      return;
    }
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    Dispatch(setUser(user));
    window.location.reload();
  };
  return (
    <Forms>
      <Model>
        <Title>
          <span>{props.title}</span>
          <span
            className="cross"
            onClick={() => {
              props.setTab(-1);
            }}
          >
            x
          </span>
        </Title>
        <Fields>
          {props.Tab === 0 ? (
            <>
              <Input
                label="Email"
                placeholder="Enter your email"
                value={Email}
                onchange={e => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
                error={EmailError}
              />
              <Input
                label="Password"
                placeholder="Enter your password"
                value={Password}
                onchange={e => {
                  setPassword(e.target.value);
                  setPasswordError('');
                }}
                error={PasswordError}
              />
            </>
          ) : (
            <>
              <Input
                label="Name"
                placeholder="Name"
                value={Name}
                onchange={e => {
                  setName(e.target.value);
                  setNameError('');
                }}
                error={NameError}
              />
              <Input
                label="Email"
                placeholder="Email"
                value={Email}
                onchange={e => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
                error={EmailError}
              />
              <Input
                label="Phone Number"
                placeholder="Phone Number"
                value={Phone}
                onchange={e => {
                  setPhone(e.target.value);
                  setPhoneError('');
                }}
                error={PhoneError}
              />
              <Input
                label="Password"
                placeholder="Password"
                value={Password}
                onchange={e => {
                  setPassword(e.target.value);
                  setPasswordError('');
                }}
                error={PasswordError}
              />
              <Input
                label="Confirm Password"
                placeholder="Confirm Password"
                value={ConfirmPassword}
                onchange={e => {
                  setConfirmPassword(e.target.value);
                  setConfirmPasswordError('');
                }}
                error={ConfirmPasswordError}
              />
              <Input
                placeholder="Campus id / Refer Code (Optional)"
                value={Refer}
                onchange={e => {
                  setRefer(e.target.value);
                }}
              ></Input>
            </>
          )}
        </Fields>
        <Button
          title={props.title}
          backgroundColor={'#3a5a5c'}
          Color="#FFF"
          onClick={submit}
        ></Button>

        <MidFotter>Forget Your Password</MidFotter>
        <Footer>
          Don't have an account yet{' '}
          <span onClick={() => props.setTab(props.Tab === 0 ? 1 : 0)}>
            {props.Tab === 1 ? 'Login' : 'Register'}
          </span>
        </Footer>
      </Model>
    </Forms>
  );
};

export default Form;
const Forms = styled.div`
  position: fixed;
  width: 100%;
  margin: 0;
  width: calc(100%);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;
const Model = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 300px;
  justify-content: space-between;
  border: 1px solid #3c5a5f;
  //   padding: 10px;
  padding: 14px 24px;
  border-radius: 5px;
  background-color: #f5f5f5;
  overflow: scroll;
  overflow-x: hidden;
  scrollbar-width: 10px;
  &::-webkit-scrollbar {
    scrollbar-width: 10px;
  }
`;
const Title = styled.div`
  text-align: center;
  font-size: 1.5rem;
  font-family: sans-serif;
  font-weight: bold;
  color: #5a6270;
  position: relative;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  .cross {
    cursor: pointer;
    position: absolute;
    right: 0px;
    font-size: 1rem;
    &:hover {
      color: #5a6270;
      font-weight: 600;
      font-size: 1.2rem;
    }
  }
`;
const Fields = styled.div`
  width: 100%;
`;
const MidFotter = styled.div`
  text-align: center;
  font-size: 1rem;
  font-family: 'Rubik', sans-serif;
  margin-bottom: 10px;
  margin-top: 5px;
`;
const Footer = styled.div`
  text-align: center;
  font-size: 1rem;
  font-family: 'Rubik', sans-serif;
  span {
    cursor: pointer;
    color: #0366d6;
  }
`;
