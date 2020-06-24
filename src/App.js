import React from 'react';

import './App.scss';
import Home from './components';
import FormState from './components/FormState';
import { RecoilRoot } from 'recoil';


function App() {

  return (
    <div className="App">
      <RecoilRoot>
        <FormState />
        <Home />
      </RecoilRoot>
    </div>
  );
}

export default App;
