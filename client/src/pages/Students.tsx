import { useEffect, useState } from 'react';
import { Plus, Search, Download } from 'lucide-react';
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

interface Student {
  id: number;
  first_name: string;
  last_name: string;
  student_id: string;
  class_field: {
    name: string;
  };
  is_active: boolean;
}

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.getStudents();
        setStudents(response.data || []);
      } catch (error) {
        console.error('Failed to fetch students:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter(
    (student) =>
      student.first_name.includes(searchTerm) ||
      student.last_name.includes(searchTerm) ||
      student.student_id.includes(searchTerm)
  );

  return (
    <main className="md:pt-20 pt-16 md:ml-64 min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="px-6 py-8 border-b border-border bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">إدارة الطلاب</h1>
            <p className="text-gray-600 mt-1">إضافة وتعديل بيانات الطلاب</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download size={20} />
              استيراد من Excel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
              <Plus size={20} />
              إضافة طالب
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="mb-6 flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="البحث عن طالب..."
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
            /* Table */
            <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
              {filteredStudents.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-gray-600">لا توجد طلاب</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 border-b border-border">
                      <TableHead className="text-right text-gray-700 font-semibold">الاسم</TableHead>
                      <TableHead className="text-right text-gray-700 font-semibold">رقم الطالب</TableHead>
                      <TableHead className="text-right text-gray-700 font-semibold">الفصل</TableHead>
                      <TableHead className="text-right text-gray-700 font-semibold">الحالة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id} className="border-b border-border hover:bg-gray-50">
                        <TableCell className="text-right text-gray-900 font-medium">
                          {student.first_name} {student.last_name}
                        </TableCell>
                        <TableCell className="text-right text-gray-600">
                          {student.student_id}
                        </TableCell>
                        <TableCell className="text-right text-gray-600">
                          {student.class_field?.name || '-'}
                        </TableCell>
                        <TableCell className="text-right">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                              student.is_active
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {student.is_active ? 'نشط' : 'معطل'}
                          </span>
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
