'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login, requestOtp, verifyOtp } from '@/services/auth';

export function useAuthForm() {
  const qc = useQueryClient();
  const done = () => qc.invalidateQueries({ queryKey: ['profile'] });
  return {
    login: useMutation({ mutationFn: (v: { email: string; password: string }) => login(v.email, v.password), onSuccess: done }),
    sendOtp: useMutation({ mutationFn: (v: { email: string; password: string }) => requestOtp(v.email, v.password) }),
    verify: useMutation({ mutationFn: (v: { email: string; code: string }) => verifyOtp(v.email, v.code), onSuccess: done }),
  };
}
