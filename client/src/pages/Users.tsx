import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { apiClient } from '@/lib/api';

interface User {
  id: number;
  user: {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
  };
  phone: string;
  role: {
    role: string;
    description: string;
  };
  is_active: boolean;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.getUsers();
        setUsers(response.data || []);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.user.first_name.includes(searchTerm) ||
      user.user.last_name.includes(searchTerm) ||
      user.user.email.includes(searchTerm) ||
      user.phone.includes(searchTerm)
  );

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-700';
      case 'teacher':
        return 'bg-blue-100 text-blue-700';
      case 'counselor':
        return 'bg-green-100 text-green-700';
      case 'staff':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <main className="md:pt-20 pt-16 md:ml-64 min-h-screen bg-gray-50">
      <div className="px-6 py-8 border-b border-border bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">إدارة المستخدمين</h1>
            <p className="text-gray-600 mt-1">إضافة وتعديل بيانات المستخدمين والمعلمين</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
            <Plus size={20} />
            إضافة مستخدم
          </Button>
        </div>
      </div>

      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="البحث عن مستخدم..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">جاري تحميل البيانات...</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
              {filteredUsers.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-gray-600">لا توجد مستخدمين</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 border-b border-border">
                      <TableHead className="text-right text-gray-700 font-semibold">الاسم</TableHead>
                      <TableHead className="text-right text-gray-700 font-semibold">البريد الإلكتروني</TableHead>
                      <TableHead className="text-right text-gray-700 font-semibold">رقم الجوال</TableHead>
                      <TableHead className="text-right text-gray-700 font-semibold">الدور</TableHead>
                      <TableHead className="text-right text-gray-700 font-semibold">الحالة</TableHead>
                      <TableHead className="text-right text-gray-700 font-semibold">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id} className="border-b border-border hover:bg-gray-50">
                        <TableCell className="text-right text-gray-900 font-medium">
                          {user.user.first_name} {user.user.last_name}
                        </TableCell>
                        <TableCell className="text-right text-gray-600">
                          {user.user.email}
                        </TableCell>
                        <TableCell className="text-right text-gray-600">
                          {user.phone}
                        </TableCell>
                        <TableCell className="text-right">
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(user.role.role)}`}>
                            {user.role.description}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                              user.is_active
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {user.is_active ? 'نشط' : 'معطل'}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                              <Edit2 size={16} />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
