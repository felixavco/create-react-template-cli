const appCompTemplate = ({ language, sass, router, redux }) => {
  const styleExt = sass ? 'scss' : 'css';
  const ts = 'TypeScript';

  let content = `<div>
      <h1>App Component</h1>
    </div>`;

  if (router && redux) {
    content = `<Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Component} />
          <Route exact path="/not-found" render={<h1>Page Not Found 404</h1>} />
          <Redirect to="/not-found" />
        </Switch>
      </Router>
    </Provider>`;
  } else if (router) {
    content = `<Router>
      <Switch>
        <Route exact path="/" component={Component} />
        <Route exact path="/not-found" render={<h1>Page Not Found 404</h1>} />
        <Redirect to="/not-found" />
      </Switch>
    </Router>`;
  } else if (redux) {
    content = `<Provider store={store}>
      <h1>App Component</h1>
    </Provider>
    `;
  }

  const template = `import React${language === ts ? ", { FC } " : null}from 'react';
import './styles/App.${styleExt}';
${router ? "import  { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';" : null}
${redux ? "import { Provider } from 'react-redux';" : null}
${redux ? "import store from 'react-redux';" : null}
${router ? "const Component = <h1>App Component</h1>;" : null}


const App${language === ts ? ": FC " : null} = () => {
  return (
    ${content}
  );
};

export default App;`;

  return template;
}

export default appCompTemplate;