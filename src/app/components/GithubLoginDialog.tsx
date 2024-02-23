import { FC, memo } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { Github } from 'lucide-react';

type IProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const GithubLoginDialog: FC<IProps> = ({ open, onOpenChange }) => {
  return (
    <Modal isOpen={open} backdrop="blur" onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Sign in to taroify0
        </ModalHeader>
        <ModalBody>
          <p className="text-[#64748b] text-sm mt-[-10px]">
            A GitHub account is required to use taroify0.
          </p>
        </ModalBody>
        <ModalFooter>
          <a href="/api/github">
            <Button
              startContent={<Github size={16} />}
              className="bg-[#0f172a] text-[#f8fafc] h-[36px]"
            >
              Login with GitHub
            </Button>
          </a>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default memo(GithubLoginDialog);
