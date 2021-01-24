import React, { useState, useContext,useRef  } from 'react';

import Card from '../../Shared/Components/UIElements/Card';
import Input from '../../Shared/Components/FormElements/Input';
import Button from '../../Shared/Components/FormElements/Button';
import ErrorModal from '../../Shared/Components/UIElements/ErrorModal';
import LoadingSpinner from '../../Shared/Components/UIElements/LoadingSpinner';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../Shared/util/validators';
import { useForm } from '../../Shared/hooks/form-hook';
import { AuthContext } from '../../Shared/context/auth-context';
import './Auth.css';
import ImageUpload from "../../Shared/Components/FormElements/ImageUpload";


const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const form = useRef(null)

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
          image: {
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
    console.log(formState.inputs);
    event.preventDefault();
    setIsLoading(true);

    if (isLoginMode) {
      try {
        setIsLoading(true);

        const response = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
            body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          })
        });

        const responseData = await response.json();
        console.log(responseData.message);

        if (!(responseData.message === 'uspesno si se logovao')) {
          throw new Error(responseData.message);
        }
        console.log(responseData);
        setIsLoading(false);
        auth.login(responseData.id);
      }
      catch (err) {
        setIsLoading(false);
        console.log(err.message);
        setError(err);
      }
    } else {

      try {
        setIsLoading(true);
        const formData = new FormData();
       
        formData.append('name',formState.inputs.name.value);
        formData.append('email',formState.inputs.email.value);
        formData.append('password',formState.inputs.password.value);
        formData.append('image',formState.inputs.image.value);
        console.log(formData);
        const response = await fetch('http://localhost:5000/api/users/signup', {
          method: 'POST',
         // headers: {
         //     'Content-Type': 'application/json'
         // },
          body:formData,
           /* body: JSON.stringify({
              name: formState.inputs.name.value,
              email: formState.inputs.email.value,
              password: formState.inputs.password.value,
              image:formState.inputs.image.value
          })*/
        });
        const responseData = await response.json();
        console.log(responseData.message);


        if (!(responseData.message === 'registrovali ste se')) {
          throw new Error(responseData.message);
        }

        else {
          console.log(responseData.id);
          setIsLoading(false);
        
          auth.login(responseData.id);
         
        }

      }
      catch (err) {
        setIsLoading(false);
        setError(err);
      }
    }
  };

  const errorHandler = () => {
    setError(null);
  }

  return (
    <React.Fragment>
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Zahteva se logovanje</h2>
        <p className="error"> {error && error.message} </p>
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

          {!isLoginMode && <ImageUpload center id="image" onInput={inputHandler} />}

          
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
    </React.Fragment>
  );
};

export default Auth;
