import React from 'react';


import Input from '../../Shared/Components/FormElements/Input';
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../Shared/util/validators';
import Button from '../../Shared/Components/FormElements/Button';
import {useForm} from '../../Shared/hooks/form-hook';
import './PostForm.css';


  
  const NoviPost = () => {
   const [formState,inputHandler] =useForm({
       title: {
           value: '',
           isValid: false
       },
       description: {
        value: '',
        isValid: false
    }
   },false);
  
   

    const placeSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    };

    return (
        <form className="post-form" onSubmit={placeSubmitHandler}>
            <Input
            id="title"
            element ="input" 
            type="text" 
            label="Title" 
            validators={[VALIDATOR_REQUIRE()]} 
            errorText="Molim vas unesite validan naslov."
            onInput={inputHandler}
             />

            <Input
            id="description"
            element ="textarea" 
            label="Description" 
            validators={[VALIDATOR_MINLENGTH(5)]} 
            errorText="Unesite opis od najmanje 5 karaktera."
            onInput={inputHandler}
             />

            <Button type="submit" disabled={!formState.isValid}>DODAJ POST</Button>
            </form>
    )
};


export default NoviPost;