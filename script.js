const cartItemClickListener = ({ target }) => {
  target.remove();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const formatItemToSave = (sku) => {
  const skus = getSavedCartItems('cartItems');
  if (!skus) {
    const firstItem = [sku];
    saveCartItems(JSON.stringify(firstItem));
    return;
  }
  const storedArray = JSON.parse(skus);
  if (Array.isArray(storedArray)) {
    storedArray.push(sku);
    saveCartItems(JSON.stringify(storedArray));
  }
};

const addItemToCart = (param) => {
  const cartItem = createCartItemElement(param);
  const cartItems = document.querySelector('.cart__items');
  cartItems.appendChild(cartItem);
  formatItemToSave(param.sku);
};

const updateLocalStorage = async () => {
  const savedItems = getSavedCartItems('cartItems');
  if (savedItems) {
    const skus = JSON.parse(savedItems);
    if (Array.isArray(skus)) {
      localStorage.removeItem('cartItems');
      skus.forEach(async (sku) => {
        const { id, title, price } = await fetchItem(sku);
        const param = {
          sku: id,
          name: title,
          salePrice: price,
        };
        addItemToCart(param);
      });
    }
  }
};

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const onAddItemToCart = async ({ target }) => {
  const item = target.closest('.item');
  const sku = getSkuFromProductItem(item);   
  const { id, title, price } = await fetchItem(sku);
  const param = {
    sku: id,
    name: title,
    salePrice: price,
  };
  addItemToCart(param);
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  if (className === 'item__add') {
    e.addEventListener('click', onAddItemToCart);
  }
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const insertProductItemElements = async () => {
  const { results } = await fetchProducts('computador');
  const itemsSection = document.querySelector('.items');
  results.forEach(({ id, title, thumbnail }) => {
      const param = {
        sku: id,
        name: title,
        image: thumbnail,
      };
      const productItem = createProductItemElement(param);
      itemsSection.appendChild(productItem);
  });
};

window.onload = () => {
  updateLocalStorage();
  insertProductItemElements();
};
