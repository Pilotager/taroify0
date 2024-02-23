'use client';

import { useState, FC } from 'react';
import { SendHorizontal } from 'lucide-react';

type IProps = {
  onClick: (val: string) => void;
};

const PromptInput: FC<IProps> = ({ onClick }) => {
  const [val, setVal] = useState('');
  return (
    <div className="overflow-hidden max-w-[90%] absolute bottom-0 z-10 flex flex-col w-full sm:max-w-lg m-auto shadow-lg divide-zinc-600 min-h-12 bg-gray-900 shadow-black/40 rounded-[24px]">
      <div className="flex items-center flex-1 min-w-0 px-3 md:pl-4 bg-gray-900 relative z-10">
        <textarea
          maxLength={1000}
          minLength={2}
          className="flex-[1_0_50%] min-w-[50%] disabled:opacity-80 text-white text-sm bg-transparent border-0 shadow-none resize-none outline-none ring-0 disabled:bg-transparent selection:bg-teal-300 selection:text-black placeholder:text-zinc-400 [scroll-padding-block:0.75rem] pr-2 leading-relaxed py-3 pl-1 [&_textarea]:px-0 h-[47px] box-border"
          placeholder="Generate component with prompt"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
        <button
          disabled={!val}
          className="w-[24px] h-[24px] flex items-center justify-center cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-transparent text-white hover:bg-gray-800 focus-visible:ring-0 focus-visible:bg-gray-800 rounded-full"
          onClick={() => {
            onClick(val);
          }}
        >
          <SendHorizontal className="w-[16px] h-[16px]" />
        </button>
      </div>
    </div>
  );
};

export default PromptInput;
