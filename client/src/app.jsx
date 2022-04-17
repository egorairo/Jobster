import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import store from './store/store';

import Routing from './components/Routing.jsx';

import './index.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
