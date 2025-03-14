import EditChatbot from '@/components/edit-chatbot';

const EditChatbotPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return <EditChatbot id={id} />;
};

export default EditChatbotPage;
