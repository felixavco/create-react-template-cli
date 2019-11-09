const appCompTemplate = (language, sass) => {
  const styleExt = sass ? 'scss' : 'css';

  let template = `
import React from 'react';
import './styles/App.${styleExt}'

const App = () => {
  return (
    <div>
      <h1>App Component</h1>
    </div>
  );
};

export default App;
`

  if (language === 'TypeScript') {
    template = `
import React, { FC } from 'react';
import './styles/App.${styleExt}'

const App: FC = () => {
  return (
    <div>
      <h1>App Component</h1>
    </div>
  );
};

export default App;
`
}
  return template;
}

export default appCompTemplate;