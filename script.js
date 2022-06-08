const createLoadingSpan = () => {
  const loading = document.createElement('span');
  loading.className = 'loading';
  loading.innerText = '...loading';
  return loading;
};

const removeLoadingSpan = (node) => {
  node.querySelector('.loading').remove();
};

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const removeItemFromStorage = (id) => {
  const skus = JSON.parse(getSavedCartItems('cartItems'));
  let alreadyRemoved = false;
  const filteredSkus = skus.filter((sku) => {
    if (sku !== id || alreadyRemoved) {
      return true;
    }
    alreadyRemoved = true;
    return false;
  });
  saveCartItems(JSON.stringify(filteredSkus));
};

const updateTotalPrice = (price, add) => {
  let totalPrice = parseFloat(localStorage.getItem('totalPrice'));
  switch (add) {
    case true:
      totalPrice += parseFloat(price);
      break;
    case false:
      totalPrice -= parseFloat(price);
      break;
    default:
      totalPrice = 0;
  }
  document.querySelector('.total-price').innerText = `${totalPrice}`;
  localStorage.setItem('totalPrice', totalPrice);
};

const cartItemClickListener = ({ target }) => {
  target.remove();
  updateTotalPrice(target.salePrice, false);
  removeItemFromStorage(target.sku);
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.sku = sku;
  li.salePrice = salePrice;
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

const addItemToCart = async (sku) => {
  const cartItems = document.querySelector('.cart__items');
  cartItems.appendChild(createLoadingSpan());
  const { id, title, price } = await fetchItem(sku);
  removeLoadingSpan(cartItems);
  const param = {
    sku: id,
    name: title,
    salePrice: price,
  };
  const cartItem = createCartItemElement(param);
  cartItems.appendChild(cartItem);
  formatItemToSave(param.sku);
  updateTotalPrice(param.salePrice, true);
};

const updateLocalStorage = async () => {
  localStorage.setItem('totalPrice', 0);
  const savedItems = getSavedCartItems('cartItems');
  if (savedItems) {
    const skus = JSON.parse(savedItems);
    if (Array.isArray(skus)) {
      localStorage.removeItem('cartItems');
      skus.forEach(addItemToCart);
    }
  }
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const onAddItemToCart = ({ target }) => {
  const item = target.closest('.item');
  const sku = getSkuFromProductItem(item);  
  addItemToCart(sku);
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
  const itemsSection = document.querySelector('.items');
  itemsSection.appendChild(createLoadingSpan());
  const { results } = await fetchProducts('computador');
  removeLoadingSpan(itemsSection);
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

const cartClear = () => {
  document.querySelector('.cart__items').innerHTML = null;
  localStorage.removeItem('cartItems');
  updateTotalPrice();
};

window.onload = () => {
  updateLocalStorage();
  insertProductItemElements();
  document.querySelector('.empty-cart').addEventListener('click', cartClear);
};
