import React, { useEffect, useState } from 'react';
import Card from '../Constants/Card';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
// import { blogs } from '../Store/Action';
// import { Fetch } from '../Constants/api';
const Blogs = () => {
  const state = useSelector(state => state);
  // const { blogs } = state;
  console.log(state);
  return (
    <>
      <Title>MyWays Blogs</Title>
      <Container>
        {state.blogs.map((item, index) => {
          return <Card data={item} key={item._id} />;
        })}
      </Container>
    </>
  );
};

export default Blogs;
const Title = styled.h1`
  text-align: left;

  margin-left: 50px;
  font-size: 2rem;
  padding-left: 60px;
  font-family: 'Rubik', sans-serif;
`;
const Container = styled.div`
  padding: 60px;

  margin-left: 50px;
  margin-right: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 50px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    padding: 40px;
  }
  @media (max-width: 425px) {
    grid-template-columns: 1fr;
    padding: 20px;
  }
`;
