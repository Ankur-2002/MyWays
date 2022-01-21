import React, { useState } from 'react';
import styled from 'styled-components';
import { Fetch } from '../Constants/api';
import Button from '../Constants/Button';
import Input from '../Constants/Input';

const BlogPostForm = ({ setform, setBlogs, data, Edit, EditBlog, Submit }) => {
  const [title, setTitle] = useState(data?.title);
  const [content, setContent] = useState(data?.description);
  const [image, setImage] = useState(data?.image);

  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');
  const [imageError, setImageError] = useState('');

  const Publish = async () => {
    if (title === '') {
      setTitleError('Title is required');
    }
    if (content === '') {
      setContentError('Content is required');
    }
    if (image === '') {
      setImageError('Image is required');
    }

    const Object = {
      title,
      description: content,
      image,
    };

    if (Edit) {
      Object._id = data._id;
    }

    const datas = await Fetch(
      `/blogs/${Edit ? 'putBlog' : 'createBlog'}`,
      `${Edit ? 'PUT' : 'POST'}`,
      Object
    );
    // console.log(datas);

    if (Edit) {
      EditBlog(datas);
    } else {
      Submit(datas.blog);

      setBlogs(items => {
        return [...items, datas.blog];
      });
    }
    setform(false);
  };
  return (
    <Container>
      <Pop>
        <Top>
          <Input
            placeholder="Your Title Here"
            error={titleError}
            value={title}
            onchange={e => {
              setTitle(e.target.value);
              setTitleError('');
            }}
            // error={'Please choose correct title'}
          />
          <Input
            placeholder="Image Link"
            error={imageError}
            value={image}
            onchange={e => {
              setImage(e.target.value);
              setImageError('');
            }}
          />
          {/* <Input placeholder="Add content here" className="content" /> */}
          <textarea
            value={content}
            onChange={e => {
              setContent(e.target.value);
              setContentError('');
            }}
            rows={10}
            placeholder="Add content here"
            autoFocus={false}
            className="content"
          />
          {contentError && <Error>{contentError}</Error>}
        </Top>
        <Button
          title="PUBLISH"
          onClick={() => {
            Publish();
          }}
        />
      </Pop>
    </Container>
  );
};

export default BlogPostForm;
const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #fff;
  top: 0;
`;

const Pop = styled.div`
  display: flex;
  position: relative;
  //   align-items: center;
  //   gap: 20px;
  width: 600px;
  button {
    width: 20%;
    position: absolute;
    right: -3%;
    background-color: #3a5a5c;
    color: #fff;
    font-size: 0.8rem;
    text-transform: uppercase;
    text-align: center;
    padding: 10px;
    top: 5px;
  }
`;
const Top = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;

  .content {
    resize: none;
    outline: none;
    margin-left: 5px;
    font-size: 1.2rem;
  }
`;

const Error = styled.div`
  // padding : 0 5px ;
  color: #000;
  font-size: 1.2rem;
  font-weight: bold;
  font-style: italic;
  background-color: #ff00005c;
  padding: 5px;
  margin-left: 5px;
  width: 98%;
  margin-top: 5px;
`;
