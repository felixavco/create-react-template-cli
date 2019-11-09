import chalk from 'chalk';
import execa from 'execa';
import Listr from 'listr';
import shell from 'shelljs';
import { writeFileSync } from 'fs';
import { testFileTemplate, appCompTemplate, storeTemplate, rootReducerTemplate, indexTemplate } from './templates';

const createConfigFile = ({ projectName, language, sass }) => {
    const data = `
    {
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
    `
    writeFileSync(`${process.cwd()}/react-template.json`, data)
}

const createStyleDir = ({ sass }) => {
    const styleExt = sass ? 'scss' : 'css';

    const path = `${process.cwd()}/styles/App.${styleExt}`;

    writeFileSync(path, '// App styles');
}

const createReduxDir = ({ language }) => {
    const path = `${process.cwd()}/src/redux`;
    const fileExt = language === 'typescript' ? 'ts' : 'js';
    shell.mkdir([path, `${path}/actions`, `${path}/reducers`]);
    shell.cd(path);
    writeFileSync(`${path}/store.${fileExt}`, storeTemplate());
    writeFileSync(`${path}/types.${fileExt}`, "export const GET_ERRORS = 'GET_ERRORS';");
    writeFileSync(`${path}/reducers/errorReducer.${fileExt}`, rootReducerTemplate());
    writeFileSync(`${path}/reducers/index.${fileExt}`, rootReducerTemplate());
}

const createAppComp = (options) => {
    const fileExt = options.language === 'typescript' ? 'tsx' : 'jsx';

    const path = `${process.cwd()}/`;

    writeFileSync(`${path}App.test.${fileExt}`, testFileTemplate('App'));

    writeFileSync(`${path}App.${fileExt}`, appCompTemplate(options));

    writeFileSync(`${path}index.${fileExt}`, indexTemplate());
}

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

        return;
    } catch (error) {
        return Promise.reject(error.toString());
    }
}

const installSass = async () => {
    try {
        await execa('npm', ['install', 'node-sass']);
        return;
    } catch (error) {
        return Promise.reject(error.toString());
    }
}

const installRouter = async () => {
    try {
        await execa('npm', ['install', 'react-router-dom']);
    } catch (error) {
        return Promise.reject(error.toString());
    }
}

const installAxios = async () => {
    try {
        await execa('npm', ['install', 'axios']);
    } catch (error) {
        return Promise.reject(error.toString());
    }
}

const installRedux = async (options) => {
    try {
        await execa('npm', ['install', 'redux', 'react-redux', 'redux-thunk']);
        createReduxDir(options)
    } catch (error) {
        return Promise.reject(error.toString());
    }
}

export const createProject = async (options) => {

    const { language, sass, router, axios, redux } = options

    const taskArr = [{ title: `Creating React App with ${language}`, task: () => createReactApp(options) }];

    if (sass) taskArr.push({ title: 'Instaling Sass', task: () => installSass() });

    if (router) taskArr.push({ title: 'Instaling Router', task: () => installRouter() });

    if (axios) taskArr.push({ title: 'Instaling Axios', task: () => installAxios() });

    if (redux) taskArr.push({ title: 'Instaling Redux', task: () => installRedux(options) });

    const tasks = new Listr(taskArr);

    await tasks.run();

    console.log('%s Project ready', chalk.green.bold('DONE'));
    return true;
}