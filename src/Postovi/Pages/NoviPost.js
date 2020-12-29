import React from 'react';

import Input from '../../Shared/Components/FormElements/Input';
import './NoviPost.css';

const NoviPost = () => {
    return (
        <form className="post-form">
            <Input
            element ="input" 
            type="text" 
            label="Naslov" 
            validators={[]} 
            errorText="Molim vas unesite validan naslov."
             />
            </form>
    )
};


export default NoviPost;