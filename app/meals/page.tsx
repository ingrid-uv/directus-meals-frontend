import { getMeals } from "@/lib/directus";
import Link from 'next/link';

export default async function MealsPage() {
  const meals = await getMeals();

  return (
    <main className="py-10 bg-[#F6FBF8]">
      <div className="flex flex-col gap-8 justify-center min-w-[80%] w-full lg:max-w-[80%] lg:mx-auto py-10">
        <h1>Meals</h1>

        {meals.length === 0 && (
          <p>No meals found. Add one in Directus first.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
          {meals.map((meal) => (
            <article key={meal.id} className="bg-white shadow-md h-full flex flex-col">
              <div className="aspect-4/3">
              {meal.image && (
                <img
                  src={meal.image}
                  alt={meal.title}
                  className="object-cover w-full h-full"
                />
              )}
              </div>
              <div className="px-6 py-4 flex-1">
                <div className="uppercase flex gap-2 text-[12px] leading-[1.5] mb-2 text-black font-bold">
                {meal.category && (
                  <p className="underline rounded-md">
                    {meal.category.title},
                  </p>
                )}
                {meal.meal_type && (
                  <p className="underline rounded-md">
                    {meal.meal_type.name}
                  </p>
                )}
                </div>
                <h2 className="font-bold">{meal.title}</h2>
                <p>{meal.summary}</p>                 
              </div>     
              <div className="flex justify-center w-full">
                  <Link
                    href={`/meals/${meal.slug}`}
                       className="w-full mt-auto text-white inline-flex items-center justify-between px-6 py-3 text-sm font-semibold bg-[#55BF8D] shadow-md transition-all duration-300 hover:bg-[#3b8562] hover:shadow-lg"
                       >
                    View details
                     <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-4 w-4 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                    <path d="M5 12h14" />
                    <path d="M15 16l4-4" />
                    <path d="M15 8l4 4" />
                  </svg>
                  </Link>
              </div>   
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}