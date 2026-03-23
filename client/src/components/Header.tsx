import { Bell, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  userName?: string;
  userRole?: string;
  notifications?: number;
}

export default function Header({ userName = 'مازن سعد', userRole = 'مدير المدرسة', notifications = 0 }: HeaderProps) {
  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 h-20 bg-white border-b border-border shadow-sm z-30">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left Section - Notifications and User */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-blue-50"
          >
            <Bell size={20} className="text-gray-600" />
            {notifications > 0 && (
              <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {notifications}
              </span>
            )}
          </Button>

          {/* User Menu */}
          <div className="flex items-center gap-3 pl-4 border-l border-border">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">{userName}</p>
              <p className="text-xs text-gray-500">{userRole}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
