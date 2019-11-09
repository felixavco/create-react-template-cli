const funcCompTemplate = (compName, language, styleExt) => {
  let template = `import React from 'react';
import './${compName}.${styleExt}';

const ${compName} = () => {
  return (
    <div>
      <h1>${compName} Component</h1>
    </div>
  );
};

export default ${compName};
`
  if (language === 'typescript') {
    template = `import React, { FC } from 'react';
import './${compName}.${styleExt}';


const ${compName}: FC = () => {
  return (
    <div>
      <h1>${compName} Component</h1>
    </div>
  );
};

export default ${compName};
`
}
  return template;
}

export default funcCompTemplate;