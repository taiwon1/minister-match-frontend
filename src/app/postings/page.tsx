'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiFetch } from '@/lib/api';

interface Posting {
  id: string;
  serviceDate: string;
  neededInstruments: string[];
  location: string;
  guideNote: string | null;
  status: 'OPEN' | 'CLOSED';
  churchProfile: {
    churchName: string;
    region: string | null;
  };
}

export default function PostingsPage() {
  const [postings, setPostings] = useState<Posting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch<Posting[]>('/postings')
      .then(setPostings)
      .catch((err) => setError(err instanceof Error ? err.message : '불러오기에 실패했습니다.'))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div className="flex-1 p-8 text-center text-gray-500">불러오는 중...</div>;
  }

  if (error) {
    return <div className="flex-1 p-8 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="flex-1 bg-white px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-xl font-bold text-[#1E3A5F]">사역 공고</h1>

        {postings.length === 0 ? (
          <p className="text-gray-500">등록된 공고가 없습니다.</p>
        ) : (
          <ul className="space-y-3">
            {postings.map((posting) => (
              <li key={posting.id}>
                <Link
                  href={`/postings/${posting.id}`}
                  className="block rounded-lg border border-gray-200 p-4 transition hover:border-[#1E3A5F]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">
                      {posting.churchProfile.churchName}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(posting.serviceDate).toLocaleDateString('ko-KR')}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{posting.location}</p>
                  <div className="mt-2 flex gap-1">
                    {posting.neededInstruments.map((inst) => (
                      <span
                        key={inst}
                        className="rounded-full bg-[#4A7FBF]/10 px-2 py-0.5 text-xs text-[#1E3A5F]"
                      >
                        {inst}
                      </span>
                    ))}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
