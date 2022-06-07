require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('verifica se é uma função', 
  () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('ao receber como argumento "MLB1615760527", verifica se a função fetch foi chamada',
  async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toBeCalled();
  });
  it('verifica se fetch foi chamada com argumento correto',
  async () => {
    await fetchItem('MLB1615760527');
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(fetch).toBeCalledWith(url);
  });
  it('verifica se retorna objeto semelhante a MLB1615760527Search quando chamada com argumento "MLB1615760527"',
  async () => {
    const response = await fetchItem('MLB1615760527');
    expect(response).toEqual(item);
  });
  it('verifica se fetchItem retorna erro quando não recebe argumento',
  async () => {
    expect.assertions(1);
    try {
      await fetchItem();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });
});
