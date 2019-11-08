import inquirer from 'inquirer';
import { createProject } from './createProject';

const parseArgs = rawArgs => {
    return {
        first: rawArgs[2] === 'i' ? 'init' : rawArgs[2] === 'g' ? 'generate' : null,
        second: rawArgs[3],
        third: rawArgs[4]
    }
}

const promptQuestions = async () => {

    const questions = [
        {
            type: 'input',
            name: 'projectName',
            message: 'Please enter a project Name',
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
        }
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
}

export const cli = async (args) => {
    let { first } = parseArgs(args);

    switch (first) {
        case 'init':
            const projectOptions = await promptQuestions();
            await createProject(projectOptions);
            break;

        case 'generate':
            console.log(args)
            break;

        default:
            console.log(' run "rt --init [-i]" to initiate a new project \n or \n run "rt --generate [-g] to generate a component or page"')
            break;
    }

}