const enzymeConfigTemplate = () => `import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({
    adapter: new Adapter(),
    disableLifecycleMethods: true
});`;

export default enzymeConfigTemplate;