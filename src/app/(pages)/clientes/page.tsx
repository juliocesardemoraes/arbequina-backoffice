'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Loading from '@/components/ui/loading';
import PageClientes from '@/components/pages/clientes/PageClientes';

export default function PainelPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return <Loading />;
  }

  return <PageClientes />;
}