import { Helmet } from 'react-helmet'
import { Route, Switch} from "wouter";
import {useMediaQuery} from "@react-hookz/web";

import HomePage from "./Home/HomePage.tsx";
import ValorantPage from "./Valorant/ValorantPage.tsx";
import NavigationBar from "./Navigation/NavigationBar.tsx";

export default function App() {
  const isDesktop = useMediaQuery(`(min-width: 56.25em)`);
  const isMobile = useMediaQuery(`(max-width: 37.375em)`);

  return (
    <>
      <Helmet>
        <title>Random Roulette</title>
        <meta name="description" content="Random Roulette for valorant"/>
      </Helmet>
      <NavigationBar />
      <Switch>
        <Route path='/'>
          <HomePage />
        </Route>
        <Route path='/valorant-roulette'>
          <ValorantPage />
        </Route>
      </Switch>
    </>
  );
}
