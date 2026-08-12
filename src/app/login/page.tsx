'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { apiFetch } from '@/lib/api';

interface LoginResponse { accessToken: string; user: { id: string; email: string; role: 'MINISTER' | 'CHURCH_ADMIN' }; }
function LoginForm() {
  const router = useRouter(); const params = useSearchParams(); const { login } = useAuth(); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const [isSubmitting, setIsSubmitting] = useState(false);
  async function submit(event: React.FormEvent) { event.preventDefault(); setError(''); setIsSubmitting(true); try { const data = await apiFetch<LoginResponse>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }); login(data.accessToken, data.user); router.push('/dashboard'); } catch (err) { setError(err instanceof Error ? err.message : '로그인에 실패했습니다.'); } finally { setIsSubmitting(false); } }
  return <main className="flex flex-1 items-center justify-center bg-slate-50 px-4 py-10"><form onSubmit={submit} className="w-full max-w-sm rounded-xl bg-white p-6 shadow-sm"><h1 className="text-center text-2xl font-bold text-[#1E3A5F]">로그인</h1>{params.get('registered') && <p className="mt-4 rounded bg-green-50 p-3 text-sm text-green-700">가입되었습니다. 로그인 후 프로필을 완성해 주세요.</p>}<label className="mt-5 block text-sm font-medium text-slate-700">이메일<input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" /></label><label className="mt-4 block text-sm font-medium text-slate-700">비밀번호<input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" /></label>{error && <p className="mt-4 text-sm text-red-600">{error}</p>}<button disabled={isSubmitting} className="mt-6 w-full rounded-md bg-[#1E3A5F] py-2.5 font-medium text-white disabled:opacity-50">{isSubmitting ? '로그인 중…' : '로그인'}</button><p className="mt-5 text-center text-sm text-slate-500">계정이 없나요? <Link href="/signup" className="font-medium text-[#1E3A5F]">회원가입</Link></p></form></main>;
}

export default function LoginPage() {
  return <Suspense fallback={<main className="flex flex-1 items-center justify-center">불러오는 중…</main>}><LoginForm /></Suspense>;
}
