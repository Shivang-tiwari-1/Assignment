import { createContext } from "react";

export interface UserContextType {
  SignUp: (name: string, email: string, password: string) => Promise<unknown>;
  logIn: (email: string, password: string) => Promise<unknown>;
  Products: () => Promise<unknown>;
  refresh: () => Promise<unknown>;
  deleteCartItem: (productId: string) => Promise<unknown>;
  getCart: () => Promise<unknown>;
  addCart: (
    quantity: number,
    category: string,
    price: number
  ) => Promise<unknown>;
  limit: number;
  setLimit: (limit: number) => void;
  product: []; // array of products
  cart: []; // array of cart items
  setCart: React.Dispatch<React.SetStateAction<any[]>>;
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  checkoutCart: (data: []) => Promise<unknown>;
  logout: () => Promise<unknown>;
}

const UserContext = createContext<UserContextType>({
  SignUp: async () => {},
  logIn: async () => {},
  refresh: async () => {},
  Products: async () => {},
  deleteCartItem: async () => {},
  getCart: async () => {},
  addCart: async () => {},
  limit: 5,
  setLimit: () => {},
  product: [],
  cart: [],
  setCart: () => {},
  reload: false,
  setReload: () => {},
  checkoutCart: async () => {},
  logout: async () => {},
});

export default UserContext;
