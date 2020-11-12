import execa from 'execa';

export const installSass = async () => {
  try {
    await execa('npm', ['install', 'node-sass']);
    return;
  } catch (error) {
    return Promise.reject(error.toString());
  }
};

export const installRouter = async (options) => {
  try {
    await execa('npm', ['install', 'react-router-dom']);
    if (options.language === 'TypeScript') {
      await execa('npm', ['install', '-D', '@types/react-router-dom']);
    }
  } catch (error) {
    return Promise.reject(error.toString());
  }
};

export const installAxios = async () => {
  try {
    await execa('npm', ['install', 'axios']);
  } catch (error) {
    return Promise.reject(error.toString());
  }
};

export const installRedux = async (options) => {
  try {
    await execa('npm', [
      'install',
      'redux',
      'react-redux',
      'redux-thunk',
      'redux-devtools-extension',
    ]);
    if (options.language === 'TypeScript') {
      await execa('npm', [
        'install',
        '-D',
        '@types/react-redux',
        '@types/react-dom',
        '@types/react',
      ]);
    }
    createReduxDir(options);
  } catch (error) {
    return Promise.reject(error.toString());
  }
};

export const createProject = async (options) => {
  const { language, sass, router, axios, redux } = options;

  const taskArr = [
    {
      title: `Creating React App with ${language}`,
      task: () => createReactApp(options),
    },
  ];

  if (sass)
    taskArr.push({ title: 'Instaling Sass', task: () => installSass() });

  if (router)
    taskArr.push({
      title: 'Instaling Router',
      task: () => installRouter(options),
    });

  if (axios)
    taskArr.push({ title: 'Instaling Axios', task: () => installAxios() });

  if (redux)
    taskArr.push({
      title: 'Instaling Redux',
      task: () => installRedux(options),
    });

  const tasks = new Listr(taskArr);

  await tasks.run();

  console.log('%s Project ready', chalk.green.bold('DONE'));
  return true;
};
