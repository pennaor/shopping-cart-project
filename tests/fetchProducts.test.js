require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('verifica se é uma função', 
  () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('ao receber como argumento "computador", verifica se a função fetch foi chamada',
  async () => {
    await fetchProducts('computador');
    expect(fetch).toBeCalled();
  });
  it('verifica se fetch foi chamada com argumento correto',
  async () => {
    await fetchProducts('computador');
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toBeCalledWith(url);
  });
  it('verifica se retorna objeto semelhante a computadorSearch quando chamada com argumento "computador"',
  async () => {
    const response = await fetchProducts('computador');
    expect(response).toEqual(computadorSearch);
  });
  it('verifica se fetchProducts retorna erro quando não recebe argumento',
  async () => {
    expect.assertions(1);
    try {
      await fetchProducts();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });
});
