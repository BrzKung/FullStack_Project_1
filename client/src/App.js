import { BrowserRouter, Route, Switch } from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css'
import './App.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Changepassword from './pages/Changepassword'
import MenuBar from './component/MenuBar';
import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';
import AuthRoute_2 from './util/AuthRoute_2';
import PersonalForm from './pages/PersonalForm';
import EditPersonal from './pages/EditPersonal';
import { PersonalProvider } from './context/personal';

function App() {
  return (
    <AuthProvider>
      <PersonalProvider>
        <BrowserRouter>
          <MenuBar />
          <Switch>
            <AuthRoute_2 exact path='/' component={Home} />
            <AuthRoute exact path='/login' component={Login} />
            <AuthRoute exact path='/register' component={Register} />
            <AuthRoute_2 exact path='/changepassword' component={Changepassword} />
            <AuthRoute_2 exact path='/add' component={PersonalForm} />
            <AuthRoute_2 exact path='/edit' component={EditPersonal} />
          </Switch>
        </BrowserRouter>
      </PersonalProvider>
    </AuthProvider>

  );
}

export default App;
