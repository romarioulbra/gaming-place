import Link from 'next/link';
import { SlGameController } from "react-icons/sl";

export default function Navbar() {
  return (
    // <nav className="bg-blue-500 p-4">
    <nav className="bg-transparent p-4 border-b-2 border-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex text-white text-xl font-bold space-x-2 items-center">
          <SlGameController className='w-8 h-8'/>
          <Link href="/">  Gaming Place</Link>
        </div>
        <div className="space-x-4 ">
          <Link href="/" className="text-white hover:text-gray-300">Inicio</Link>
          <Link href="/sobre" className="text-white hover:text-gray-300">Sobre</Link>
          <Link href="/jogos" className="text-white hover:text-gray-300">Jogos</Link>
          <Link href="/conta" className="text-white hover:text-gray-300">Conta</Link>
        </div>
      </div>
    </nav>
  );
}
