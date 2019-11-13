const appCompTemplate = ({ language, sass, router, redux }) => {
  const styleExt = sass ? 'scss' : 'css';
  const isTS = language === 'TypeScript';



  const template = `import React${isTS ? ", { FC } " : ''}from 'react';
import './styles/App.${styleExt}';

const App${isTS ? ": FC " : ''} = () => {
  return (
    <div>
      <h1>App Component</h1>
    </div>
  );
};

export default App;`;

  return template;
}

export default appCompTemplate;