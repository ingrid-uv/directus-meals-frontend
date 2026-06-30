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
};

function transformMeal(meal: DirectusMeal): Meal {
  return {
    ...meal,
    image: meal.image ? `${DIRECTUS_URL}/assets/${meal.image}` : null,
  };
}

export async function getMeals(): Promise<Meal[]> {
  const response = await fetch(
    `${DIRECTUS_URL}/items/meals?fields=id,title,slug,summary,image,creator,creator_email,category.title,category.slug`,
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