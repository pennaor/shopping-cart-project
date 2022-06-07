const fetchItem = async (id) => {
  const url = `https://api.mercadolibre.com/items/${id}`;
  const response = await fetch(url);
  const body = await response.json();
  return body;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
