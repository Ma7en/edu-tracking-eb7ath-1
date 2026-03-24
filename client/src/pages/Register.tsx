import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GraduationCap, ArrowRight, Mail, Phone, MapPin, Building2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Register() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    schoolName: '',
    email: '',
    phone: '',
    address: '',
    adminName: '',
    adminPhone: '',
    adminEmail: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.schoolName || !formData.email || !formData.phone || !formData.adminName) {
      toast.error('الرجاء ملء جميع الحقول المطلوبة');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('تم تسجيل المدرسة بنجاح! سيتم التواصل معك قريباً');
      setFormData({
        schoolName: '',
        email: '',
        phone: '',
        address: '',
        adminName: '',
        adminPhone: '',
        adminEmail: '',
      });
      setTimeout(() => setLocation('/login'), 2000);
    } catch (error) {
      toast.error('حدث خطأ في التسجيل');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50" dir="rtl">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container flex items-center justify-between h-20">
          <button
            onClick={() => setLocation('/')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <GraduationCap size={24} className="text-white" />
            </div>
            <span className="font-bold text-lg text-blue-600">منصة التتبع التعليمي</span>
          </button>
          <Button
            variant="ghost"
            onClick={() => setLocation('/login')}
            className="text-gray-700 hover:text-blue-600"
          >
            تسجيل الدخول
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Info */}
          <div className="hidden lg:block">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              سجل مدرستك الآن
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              انضم إلى آلاف المدارس التي تستخدم منصة التتبع التعليمي لتحسين إدارتها التعليمية
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                    <Building2 size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">إدارة متكاملة</h3>
                  <p className="text-gray-600">نظام شامل لإدارة جميع جوانب المدرسة</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                    <Phone size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">دعم فني متميز</h3>
                  <p className="text-gray-600">فريق دعم متخصص متاح 24/7</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                    <Mail size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">تدريب مجاني</h3>
                  <p className="text-gray-600">تدريب شامل لجميع موظفي المدرسة</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                    <MapPin size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">أمان عالي</h3>
                  <p className="text-gray-600">حماية كاملة لبيانات المدرسة والطلاب</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">تسجيل مدرسة جديدة</h2>
            <p className="text-gray-600 mb-8">ملء البيانات أدناه لبدء استخدام المنصة</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* School Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اسم المدرسة *
                </label>
                <Input
                  type="text"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleChange}
                  placeholder="مثال: مدرسة النور الأهلية"
                  className="w-full"
                  disabled={isLoading}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    البريد الإلكتروني للمدرسة *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="info@school.com"
                    className="w-full"
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رقم الهاتف *
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+966 50 123 4567"
                    className="w-full"
                    disabled={isLoading}
                  />
                </div>
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
                  placeholder="الرياض، المملكة العربية السعودية"
                  className="w-full"
                  disabled={isLoading}
                />
              </div>

              {/* Admin Information */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">بيانات مدير النظام</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اسم المدير *
                  </label>
                  <Input
                    type="text"
                    name="adminName"
                    value={formData.adminName}
                    onChange={handleChange}
                    placeholder="محمد أحمد"
                    className="w-full"
                    disabled={isLoading}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      البريد الإلكتروني للمدير
                    </label>
                    <Input
                      type="email"
                      name="adminEmail"
                      value={formData.adminEmail}
                      onChange={handleChange}
                      placeholder="admin@school.com"
                      className="w-full"
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      رقم جوال المدير
                    </label>
                    <Input
                      type="tel"
                      name="adminPhone"
                      value={formData.adminPhone}
                      onChange={handleChange}
                      placeholder="+966 50 987 6543"
                      className="w-full"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? 'جاري التسجيل...' : 'تسجيل المدرسة'}
                {!isLoading && <ArrowRight size={20} />}
              </Button>

              {/* Login Link */}
              <p className="text-center text-gray-600 text-sm">
                هل لديك حساب بالفعل؟{' '}
                <button
                  type="button"
                  onClick={() => setLocation('/login')}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  تسجيل الدخول
                </button>
              </p>
            </form>

            {/* Footer Note */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>ملاحظة:</strong> سيتم التحقق من بيانات المدرسة والتواصل معك خلال 24 ساعة لتفعيل الحساب
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-20">
        <div className="container text-center text-gray-400 text-sm">
          <p>منصة التتبع التعليمي © 2026 - جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </div>
  );
}
