import './App.css';
import {BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './components/landing';
import Home from './components/home';
import Card from './components/card';
import Create from './components/created';
import Details from './components/detail';

function App() {
  return (
    <BrowserRouter>

      <div className="App">
        <Switch>

          <Route exact path= '/' component= {Landing}/> 
          <Route exact path= '/home' component= {Home}/> 
          <Route exact path="/card" component= {Card}/>
          <Route exact path="/create" component={Create}/>
          <Route exact path="/home/:id" component={Details}/>

        </Switch> 
      </div>

    </BrowserRouter>
  );
}

export default App;
