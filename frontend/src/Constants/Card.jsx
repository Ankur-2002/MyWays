import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Card = ({ data }) => {
  // console.log(data);
  return (
    <Container key={data._id}>
      <Image src={data.image} />
      <Description>
        <Top>
          <span className="title"> {data.title}</span>
          <span className="published">Published - 2021-10-03</span>
        </Top>
        <Bottom>{data.description}</Bottom>
      </Description>
      <Footer>
        <span>5 min Read</span>
        <NavLink
          to={{
            pathname: `/blog/${data._id}`,
          }}
          className="link"
        >
          Read More
        </NavLink>
      </Footer>
    </Container>
  );
};

export default Card;

const Container = styled.div`
  // padding: 10px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
  text-align: left;
`;
const Image = styled.img`
  width: 100%;
  height: 175px;
  background-size: contain;
`;
const Description = styled.div`
  padding: 16px;
`;
const Footer = styled.div`
  border-top: 1px solid #ccc;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 700;
  color: grey;
  .link {
    color: #00b4ff;
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
  }
`;
const Top = styled.div`
  display: flex;
  flex-direction: column;
  .title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .published {
    font-size: 1rem;
    font-weight: bold;
    color: grey;
  }
  text-align: left;
  margin-bottom: 10px;
`;
const Bottom = styled.div`
  font-family: 'Rubik', sans-serif;
  font-weight: 600;
  color: #000000ad;
  word-spacing: 0.5px;
`;
