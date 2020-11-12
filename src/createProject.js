import execa from 'execa';
import shell from 'shelljs';
import { writeFileSync } from 'fs';
import {
  testFileTemplate,
  appCompTemplate,
  storeTemplate,
  rootReducerTemplate,
  indexTemplate,
  dockerFileTemplate,
} from './templates';
import errorReducerTemplate from './templates/errorReducerTemplate';

const createConfigFile = ({ projectName, language, sass }) => {
  const data = `{
    "project-name":"${projectName}",
    "language":"${language.toLowerCase()}",
    "styleExt":"${sass ? 'scss' : 'css'}",
    "compType":"func",
    "path": {
        "components":"src/components",
        "pages":"src/pages",
        "styles":"src/styles"
    }
}
`;
  writeFileSync(`${process.cwd()}/react-template.json`, data);
};

const createStyleDir = ({ sass }) => {
  const styleExtension = sass ? 'scss' : 'css';

  const path = `${process.cwd()}/styles/App.${styleExtension}`;

  writeFileSync(path, '/* App styles */');
};

const createReduxDir = ({ language }) => {
  const path = `${process.cwd()}/src/redux`;
  const fileExtension = language === 'TypeScript' ? 'ts' : 'js';
  shell.mkdir([path, `${path}/actions`, `${path}/reducers`]);
  shell.cd(path);
  writeFileSync(`${path}/store.${fileExtension}`, storeTemplate());
  writeFileSync(
    `${path}/types.${fileExtension}`,
    "export const GET_ERRORS = 'GET_ERRORS';"
  );
  writeFileSync(
    `${path}/reducers/errorsReducer.${fileExtension}`,
    errorReducerTemplate(language)
  );
  writeFileSync(
    `${path}/reducers/index.${fileExtension}`,
    rootReducerTemplate()
  );
};

const createAppComp = (options) => {
  const fileExtension = options.language === 'TypeScript' ? 'tsx' : 'jsx';

  const path = `${process.cwd()}/`;

  writeFileSync(`${path}App.test.${fileExtension}`, testFileTemplate('App'));

  writeFileSync(`${path}App.${fileExtension}`, appCompTemplate(options));

  writeFileSync(`${path}index.${fileExtension}`, indexTemplate());
};

const createDockerFile = () => {
  const path = `${process.cwd()}/`;
  writeFileSync(path + 'Dockerfile', dockerFileTemplate());
  writeFileSync(path + '.dockerignore', 'node_modules');
};

const createReactApp = async (options) => {
  try {
    let { projectName, language } = options;

    const path = `${process.cwd()}/${projectName}/`;

    language = language.toLowerCase();
    language = language === 'typescript' ? `--${language}` : null;

    await execa('npx', ['create-react-app', projectName, language]);

    shell.cd(path + '/src/');

    await execa('mkdir', ['components', 'pages', 'styles']);

    shell.rm(['App.*', 'index.*', 'logo.svg']);

    createStyleDir(options);
    createAppComp(options);

    shell.cd(path);

    createConfigFile(options);
    createDockerFile();

    return;
  } catch (error) {
    return Promise.reject(error.toString());
  }
};
