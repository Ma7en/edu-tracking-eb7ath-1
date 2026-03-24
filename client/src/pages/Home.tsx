import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  CheckSquare,
  FileText,
  Settings,
  GraduationCap,
  ArrowRight,
  Shield,
  Bell,
  Zap,
  Smartphone,
} from 'lucide-react';

export default function Home() {
  const [, setLocation] = useLocation();

  const features = [
    {
      icon: <CheckSquare size={32} className="text-blue-600" />,
      title: 'تسجيل الحضور الذكي',
      description: 'نظام متقدم لتسجيل ومتابعة حضور الطلاب مع إمكانية الموافقة والمراجعة الفورية',
    },
    {
      icon: <FileText size={32} className="text-blue-600" />,
      title: 'تقارير تلقائية',
      description: 'إنشاء تقارير شاملة بصيغة PDF مع تخصيص كامل للترويسة والتذييل',
    },
    {
      icon: <Calendar size={32} className="text-blue-600" />,
      title: 'إدارة الجداول',
      description: 'جدولة الحصص والدروس مع ربطها بالمعلمين والفصول بشكل مرن وسهل',
    },
    {
      icon: <Users size={32} className="text-blue-600" />,
      title: 'إدارة الطلاب',
      description: 'نظام شامل لإدارة بيانات الطلاب مع إمكانية الاستيراد من Excel',
    },
  ];

  const mainFeatures = [
    {
      icon: <CheckSquare size={40} className="text-blue-600" />,
      title: 'إدارة الحضور المتقدمة',
      description: 'تسجيل ومتابعة حضور الطلاب بشكل يومي مع إمكانية الموافقة والمراجعة من قبل الإدارة',
    },
    {
      icon: <FileText size={40} className="text-blue-600" />,
      title: 'التقييم والتقارير',
      description: 'تقييم سلوك الطلاب وإنشاء تقارير شاملة تلقائياً بصيغة PDF مع تخصيص كامل',
    },
    {
      icon: <Calendar size={40} className="text-blue-600" />,
      title: 'الجدول الدراسي',
      description: 'إدارة الجداول الدراسية والحصص مع ربطها بالمعلمين والفصول بشكل مرن',
    },
    {
      icon: <Users size={40} className="text-blue-600" />,
      title: 'إدارة الطلاب',
      description: 'إضافة وتعديل بيانات الطلاب مع إمكانية الاستيراد من Excel بسهولة',
    },
    {
      icon: <Bell size={40} className="text-blue-600" />,
      title: 'الإشعارات الفورية',
      description: 'نظام إشعارات متكامل للمعلمين والإدارة بجميع التحديثات والأحداث',
    },
    {
      icon: <Settings size={40} className="text-blue-600" />,
      title: 'إعدادات مرنة',
      description: 'تخصيص كامل للنظام حسب احتياجات المدرسة والمناهج الدراسية',
    },
    {
      icon: <Shield size={40} className="text-blue-600" />,
      title: 'أمان عالي',
      description: 'نظام أمان متقدم مع صلاحيات محددة لكل دور في النظام',
    },
    {
      icon: <Smartphone size={40} className="text-blue-600" />,
      title: 'متوافق مع الجوال',
      description: 'واجهة متجاوبة تعمل بشكل مثالي على جميع الأجهزة والهواتف الذكية',
    },
  ];

  const roles = [
    {
      title: 'مدير النظام',
      permissions: [
        'إدارة المستخدمين والطلاب',
        'إعدادات النظام الكاملة',
        'الموافقة على سجلات الحضور',
        'إنشاء وتحميل التقارير',
        'إدارة الجداول الدراسية',
      ],
    },
    {
      title: 'المعلم',
      permissions: [
        'تسجيل حضور الطلاب',
        'تقييم سلوك الطلاب',
        'عرض الجدول الدراسي الخاص',
        'إدخال الملاحظات والتقييمات',
        'متابعة الإشعارات',
      ],
    },
    {
      title: 'الموجه الطلابي',
      permissions: [
        'إدارة الحالات السلوكية',
        'متابعة الطلاب المميزين',
        'إنشاء تقارير الحالات الخاصة',
        'إرسال واستقبال الإشعارات',
        'التواصل مع الإدارة',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 dir-rtl">
        <div className="container flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <GraduationCap size={24} className="text-white" />
            </div>
            <span className="font-bold text-lg text-blue-600">منصة التتبع التعليمي</span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setLocation('/login')}
              className="text-gray-700 hover:text-blue-600"
            >
              ابدأ الآن
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block px-4 py-2 bg-blue-100 rounded-full mb-6">
              <span className="text-blue-600 text-sm font-medium">منصة متكاملة لإدارة العملية التعليمية</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              منصة التتبع التعليمي
              <br />
              <span className="text-blue-600">الحل الأمثل</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              نظام شامل ومتطور لإدارة المدارس يتيح لك تتبع الحضور، إدارة الطلاب، إنشاء التقارير، ومتابعة الأداء التعليمي بكفاءة عالية
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-12">
              <div className="p-6 bg-blue-50 rounded-xl">
                <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
                <div className="text-gray-600">مستخدم نشط</div>
              </div>
              <div className="p-6 bg-blue-50 rounded-xl">
                <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600">مدرسة</div>
              </div>
              <div className="p-6 bg-blue-50 rounded-xl">
                <div className="text-3xl font-bold text-blue-600 mb-2">99%</div>
                <div className="text-gray-600">رضا العملاء</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => setLocation('/login')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
              >
                ابدأ الآن
                <ArrowRight size={20} className="mr-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg"
              >
                اكتشف المزيد
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Overview Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">نظرة سريعة على المنصة</h2>
            <p className="text-gray-600 text-lg">اكتشف كيف يمكن لمنصة التتبع التعليمي تحويل إدارة مدرستك</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">المميزات الرئيسية</h2>
            <p className="text-gray-600 text-lg">كل ما تحتاجه لإدارة مدرستك بكفاءة</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mainFeatures.map((feature, index) => (
              <div key={index} className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">الأدوار والصلاحيات</h2>
            <p className="text-gray-600 text-lg">نظام متكامل لجميع أفراد المدرسة</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roles.map((role, index) => (
              <div key={index} className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{role.title}</h3>
                <ul className="space-y-3">
                  {role.permissions.map((permission, pIndex) => (
                    <li key={pIndex} className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold mt-1">•</span>
                      <span className="text-gray-700">{permission}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container text-center">
          <h2 className="text-4xl font-bold text-white mb-6">جاهز للبدء؟</h2>
          <p className="text-xl text-blue-100 mb-8">انضم إلى منصة التتبع التعليمي وابدأ في تحويل إدارة مدرستك اليوم</p>
          <Button
            size="lg"
            onClick={() => setLocation('/register')}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-bold"
          >
            ابدأ الآن مجاناً
            <ArrowRight size={20} className="mr-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <GraduationCap size={20} className="text-white" />
                </div>
                <span className="font-bold">منصة التتبع</span>
              </div>
              <p className="text-gray-400 text-sm">منصة متكاملة لإدارة العملية التعليمية</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">المنصة</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">الميزات</a></li>
                <li><a href="#" className="hover:text-white">الأسعار</a></li>
                <li><a href="#" className="hover:text-white">الأدوار</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">الشركة</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">عن الشركة</a></li>
                <li><a href="#" className="hover:text-white">المدونة</a></li>
                <li><a href="#" className="hover:text-white">التواصل</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">التواصل</h4>
              <p className="text-gray-400 text-sm">البريد: support@edu-tracking.cloud</p>
              <p className="text-gray-400 text-sm">الهاتف: +966 50 793 4160</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>منصة التتبع التعليمي © 2026 - جميع الحقوق محفوظة</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
