import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//this won't work for now as I will need to figure out how to pass store in 
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
