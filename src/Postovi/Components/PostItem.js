import React, { useState, useContext } from 'react';
import { useParams, useHistory, Route } from 'react-router-dom';
import Card from '../../Shared/Components/UIElements/Card';
import Button from '../../Shared/Components/FormElements/Button';
import { AuthContext } from '../../Shared/context/auth-context';
import LoadingSpinner from '../../Shared/Components/UIElements/LoadingSpinner';
import KorisnikPosts from '../Pages/KorisnikPosts';
import './PostItem.css';

const PostItem = props => {

  const auth = useContext(AuthContext);
  const [isDeleted, setIsDeleted] = useState(false);

  const post = props.id;

  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const history = useHistory();

  const switchMode = () => {
    if (!isClicked) {
      setIsClicked(prevMode => !prevMode);
      incNum();
    } else {
      setIsClicked(prevMode => !prevMode);
      decNum();
    };
  };

  const [num, setNum] = useState(props.likes);

  const incNum = () => {

    setNum(num + 1);
  };
  const decNum = () => {
    setNum(num - 1);
  };



  const deletePost = async event => {
    event.preventDefault();
    try {

      const response = await fetch(`http://localhost:5000/api/posts/${post}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const responseData = await response.json();

      if (!(responseData.message === 'Obrisan je post')) {
        throw new Error(responseData.message);
      }

      setIsLoading(false);
      props.onDelete(props.id);
      setIsDeleted(true);
      history.push('/u1/postovi');
      auth.login(responseData.id);
    }
    catch (err) {
      setIsLoading(false);
      console.log(post);
      setError(err)
    }


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
            {auth.isLoggedIn && (<Button danger onClick={deletePost}>DELETE</Button>)}
          </div>

        </div>
      </Card>
    </li>
  );
};

export default PostItem; 