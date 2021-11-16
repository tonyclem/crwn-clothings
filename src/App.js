import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import HomePage from './pages/homepage/homepage.component';


const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
    <p>How many Hats do you want</p>
  </div>
);


 function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/hats' component={HatsPage} />
      </Switch>
    </div>
  );
}


// function HatsPage() {
//   return(
//     <div>
//       <h1>Hats Page</h1>
//       <p>How many Hats do your want</p>
//     </div>
//   )
// }


export default App;
