import React, { useEffect, useState,useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import Input from '../../Shared/Components/FormElements/Input';
import Button from '../../Shared/Components/FormElements/Button';
import Card from '../../Shared/Components/UIElements/Card';
import {AuthContext} from '../../Shared/context/auth-context';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../Shared/util/validators';
import { useForm } from '../../Shared/hooks/form-hook';
import './PostForm.css';
import LoadingSpinner from '../../Shared/Components/UIElements/LoadingSpinner';


const UpdatePost = () => {

  const post = useParams().postId;
  const auth=useContext(AuthContext);
  const [loadedPost, setLoadedPost] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const history= useHistory();
  const [isUpdated,setIsUpdated]=useState(false);

  const [formState, inputHandler, setFormData] = useForm({
    title: {
      value: '',
      isValid: true
    },
    description: {
      value: '',
      isValid: true
    }
  }, false);

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {

        const { data } = await axios.get(`http://localhost:5000/api/posts/${post}`);
        console.log(post);

        setLoadedPost(data.post[0]);
        
        setIsLoading(false);
        setFormData(
          {
            title: {
              value: data.post.title,
              isValid: true
            },
            description: {
              value: data.post.description,
              isValid: true
            }
          }
        )
          //history.push('/' + auth.userId + '/postovi');
      }
      catch (err) {

        setError(err.message);
      }



      if (isLoading) {
        return (
          <div className="center">
            <LoadingSpinner />
          </div>
        )
      }

      if (!loadedPost && !error) {
        return (
          <div className="center">
            <Card>
              <h2>Ne mogu naci nijedan post</h2>
            </Card>
          </div>
        )
      }




    };
    sendRequest();
  }, [post, setFormData]);


  const postUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      
      const response = await fetch(`http://localhost:5000/api/posts/${post}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value
        })
      });

      const responseData = await response.json();
      

        if (!(responseData.message === 'Updateovan je post')) {
          throw new Error(responseData.message);
        }

       
          setIsLoading(false);
          setIsUpdated(true); 
          auth.login(responseData.id);
    }
    catch(err){
      setIsLoading(false);
      setError(err)
    }

  

  };



  /*if (!identifiedPost) {
    return (
      <div className="center">
        <h2>Could not find post!</h2>
      </div>
    );
  }*/

  return (
    <React.Fragment>
      { !isLoading && loadedPost && (
        <form className="post-form" onSubmit={postUpdateSubmitHandler}>
          {error && <p className="error">{error.message}</p>}
          {isUpdated && 
          <p className="postCreated">Update je prosao bez gresaka</p>
          }
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={loadedPost.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            initialValue={loadedPost.description}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE POST
      </Button>
        </form>
      )
      }
    </React.Fragment>
  );
};

export default UpdatePost;