import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function UserDashboardLayout({ children }) {
  return (
    <div className="flex bg-[#f1f4ff]">
      <Sidebar />
      <div className="flex-1 bg-[#f1f4ff]">
        <Header />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
