import { useEffect, useState } from 'react';
import { Calendar, Clock, BookOpen, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { apiClient } from '@/lib/api';

interface ScheduleItem {
  id: number;
  class_field: { name: string };
  subject: { name: string };
  teacher: { user: { first_name: string; last_name: string } };
  day: string;
  start_time: string;
  end_time: string;
  room: string;
}

export default function Schedule() {
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState('saturday');

  const days = [
    { key: 'saturday', label: 'السبت' },
    { key: 'sunday', label: 'الأحد' },
    { key: 'monday', label: 'الاثنين' },
    { key: 'tuesday', label: 'الثلاثاء' },
    { key: 'wednesday', label: 'الأربعاء' },
    { key: 'thursday', label: 'الخميس' },
    { key: 'friday', label: 'الجمعة' },
  ];

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.getSchedules();
        setSchedules(response.data || []);
      } catch (error) {
        console.error('Failed to fetch schedules:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  const filteredSchedules = schedules.filter((s) => s.day === selectedDay);

  return (
    <main className="md:pt-20 pt-16 md:ml-64 min-h-screen bg-gray-50">
      <div className="px-6 py-8 border-b border-border bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">الجدول الدراسي</h1>
            <p className="text-gray-600 mt-1">عرض وإدارة الحصص الدراسية</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
            <Plus size={20} />
            إضافة حصة
          </Button>
        </div>
      </div>

      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Day Selector */}
          <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
            {days.map((day) => (
              <button
                key={day.key}
                onClick={() => setSelectedDay(day.key)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedDay === day.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {day.label}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">جاري تحميل البيانات...</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredSchedules.length === 0 ? (
                <div className="bg-white rounded-lg border border-border p-8 text-center">
                  <p className="text-gray-600">لا توجد حصص في هذا اليوم</p>
                </div>
              ) : (
                filteredSchedules.map((schedule) => (
                  <div key={schedule.id} className="bg-white rounded-lg border border-border p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {schedule.subject.name}
                        </h3>
                        <div className="space-y-2 text-gray-600">
                          <div className="flex items-center gap-2">
                            <BookOpen size={18} className="text-blue-600" />
                            <span>الفصل: {schedule.class_field.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={18} className="text-green-600" />
                            <span>
                              {schedule.start_time} - {schedule.end_time}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar size={18} className="text-orange-600" />
                            <span>الفصل: {schedule.room}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 mb-2">المعلم</p>
                        <p className="font-semibold text-gray-900">
                          {schedule.teacher.user.first_name} {schedule.teacher.user.last_name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
