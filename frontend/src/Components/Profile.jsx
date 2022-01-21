import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../Constants/Button';
import Card from '../Constants/Card';
import { AddBlog } from '../Store/Action';
import BlogPostForm from './BlogPostForm';
export const Profile = () => {
  const state = useSelector(state => state);
  const { name } = state.user;
  const user = state.user;
  const blogs = state.blogs;
  const [Blogs, setBlogs] = useState([]);
  const Dispatch = useDispatch();
  const [form, setform] = useState(false);
  const Submit = data => {
    Dispatch(AddBlog(data));
  };
  useEffect(() => {
    setBlogs(blogs.filter(item => item.owner === user._id));
  }, [blogs]);
  return (
    <>
      <Container>
        <Top>
          <Image
            src={
              'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
            }
          ></Image>
          <Title>{name}</Title>
        </Top>
        <Mid>
          <Header>
            <span>My Blogs</span>
            <Button
              title="Create"
              onClick={() => {
                setform(!form);
              }}
            />
          </Header>
        </Mid>
        <Bottom>
          <UserBlogs>
            {Blogs.map(item => {
              return <Card data={item} key={item._id} />;
            })}
          </UserBlogs>
        </Bottom>
      </Container>
      {form && (
        <BlogPostForm setform={setform} setBlogs={setBlogs} Submit={Submit} />
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
`;
const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;
const Mid = styled.div``;
const Bottom = styled.div`
  margin: 10px;
  padding: 50px;
`;
const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;
const Title = styled.h2``;
const Header = styled.h1`
  padding: 10px;
  padding-left: 50px;
  display: flex;
  justify-content: space-between;
  background-color: #f5f5f5;
  Button {
    width: 10%;
  }
`;
const UserBlogs = styled.div`
  display: grid;
  gap: 50px;
  grid-template-columns: 1fr 1fr 1fr;
`;
