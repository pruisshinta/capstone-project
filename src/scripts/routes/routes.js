import Homepage from '../views/pages/home';
import Detail from '../views/pages/detail';
import Landingpage from '../views/pages/landing';
import SignIn from '../views/pages/signin';
import Register from '../views/pages/register';

const routes = {
  '/': Landingpage,
  '/landing': Landingpage,
  '/home': Homepage,
  '/detail/:id': Detail,
  '/signin': SignIn,
  '/register': Register,
};

export default routes;
