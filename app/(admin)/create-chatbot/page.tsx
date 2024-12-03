import Avatar from '@/components/Avatar';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';

const CeateChatbot = () => {
  return (
    <div className="flex flex-col items-center justify-center md:flex-row md:space-x-10 bg-white p-10 rounded m-10">
      <Avatar seed="create-chatboot" />
      <div>
        <h1 className="text-xl lg-text-3xl font-semibold">Create</h1>
        <h2 className="font-light">
          Create a new chatbot to assist you in your conversations
        </h2>
      </div>
      <form className="flex flex-col md:flex-row items-center gap-3 mt-5">
        <Input type="text" label="Chatbot Name" size="md" required />
        <Button className="px-8" radius="sm">
          Create Chatbot
        </Button>
      </form>
    </div>
  );
};
export default CeateChatbot;
