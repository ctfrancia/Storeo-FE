import React from 'react'
import { Link } from 'react-router-dom';
import '../cards/prod-sml-card.css'

const ProductSmallCard = () => {
  return (
    <Link to="/productcard" >
    <div className="row">
      <div className="col s6 m6 l2" id="prodSmlCard">
        <div className="card white">
            <div className="card-action">
            <div className="card-image">
                    <img src="https://res.cloudinary.com/ohcash/image/upload/v1547303384/photo-1529940340007-8ef64abc360a.jpg"></img>
                  </div>
                    <div class="card-content">
                    <p className="black-text">I am a very simple card.</p>
                    </div>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default ProductSmallCard;

