const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;

if (!DIRECTUS_URL) {
  throw new Error('NEXT_PUBLIC_DIRECTUS_URL is not set');
}

type DirectusResponse<T> = {
  data: T;
};

/* ---------------- Category ---------------- */

export type Category = {
  title: string;
  slug: string;
};

/* ---------------- Meal Type ---------------- */

export type MealType = {
  id: number;
  name: string;
  slug: string;
};


/* ---------------- Meals ---------------- */

export type Meal = {
  id: number;
  title: string;
  slug: string;
  summary: string;
  instructions?: string;
  image: string | null;
  creator: string;
  creator_email: string;
  category: Category | null;
  meal_type: MealType;
};

type DirectusMeal = {
  id: number;
  title: string;
  slug: string;
  summary: string;
  instructions?: string;
  image: string | null;
  creator: string;
  creator_email: string;
  category: Category | null;
  meal_type: MealType;
};

function transformMeal(meal: DirectusMeal): Meal {
  return {
    ...meal,
    image: meal.image ? `${DIRECTUS_URL}/assets/${meal.image}` : null,
  };
}

export async function getMeals(): Promise<Meal[]> {
  const response = await fetch(
    `${DIRECTUS_URL}/items/meals?fields=id,title,slug,summary,image,creator,creator_email,category.title,category.slug,meal_type.id,meal_type.name,meal_type.slug`,
    {
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch meals');
  }

  const json: DirectusResponse<DirectusMeal[]> = await response.json();

  return json.data.map(transformMeal);
}

export async function getMeal(slug: string): Promise<Meal | null> {
  const response = await fetch(
    `${DIRECTUS_URL}/items/meals?filter[slug][_eq]=${encodeURIComponent(
      slug
    )}&fields=id,title,slug,summary,instructions,image,creator,creator_email,category.title,category.slug,meal_type.id,meal_type.name,meal_type.slug&limit=1`,
    {
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch meal');
  }

  const json: DirectusResponse<DirectusMeal[]> = await response.json();

  const meal = json.data[0];

  if (!meal) {
    return null;
  }

  return transformMeal(meal);
}

/* ---------------- Home Slider / Gallery ---------------- */

export type HomeSlide = {
  id: number;
  title: string | null;
  description: string | null;
  image: string;
};

type DirectusHomeSlide = {
  id: number;
  title: string | null;
  description: string | null;
  image: string;
};

export async function getHomeSlides(): Promise<HomeSlide[]> {
  const response = await fetch(
    `${DIRECTUS_URL}/items/home_slider?fields=id,title,description,image&sort=sort`,
    {
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch home slider');
  }

  const json: DirectusResponse<DirectusHomeSlide[]> = await response.json();

  return json.data.map((slide) => ({
    ...slide,
    image: `${DIRECTUS_URL}/assets/${slide.image}`,
  }));
}