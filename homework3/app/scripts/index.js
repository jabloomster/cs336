import React from 'react';
import ReactDOM from 'react-dom';

import CommentBox from './personBox';

import '../css/base.css';

ReactDOM.render(
  <CommentBox url="/api/people" pollInterval={2000} />,
  document.getElementById('content')
);
