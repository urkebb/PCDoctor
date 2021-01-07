import React, {useState, useContext} from 'react';

import Card from '../../Shared/Components/UIElements/Card';
import Button from '../../Shared/Components/FormElements/Button';
import {AuthContext} from '../../Shared/context/auth-context';
import './PostItem.css';

const PostItem = props => {
  const auth = useContext(AuthContext);
  return (
    <li className="post-item">
      <Card className="post-item__content">
        <div className="post-item__image">
          <img src={props.image} alt={props.title} />
        </div>
        <div className="post-item__info">
          <h2>{props.title}</h2>
          <p>{props.description}</p>
        </div>
        <div className="post-item__actions">
          {auth.isLoggedIn && (
          <Button  to={`/postovi/${props.id}`}>EDIT</Button>
          )}
          {auth.isLoggedIn && (
          <Button danger>DELETE</Button>
          )}
        </div>
      </Card>
    </li>
  );
};

export default PostItem;
