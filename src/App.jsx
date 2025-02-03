import Pizza from "./Pizza";

const App = () => {
  return (
    <div>
      <h1>Padre Gino&apos;s Pizza – Order Now</h1>
      <Pizza name="Pepperoni" description="Mozzarella Cheese, Pepperoni"
        image={"/public/pizzas/pepperoni.webp"}

      />
      <Pizza
        name="The Hawaiian Pizza"
        description="Sliced Ham, Pineapple, Mozzarella Cheese"
        image={"/public/pizzas/hawaiian.webp"}

      />
      <Pizza
        name="The Big Meat Pizza"
        description="Bacon, Pepperoni, Italian Sausage, Chorizo Sausage"
        image={"/public/pizzas/big_meat.webp"}

      />
    </div>
  );
};

export default App;