import { BrowserRouter, Route } from 'react-router-dom';

import { Home } from "./pages/Home";
import { Newroom } from "./pages/Newroom";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/rooms/new" exact component={Newroom} />
    </BrowserRouter>
  );
}

export default App;
