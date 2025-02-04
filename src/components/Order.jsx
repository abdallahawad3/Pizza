import { useState, useEffect } from "react";
import Pizza from "./Pizza";

export default function Order() {
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");
  const [pizzaTypes, setPizzaTypes] = useState([]);

  const fetchPizzaTypes = async () => {
    const pizza = await fetch("/api/pizzas");
    const pizzaData = await pizza.json();
    setPizzaTypes(pizzaData);
  };

  useEffect(() => {
    fetchPizzaTypes();
  }, []);

  // Handlers
  const handlePizzaSize = (event) => {
    setPizzaSize(event.target.value);
  };

  return (
    <div className="order">
      <h2>Create Order</h2>
      <form>
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
            </div>
          </div>

          <button type="submit">Add to Cart</button>
        </div>

        <div className="order-pizza">
          <Pizza
            name="Pepperoni"
            description="Mozzarella Cheese, Pepperoni"
            image="/public/pizzas/pepperoni.webp"
          />
          <p>$13.37</p>
        </div>
      </form>
    </div>
  );
}
