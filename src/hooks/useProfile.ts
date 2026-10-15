'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getProfile, logout } from '@/services/auth';

export function useProfile() {
  const qc = useQueryClient();
  const query = useQuery({ queryKey: ['profile'], queryFn: getProfile });
  const signOut = () => { logout(); qc.setQueryData(['profile'], null); };
  return { ...query, signOut };
}
