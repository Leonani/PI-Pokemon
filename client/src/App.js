import './App.css';
import {BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './components/landing'
import Home from './components/home'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path= '/' component= {Landing}/> 
          <Route path= '/home' component= {Home}/> 
          {/* <Route path= '/recipes/:id' component= {Detail}/>
          <Route path= '/Recipes' component= {Create}/>  */}
        </Switch> 
      </div>
    </BrowserRouter>
  );
}

export default App;
