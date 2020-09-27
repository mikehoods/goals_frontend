import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// import { UserDataProvider, UserDataContext } from './context/UserContext';

import { createStore } from 'redux';
import { Provider } from 'react-redux'
import rootReducer from './reducers/rootreducer'

const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    {/* <UserDataProvider>
      <UserDataContext.Consumer>
        {({ userData, setUserData }) => (
          <App 
            userData={userData}
            setUserData={setUserData}
          />
        )}
      </UserDataContext.Consumer>
    </UserDataProvider> */}
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
