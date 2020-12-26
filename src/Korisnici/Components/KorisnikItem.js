import React from 'react';
import {Link} from 'react-router-dom';
import './KorisnikItem.css';
import Avatar from '../../Shared/Components/UIElements/Avatar';
import Card from '../../Shared/Components/UIElements/Card';


const KorisnikItem = props => {
    return (
        <li className="user-item">
            
              <Card className="user-item__content">
                      <Link to= {`/${props.id}/postovi`}>
                        <div className="user-item__image">
                          <Avatar image={props.image} alt={props.name} />
                </div>
                <div className="user-item__info">
                    <h2>{props.name}</h2>
                    <h3>
                      {props.postsCount} {props.postsCount === 1 ? 'Post' : 'Posta'}
                    </h3>
                </div>
                      </Link> 
                </Card>
  
        </li>
  );
};
//sdsdsjgsf

export default KorisnikItem;

