import { BrowserRouter, Routes as BrowserRoutes, Route } from 'react-router-dom';

import Home from './pages/Home';

const Routes: React.FC = () => (
  <>
    <BrowserRouter>
      <BrowserRoutes>
        <Route path="/" Component={Home} />
      </BrowserRoutes>
    </BrowserRouter>
  </>
);

export default Routes;
