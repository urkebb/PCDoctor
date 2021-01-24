import React, { useContext, useState } from 'react';
import LoadingSpinner from '../../Shared/Components/UIElements/LoadingSpinner';
import { NavLink } from 'react-router-dom';
import ImageUpload from "../../Shared/Components/FormElements/ImageUpload";
import Input from '../../Shared/Components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../Shared/util/validators';
import Button from '../../Shared/Components/FormElements/Button';
import { useForm } from '../../Shared/hooks/form-hook';
import { AuthContext } from '../../Shared/context/auth-context';
import './PostForm.css';



const NoviPost = () => {
    const auth = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [postCreated,setPostCreated]=useState(false);

    const [formState, inputHandler] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        image:{
            value:null,
            isValid:false
        }
    }, false);



    const placeSubmitHandler = async event => {
        event.preventDefault();

        try {

            setIsLoading(true);
            const formData = new FormData();
            formData.append('title',formState.inputs.title.value);
            formData.append('description',formState.inputs.description.value);
            formData.append('creator',auth.userId);
            formData.append('image',formState.inputs.image.value);
            const response = await fetch('http://localhost:5000/api/posts', {
                method: 'POST',
                body:formData,
            });

            const responseData = await response.json();
            //console.log(responseData.message);

            if (!(responseData.message === 'post je napravljen')) {
                throw new Error(responseData.message);
            }

            else {
                setPostCreated(true);
                setIsLoading(false);
            }

        }

        catch (err) {
            setIsLoading(false);
            setError(err);
        }

    };

    return (


        <form className="post-form" onSubmit={placeSubmitHandler}>
            {isLoading && <LoadingSpinner asOverlay />}
            <p className="error"> {error && error.message} </p>
            <p className="postCreated"> {postCreated && 'Post je napravljen'} </p>

            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Molim vas unesite validan naslov."
                onInput={inputHandler}
            />

            <Input
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Unesite opis od najmanje 5 karaktera."
                onInput={inputHandler}
            />
             <ImageUpload id="image" onInput={inputHandler} errorText="Moilimo izaberite sliku"/>

             <Button type="submit" disabled={!formState.isValid}>DODAJ POST</Button>
        </form>

    )
};


export default NoviPost;