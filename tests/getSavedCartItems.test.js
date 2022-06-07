const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('verifica se o método getItem de localStorage é chamado.',
  () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  it('verifica se getItem recebe como argumento a key cartItems.',
  () => {
    const key = 'cartItems';
    getSavedCartItems(key);
    expect(localStorage.getItem).toHaveBeenCalledWith(key);
  });
});
