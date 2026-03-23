import { useEffect, useState } from 'react';
import { Users, BookOpen, Layers, BarChart3 } from 'lucide-react';
import StatCard from '@/components/StatCard';
import { apiClient } from '@/lib/api';

interface DashboardStats {
  totalUsers: number;
  totalStudents: number;
  totalClasses: number;
  totalSubjects: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalStudents: 0,
    totalClasses: 0,
    totalSubjects: 0,
    presentCount: 0,
    absentCount: 0,
    lateCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all statistics
        const [users, students, classes_, subjects, attendance] = await Promise.all([
          apiClient.getUsers().catch(() => ({ data: [] })),
          apiClient.getStudents().catch(() => ({ data: [] })),
          apiClient.getClasses().catch(() => ({ data: [] })),
          apiClient.getSubjects().catch(() => ({ data: [] })),
          apiClient.getAttendanceStatistics().catch(() => ({ data: {} })),
        ]);

        setStats({
          totalUsers: users.data.length || 0,
          totalStudents: students.data.length || 0,
          totalClasses: classes_.data.length || 0,
          totalSubjects: subjects.data.length || 0,
          presentCount: attendance.data.present || 0,
          absentCount: attendance.data.absent || 0,
          lateCount: attendance.data.late || 0,
        });
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <main className="md:pt-20 pt-16 md:ml-64 min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="px-6 py-8 border-b border-border bg-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">مساء الخير، مازن سعد 👋</h1>
          <p className="text-gray-600">
            {new Date().toLocaleDateString('ar-SA', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">جاري تحميل البيانات...</p>
            </div>
          ) : (
            <>
              {/* Statistics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                  icon={<Users size={24} />}
                  label="إجمالي المستخدمين"
                  value={stats.totalUsers}
                  color="blue"
                />
                <StatCard
                  icon={<BookOpen size={24} />}
                  label="إجمالي الطلاب"
                  value={stats.totalStudents}
                  color="green"
                />
                <StatCard
                  icon={<Layers size={24} />}
                  label="عدد الفصول"
                  value={stats.totalClasses}
                  color="orange"
                />
                <StatCard
                  icon={<BarChart3 size={24} />}
                  label="عدد المواد"
                  value={stats.totalSubjects}
                  color="red"
                />
              </div>

              {/* Attendance Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard
                  icon={<Users size={24} />}
                  label="الحاضرون"
                  value={stats.presentCount}
                  color="green"
                />
                <StatCard
                  icon={<Users size={24} />}
                  label="الغائبون"
                  value={stats.absentCount}
                  color="red"
                />
                <StatCard
                  icon={<Users size={24} />}
                  label="المتأخرون"
                  value={stats.lateCount}
                  color="orange"
                />
              </div>

              {/* Behavioral Statistics Section */}
              <div className="bg-white rounded-lg border border-border shadow-sm p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">إحصائيات الحالات السلوكية</h2>
                <div className="flex items-center justify-center h-40 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">لا توجد بيانات متاحة</p>
                </div>
              </div>

              {/* Pending Assignments */}
              <div className="bg-white rounded-lg border border-border shadow-sm p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">طلبات الإسناد المعلقة</h2>
                <div className="flex items-center justify-center h-40 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">لا توجد طلبات إسناد معلقة</p>
                </div>
              </div>

              {/* Upcoming Holidays and Events */}
              <div className="bg-white rounded-lg border border-border shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">الإجازات والأحداث القادمة</h2>
                <div className="flex items-center justify-center h-40 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">لا توجد إجازات أو أحداث قادمة</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
