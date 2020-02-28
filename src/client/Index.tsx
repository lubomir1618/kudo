import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Hello } from './components/Hello';
import { vodka } from './utils/client';

import './style.css';

ReactDOM.render(<Hello compiler="TypeScript" framework="React" />, document.getElementById('example'));
vodka();
