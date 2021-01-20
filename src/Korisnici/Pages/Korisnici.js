import React, { useEffect, useState } from 'react';

import KorisnikList from '../Components/KorisnikList';
import ErrorModal from '../../Shared/Components/UIElements/ErrorModal';
import LoadingSpinner from '../../Shared/Components/UIElements/LoadingSpinner';
import axios from 'axios';

const Korisnici = () => {

  /*const KORISNICI = [
    {
      id: 'u1',
      name: 'Uros Milic',
      image:
        'https://scontent.fbeg4-1.fna.fbcdn.net/v/t1.0-9/20430058_1839842739378753_628062839975753479_n.jpg?_nc_cat=109&ccb=2&_nc_sid=730e14&_nc_eui2=AeHTha_TDsCe3eneX19TX2dBxPucZXaGbBzE-5xldoZsHAArMJkIyiHX0FbowxasJF2FrSl0iszrn0HwAchYslsK&_nc_ohc=JMD8rsVfInMAX-fr5sL&_nc_ht=scontent.fbeg4-1.fna&oh=bf8811ef61e57556cefc188af3b6a786&oe=600BF1B3',
      // 'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      posts: 1
    },
    {
      id: 'u2',
      name: 'Uros Milic',
      image:
        'https://scontent.fbeg4-1.fna.fbcdn.net/v/t1.0-9/20430058_1839842739378753_628062839975753479_n.jpg?_nc_cat=109&ccb=2&_nc_sid=730e14&_nc_eui2=AeHTha_TDsCe3eneX19TX2dBxPucZXaGbBzE-5xldoZsHAArMJkIyiHX0FbowxasJF2FrSl0iszrn0HwAchYslsK&_nc_ohc=JMD8rsVfInMAX-fr5sL&_nc_ht=scontent.fbeg4-1.fna&oh=bf8811ef61e57556cefc188af3b6a786&oe=600BF1B3',
      // 'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      posts: 1
    },

  ];

  /*return (
  <KorisnikList items={KORISNICI} />
  );
  
  };
  export default Korisnici;
  */
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  let [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        //const response = await fetch('http://localhost:5000/api/users');
        //const responseData = await response.json();
        //if (!response.ok) {  
        //throw new Error(responseData.message);
        //}
        // let p = JSON.parse("'" + responseData[0] + "'");
        // console.log(p);

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
