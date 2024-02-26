'use client';

import { useSession } from 'next-auth/react';
import { useDisclosure } from '@nextui-org/react';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { usePrompt } from '@/app/utils';
import PromptInput from './components/PromptInput';
import GithubLoginDialog from './components/GithubLoginDialog';

export default function Home() {
  const router = useRouter();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data } = useSession();

  const { setIsNewPrompt, handleInit, setLoading } = usePrompt();

  const onSubmit = async (val: string) => {
    if (!val) return;

    if (!data?.user?.id) {
      onOpen();
      return;
    }

    if (!localStorage.getItem('openai-key')) {
      toast('Please Enter OpenAI API Key!');
      return;
    }
    setLoading(true);
    setIsNewPrompt(true);
    try {
      const result = await handleInit(val);
      router.push(`/t/${result.slug}`);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="w-full overflow-auto">
      <div className="flex py-[26vh] my-12 justify-center items-center">
        <div className="flex relative flex-col w-full items-center px-6">
          <PromptInput onClick={onSubmit} />
        </div>
      </div>
      <GithubLoginDialog open={isOpen} onOpenChange={onOpenChange} />
      <ToastContainer hideProgressBar theme="dark" />
    </div>
  );
}
