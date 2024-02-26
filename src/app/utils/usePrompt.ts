'use client';

import { useState, useMemo } from 'react';

export function usePrompt() {
  const [isNewPrompt, setIsNewPrompt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const openaiKey =
    typeof window !== 'undefined'
      ? localStorage.getItem('openai-key') || ''
      : '';

  const contentCode = useMemo(
    () => content.split('```tsx')?.[1]?.replace('```', '') ?? '',
    [content],
  );

  async function handleInit(prompt: string, slug?: string | null) {
    setLoading(true);

    const res = await fetch('/api/init', {
      method: 'POST',
      headers: {
        'x-openai-key': openaiKey,
      },
      body: JSON.stringify({
        prompt,
        slug,
      }),
    });

    return await res.json();
  }

  async function handlePrompt(url: string, body: Record<string, any>) {
    setLoading(true);
    setContent('');
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'x-openai-key': openaiKey,
      },
      body: JSON.stringify(body),
    });
    try {
    } catch (err) {}
  }

  async function handleCreate(body: Record<string, any>) {
    setIsNewPrompt(false);
    await handlePrompt('/api/create', body);
  }

  return {
    loading,
    content,
    contentCode,
    isNewPrompt,
    setLoading,
    setIsNewPrompt,
    handleInit,
    handleCreate,
  };
}
