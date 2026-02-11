import { useMediaQuery } from '@react-hookz/web';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'wouter';

import { assertDefined } from './guards.ts';
import HomePage from './Home/HomePage.tsx';
import NavigationBar from './Navigation/NavigationBar.tsx';
import NotFound404 from './NotFound404/NotFound404.tsx';
import PageWrapper from './PageWrapper/PageWrapper.tsx';
import ValorantPage from './Valorant/ValorantPage.tsx';

export default function App() {
  const isDesktop = useMediaQuery(`(min-width: 56.25em)`);
  const isMobile = useMediaQuery(`(max-width: 37.375em)`);
  assertDefined(isDesktop);
  assertDefined(isMobile);

  return (
    <>
      <Helmet>
        <title>Instalock Roulette</title>
        <meta name="description" content="Random Roulette for valorant"/>
      </Helmet>
      <NavigationBar />

      <PageWrapper>
        <Switch>
          <Route path='/'>
            <HomePage />
          </Route>
          <Route path='/valorant'>
            <ValorantPage />
          </Route>
          <Route path="*">
            <NotFound404 />
          </Route>
        </Switch>
      </PageWrapper>
    </>
  );
}
