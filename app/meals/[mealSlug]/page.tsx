import { notFound } from "next/navigation";
import { getMeal } from "@/lib/directus";

type MealDetailsPageProps = {
  params: Promise<{
    mealSlug: string;
  }>;
};

export default async function MealDetailsPage({
  params,
}: MealDetailsPageProps) {
  const { mealSlug } = await params;

  const meal = await getMeal(mealSlug);

  if (!meal) {
    notFound();
  }

  return (
    <main className="py-10 bg-[#EDF8F3] min-h-screen">
      <article className="max-w-4xl mx-auto bg-white">
        {meal.image && (
          <div className="aspect-video">
            <img
              src={meal.image}
              alt={meal.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4">{meal.title}</h1>

          <p className="mb-6">{meal.summary}</p>

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

          {meal.instructions && (
            <section className="mt-8">
              <h2 className="text-2xl font-semibold mb-3">Instructions</h2>
              <p className="whitespace-pre-line">{meal.instructions}</p>
            </section>
          )}
        </div>
      </article>
    </main>
  );
}