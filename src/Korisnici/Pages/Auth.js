import React, { useState, useContext } from 'react';

import Card from '../../Shared/Components/UIElements/Card';
import Input from '../../Shared/Components/FormElements/Input';
import Button from '../../Shared/Components/FormElements/Button';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../Shared/util/validators';
import { useForm } from '../../Shared/hooks/form-hook';
import {AuthContext} from '../../Shared/context/auth-context';
import './Auth.css';
import ImageUpload from "../../Shared/Components/FormElements/ImageUpload";

const Auth = () => {
    const auth = useContext (AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading,setIsLoading]= useState(false);
  const [error,setError]= useState();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          },
          image:{
            value: null,
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();

    if (isLoginMode) {

    } else {

      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
        
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          })
        });
        const responseData = await response.json();
        console.log(responseData);
      }
      catch (err) {
        console.log(err);
      }

    }

    console.log(formState.inputs);
    auth.login();
  };

  return (
    <Card className="authentication">
      <h2>Zahteva se logovanje</h2>
      <hr /> 
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            placeholder="Ime"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHandler}
          />
        )}
        {!isLoginMode && <ImageUpload center id="image" onInput={inputHandler}/>}
        <Input
          element="input"
          id="email"
          type="email"
          placeholder="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          placeholder="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password, at least 5 characters."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? 'SIGN UP' : 'LOGIN'}
      </Button>
    </Card>
  );
};

export default Auth;
