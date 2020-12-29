import React, {useCallback,useReducer} from 'react';

import Input from '../../Shared/Components/FormElements/Input';
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../Shared/util/validators';
import Button from '../../Shared/Components/FormElements/Button';
import './NoviPost.css';

const formReducer = (state, action) => {
    switch (action.type) {
      case 'INPUT_CHANGE':
        let formIsValid = true;
        for (const inputId in state.inputs) {
          if (inputId === action.inputId) {
            formIsValid = formIsValid && action.isValid;
          } else {
            formIsValid = formIsValid && state.inputs[inputId].isValid;
          }
        }
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [action.inputId]: { value: action.value, isValid: action.isValid }
          },
          isValid: formIsValid
        };
      default:
        return state;
    }
  };
  
  const NoviPost = () => {
    const [formState, dispatch] = useReducer(formReducer, {
      inputs: {
        title: {
          value: '',
          isValid: false
        },
        description: {
          value: '',
          isValid: false
        }
      },
      isValid: false
    });
  
    const inputHandler = useCallback((id, value, isValid) => {
      dispatch({
        type: 'INPUT_CHANGE',
        value: value,
        isValid: isValid,
        inputId: id
      });
    }, []);

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