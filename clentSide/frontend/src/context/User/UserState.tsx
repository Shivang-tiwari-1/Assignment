// src/context/User/UserState.tsx
import React, { useContext, useState, type ReactNode } from "react";
import UserContext, { type UserContextType } from "./UserContext";
import AuthContext, { type AuthData } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import useJwtInterceptors from "../../Hooks/useJwtInterceptors";
import AlertContext from "../Alert/AlertContext";

interface UserStateProps {
  children: ReactNode;
}

const UserState: React.FC<UserStateProps> = ({ children }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const { showAlert } = useContext(AlertContext);

  const [limit, setLimit] = useState<number>(5);
  const [product, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [reload, setReload] = useState<boolean>(false);

  const navigate = useNavigate();
  const axiosPrivateInstance = useJwtInterceptors();

  const SignUp = async (name: string, phone: string, password: string) => {
    try {
      const response = await axiosPrivateInstance.post("/api/auth/createuser", {
        name,
        phone,
        password,
      });

      if (!response) {
        showAlert("User creation failed. Please try again later.", "danger");
        navigate("/home");
        return;
      }

      const id = response?.data?.user?._id;
      setAuth({ id } as AuthData);
      showAlert(response?.data?.message, "success");
      navigate("/logIn");
    } catch (error: any) {
      if (!error?.response) {
        showAlert("No response from the server", "danger");
      } else if (error.response.status === 500) {
        showAlert("User was not created, try again", "danger");
      } else if (error.response.status === 402) {
        showAlert("Please login with correct credentials", "danger");
      } else if (error.response.status === 400) {
        showAlert("User with the same email exists", "danger");
      }
    }
  };

  const logIn = async (phone: string, password: string) => {
    try {
      const response = await axiosPrivateInstance.post("/api/auth/login", {
        phone,
        password,
      });
      const { user } = response.data.user;
      const { accessToken, refreshToken } = response.data;
      setAuth({ user, accessToken, refreshToken } as AuthData);
      showAlert(response?.data?.message, "success");
      navigate("/home");
    } catch (error: any) {
      if (!error?.response) {
        showAlert("No response from the server", "danger");
      } else if (error.response.status === 400) {
        showAlert("No user found", "danger");
      } else if (error.response.status === 401) {
        showAlert("Please login with correct credentials", "danger");
      }
    }
  };

  const Products = async () => {
    try {
      const response = await axiosPrivateInstance.post(
        "/api/product/product",
        {},
        { params: { limit } }
      );
      const data = response?.data?.data ?? [];
      setProducts(data);
      // optional: showAlert("Products fetched", "success");
      return data;
    } catch (error: any) {
      if (!error?.response) showAlert("No response from the server", "danger");
      else if (error.response.status === 400)
        showAlert("No user found", "danger");
      else if (error.response.status === 401)
        showAlert("Please login", "danger");
      return [];
    }
  };

  const addCart = async (quantity: number, category: string, price: number) => {
    try {
      const response = await axiosPrivateInstance.post("/api/cart/cart", {
        quantity,
        category,
        price,
      });

      // After adding, refresh cart
      await getCart();
      showAlert("Item added to cart", "success");
      return response?.data;
    } catch (error: any) {
      if (!error?.response) showAlert("No response from the server", "danger");
      else if (error.response.status === 400)
        showAlert("No user found", "danger");
      else if (error.response.status === 401)
        showAlert("Please login", "danger");
      else showAlert("Something went wrong", "danger");
      throw error;
    }
  };

  const deleteCartItem = async (productId: string) => {
    try {
      const response = await axiosPrivateInstance.delete(
        `/api/cart/delcart/${productId}`
      );
      // refresh cart
      await getCart();
      showAlert("Item deleted successfully", "success");
      return response?.data;
    } catch (error: any) {
      if (!error?.response) showAlert("No response from the server", "danger");
      else if (error.response.status === 400)
        showAlert("No user found", "danger");
      else if (error.response.status === 401)
        showAlert("Please login", "danger");
      else showAlert("Something went wrong", "danger");
      throw error;
    }
  };

  const getCart = async () => {
    try {
      const response = await axiosPrivateInstance.get(`/api/cart/getcart`);
      const data = response?.data?.data ?? [];
      setCart(data); // <- **CRITICAL**: update context state
      return data;
    } catch (error: any) {
      if (!error?.response) showAlert("No response from the server", "danger");
      else if (error.response.status === 400)
        showAlert("No user found", "danger");
      else if (error.response.status === 401)
        showAlert("Please login", "danger");
      else showAlert("Something went wrong", "danger");
      return [];
    }
  };

  const checkoutCart = async (data: Array<Record<string, unknown>>) => {
    try {
      console.log(data);
      const response = await axiosPrivateInstance.post("/api/cart/checkout", {
        cartItems: data,
      });
      console.log(response.data);

      // Optionally clear cart or trigger reload
      setCart([]);
      setReload((prev) => !prev);

      showAlert("Checkout successful!", "success");
      return response.data;
    } catch (error: any) {
      if (!error?.response) {
        showAlert("No response from the server", "danger");
      } else if (error.response.status === 400) {
        showAlert("Checkout failed", "danger");
      } else {
        showAlert("Something went wrong during checkout", "danger");
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axiosPrivateInstance.post("/api/auth/logout");
      setAuth({});
      setCart([]);
      setProducts([]);
      setReload(false);
      setLimit(5);
      localStorage.removeItem("auth");
      localStorage.removeItem("persist");
      navigate("/login");
      showAlert("Logged out successfully", "success");
    } catch (error: any) {
      console.error(error);
      showAlert(error?.response?.data?.message || "Logout failed", "danger");
    }
  };

  const value: UserContextType = {
    SignUp,
    logIn,
    Products,
    addCart,
    deleteCartItem,
    getCart,
    limit,
    setLimit,
    product,
    cart,
    setCart,
    reload,
    setReload,
    refresh: async () => {},
    checkoutCart,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserState;
