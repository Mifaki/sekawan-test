import { LogInfo } from '@/lib/utils';
import { router, usePage } from '@inertiajs/react';

export const useCheckUserAuth = () => {
  const { auth } = usePage().props;

  return () => {
    if (!auth) {
      LogInfo('User not authenticated, redirecting to login page');
      return router.replace({
        url: '/login',
      });
    }
  };
};
