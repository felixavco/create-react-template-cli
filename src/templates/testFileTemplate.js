

export const testFileTemplate = compName => {
    return `
import React from 'react';
import ReactDOM from 'react-dom';
import ${compName} from './${compName}';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<${compName} />, div);
    ReactDOM.unmountComponentAtNode(div);
});
`
}

export default testFileTemplate;