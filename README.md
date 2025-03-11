# **TaskList**

Foydalanuchilar tasklar yaratishi o'zgartirishi va o'chirishi uchun mo'ljallangan dastur.

## Xususiyatlar

- **Foydalanuvchi autentifikatsiyasi**

  - Ro‘yxatdan o‘tish: Foydalanuvchi `username`, `email` va `password` kiritadi.
  - Login qilish: `email` va `password` orqali tizimga kiradi.
  - Ma'lumotlar backend tomonidan tekshiriladi va mos javob qaytariladi.

- **Task boshqaruvi**

  - **Yaratish** – Foydalanuvchi yangi vazifa qo‘shishi mumkin.
  - **Ko‘rish** – O‘ziga tegishli barcha tasklarni ko‘rishi mumkin.
  - **Tahrirlash** – Task ma’lumotlarini o‘zgartirishi mumkin.
  - **O‘chirish** – Keraksiz tasklarni o‘chirib tashlashi mumkin.

- **Ma’lumotlarning to‘g‘ri kiritilishini tekshirish**
  - Foydalanuvchi kiritgan barcha ma’lumotlar `React Hook Form` orqali tekshiriladi.
  - Majburiy maydonlar bo‘sh qoldirilsa yoki noto‘g‘ri formatda kiritilsa, ogohlantirish beriladi.

## Texnologiyalar

Loyiha quyidagi texnologiyalar va kutubxonalardan foydalanadi:

- **Next.js** – Foydalanuvchi interfeysini yaratish va server tomonida API endpointlar yozish uchun.
- **TypeScript** – Kodingizni xavfsizroq va tiplangan qilish uchun.
- **Tailwind CSS** – UI komponentlariga tez va moslashuvchan stil berish uchun.
- **React Hook Form** – Forma ma’lumotlarini boshqarish va validatsiya qilish uchun.
- **NextAuth.js** – Foydalanuvchilarni ro‘yxatdan o‘tkazish va login qilish uchun.
- **Axios** – Frontend va backend o‘rtasida ma’lumot almashish uchun.
- **Mongoose** – MongoDB ma’lumotlar bazasi bilan ishlash va ma’lumotlarni saqlash uchun.
- **bcrypt** – Foydalanuvchi parollarini xavfsiz shifrlash uchun.

## Sahifalar

Loyihada quyidagi sahifalar mavjud:

- **`(auth)/login/page.tsx`** – Login sahifasi.
- **`(auth)/register/page.tsx`** – Ro‘yxatdan o‘tish sahifasi.

  - Ushbu sahifalarda kerakli autentifikatsiya komponentlari chaqirilgan.

- **`(root)/page.tsx`** – Home sahifasi. Foydalanuching barcha tasklari shu sahifada
- **`(root)/create-task/page.tsx`** – Yangi task yaratish sahifasi.
- **`(root)/edit-task/page.tsx`** – Mavjud taskni tahrirlash sahifasi.

  - Ushbu sahifalarda kerakli UI va funksional komponentlar chaqirilgan.

- **`(root)/layout.tsx`** – Root layout fayli, barcha asosiy sahifalarga umumiy tuzilmani ta’minlaydi.

## Komponentlar

Loyihada quyidagi asosiy komponentlar mavjud:

- **`components/RegisterForm`** – Foydalanuvchilarni ro‘yxatdan o‘tkazish formasi.
- **`components/LoginForm`** – Login qilish uchun forma.
- **`components/CreateTaskForm`** – Yangi task yaratish uchun forma.
- **`components/EditTaskForm`** – Tasklarni tahrirlash uchun forma.
- **`components/Loader`** – Tasklarni yuklash jarayonida ko‘rsatiladigan loader.
- **`components/Navbar`** – Saytning navigatsiya paneli.
- **`components/TaskItem`** – Tasklar ro‘yxatini iteratsiya qilib foydalanuvchiga ko‘rsatish uchun komponent.

## API Yo‘nalishlari (Routes)

Loyihada quyidagi API yo‘nalishlari mavjud:

- **`app/api/auth/register/route.ts`** – Yangi foydalanuvchini ro‘yxatdan o‘tkazish uchun.
- **`app/api/auth/[...next-auth]/route.ts`** – `NextAuth` orqali login qilish uchun.

- **`app/api/task/route.ts`**

  - Yangi task yaratish.
  - Barcha tasklarni olish.

- **`app/api/task/[id]/route.ts`**
  - Bitta taskni olish.
  - Taskni tahrirlash.
  - Taskni o‘chirish.

## Qo‘shimcha Fayllar va Tuzilmalar

- **`lib/mongoose.ts`** – MongoDB bazasiga ulanishni boshqarish uchun.
- **`models/Task.ts`** – Task ma’lumotlarini saqlash uchun MongoDB modeli.
- **`models/User.ts`** – Foydalanuvchilar ma’lumotlarini saqlash uchun MongoDB modeli.
- **`types/index.d.ts`** – Loyiha bo‘yicha umumiy TypeScript typelarini saqlash uchun.
- **`.env`** – Maxfiy kalitlar va muhit o‘zgaruvchilarini saqlash uchun.
