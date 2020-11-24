import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import * as serviceWorker from './serviceWorker';
import App from './Components/App/App';
import allReducers from './Components/Redux/Reducers'
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
    allReducers, 
    composeWithDevTools()
  );

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
  </ThemeProvider>,
  document.getElementById('root'),
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
