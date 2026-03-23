import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Clock, Plus, Download, Search } from 'lucide-react';
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

interface AttendanceRecord {
  id: number;
  student: {
    first_name: string;
    last_name: string;
    student_id: string;
  };
  date: string;
  status: 'present' | 'absent' | 'late';
  notes: string;
}

export default function Attendance() {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({ present: 0, absent: 0, late: 0 });

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setIsLoading(true);
        const [attendanceRes, statsRes] = await Promise.all([
          apiClient.getAttendance().catch(() => ({ data: [] })),
          apiClient.getAttendanceStatistics().catch(() => ({ data: {} })),
        ]);
        setAttendance(attendanceRes.data || []);
        setStats(statsRes.data || { present: 0, absent: 0, late: 0 });
      } catch (error) {
        console.error('Failed to fetch attendance:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  const filteredAttendance = attendance.filter(
    (record) =>
      record.student.first_name.includes(searchTerm) ||
      record.student.last_name.includes(searchTerm) ||
      record.student.student_id.includes(searchTerm)
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle2 size={20} className="text-green-600" />;
      case 'absent':
        return <XCircle size={20} className="text-red-600" />;
      case 'late':
        return <Clock size={20} className="text-orange-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-700';
      case 'absent':
        return 'bg-red-100 text-red-700';
      case 'late':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'present':
        return 'حاضر';
      case 'absent':
        return 'غائب';
      case 'late':
        return 'متأخر';
      default:
        return status;
    }
  };

  return (
    <main className="md:pt-20 pt-16 md:ml-64 min-h-screen bg-gray-50">
      <div className="px-6 py-8 border-b border-border bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">الحضور والتقييم</h1>
            <p className="text-gray-600 mt-1">تسجيل وتتبع حضور الطلاب</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download size={20} />
              تحميل تقرير
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
              <Plus size={20} />
              تسجيل حضور
            </Button>
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg border border-border shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <CheckCircle2 size={24} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">الحاضرون</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.present}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-border shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                  <XCircle size={24} className="text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">الغائبون</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.absent}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-border shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                  <Clock size={24} className="text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">المتأخرون</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.late}</p>
                </div>
              </div>
            </div>
          </div>

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
            <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
              {filteredAttendance.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-gray-600">لا توجد سجلات حضور</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 border-b border-border">
                      <TableHead className="text-right text-gray-700 font-semibold">اسم الطالب</TableHead>
                      <TableHead className="text-right text-gray-700 font-semibold">رقم الطالب</TableHead>
                      <TableHead className="text-right text-gray-700 font-semibold">التاريخ</TableHead>
                      <TableHead className="text-right text-gray-700 font-semibold">الحالة</TableHead>
                      <TableHead className="text-right text-gray-700 font-semibold">الملاحظات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAttendance.map((record) => (
                      <TableRow key={record.id} className="border-b border-border hover:bg-gray-50">
                        <TableCell className="text-right text-gray-900 font-medium">
                          {record.student.first_name} {record.student.last_name}
                        </TableCell>
                        <TableCell className="text-right text-gray-600">
                          {record.student.student_id}
                        </TableCell>
                        <TableCell className="text-right text-gray-600">
                          {new Date(record.date).toLocaleDateString('ar-SA')}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(record.status)}
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(record.status)}`}>
                              {getStatusLabel(record.status)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right text-gray-600 text-sm">
                          {record.notes}
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
