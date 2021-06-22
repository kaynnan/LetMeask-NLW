import { BrowserRouter, Route } from 'react-router-dom';


/* Paginas */

import { Home } from "./pages/Home";
import { Newroom } from "./pages/Newroom";

/* Autentificação*/

import { AuthContextProvider } from './contexts/Authcontext';



function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" exact component={Newroom} />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
