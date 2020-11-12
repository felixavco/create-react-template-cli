const componentTemplate = (componentName, { language, styleExt, compType }) => {
  const isTs = language === 'typescript';
  let template;

  if (compType.toLowerCase() === 'class') {
    template = `import React, { Component } from 'react';
import './${componentName}.${styleExt}';

class ${componentName} extends Component {
  render() {
    return (
      <div>
        <h1>${componentName} Component</h1>
      </div>
    );
  };
};

export default ${componentName};`;

    return template;
  }

  template = `import React${isTs ? ', { FC }' : ''} from 'react';
import './${componentName}.${styleExt}';

const ${componentName}${isTs ? ': FC' : ''} = () => {
  return (
    <div>
      <h1>${componentName} Component</h1>
    </div>
  );
};

export default ${componentName};`;

  return template;
};

export default componentTemplate;
