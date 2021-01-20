import React from 'react';
import KorisnikItem from './KorisnikItem';
import './KorisnikList.css';

const KorisnikList = props => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>Nema korisnika.</h2>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {props.items.map(korisnik => (
        <KorisnikItem
          key={korisnik.id}
          id={korisnik.id}
          image={korisnik.image}
          name={korisnik.name}
         // postsCount={korisnik.posts}
        />
      ))}
    </ul>
  );
};

export default KorisnikList;
