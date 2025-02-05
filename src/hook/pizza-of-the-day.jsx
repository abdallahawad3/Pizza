import { useEffect, useState } from "react";

const usePizzaOfTheDay = () => {
  const [pizzaOfTheDay, setPizzaOfTheDay] = useState(null);

  useEffect(() => {
    // Get Pizza Of The Day
    const getPizzaOfTheDay = async () => {
      const pizza = await fetch("/api/pizza-of-the-day");
      const pizzaObj = await pizza.json();
      setPizzaOfTheDay(pizzaObj);
    };

    getPizzaOfTheDay();
  }, []);

  return pizzaOfTheDay;
};

export default usePizzaOfTheDay;
