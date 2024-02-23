import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@nextui-org/react';
import { UserIcon } from '@/app/components/icon';
import { UserMenu } from '@/app/components/index';
import { signIn } from '@/server/auth';

const Header = () => {
  return (
    <header className="sticky top-0 z-20 w-full flex flex-col md:flex-row md:items-center gap-3 p-3 lg:px-4 md:h-16 supports-[backdrop-filter]:bg-white/60 bg-white/95 backdrop-blur">
      <Link
        href="/"
        className="group h-10 flex items-center gap-1 text-xl md:text-3xl font-black"
      >
        <Image
          src="/images/icon.png" // Route of the image file
          height={40} // Desired size with correct aspect ratio
          width={40} // Desired size with correct aspect ratio
          alt="Taroify"
        />
        <span>Taroify0</span>
      </Link>
      <div className="mx-auto" />
      <div className="flex items-center gap-2">
        <form
          action={async () => {
            'use server';
            // 登录完成后，重定向到user页面
            await signIn('github');
          }}
        >
          <Button
            type="submit"
            color="primary"
            variant="bordered"
            endContent={<UserIcon />}
          >
            GitHub
          </Button>
        </form>
      </div>
    </header>
  );
};

export default Header;
