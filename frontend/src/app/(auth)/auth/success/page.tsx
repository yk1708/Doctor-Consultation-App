import { Suspense } from 'react';
import AuthSuccessContent from './AuthSuccessContent';
import Loader from '@/components/Loader';

export const dynamic = 'force-dynamic';

export default function AuthSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    }>
      <AuthSuccessContent />
    </Suspense>
  );
}
