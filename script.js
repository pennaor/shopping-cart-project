// Essa função serve para confirmar a eficiência do uso da lib decimal.js
// os valores podem ser verificados a partir do localStorage em sucessivas
// adições e remoções de items no cart. Para usar descomente essa função
// e a chame no escopo de updateTotalPrice().
// const testingUpdateTotalPrice = (price, add) => {
//   let updatedPrice = 0;
//   let testPrice = localStorage.getItem('testPrice');
//   if (testPrice) {
//     testPrice = parseFloat(testPrice);
//     if (add) {
//       updatedPrice = testPrice + price;
//     } else if (add === false) {
//       updatedPrice = testPrice - price;
//     }
//   }
//   localStorage.setItem('testPrice', updatedPrice);
// };

const updateTotalPrice = (price, add) => {
//  testingUpdateTotalPrice(price, add); // see this func above.
  let updatedPrice = 0;
  const totalPrice = localStorage.getItem('totalPrice');
  if (totalPrice) {
    const decimalParser = new Decimal(totalPrice);
    if (add) {
      updatedPrice = decimalParser.plus(price);
    } else if (add === false) {
      updatedPrice = decimalParser.minus(price);
    }
  }
  document.querySelector('.total-price').innerText = `${updatedPrice}`;
  localStorage.setItem('totalPrice', updatedPrice);
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

const createLoadingSpan = () => {
  const loading = document.createElement('span');
  loading.className = 'loading';
  loading.innerText = '...loading';
  return loading;
};

const removeLoadingSpan = (node) => {
  node.querySelector('.loading').remove();
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductImageElement = (imageSource, imgClass) => {
  const img = document.createElement('img');
  img.className = imgClass;
  img.src = imageSource;
  return img;
};

const createProductItemElement = ({ sku, name, image, salePrice }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image, 'item__image'));
  const salePriceElement = createCustomElement('span', 'item__price_prefix', 'Por apenas ');
  salePriceElement.append(createCustomElement('span', 'item__price', `R$${salePrice} !!`));
  section.appendChild(salePriceElement);
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const cartItemClickListener = ({ currentTarget }) => {
  currentTarget.remove();
  updateTotalPrice(currentTarget.salePrice, false);
  removeItemFromStorage(currentTarget.sku);
};

const createCartItemElement = ({ sku, name, salePrice, image }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  const details = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.sku = sku;
  li.salePrice = salePrice;
  li.addEventListener('click', cartItemClickListener, false);
  li.prepend(createProductImageElement(image, 'item__image_icon'));
  li.append(createCustomElement('span', 'cart__item_details', details));
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
  const { id, title, price, thumbnail } = await fetchItem(sku);
  removeLoadingSpan(cartItems);
  const param = {
    sku: id,
    name: title,
    salePrice: price,
    image: thumbnail,
  };
  const cartItem = createCartItemElement(param);
  cartItems.appendChild(cartItem);
  formatItemToSave(param.sku);
  updateTotalPrice(param.salePrice, true);
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const onAddItemToCart = ({ target }) => {
  const item = target.closest('.item');
  const sku = getSkuFromProductItem(item);  
  addItemToCart(sku);
};

const updateLocalStorage = async () => {
  localStorage.setItem('totalPrice', 0);
  localStorage.setItem('testPrice', 0);
  const savedItems = getSavedCartItems('cartItems');
  if (savedItems) {
    const skus = JSON.parse(savedItems);
    if (Array.isArray(skus)) {
      localStorage.removeItem('cartItems');
      skus.forEach(addItemToCart);
    }
  }
};

const insertProductItemElements = async () => {
  const itemsSection = document.querySelector('.items');
  itemsSection.appendChild(createLoadingSpan());
  const { results } = await fetchProducts('computador');
  removeLoadingSpan(itemsSection);
  results.forEach(({ id, title, thumbnail, price }) => {
      const param = {
        sku: id,
        name: title,
        image: thumbnail,
        salePrice: price,
      };
      const productItem = createProductItemElement(param);
      productItem.querySelector('.item__add').addEventListener('click', onAddItemToCart);
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
