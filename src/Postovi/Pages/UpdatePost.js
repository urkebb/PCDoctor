import React from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../Shared/Components/FormElements/Input';
import Button from '../../Shared/Components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../Shared/util/validators';
import {useForm} from '../../Shared/hooks/form-hook';
import './PostForm.css';

const DUMMY_POSTS = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
   
    
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    
    
    creator: 'u2'
  }
];

const UpdatePost = () => {
  const postId = useParams().postId;

  const identifiedPost = DUMMY_POSTS.find(p => p.id === postId);

  const [formState, inputHandler] = useForm({
    title: {
        value: identifiedPost.title,
        isValid: true
    },
    description: {
     value: identifiedPost.description,
     isValid: true
 }
},true);


const postUpdateSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };



  if (!identifiedPost) {
    return (
      <div className="center">
        <h2>Could not find post!</h2>
      </div>
    );
  }

  return (
    <form className="post-form" onSubmit={postUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE POST
      </Button>
    </form>
  );
};

export default UpdatePost;