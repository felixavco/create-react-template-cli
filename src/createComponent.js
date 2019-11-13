import shell from 'shelljs';
import chalk from 'chalk';
import { writeFileSync, readFileSync } from 'fs';
import { componentTemplate, testFileTemplate } from './templates';

const getConfig = () => {
    const configPath = `${process.cwd()}/react-template.json`;
    return JSON.parse(readFileSync(configPath).toString());
}

export const createComponent = (compType, compName, parentComp) => {
    try {
        const appConfig = getConfig();

        const { path, language, styleExt } = appConfig;

        let compPath = `${process.cwd()}/${compType === 'page' ? path.pages : compType === 'component' ? path.components : null}`;

        compPath = parentComp ? `${compPath}/${parentComp}/${compName}/` : `${compPath}/${compName}/`;

        shell.mkdir([compPath]);

        const fileExt = language === 'typescript' ? 'tsx' : 'jsx';

        writeFileSync(
            `${compPath}/${compName}.${fileExt}`,
            componentTemplate(compName, appConfig)
        )
        console.log(chalk.blue(`${compName}.${fileExt}`), chalk.green('CREATED'));

        writeFileSync(
            `${compPath}/${compName}.test.${fileExt}`,
            testFileTemplate(compName)
        )
        console.log(chalk.blue(`${compName}.test.${fileExt}`), chalk.green('CREATED'));

        writeFileSync(
            `${compPath}/${compName}.${styleExt}`,
            `/* ${compName} styles */`
        )
        console.log(chalk.blue(`${compName}.${styleExt}`), chalk.green('CREATED'));

        writeFileSync(
            `${compPath}/index.${fileExt.slice(0, -1)}`,
            `export { default } from './${compName}';`
        );
        console.log(chalk.blue(`index.${fileExt.slice(0, -1)}`), chalk.green('CREATED'));

    } catch (error) {
        console.error(chalk.red(error.toSTring()))
    }

}