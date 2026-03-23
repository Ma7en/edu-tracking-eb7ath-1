import { useEffect, useState } from 'react';
import { Download, Plus, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { apiClient } from '@/lib/api';

interface Report {
  id: number;
  title: string;
  report_type: string;
  content: string;
  generated_by: { user: { first_name: string; last_name: string } };
}

export default function Reports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.getReports();
        setReports(response.data || []);
      } catch (error) {
        console.error('Failed to fetch reports:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <main className="md:pt-20 pt-16 md:ml-64 min-h-screen bg-gray-50">
      <div className="px-6 py-8 border-b border-border bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">التقارير</h1>
            <p className="text-gray-600 mt-1">إنشاء وتحميل التقارير الدراسية</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
            <Plus size={20} />
            إنشاء تقرير جديد
          </Button>
        </div>
      </div>

      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">جاري تحميل البيانات...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.length === 0 ? (
                <div className="col-span-full bg-white rounded-lg border border-border p-8 text-center">
                  <p className="text-gray-600">لا توجد تقارير</p>
                </div>
              ) : (
                reports.map((report) => (
                  <div key={report.id} className="bg-white rounded-lg border border-border p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                        <FileText size={20} className="text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{report.title}</h3>
                        <p className="text-xs text-gray-600 mt-1">{report.report_type}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{report.content}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <p className="text-xs text-gray-500">
                        بواسطة: {report.generated_by.user.first_name}
                      </p>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 gap-1">
                        <Download size={16} />
                        تحميل
                      </Button>
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
