import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './components/App';
import * as serviceWorker from './utils/sw';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
