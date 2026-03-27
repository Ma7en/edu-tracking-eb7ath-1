import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GraduationCap, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api';

export default function Register() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    schoolName: '',
    adminName: '',
    phone: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.schoolName || !formData.adminName || !formData.phone || !formData.password) {
      toast.error('الرجاء ملء جميع الحقول المطلوبة');
      return;
    }

    // Phone validation
    const phoneRegex = /^(\+966|0)(5[0-9]{8}|[0-9]{9})$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      toast.error('الرجاء إدخال رقم جوال صحيح (05xxxxxxx أو +9665xxxxxxx)');
      return;
    }

    // Password validation
    if (formData.password.length < 6) {
      toast.error('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    setIsLoading(true);
    try {
      // Call API to register
      const response = await apiClient.registerSchool({
        name: formData.schoolName,
        phone: formData.phone,
        admin_name: formData.adminName,
        admin_password: formData.password,
      });

      if (response) {
        toast.success('تم تسجيل المدرسة بنجاح! يمكنك الآن تسجيل الدخول');
        setFormData({
          schoolName: '',
          adminName: '',
          phone: '',
          password: '',
        });
        setTimeout(() => setLocation('/login'), 2000);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || error.message || 'حدث خطأ في التسجيل';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4" dir="rtl">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      {/* Register Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
              <GraduationCap size={32} className="text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
            تسجيل مدرسة جديدة
          </h1>
          <p className="text-center text-gray-600 mb-8">
            أضف بيانات المدرسة لإنشاء حساب جديد
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* School Name */}
            <div>
              <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700 mb-2">
                اسم المدرسة *
              </label>
              <Input
                id="schoolName"
                type="text"
                name="schoolName"
                placeholder="اسم المدرسة"
                value={formData.schoolName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={isLoading}
              />
            </div>

            {/* Admin Name */}
            <div>
              <label htmlFor="adminName" className="block text-sm font-medium text-gray-700 mb-2">
                اسم مدير المدرسة *
              </label>
              <Input
                id="adminName"
                type="text"
                name="adminName"
                placeholder="اسم مدير المدرسة"
                value={formData.adminName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={isLoading}
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                رقم الجوال *
              </label>
              <Input
                id="phone"
                type="tel"
                name="phone"
                placeholder="رقم الجوال (05xxxxxxx أو +9665xxxxxxx)"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                كلمة المرور *
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="كلمة المرور"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? 'جاري التسجيل...' : 'إنشاء الحساب'}
              {!isLoading && <ArrowRight size={20} />}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-600 text-sm mt-8">
            هل لديك حساب بالفعل؟{' '}
            <button
              type="button"
              onClick={() => setLocation('/login')}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              تسجيل الدخول
            </button>
          </p>
        </div>

        {/* Footer Text */}
        <p className="text-center text-gray-600 text-xs mt-6">
          منصة التتبع التعليمي © 2026 - جميع الحقوق محفوظة
        </p>
      </div>
    </div>
  );
}
