import Navbar from './componenets/Navbar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createApi } from 'unsplash-js';


const api = createApi({
  // Don't forget to set your access token here!
  // See https://unsplash.com/developers
  accessKey: 'fv03BmYo-pOX_MkNOc2wIp--NQFHBJ4-AG1ECcx8j-g',
});

const PhotoComp = ({ photo }) => {
  const { user, urls } = photo;

  return (
    <React.Fragment>
      <img className="img" src={urls.regular} />
      <a
        className="credit"
        target="_blank"
        href={`https://unsplash.com/@${user.username}`}
      >
        {user.name}
      </a>
    </React.Fragment>
  );
};

const Body = () => {
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

const Home = () => {
  return (
    <main className="root">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' exact />
        </Routes>
      </Router>
      <Body />
      
    </main>
  );
};

ReactDOM.render(<Home />, document.getElementById('root'));


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <App />
  
);


// function App() {
//   return (
//     <>
//     <Router>
//       <Navbar/>
//       <Routes>
//         <Route path='/' exact />
//       </Routes>
//     </Router>
    
//     </>
    
//   );
// }

export default App;
