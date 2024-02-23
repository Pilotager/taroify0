'use client';

import PromptInput from './components/PromptInput';
import GithubLoginDialog from './components/GithubLoginDialog';
import { useSession } from 'next-auth/react';
import { useDisclosure } from '@nextui-org/react';
import { ToastContainer, toast } from 'react-toastify';

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data } = useSession();

  const onSubmit = (val: string) => {
    if (!val) return;

    if (!data?.user?.id) {
      onOpen();
      return;
    }

    if (!localStorage.getItem('openai-key')) {
      toast('Please Enter OpenAI API Key!');
      return;
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
