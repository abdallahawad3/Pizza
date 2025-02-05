import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useState } from "react";
import Header from "../components/Header";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PizzaOfTheDay from "../components/PizzaOfTheDay";
import { cartContext } from "../contexts/cartContext";

export const Route = createRootRoute({
  component: () => {
    const cart = useState([]);

    return (
      <>
        <cartContext.Provider value={cart}>
          <Header />
          <Outlet />
          <PizzaOfTheDay />
        </cartContext.Provider>
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
      </>
    );
  },
});
