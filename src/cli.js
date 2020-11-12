import inquirer from 'inquirer';
import { createComponent } from './createComponent';
import { createProject } from './installs';

const parseArgs = (rawArgs) => {
  const firstArg = rawArgs[2] ? rawArgs[2].toLowerCase() : null;
  const secondArg = rawArgs[3] ? rawArgs[3].toLowerCase() : null;
  const thirdArg = rawArgs[4] ? rawArgs[4].split(' ')[0].trim() : null;

  return {
    action:
      firstArg === 'i' || firstArg === 'init'
        ? 'init'
        : firstArg === 'g' || firstArg === 'generate'
        ? 'generate'
        : firstArg === 'create' || firstArg === 'c'
        ? 'generate'
        : null,
    componentType:
      secondArg === 'c'
        ? 'component'
        : secondArg === 'component'
        ? 'component'
        : secondArg === 'p' || secondArg === 'page'
        ? 'page'
        : null,
    componentName: thirdArg,
    parentComponent: rawArgs[5] || '',
  };
};

const promptQuestions = async () => {
  const validateProjectName = async (input) => {
    const regex = /^[a-z0-9\-\_]+$/;
    const isValid = regex.test(input);
    return isValid ? true : 'Invalid project name';
  };

  const questions = [
    {
      type: 'input',
      name: 'projectName',
      message: 'Please enter a project name',
      validate: validateProjectName,
    },
    {
      type: 'list',
      name: 'language',
      message: 'Please choose a language',
      choices: ['JavaScript', 'TypeScript'],
      default: 'JavaScript',
    },
    {
      type: 'confirm',
      name: 'sass',
      message: 'Do you want to use Sass?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'router',
      message: 'Do you want to install Router?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'axios',
      message: 'Do you want to install Axios?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'redux',
      message: 'Do you want to install Redux?',
      default: true,
    },
  ];

  const answers = await inquirer.prompt(questions);
  const projectOptions = {};
  projectOptions.projectName = answers.projectName;
  projectOptions.language = answers.language;
  projectOptions.sass = answers.sass;
  projectOptions.router = answers.router;
  projectOptions.axios = answers.axios;
  projectOptions.redux = answers.redux;
  return projectOptions;
};

export const cli = async (args) => {
  let { action, componentType, componentName, parentComponent } = parseArgs(
    args
  );

  switch (action) {
    case 'init':
      const projectOptions = await promptQuestions();
      await createProject(projectOptions);
      break;

    case 'generate':
      createComponent(componentType, componentName, parentComponent);
      break;

    default:
      const help = `
                "rt init" Creates a new project
                "rt i" Creates a new project

                "rt generate component <ComponentName>" Creates a component or page
                "rt g c <ComponentName>" Creates a component or page

                "rt create page <PageName>" Creates a component or page 
                "rt c p <PageName>" Creates a component or page

                "rt create component <ComponentName> <ParentComponent>" Creates a component inside an existing component or page
                "rt g p <ComponentName> <ParentPage>" Creates a component inside an existing component or page
            `;
      console.log(help);
      break;
  }
};
