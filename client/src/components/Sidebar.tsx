import { useState } from 'react';
import { Link } from 'wouter';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  CheckSquare,
  FileText,
  Settings,
  Menu,
  X,
  LogOut,
  GraduationCap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  badge?: number;
}

const sidebarItems: SidebarItem[] = [
  { icon: <LayoutDashboard size={20} />, label: 'لوحة التحكم', href: '/dashboard' },
  { icon: <Users size={20} />, label: 'المستخدمون', href: '/users' },
  { icon: <BookOpen size={20} />, label: 'الطلاب', href: '/students' },
  { icon: <Calendar size={20} />, label: 'الجدول الدراسي', href: '/schedule' },
  { icon: <CheckSquare size={20} />, label: 'الحضور والتقييم', href: '/attendance' },
  { icon: <FileText size={20} />, label: 'التقارير', href: '/reports' },
  { icon: <Settings size={20} />, label: 'الإعدادات', href: '/settings' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-border shadow-lg transition-transform duration-300 z-40 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-center h-20 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <GraduationCap size={24} className="text-white" />
            </div>
            <span className="font-bold text-lg text-primary hidden sm:inline">
              منصة التتبع
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-6 px-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  <a
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-primary transition-colors duration-200 group"
                  >
                    <span className="text-gray-500 group-hover:text-primary transition-colors">
                      {item.icon}
                    </span>
                    <span className="flex-1 text-sm font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Section */}
        <div className="border-t border-border p-4">
          <Button
            variant="outline"
            className="w-full justify-start gap-2 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut size={18} />
            <span>تسجيل الخروج</span>
          </Button>
        </div>
      </aside>

      {/* Main Content Offset */}
      <div className="md:ml-64" />
    </>
  );
}
