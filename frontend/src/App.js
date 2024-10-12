import React from 'react';
import ArticleSubmission from './components/ArticleSubmission';
import ModerationQueue from './components/ModerationQueue';

function App() {
  return (
    <div>
      <h1>Article Moderation System</h1>
      <ArticleSubmission />
      <ModerationQueue />
    </div>
  );
}

export default App;
