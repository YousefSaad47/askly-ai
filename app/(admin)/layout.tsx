import Header from '@/components/header';
import Sidebar from '@/components/sidebar';

const AdminLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col flex-1 lg:flex-row bg-gray-100 dark:bg-black">
        <Sidebar />
        <div className="flex-1 flex justify-center lg:justify-start items-start mx-auto max-w-5xl w-full">
          {children}
        </div>
      </div>
    </div>
  );
};
export default AdminLayout;
