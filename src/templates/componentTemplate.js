const componentTemplate = (compName, { language, styleExt, compType }) => {
  const isTs = language === 'typescript';
  let template;

  if (compType.toLowerCase() === 'class') {
    template = `import React, { Component } from 'react';
import './${compName}.${styleExt}';

class ${compName} extends Component {
  render() {
    return (
      <div>
        <h1>${compName} Component</h1>
      </div>
    );
  };
};

export default ${compName};`;

    return template;
  }

  template = `import React${isTs ? ", { FC }" : ''} from 'react';
import './${compName}.${styleExt}';

const ${compName}${isTs ? ": FC" : ''} = () => {
  return (
    <div>
      <h1>${compName} Component</h1>
    </div>
  );
};

export default ${compName};`;

  return template;
}

export default componentTemplate;