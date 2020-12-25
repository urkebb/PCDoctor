import React from 'react';

import KorisnikList from '../Components/KorisnikList';

const Korisnici = () => {
  const KORISNICI = [
    {
      id: 'u1',
      name: 'Uros Milic',
      image:
      'https://scontent.fbeg4-1.fna.fbcdn.net/v/t1.0-9/20430058_1839842739378753_628062839975753479_n.jpg?_nc_cat=109&ccb=2&_nc_sid=730e14&_nc_eui2=AeHTha_TDsCe3eneX19TX2dBxPucZXaGbBzE-5xldoZsHAArMJkIyiHX0FbowxasJF2FrSl0iszrn0HwAchYslsK&_nc_ohc=JMD8rsVfInMAX-fr5sL&_nc_ht=scontent.fbeg4-1.fna&oh=bf8811ef61e57556cefc188af3b6a786&oe=600BF1B3',
       // 'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      posts: 1
    }
  ];

  return <KorisnikList items={KORISNICI} />;
};

export default Korisnici;
