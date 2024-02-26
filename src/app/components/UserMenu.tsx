'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Avatar,
  Input,
} from '@nextui-org/react';
import { Github, MessageCircleQuestion, Bug, LogOut } from 'lucide-react';
import type { User } from 'next-auth';

type IProps = {
  user?: User;
};

const UserMenu: FC<IProps> = ({ user }) => {
  const [key, setKey] = useState(
    typeof window !== 'undefined'
      ? localStorage.getItem('openai-key') || ''
      : '',
  );

  const onValueChange = (value: string) => {
    setKey(value);
    localStorage.setItem('openai-key', value);
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          src={user?.image || ''}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownSection title="OpenAI Key *" showDivider>
          <DropdownItem isReadOnly key="openAi" textValue="openAi">
            <Input
              type="text"
              variant="bordered"
              label=""
              size="sm"
              labelPlacement="outside"
              placeholder="sk-************ (Required)"
              className="w-[200px]"
              onValueChange={onValueChange}
              value={key}
            />
          </DropdownItem>
        </DropdownSection>
        {user?.id ? (
          <DropdownItem key="logout" textValue="Log out">
            <a href="/api/github/logout" className="flex items-center">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </a>
          </DropdownItem>
        ) : (
          <DropdownItem key="github" textValue="Login with GitHub">
            <a href="/api/github" className="flex items-center">
              <Github className="mr-2 h-4 w-4" />
              <span>Login with GitHub</span>
            </a>
          </DropdownItem>
        )}
        <DropdownItem key="faq" textValue="FAQs">
          <Link href="/faq" className="flex items-center">
            <MessageCircleQuestion className="mr-2 h-4 w-4" />
            <span>FAQs</span>
          </Link>
        </DropdownItem>
        <DropdownItem key="issue" textValue="Report an issue">
          <Link
            href="https://github.com/Pilotager/taroify0/issues/new"
            className="flex items-center"
            target="_blank"
          >
            <Bug className="mr-2 h-4 w-4" />
            <span>Report an issue</span>
          </Link>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserMenu;
