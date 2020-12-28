import React from 'react';
import {useParams} from 'react-router-dom';

import PostList from '../Components/PostList';

const DUMMY_POSTS = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    creator: 'u2'
  }
];

const KorisnikPosts = () => {
  const korisnikId = useParams().korisnikId;
  const loadedPosts=DUMMY_POSTS.filter(post => post.creator === korisnikId); 
  return <PostList items={loadedPosts} />;
};

export default KorisnikPosts;