import React from 'react';

import './assets/styles.scss';
import './App.scss';

import Home from './components';
import FormState from './components/FormState';
import { RecoilRoot } from 'recoil';


function App() {

  return (
    <RecoilRoot>
      <FormState />
      <div className="App">
        <div className="login">
          <Home/>
        </div>
      </div>
    </RecoilRoot>
  );
}

export default App;
