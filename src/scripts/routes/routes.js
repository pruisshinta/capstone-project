import Homepage from "../views/pages/home";
import Detail from "../views/pages/detail";
import Like from "../views/pages/like";
import Landingpage from "../views/pages/landing";
import SignIn from "../views/pages/signin";
import Register from "../views/pages/register";

const routes = {
  "/": Landingpage,
  "/home": Homepage,
  "/detail/:id": Detail,
  "/like": Like,
  "/signin": SignIn,
  "/register": Register,
};

export default routes;
