const addToCartAction = async (items: ICartItem[], cartId: string) => {
    console.log('viet ham sau nha ', cartId,items)
//   try {
//     const res = await fetchWithCookiesGraphql({
//       query: ADD_TO_CART,
//       variables: {
//         cartId: cartId,
//         cartItems: items,
//       },
//     })
//     const id = res?.payload?.data?.addProductsToCart
//     return id
//   } catch (err) {
//     console.log('Error when adding items to cart: ', err)
//     return null
//   }
}

const removeCartItem = async (cartId: string, cartItemUID: string) => {
    console.log('viet ham sau nha ', cartId,cartItemUID)
//   try {
//     const res = await fetchWithCookiesGraphql({
//       query: REMOVE_CART_ITEM,
//       variables: {
//         removeItemFromCartInput: {
//           cart_id: cartId,
//           cart_item_uid: cartItemUID,
//         },
//       },
//     }).then((res) => res?.payload)
//     const data = res?.data?.removeItemFromCart
//     if (!data) return { data: null, message: res?.errors?.[0]?.message, status: 'error' }
//     return data
//   } catch (err) {
//     console.log('Error when adding items to cart: ', err)
//     return null
//   }
}


export {
  addToCartAction,
  removeCartItem,
}
