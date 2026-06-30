import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="flex flex-col items-center gap-y-8 border-b border-gray-300 px-8 py-4 h-auto">
      <Link
        href="/"
        className="text-xl font-bold text-gray-950 no-underline"
      >
         <Image
          src="/logo_ingrid.png"
          alt="Directus Meals logo"
          width={100}
          height={100}
          className="h-30 w-30 object-contain"
        />
      </Link>

      <nav className="flex gap-4">
        <Link href="/" className="text-gray-950 no-underline">
          Home
        </Link>

        <Link href="/meals" className="text-gray-950 no-underline">
          Meals
        </Link>
      </nav>
    </header>
  );
}