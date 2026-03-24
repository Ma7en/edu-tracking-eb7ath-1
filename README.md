# منصة التتبع التعليمي (Educational Tracking Platform)

منصة شاملة لإدارة وتتبع العملية التعليمية في المدارس، مع واجهة احترافية وخلفية قوية.

## 🎯 المميزات الرئيسية

- ✅ **لوحة تحكم متقدمة** - عرض الإحصائيات والبيانات الرئيسية
- ✅ **إدارة المستخدمين** - إضافة وتعديل المعلمين والموظفين
- ✅ **إدارة الطلاب** - متابعة بيانات الطلاب والفصول
- ✅ **الجدول الدراسي** - عرض الحصص والدروس المنظمة
- ✅ **تسجيل الحضور** - تتبع حضور الطلاب يومياً
- ✅ **التقارير** - إنشاء وتحميل التقارير الدراسية
- ✅ **الإعدادات** - إدارة إعدادات النظام والحساب

## 🏗️ البنية التقنية

### Frontend (React + Tailwind CSS)
```
client/
├── src/
│   ├── pages/          # الصفحات الرئيسية
│   ├── components/     # المكونات القابلة لإعادة الاستخدام
│   ├── hooks/          # React Hooks المخصصة
│   ├── lib/            # الأدوات والمساعدات
│   └── contexts/       # React Contexts
```

### Backend (Django REST Framework)
```
/home/ubuntu/
├── manage.py
├── api/                # تطبيق API
│   ├── models.py       # نماذج قاعدة البيانات
│   ├── serializers.py  # تسلسل البيانات
│   ├── views.py        # API Views
│   └── urls.py         # توجيه API
└── edu_tracking_config/
    └── settings.py     # إعدادات Django
```

## 🚀 البدء السريع

### متطلبات النظام
- Node.js 22+
- Python 3.11+
- pnpm أو npm

### تثبيت Frontend
```bash
cd /home/ubuntu/edu-tracking-platform
pnpm install
pnpm dev
```

### تثبيت Backend
```bash
cd /home/ubuntu
source edu-tracking-backend/bin/activate
pip install -r requirements.txt
python manage.py runserver
```

## 📊 البيانات التجريبية

المشروع يأتي مع بيانات تجريبية محملة مسبقاً:
- **مدرسة واحدة**: مدرسة النور الأهلية
- **5 فصول دراسية**: من الصف الأول إلى الصف الخامس
- **10 طلاب**: موزعين على الفصول
- **5 معلمين**: يدرسون مواد مختلفة
- **جدول دراسي كامل**: حصص منظمة لكل يوم

## 🔐 المصادقة

النظام يستخدم JWT (JSON Web Tokens) للمصادقة:

**بيانات تسجيل الدخول الافتراضية:**
- رقم الجوال: `0543830924`
- كلمة المرور: `023456789@@`

## 📡 API Endpoints

جميع الـ Endpoints تتطلب توكن JWT صحيح:

```
POST   /api/token/              - الحصول على توكن
GET    /api/schools/            - قائمة المدارس
GET    /api/users/              - قائمة المستخدمين
GET    /api/students/           - قائمة الطلاب
GET    /api/classes/            - قائمة الفصول
GET    /api/subjects/           - قائمة المواد
GET    /api/schedules/          - الجدول الدراسي
GET    /api/attendance/         - سجلات الحضور
GET    /api/reports/            - التقارير
```

## 🎨 التصميم

المشروع يستخدم تصميماً احترافياً حديثاً مع:
- **ألوان احترافية**: أزرق عميق (#1E40AF) مع رمادي فاتح
- **طباعة قوية**: Poppins للعناوين + Inter للنصوص
- **حركات سلسة**: انتقالات ناعمة وظلال دقيقة
- **واجهة سهلة الاستخدام**: Sidebar ثابت + Header علوي

## 📱 الاستجابة

المشروع مصمم ليكون متجاوباً على جميع الأجهزة:
- ✅ سطح المكتب (Desktop)
- ✅ الأجهزة اللوحية (Tablet)
- ✅ الهواتف الذكية (Mobile)

## 🔧 الأدوات المستخدمة

### Frontend
- React 19
- Tailwind CSS 4
- shadcn/ui
- Wouter (Routing)
- Axios (HTTP Client)
- Lucide Icons

### Backend
- Django 5.2
- Django REST Framework
- JWT Authentication
- SQLite Database
- CORS Support

## 📝 الملفات المهمة

- `client/src/lib/api.ts` - API Client للتواصل مع Backend
- `client/src/hooks/useAuth.ts` - Hook للمصادقة
- `client/src/components/ProtectedRoute.tsx` - حماية الصفحات
- `/home/ubuntu/api/models.py` - نماذج قاعدة البيانات
- `/home/ubuntu/edu_tracking_config/settings.py` - إعدادات Django

## 🐛 استكشاف الأخطاء

### الخادم لا يستجيب
```bash
# تحقق من حالة الخادم
curl http://localhost:8000/api/schools/

# أعد تشغيل الخادم
python manage.py runserver
```

### مشاكل المصادقة
```bash
# تحقق من صحة التوكن
curl -X POST http://localhost:8000/api/token/ \
  -H "Content-Type: application/json" \
  -d '{"username": "0543830924", "password": "023456789@@"}'
```

## 📞 الدعم

للمزيد من المعلومات أو الدعم، يرجى التواصل مع فريق التطوير.

---

**آخر تحديث:** 23 مارس 2026
**الإصدار:** 1.0.0
**الحالة:** ✅ جاهز للإنتاج
