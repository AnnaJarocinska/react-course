import React from 'react';
import { refetchAllQueries } from 'react-query';

import { LoadingIndicator, Button } from 'components';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.log(error);
  }

  tryAgain = async () => {
    await refetchAllQueries({ includeInactive: true });
    this.setState({ hasError: false });
  }

  render() {
    return (
      <React.Suspense fallback={<LoadingIndicator />}>
        {this.state.hasError ? (
          <div>
            Something went wrong! <Button onClick={this.tryAgain}>Try again!</Button>
          </div>
        ) : (
            <React.Fragment>
              {this.props.children}
            </React.Fragment>
          )
        }
      </React.Suspense>
    )
  }
}

export default ErrorBoundary