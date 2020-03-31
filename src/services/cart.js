import Storage from "./storage";
const Cache = new Storage();
const CART_CACHE_KEY = "CART";

const getCart = () => {
  const saveCart = Cache.getItem(CART_CACHE_KEY);

  if (saveCart) {
    return saveCart;
  }

  return []
}

const updateCart = (item) => {
  let saveCart = Cache.getItem(CART_CACHE_KEY)
  if (!item || !item.id) return saveCart;

  if (!saveCart || !saveCart.length) {
    saveCart = [{ ...item }]
    Cache.setItem(CART_CACHE_KEY, saveCart)
    return saveCart;
  }

  const itemIndexInCart = indexInCart(item.id)
  if (itemIndexInCart > - 1) {
    saveCart.splice(itemIndexInCart, 1);
  } else {
    saveCart.push(item)
  }

  Cache.setItem(CART_CACHE_KEY, saveCart)
  return saveCart;
}

const indexInCart = (id) => {
  if (!id) return -1;
  const saveCart = Cache.getItem(CART_CACHE_KEY)
  if (!saveCart || !saveCart.length) {
    return -1;
  }

  return saveCart.map(comp => comp.id).indexOf(id)
}

export {
  getCart,
  updateCart,
  indexInCart
}