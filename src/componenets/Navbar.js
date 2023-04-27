import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import './Navbar.css';
import { createApi } from 'unsplash-js';

const api = createApi({
    // Don't forget to set your access token here!
    // See https://unsplash.com/developers
    accessKey: 'fv03BmYo-pOX_MkNOc2wIp--NQFHBJ4-AG1ECcx8j-g',
  });

function Navbar() {
   // const [click, setClick] = useState(false);
    //const [button, setButton] = useState(true);

   // const handleClick = () => setClick(!click);
   // const closeMobileMenu = () => setClick(false);

    const PhotoComp = ({ photo }) => {
        const { user, urls } = photo;
      
        return (
          <React.Fragment>
            <img className="img" src={urls.regular} alt={""} />
            <a
              className="credit"
              //target="_blank"
              href={`https://unsplash.com/@${user.username}`}
            >
              {user.name}
            </a>
          </React.Fragment>
        );
      };

    const Randomize = () => {
        const [data, setPhotosResponse] = useState(null);
      
        useEffect(() => {
          api.search
            .getPhotos({ query: 'cat', orientation: 'landscape' })
            .then((result) => {
              setPhotosResponse(result);
            })
            .catch(() => {
              console.log('something went wrong!');
            });
        }, []);
      
        if (data === null) {
          return <div>Loading...</div>;
        } else if (data.errors) {
          return (
            <div>
              <div>{data.errors[0]}</div>
              <div>PS: Make sure to set your access token!</div>
            </div>
          );
        } else {
          return (
            <div className="feed">
              <ul className="columnUl">
                {data.response.results.map((photo) => (
                  <li key={photo.id} className="li">
                    <PhotoComp photo={photo} />
                  </li>
                ))}
              </ul>
            </div>
          );
        }
      };


  return (
    <>
    <nav className="navbar">
        <div className="navbar-container">
            <Link to="/" className="navbar-logo" onClick={Randomize}>
                CATIMGS <i className='fab fa-typo3'/>
            </Link>

        </div>
    </nav>
    
    </>
  )
  
}


export default Navbar

