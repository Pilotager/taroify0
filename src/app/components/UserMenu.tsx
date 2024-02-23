import { FC } from 'react';
import Link from 'next/link';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from '@nextui-org/react';
import { Github, MessageCircleQuestion, Bug } from 'lucide-react';

const UserMenu: FC = () => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="github">
          <a className="flex items-center">
            <Github className="mr-2 h-4 w-4" />
            <span>Login with GitHub</span>
          </a>
        </DropdownItem>
        <DropdownItem key="faq">
          <Link href="/faq" className="flex items-center">
            <MessageCircleQuestion className="mr-2 h-4 w-4" />
            <span>FAQs</span>
          </Link>
        </DropdownItem>
        <DropdownItem key="issue">
          <Link href="/issue" className="flex items-center">
            <Bug className="mr-2 h-4 w-4" />
            <span>Report an issue</span>
          </Link>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserMenu;
