import React from 'react';
import ReactDOM from 'react-dom/client';
import Config from './Config';


//import de componentes
import Header from './components/Header';
// import Footer from './components/Footer';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <div>
    <Header />
    <div className="principal-app">
      <Config />
    </div>
    {/* <Footer/> */}
  </div>
);