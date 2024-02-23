import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@nextui-org/react';
import { Github } from 'lucide-react';
import { UserMenu } from '@/app/components/index';
import { auth } from '@/server/auth';

const Header = async () => {
  const session = await auth();
  return (
    <header className="sticky top-0 z-20 w-full flex flex-col md:flex-row md:items-center gap-3 p-3 lg:px-4 md:h-16 supports-[backdrop-filter]:bg-white/60 bg-white/95 backdrop-blur">
      <Link
        href="/"
        className="group h-10 flex items-center gap-1 text-xl md:text-3xl font-black"
      >
        <Image src="/images/logo.jpg" height={40} width={75} alt="Taroify" />
      </Link>
      <div className="mx-auto" />
      <div className="flex items-center gap-2">
        <Link href="https://github.com/Pilotager/taroify0">
          <Button
            variant="bordered"
            startContent={<Github size={16} />}
            className="mr-[10px] border border-input shadow-sm h-9 px-4 py-2"
          >
            GitHub
          </Button>
        </Link>
        <UserMenu user={session?.user} />
      </div>
    </header>
  );
};

export default Header;
