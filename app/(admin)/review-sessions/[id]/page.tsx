import ChatbotSession from '@/components/ChatbotSession';

export const dynamic = 'force-dynamic';

export default async function ReviewSessionsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ChatbotSession id={id} />;
}
