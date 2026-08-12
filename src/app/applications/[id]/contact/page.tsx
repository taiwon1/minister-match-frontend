'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

interface Contact { email: string; phone: string | null; }
export default function ContactPage() {
  const params = useParams<{ id: string }>(); const [contact, setContact] = useState<Contact | null>(null); const [error, setError] = useState('');
  useEffect(() => { apiFetch<Contact>(`/applications/${params.id}/contact`).then(setContact).catch((err) => setError(err instanceof Error ? err.message : '연락처를 불러오지 못했습니다.')); }, [params.id]);
  return <main className="flex flex-1 items-center justify-center bg-slate-50 px-4"><section className="w-full max-w-md rounded-xl bg-white p-6 shadow-sm"><h1 className="text-2xl font-bold text-[#1E3A5F]">매칭 연락처</h1>{!contact && !error && <p className="mt-5 text-slate-500">불러오는 중…</p>}{error && <p className="mt-5 text-sm text-red-600">{error}</p>}{contact && <div className="mt-5 space-y-4 rounded bg-slate-50 p-4"><div><p className="text-xs text-slate-500">이메일</p><a href={`mailto:${contact.email}`} className="font-medium text-[#1E3A5F]">{contact.email}</a></div><div><p className="text-xs text-slate-500">휴대전화</p>{contact.phone ? <a href={`tel:${contact.phone}`} className="font-medium text-[#1E3A5F]">{contact.phone}</a> : <p className="text-sm text-slate-500">상대가 휴대전화 공개를 선택하지 않았습니다.</p>}</div></div>}<Link href="/dashboard" className="mt-6 inline-block text-sm text-[#1E3A5F]">내 활동으로 돌아가기</Link></section></main>;
}
