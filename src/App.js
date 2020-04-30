import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from 'utils/theme';
import { Navigation, Wrapper, LoadingIndicator, Button } from 'components';
import GlobalStyles from './index.css';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchBudget, fetchBudgetedCategories } from 'data/actions/budget.actions';

function App({ budget, fetchBudget, fetchBudgetedCategories }) {
  useEffect(() => {
    fetchBudget(1);
    fetchBudgetedCategories(1);
  }, [fetchBudget, fetchBudgetedCategories])

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
            <Route exact path="/"> Homepage </Route>
            <Route path="/budget"> Budget </Route>
          </Switch>
        </Wrapper>
      </Router>
    </div>

  );
}

const ConnectedApp = connect(state => {
  return {
    budget: state.budget.budget
  }
}, {
  fetchBudget,
  fetchBudgetedCategories,
}
)(App)

function RootApp() {
  return (
    <ThemeProvider theme={theme}>
      <React.Suspense fallback={<LoadingIndicator />}>
        <ConnectedApp />
      </React.Suspense>
    </ThemeProvider>
  )
}
export default RootApp;
