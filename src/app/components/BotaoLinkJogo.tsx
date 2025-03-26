import Link from 'next/link';
import { FaLink } from 'react-icons/fa';

export default function BotaoLinkJogo({ linkJogo }: { linkJogo: string }) {
  return (
    <Link href={linkJogo} target="_blank" passHref>
      <button
        className="w-10 h-10 bg-sky-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors border border-white shadow-md shadow-blue-500/50"
      >
        <FaLink className="w-4 h-4" />
      </button>
    </Link>
  );
}
