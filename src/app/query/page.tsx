'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function QueryPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const term = searchParams.get('term');
  const [flashcards, setFlashcards] = useState<any[]>([]);

  useEffect(() => {
    const stored = sessionStorage.getItem('flashcards');
    if (stored) {
      setFlashcards(JSON.parse(stored));
    } else {
      // No flashcards in storage → redirect back home
      router.push('/');
    }
  }, [router]);

  if (!term) return <p className="p-6">No term provided.</p>;
      className="mt-4 bg-gray-200 px-4 py-2 rounded"
      >
        ← Back to Home
      </button>
    </main>
  );
}
