import React, { useState, useEffect,useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../../Shared/Components/UIElements/LoadingSpinner';
import PostList from '../Components/PostList';
import { AuthContext } from '../../Shared/context/auth-context';



const KorisnikPosts = () => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  let [loadedPosts, setLoadedPosts] = useState();

  const korisnikId = auth.userId;

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        console.log(korisnikId + ' ovo je korisnikov ID');
        const { data } = await axios.get(`http://localhost:5000/api/posts/user/${korisnikId}`);

        setLoadedPosts(data.post);

      }
      catch (err) {
        setIsLoading(false);
        setError(err.message);
      }


      setIsLoading(false);

    };
    sendRequest();
  }, [ korisnikId]);

  const errorHandler = () => {
    setError(null);
  };

  /*const postDeletedHandler = deletedPostId => {
    setLoadedPosts(prevPosts =>
      prevPosts.filter(
        post =>
        post.id !== deletedPostId)
    );
  };*/


    const postDeletedHandler = async () => {
      setIsLoading(true);
      try {
        console.log(korisnikId + ' ovo je korisnikov ID');
        const { data } = await axios.get(`http://localhost:5000/api/posts/user/${korisnikId}`);

        setLoadedPosts(data.post);

      }
      catch (err) {
        setIsLoading(false);
        setError(err.message);
      }


      setIsLoading(false);

    };
 
  


  return (
    <React.Fragment>
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}

     {!isLoading && loadedPosts && <PostList items={loadedPosts} onDeletePost={postDeletedHandler} />}
    </React.Fragment>
  )
};

export default KorisnikPosts;