import { BrowserRouter, Route, Switch } from 'react-router-dom';


/* Paginas */

import { Home } from "./pages/Home";
import { Newroom } from "./pages/Newroom";
import { Rooms } from "./pages/Rooms";

/* Autentificação*/

import { AuthContextProvider } from './contexts/Authcontext';



function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={Newroom} />
          <Route path="/rooms/:id" component={Rooms} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
