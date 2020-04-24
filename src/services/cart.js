import Storage from "./storage";
const Cache = new Storage();
const CART_CACHE_KEY = "CART_EMERHUB";

const getCart = () => {
  const saveCart = Cache.getItem(CART_CACHE_KEY);

  if (saveCart) {
    return saveCart;
  }

  return []
}

const setCart = (cart) => {
  Cache.setItem(CART_CACHE_KEY, cart)
}

const toggleItem = (item) => {
  let saveCart = Cache.getItem(CART_CACHE_KEY)
  if (!item || !item.systemId) return saveCart;

  if (!saveCart || !saveCart.length) {
    saveCart = [{ ...item }]
    Cache.setItem(CART_CACHE_KEY, saveCart)
    return saveCart;
  }

  const itemIndexInCart = indexInCart(item.systemId)
  if (itemIndexInCart > - 1) {
    saveCart.splice(itemIndexInCart, 1);
  } else {
    saveCart.push(item)
  }

  Cache.setItem(CART_CACHE_KEY, saveCart)
  return saveCart;
}

const indexInCart = (systemId) => {
  if (!systemId) return -1;
  const saveCart = Cache.getItem(CART_CACHE_KEY)
  if (!saveCart || !saveCart.length) {
    return -1;
  }

  return saveCart.map(comp => comp.systemId).indexOf(systemId)
}

export {
  getCart,
  toggleItem,
  setCart,
  indexInCart
}