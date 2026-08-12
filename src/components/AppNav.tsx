'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const navItem = 'rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700';
export function AppNav() {
  const pathname = usePathname(); const router = useRouter(); const { user, logout, isLoading } = useAuth();
  if (isLoading) return <header className="h-18 border-b border-slate-100 bg-white" />;
  const roleLabel = user?.role === 'MINISTER' ? '사역자 모드' : '모집자 모드';
  return <header className="sticky top-0 z-20 border-b border-slate-100/90 bg-white/85 backdrop-blur"><nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3"><Link href="/" className="flex items-center gap-2"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#1463FF] text-lg text-white shadow-lg shadow-blue-200">✦</span><span className="font-bold tracking-tight text-slate-900">사역<span className="text-[#1463FF]">링크</span></span></Link><div className="flex items-center gap-1">{user && <span className={`mr-1 rounded-full px-2.5 py-1 text-xs font-bold ${user.role === 'MINISTER' ? 'bg-blue-50 text-blue-700' : 'bg-violet-50 text-violet-700'}`}>{roleLabel}</span>}{user && <Link href="/dashboard" className={`${navItem} ${pathname === '/dashboard' ? 'bg-blue-50 text-blue-700' : ''}`}>내 활동</Link>}<Link href={user?.role === 'CHURCH_ADMIN' ? '/ministers' : '/postings'} className={navItem}>{user?.role === 'CHURCH_ADMIN' ? '사역자 찾기' : '사역 찾기'}</Link>{user?.role === 'MINISTER' && <Link href="/teams" className={navItem}>내 팀</Link>}{user ? <><Link href="/profile" className={`${navItem} ${pathname === '/profile' ? 'bg-blue-50 text-blue-700' : ''}`}>프로필</Link><button onClick={() => { logout(); router.push('/'); }} className={navItem}>로그아웃</button></> : <><Link href="/login" className={navItem}>로그인</Link><Link href="/signup" className="ml-1 rounded-full bg-[#1463FF] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">시작하기</Link></>}</div></nav></header>;
}
