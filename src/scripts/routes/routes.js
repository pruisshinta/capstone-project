import Homepage from '../views/pages/home';
import Detail from '../views/pages/detail';
import Like from '../views/pages/like';
import Landingpage from '../views/pages/landing';

const routes = {
  '/': Landingpage,
  '/home': Homepage,
  '/detail/:id': Detail,
  '/like': Like,
};

export default routes;
