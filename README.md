# 🎓 Google Classroom Platforması



## 📋 Layihə Haqqında

Bu platforma müəllim və tələbələr üçün virtual təhsil mühiti yaradır. Sistem müasir texnologiyalar əsasında qurulub və təhsil prosesini effektiv şəkildə idarə etməyə imkan verir.

### 🌟 Əsas Xüsusiyyətlər

- 🔐 Təhlükəsiz autentifikasiya (hashcode ilə şifrələnmiş)
- 📚 Dərslərin idarə edilməsi
- ✍️ Tapşırıqların yaradılması və təhvili
- 📊 Real-time qiymətləndirmə sistemi
- 💬 İnteraktiv müzakirə imkanları
- 📱 Responsiv dizayn

### 📱 Səhifələr

1. **Autentifikasiya**
   - 🔑 Login
   - 📝 Register

2. **Əsas Səhifələr**
   - 🏠 Dashboard
   - 📚 Classes (Dərslər)
   - ✍️ Tasks (Tapşırıqlar)
   - 📝 Assignments (Təqdimatlar)
   - 👥 Students (Tələbələr)
   - 👨‍🏫 Teachers (Müəllimlər)
   - 👤 Profile (Profil)
   - 🚫 404 Not Found

### 🛠️ İstifadə Olunan Texnologiyalar

#### Frontend
- ⚛️ React.js
- 🎨 TailwindCSS
- 📊 Redux Toolkit & RTK Query
- ✨ Framer Motion
- 📜 React-Helmet
- 🎠 Swiper
- 📝 Formik & Yup
- 🌐 Axios
- 📊 Chart.js
- ⏰ Moment.js
- 🔔 React-Toastify

### 💻 Quraşdırma

```bash
# Layihəni klonlayın
git clone [repo-url]

# Asılılıqları yükləyin
npm install

# Development serveri başladın
npm run dev
```

### 🔐 Ətraf Mühit Dəyişənləri

```env
VITE_API_URL=your_api_url
VITE_CLOUDINARY_URL=your_cloudinary_url
```

### 📁 Layihə Strukturu

```
src/
├── api/
│   ├── axiosInstance.js
│   └── rtkQuery/
├── components/
│   ├── Authentication/
│   ├── Classes/
│   └── Tasks/
├── hooks/
├── pages/
├── redux/
├── styles/
└── utils/
```

### 🔄 API Endpoints

- `/users` - İstifadəçi əməliyyatları
- `/classes` - Dərs əməliyyatları
- `/tasks` - Tapşırıq əməliyyatları
- `/assignments` - Təqdimat əməliyyatları
- `/materials` - Material əməliyyatları
- `/majors` - İxtisas əməliyyatları
- `/invitations` - Dəvət əməliyyatları

### 👥 Komanda

- Frontend Developer
- UI/UX Designer
- Backend Developer
- QA Engineer

### 📄 Lisenziya

MIT © [Your Name]

---

<div align="center">
  <p>Made with ❤️ in Azerbaijan</p>
</div>