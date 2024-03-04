'use client';

import { useEffect, useRef } from 'react';
import { Clock } from 'lucide-react';
import { Tooltip, Button } from '@nextui-org/react';
import { usePrompt } from '@/app/utils';
import { toast, ToastContainer } from 'react-toastify';

type IProps = {
  params: {
    slug: string;
  };
};

const getComponent = async (slug: string) => {
  const res = await fetch(`/api/componentData/${slug}`, {
    method: 'GET',
  });
  return await res.json();
};

export default function Page({ params }: IProps) {
  const iframeRef = useRef(null);

  const onDone = () => {
    toast('Latest generation is completed!');
  };

  const onStream = (data: string) => {
    return sendDataToIframe(data);
  };

  const { isNewPrompt, handleCreate } = usePrompt({ onDone, onStream });

  useEffect(() => {
    generateComponent();
  }, []);

  function sendDataToIframe(data: string) {
    const channel = new MessageChannel();
    if (iframeRef.current) {
      // console.log('iframeRef.current', iframeRef.current!.contentWindow);
      // iframeRef.current?.contentWindow?.postMessage(
      //   { from: 'taroify0', data },
      //   '*',
      //   [channel.port2],
      // );
    }
  }

  const generateComponent = async () => {
    const data = await getComponent(params.slug);
    if (!isNewPrompt && data?.length === 1) {
      await handleCreate({
        id: data[0].id,
        prompt: data[0].description,
      });
    }
  };

  return (
    <div className="pb-2 md:pb-8">
      <div className="flex flex-col md:flex-row w-full">
        <div className="flex-shrink-0 md:mt-4 md:mr-4 flex flex-row md:flex-col items-center gap-3 ">
          <div className="flex gap-2 items-center">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 font-medium text-sm hidden md:inline-flex">
              Versions
            </span>
          </div>
          <div className="flex flex-row-reverse md:flex-col-reverse gap-3 overflow-auto p-1">
            <Tooltip
              placement="right"
              content={
                <div className="w-64 flex flex-col gap-2 p-1.5">
                  <img className="aspect-video object-cover w-auto h-auto rounded" />
                  <span className="text-sm p-0.5">aaaaaa</span>
                </div>
              }
            >
              <Button className="justify-start h-auto min-w-[6rem] min-h-6 p-1 overflow-hidden text-left text-gray-400 rounded-lg outline-1 hover:text-primary relative bg-[#f1f5f9]">
                <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground bg-white absolute bottom-2 left-2 bg-white absolute bottom-2 left-2">
                  v0
                </div>
                <img className="aspect-video object-cover w-32 h-auto" />
              </Button>
            </Tooltip>
          </div>
        </div>
        <div className="flex-1 mt-2 md:mt-0 w-full">
          <div className="flex justify-between">
            <div className="flex items-center gap-2"></div>
            <div className="flex items-center gap-2"></div>
          </div>
          <div className="relative z-0 flex w-full mt-3 md:mt-4 overflow-hidden border rounded-xl h-[calc(100vh-10rem)]">
            <iframe
              ref={iframeRef}
              src={`/p/${params.slug}`}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
      <ToastContainer hideProgressBar theme="dark" />
    </div>
  );
}
