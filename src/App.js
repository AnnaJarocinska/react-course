import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from 'utils/theme';
import { Navigation, Wrapper, LoadingIndicator, Button } from 'components';
import GlobalStyles from './index.css';
import { Router, Route, Switch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {toast} from 'react-tostify';
import 'react-toastify/dist/React-toastify.css';

import Budget from 'pages/Budget';

toast.configure();

function App({ budget, fetchBudget, fetchBudgetedCategories }) {

  const { i18n } = useTranslation();
  return (
    <div>
      <GlobalStyles />
      <Router>
        <Navigation items={[
          { content: 'Homepage', to: '/' },
          { content: 'Budget', to: '/budget' },
        ]}
          RightElement={(
            <div>
              <Button variant="regular" onClick={() => i18n.changeLanguage('pl')}> pl </Button>
              <Button variant="regular" onClick={() => i18n.changeLanguage('en')}> en </Button>
            </div>
          )}
        />
        <Wrapper>
          <Switch>
            <Route exact path="/">
               Homepage 
               </Route>
            <Route path="/budget"> 
            <Budget/>
             </Route>
          </Switch>
        </Wrapper>
      </Router>
    </div>

  );
}



function RootApp() {
  return (
    <ThemeProvider theme={theme}>
      <React.Suspense fallback={<LoadingIndicator />}>
        <App />
      </React.Suspense>
    </ThemeProvider>
  )
}
export default RootApp;
