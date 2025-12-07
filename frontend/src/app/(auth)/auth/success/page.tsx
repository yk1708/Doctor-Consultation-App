'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { userAuthStore } from '@/store/authStore';
import Loader from '@/components/Loader';

export default function AuthSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = userAuthStore();

  useEffect(() => {
    const token = searchParams.get('token');
    const type = searchParams.get('type');
    const userStr = searchParams.get('user');

    if (token && type && userStr) {
      try {
        const user = JSON.parse(decodeURIComponent(userStr));
        
        // Set user in store (this will also store token in localStorage)
        setUser({ ...user, type }, token);

        // Check if user needs onboarding
        if (type === 'doctor') {
          router.push('/onboarding/doctor');
        } else {
          router.push('/onboarding/patient');
        }
      } catch (error) {
        console.error('Error processing auth success:', error);
        router.push('/login/patient');
      }
    } else {
      router.push('/login/patient');
    }
  }, [searchParams, router, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader />
    </div>
  );
}
