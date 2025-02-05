import { useState, useEffect, useContext } from "react";
import Pizza from "../components/Pizza";
import Cart from "../components/Cart";
import { createLazyFileRoute } from "@tanstack/react-router";
import { cartContext } from "../contexts/cartContext";

let selectedPizza, price;

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const Route = createLazyFileRoute("/order")({
  component: Order,
});

function Order() {
  const [cart, setCart] = useContext(cartContext);
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
    price = intl.format(selectedPizza.sizes[pizzaSize]);
  }

  const fetchPizzaTypes = async () => {
    const pizza = await fetch("/api/pizzas");
    const pizzaData = await pizza.json();
    setPizzaTypes(pizzaData);
    setLoading(false);
  };

  useEffect(() => {
    fetchPizzaTypes();
  }, []);

  // Handlers
  const handlePizzaSize = (event) => {
    setPizzaSize(event.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setCart([...cart, { pizza: selectedPizza, size: pizzaSize }]);
  };

  const checkout = async () => {
    if (!cart.length == 0) {
      setLoading(true);
      await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart,
        }),
      });
      setCart([]);
      setLoading(false);
    } else {
      console.log("Enter valid data");
    }
  };

  return (
    <div className="order-page">
      <div className="order">
        <h2>Create Order</h2>
        <form onSubmit={onSubmit}>
          <div>
            <div>
              <label htmlFor="pizza-type">Pizza Type</label>
              <select
                onChange={(e) => {
                  setPizzaType(e.target.value);
                }}
                name="pizza-type"
                value={pizzaType}>
                <optgroup label="Pizza Types">
                  {pizzaTypes.map((pizza) => (
                    <option key={pizza.id} value={pizza.id}>
                      {pizza.name}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Pizza Size */}
            <div>
              <label htmlFor="pizza-size">Pizza Size</label>
              <div>
                <span>
                  <input
                    checked={pizzaSize === "S"}
                    type="radio"
                    name="pizza-size"
                    value="S"
                    id="pizza-s"
                    onChange={(e) => {
                      handlePizzaSize(e);
                    }}
                  />
                  <label htmlFor="pizza-s">Small</label>
                </span>

                <span>
                  <input
                    checked={pizzaSize === "M"}
                    type="radio"
                    name="pizza-size"
                    value="M"
                    id="pizza-m"
                    onChange={(e) => {
                      handlePizzaSize(e);
                    }}
                  />
                  <label htmlFor="pizza-m">Medium</label>
                </span>

                <span>
                  <input
                    checked={pizzaSize === "L"}
                    type="radio"
                    name="pizza-size"
                    value="L"
                    id="pizza-l"
                    onChange={(e) => {
                      handlePizzaSize(e);
                    }}
                  />
                  <label htmlFor="pizza-l">Large</label>
                </span>
              </div>
            </div>

            <button type="submit">Add to Cart</button>
          </div>

          {!loading ? (
            <div className="order-pizza">
              <Pizza
                name={selectedPizza.id}
                description={selectedPizza.description}
                image={selectedPizza.image}
              />
              <p>{price}</p>
            </div>
          ) : (
            "Loading"
          )}
        </form>
      </div>
      {!loading ? <Cart cart={cart} checkout={checkout} /> : "Loading"}
    </div>
  );
}
