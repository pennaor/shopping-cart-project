const fetchProducts = async (product) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  const response = await fetch(url);
  const body = await response.json();
  return body;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
