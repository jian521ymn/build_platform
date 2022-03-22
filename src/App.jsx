import logo from './logo.svg';
import './App.css';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom'
import router from './utils/router';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          {router.map((item, index) => (
            <Route
              path={item.path}
              component={item.component}
              exact={index === 0}
              key={index}
            />
          ))}
          <Redirect from="/" to='/home' />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
