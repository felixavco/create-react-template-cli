import shell from 'shelljs';
import chalk from 'chalk';
import { writeFileSync, readFileSync } from 'fs';
import { componentTemplate, testFileTemplate } from './templates';

const getConfig = () => {
  const configPath = `${process.cwd()}/react-template.json`;
  return JSON.parse(readFileSync(configPath).toString());
};

export const createComponent = (
  componentType,
  componentName,
  parentComponent
) => {
  try {
    const appConfig = getConfig();

    const { path, language, styleExt } = appConfig;

    let compPath = `${process.cwd()}/${
      componentType === 'page'
        ? path.pages
        : componentType === 'component'
        ? path.components
        : null
    }`;

    compPath = parentComponent
      ? `${compPath}/${parentComponent}/${componentName}/`
      : `${compPath}/${componentName}/`;

    shell.mkdir([compPath]);

    const fileExt = language === 'typescript' ? 'tsx' : 'jsx';

    writeFileSync(
      `${compPath}/${componentName}.${fileExt}`,
      componentTemplate(componentName, appConfig)
    );
    console.log(
      chalk.blue(`${componentName}.${fileExt}`),
      chalk.green('CREATED')
    );

    writeFileSync(
      `${compPath}/${componentName}.test.${fileExt}`,
      testFileTemplate(componentName)
    );
    console.log(
      chalk.blue(`${componentName}.test.${fileExt}`),
      chalk.green('CREATED')
    );

    writeFileSync(
      `${compPath}/${componentName}.${styleExt}`,
      `/* ${componentName} styles */`
    );
    console.log(
      chalk.blue(`${componentName}.${styleExt}`),
      chalk.green('CREATED')
    );

    writeFileSync(
      `${compPath}/index.${fileExt.slice(0, -1)}`,
      `export { default } from './${componentName}';`
    );
    console.log(
      chalk.blue(`index.${fileExt.slice(0, -1)}`),
      chalk.green('CREATED')
    );
  } catch (error) {
    console.error(chalk.red(error.toString()));
  }
};
