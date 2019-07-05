import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


// MOCKED MODULES
jest.mock('httpClient', () => ({
  get: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  xhr: {
    get: () => new Promise(),
  }
}));
