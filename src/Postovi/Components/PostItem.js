import React from 'react';

import Card from '../../Shared/Components/UIElements/Card';
import './PostItem.css';

const PostItem = props => {
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
          <button>EDIT</button>
          <button>DELETE</button>
        </div>
      </Card>
    </li>
  );
};

export default PostItem;
