import Homepage from "../views/pages/home";
import Detail from "../views/pages/detail";
import Like from "../views/pages/like";
import Landingpage from "../views/pages/landing";
import SignIn from "../views/pages/signin";

const routes = {
  "/": Landingpage,
  "/home": Homepage,
  "/detail": Detail,
  "/like": Like,
  "/signin": SignIn,
};

export default routes;
