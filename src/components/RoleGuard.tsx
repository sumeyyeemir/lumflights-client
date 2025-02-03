'use client';

import { useAuth } from '@/contexts/AuthContext';
import { ReactNode } from 'react';

type RoleGuardProps = {
  allowedRoles: ('admin' | 'staff')[];
  children: ReactNode;
  fallback?: ReactNode;
};

export default function RoleGuard({ allowedRoles, children, fallback }: RoleGuardProps) {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return fallback || <div>Bu sayfaya erişim izniniz yok</div>;
  }

  return children;
}