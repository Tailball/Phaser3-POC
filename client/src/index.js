import React from 'react';
import ReactDOM from 'react-dom';

import './styles/index.css';
import Game from './phaser/Game';

ReactDOM.render(<div />, document.querySelector('#reactContainer'));

new Game();