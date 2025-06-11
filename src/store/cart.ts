import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";
import { addToCartAction, removeCartItem } from "@/services";

export enum TYPE_CART {
  GUEST = "guest",
  USER = "user",
}

type CartState = {
  cartId: string;
  cartItems: IListCartItems[];
  cartType: TYPE_CART;
  isLoading: boolean;
};

type CartAction = {
  addToCart: (items: ICartItem[]) => Promise<void>;
  removeCartItem: (cartItemUID: string) => Promise<void>;
  clearCart: () => void;
};

type CartStore = CartState & CartAction;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartId: "",
      cartItems: [],
      cartType: Cookies.get("token") ? TYPE_CART.USER : TYPE_CART.GUEST,
      isLoading: false,

      addToCart: async (items) => {
        if (!items.length) return;
        set({ isLoading: true });
        const res = await addToCartAction(items, get().cartId);
        console.log("res cart", res);

        //@ts-expect-error/removerrorts
        set({ cartItems: [...get().cartItems, ...items] });
        set({ isLoading: false });
      },

      removeCartItem: async (cartItemUID) => {
        set({ isLoading: true });
        await removeCartItem(get().cartId, cartItemUID);
        set({
          cartItems: get().cartItems.filter((item) => item.uid !== cartItemUID),
          isLoading: false,
        });
      },

      clearCart: () =>
        set({ cartId: "", cartItems: [], cartType: TYPE_CART.GUEST }),
    }),
    { name: "cart-storage" }
  )
);
