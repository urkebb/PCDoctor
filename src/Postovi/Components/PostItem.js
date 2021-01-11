import React, { useState, useContext } from 'react';

import Card from '../../Shared/Components/UIElements/Card';
import Button from '../../Shared/Components/FormElements/Button';
import { AuthContext } from '../../Shared/context/auth-context';
import './PostItem.css';

const PostItem = props => {
  const auth = useContext(AuthContext);

  const [isClicked, setIsClicked] = useState(false);

  const switchMode = () => {
    if (!isClicked) {
      setIsClicked(prevMode => !prevMode);
      incNum();   
    } else {
      setIsClicked(prevMode => !prevMode);
      decNum();
    };
  };

    const [num, setNum] = useState(props.like);

    const incNum = () => {

      setNum(num + 1);
    };
    const decNum = () => {

      setNum(num - 1);
    };


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

            <div className="like">
              {auth.isLoggedIn && (
                <Button onClick={switchMode} danger>{!isClicked ? 'LIKE' : 'DISLIKE'}</Button>
              )}

              <p><b>{num} likes</b></p>
            </div>


            <div className="other">
              {auth.isLoggedIn && (
                <Button to={`/postovi/${props.id}`}>EDIT</Button>
              )}
              {auth.isLoggedIn && (
                <Button danger>DELETE</Button>
              )}
            </div>

          </div>
        </Card>
      </li>
    );
  };

  export default PostItem; 