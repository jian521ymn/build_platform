import logo from './logo.svg';
import './App.css';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import router from './utils/router';
import SiderDemo from './pages/meanLayout'

function App() {
  console.log(router, 'router');
  return (
    <div className="App">
      <HashRouter>
        <Route
          path={'/'}
          component={SiderDemo}
        />
        <Redirect from="/" to='/project/list' />
      </HashRouter>
    </div>
  );
}

export default App;
