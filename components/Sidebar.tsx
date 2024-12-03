import Link from 'next/link';
import { Button } from '@nextui-org/button';
import { BotMessageSquare, PencilLine, SearchIcon } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="bg-white text-white p-5">
      <ul className="gap-5 flex lg:flex-col">
        <li className="flex-1">
          <Link href="/create-chatbot">
            <Button color="primary" className="py-14 px-6 w-full" radius="sm">
              <BotMessageSquare className="w-6 h-6 lg:w-8 lg:h-8" />
              <div className="hidden md:inline">
                <p className="text-xl">Create</p>
                <p className="text-sm font-extralight">New Chatbot</p>
              </div>
            </Button>
          </Link>
        </li>
        <li className="flex-1">
          <Link href="/view-chatbots">
            <Button color="primary" className="py-14 px-6 w-full" radius="sm">
              <PencilLine className="w-6 h-6 lg:w-8 lg:h-8" />
              <div className="hidden md:inline">
                <p className="text-xl">Edit</p>
                <p className="text-sm font-extralight">New Chatbot</p>
              </div>
            </Button>
          </Link>
        </li>
        <li className="flex-1">
          <Link href="review-sessions">
            <Button color="primary" className="py-14 px-6 w-full" radius="sm">
              <SearchIcon className="w-6 h-6 lg:w-8 lg:h-8" />
              <div className="hidden md:inline">
                <p className="text-xl">View</p>
                <p className="text-sm font-extralight">Sessions</p>
              </div>
            </Button>
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;
