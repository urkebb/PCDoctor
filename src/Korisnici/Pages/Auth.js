import React, { useState } from 'react';

import Card from '../../Shared/Components/UIElements/Card';
import Input from '../../Shared/Components/FormElements/Input';
import Button from '../../Shared/Components/FormElements/Button';
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE
} from '../../Shared/util/validators';
import { useForm } from '../../Shared/hooks/form-hook';
import './Auth.css';

const Auth = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);

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

        setIsLoginMode(prevMode => !prevMode);
    };

    const authSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    };





    return (
        <Card className="authentication">
            <h2>Zahteva se prijava</h2>
            <hr />
            <form onSubmit={authSubmitHandler} className="login">
                {!isLoginMode &&
                    <Input
                        element="input"
                        id="name"
                        type="text"
                        placeholder="Ime"
                        validators={[VALIDATOR_REQUIRE]}
                        errorText="Unesite vase ime"
                        onInput={inputHandler}
                    />}
                <Input element="input"
                    id="email"
                    type="email"
                    placeholder="e-mail"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Unesite validnu E-Mail adresu"
                    onInput={inputHandler}
                />
                <Input element="input"
                    id="password"
                    type="password"
                    placeholder="password"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Unesite validnu sifru, minimum 5 karaktera"
                    onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    {isLoginMode ? 'ULOGUJ SE' : 'REGISTRUJ SE'}
                </Button>
            </form>
          
        {isLoginMode &&
                <Button inverse onClick={switchModeHandler}>PREDJITE NA {isLoginMode ? 'REGISTRACIJU' : 'LOGOVANJE'}</Button>
        }
        </Card>
    );
};

export default Auth;