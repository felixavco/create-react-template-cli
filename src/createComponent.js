import shell from 'shelljs';
import chalk from 'chalk';
import { writeFileSync, readFileSync } from 'fs';
import { funcCompTemplate, testFileTemplate } from './templates';

const getConfig = () => {
    const configPath = `${process.cwd()}/react-template.json`;
    return JSON.parse(readFileSync(configPath).toString());
}

export const createComponent = (compType, compName, compPath = '') => {

    const { path, language: lang,  styleExt } = getConfig();

    const newCompPath = `${process.cwd()}/${compType === 'page' ? path.pages : compType === 'component' ? path.components : compPath}/${compName}/`

    shell.mkdir([newCompPath]);

    const fileExt = lang === 'typescript' ? 'tsx' : 'jsx';
    
    writeFileSync(
        `${newCompPath}/${compName}.${fileExt}`,
        funcCompTemplate(compName, lang, styleExt)
    )
    console.log(chalk.blue(`${compName}.${fileExt}`), chalk.green('CREATED'));

    writeFileSync(
        `${newCompPath}/${compName}.test.${fileExt}`,
        testFileTemplate(compName)
    )
    console.log(chalk.blue(`${compName}.test.${fileExt}`), chalk.green('CREATED'));

    writeFileSync(
        `${newCompPath}/${compName}.${styleExt}`,
        `//${compName} styles`
    )
    console.log(chalk.blue(`${compName}.${styleExt}`), chalk.green('CREATED'));

    writeFileSync(
        `${newCompPath}/index.${fileExt.slice(0, -1)}`, 
        `export { default } from './${compName}';`
    );
    console.log(chalk.blue(`index.${fileExt.slice(0, -1)}`), chalk.green('CREATED'));

}