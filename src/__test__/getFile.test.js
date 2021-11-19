const { getFileData } = require('../util/convertor');

describe('Test get File Data', () => {
  test('test if input is a file or folder', async () => {
    let array = [];
    let input = './src/__test__/input.txt';
    array = await getFileData(input);
    expect(array.length).toBeGreaterThan(0);
  });

  test('test if input is a folder', async () => {
    let array = [];
    let input = './src/__test__/folder';
    array = await getFileData(input);
    console.log(array);
    expect(array.length).toEqual(0);
  });
});
