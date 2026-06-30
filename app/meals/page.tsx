import { getMeals } from "@/lib/directus";

export default async function MealsPage() {
  const meals = await getMeals();

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Meals</h1>

      {meals.length === 0 && (
        <p>No meals found. Add one in Directus first.</p>
      )}

      {meals.map((meal) => (
        <article key={meal.id} style={{ marginBottom: "2rem" }}>
           {meal.category && (
            <p>
              Category: <strong>{meal.category.title}</strong>
            </p>
          )}
          {meal.meal_type && (
            <p>
              Meal type: <strong>{meal.meal_type.name}</strong>
            </p>
          )}
          <h2>{meal.title}</h2>
          <p>{meal.summary}</p>

          {meal.image && (
            <img
              src={meal.image}
              alt={meal.title}
              style={{
                maxWidth: "400px",
                width: "100%",
                height: "auto",
              }}
            />
          )}
        </article>
      ))}
    </main>
  );
}