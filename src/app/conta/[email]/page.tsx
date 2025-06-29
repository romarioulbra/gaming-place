// app/conta/[email]/page.tsx
'use client'; // Isso é crucial

import { useParams, useSearchParams } from 'next/navigation';
import CadastroIndicado from './CadastroIndicado';

// export default function PageWrapper() {
export default function PageEmail() {
  const params = useParams();
  const searchParams = useSearchParams();
  
  return (
    <CadastroIndicado 
      email={params.email as string} 
      token={searchParams.get('token') || ''} 
    />
  );
}