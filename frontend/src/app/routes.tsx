import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { Properties } from './pages/Properties';
import { Layout } from './components/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'properties', Component: Properties }
    ]
  }
]);
