import { useState } from 'react';
import { Save, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export default function Settings() {
  const { logout } = useAuth();
  const [formData, setFormData] = useState({
    schoolName: 'مدرسة النور الأهلية',
    email: 'info@alnoor.edu.sa',
    phone: '+966 50 123 4567',
    address: 'الرياض، المملكة العربية السعودية',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    toast.success('تم حفظ الإعدادات بنجاح');
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <main className="md:pt-20 pt-16 md:ml-64 min-h-screen bg-gray-50">
      <div className="px-6 py-8 border-b border-border bg-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">الإعدادات</h1>
          <p className="text-gray-600 mt-1">إدارة إعدادات المدرسة والحساب</p>
        </div>
      </div>

      <div className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* School Settings */}
          <div className="bg-white rounded-lg border border-border shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">إعدادات المدرسة</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اسم المدرسة
                </label>
                <Input
                  type="text"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  البريد الإلكتروني
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رقم الهاتف
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  العنوان
                </label>
                <Input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-4">
                <Button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                >
                  <Save size={20} />
                  حفظ التغييرات
                </Button>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-white rounded-lg border border-border shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">إعدادات الحساب</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900">
                  <strong>تنبيه:</strong> لتغيير كلمة المرور أو البريد الإلكتروني، يرجى التواصل مع مسؤول النظام.
                </p>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-lg border border-red-200 shadow-sm p-8">
            <h2 className="text-2xl font-bold text-red-900 mb-6">منطقة الخطر</h2>
            
            <div className="space-y-4">
              <p className="text-gray-600">
                تسجيل الخروج من حسابك وإنهاء الجلسة الحالية.
              </p>
              <Button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white gap-2"
              >
                <LogOut size={20} />
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
