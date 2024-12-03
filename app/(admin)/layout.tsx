import Header from '@/components/Header';

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Header />
      <div>
        {/* Sidebar */}
        <div>{children}</div>
      </div>
    </div>
  );
};
export default AdminLayout;
