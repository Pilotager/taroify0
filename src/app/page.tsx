import Image from 'next/image';
import PromptInput from './components/PromptInput';

export default function Home() {
  return (
    <div className="w-full overflow-auto">
      <div className="flex py-[26vh] my-12 justify-center items-center">
        <div className="flex relative flex-col w-full items-center px-6">
          <PromptInput />
        </div>
      </div>
    </div>
  );
}
