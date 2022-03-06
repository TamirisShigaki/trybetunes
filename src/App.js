import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './pages/Routes';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    );
  }
}

export default App;
