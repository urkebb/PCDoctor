import React from 'react';

import Card from '../../Shared/Components/UIElements/Card';
import PostItem from './PostItem';
import Button from '../../Shared/Components/FormElements/Button';
import './PostList.css';

const PostList = props => {
  if (props.items.length === 0) {
    return (
      <div className="post-list center">
        <Card className="card-c">
          <h2>No posts found. Maybe create one?</h2>
          <Button to="/post/new">Share post</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="post-list">
      {props.items.map(post => (
        <PostItem
          key={post.id}
          id={post.id}
          image={post.imageUrl}
          title={post.title}
          description={post.description}
          creatorId={post.creator}
        />
      ))}
    </ul>
  );
};

export default PostList;
