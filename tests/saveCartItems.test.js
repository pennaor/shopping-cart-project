const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('verifica se o método setItem de localStorage é chamado',
  () => {
    saveCartItems();
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('verifica se setItem recebe como argumento a key cartItems e como valor um elemento html',
  () => {
    const key = 'cartItems', value = '<ol><li>Item</li></ol>';
    saveCartItems(value);
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value);
  });
});
