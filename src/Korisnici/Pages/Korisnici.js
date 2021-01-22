import React, { useEffect, useState } from 'react';

import KorisnikList from '../Components/KorisnikList';
import ErrorModal from '../../Shared/Components/UIElements/ErrorModal';
import LoadingSpinner from '../../Shared/Components/UIElements/LoadingSpinner';
import axios from 'axios';

const Korisnici = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  let [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
       
        const { data } = await axios.get('http://localhost:5000/api/users');
        
        setLoadedUsers(data.users);

      }
      catch (err) {

        setError(err.message);
      }

      
      setIsLoading(false);

    };
    sendRequest();
  }, []);

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {
        !isLoading && loadedUsers && <KorisnikList items={loadedUsers} />
      }
    </React.Fragment>
  )
};

export default Korisnici;
