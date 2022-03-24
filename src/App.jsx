import logo from './logo.svg';
import './App.css';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom'
import router from './utils/router';
import SiderDemo from './pages/meanLayout'

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>

          <Route 
              path='/home'
              component={SiderDemo}
              exact={false}
          >
            
          </Route>
          <Redirect from="/" to='/home' />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
