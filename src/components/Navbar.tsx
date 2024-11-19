import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
    return (
      <nav className="bg-gray-800 p-4">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <div className="text-white text-xl font-bold">
            <Link href="/">Movie Rater</Link>
          </div>
  
          {/* Navigation Links */}
          <ul className="flex space-x-4">
            <li><Link href="/" className="text-white hover:text-blue-400">Home</Link></li>
            <li><Link href="/contact" className="text-white hover:text-blue-400">Contact</Link></li>
            <li><Link href="/profile" className ="text-white hover:text-blue-400">Profile</Link></li>
          </ul>
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center text-white text-xl font-bold space-x-2">
          <Link href="/">
            <Image src="/icon.png" alt="Logo" className="h-10 w-13 rounded" height={100} width={300} />
          </Link>

        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-4">
          <li><Link href="/" className="text-white hover:text-blue-400">Home</Link></li>
          <li><Link href="/contact" className="text-white hover:text-blue-400">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

