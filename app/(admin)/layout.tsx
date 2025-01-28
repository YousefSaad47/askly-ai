import Banner from '@/components/Banner';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Suspense } from 'react';

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <Banner />
      </Suspense>
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
