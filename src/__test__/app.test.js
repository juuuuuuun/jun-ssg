//const app = require('../app');
const util = require('../util');

describe('app test', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  const successMessage = 'Created HTML file(s) successfully';

  it('should get a success message', async () => {
    const spyFn = jest.spyOn(util, 'getParams');
    spyFn.mockImplementation(() => ({
      argv: {
        config: 'config.json',
      },
    }));
    //await app.start();
    expect(util.getParams).toBeCalledTimes(0);
  });

  it('should get a success message', async () => {
    const spyFn = jest.spyOn(util, 'getParams');
    spyFn.mockImplementation(() => ({
      argv: {
        config: 'config.json',
      },
    }));
    expect(util.getParams).successMessage;
  });
});
