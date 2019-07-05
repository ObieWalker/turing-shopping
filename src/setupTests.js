import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// MOCKED MODULE
// jest.mock('httpClient', () => ({
//   get: jest.fn(),
//   put: jest.fn(),
//   delete: jest.fn(),
//   post: jest.fn(),
//   xhr: {
//     get: () => new Promise(),
//   }
// }));
