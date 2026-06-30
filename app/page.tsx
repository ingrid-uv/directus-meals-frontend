import Link from "next/link";
import HomeSlider from '@/components/HomeSlider';
import { getHomeSlides } from '@/lib/directus';

export default async function HomePage() {
  const slides = await getHomeSlides();

  return (
    <main className="min-h-screen bg-stone-100">
      <div className="flex flex-col gap-8 justify-center min-w-[80%] w-full lg:max-w-[80%] lg:mx-auto py-10">
        <div className="px-10 lg:px-20 text-center">
          <h1 className="text-4xl font-bold text-stone-900">Welcome to My Page</h1>
          <p className="mt-4 text-lg text-stone-600">Quick and simple recipes using fresh, accessible ingredients for an optimal diet—the foundation of your mental and physical health.</p>
       </div>
       <HomeSlider slides={slides} />    
        <Link href="/meals" className="w-fit bg-amber-400 text-white p-4 rounded-2xl">View meals</Link>
      </div>     
    </main>
  );
}