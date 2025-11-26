# 🔧 TaskPro - Production Setup Guide

## 📝 Önemli Notlar

### Cloudinary Kullanımı
- Avatar upload otomatik Cloudinary'ye yükler
- Eski avatar silinir, yeni avatar kaydedilir
- Max 10MB, otomatik resize 1000x1000px
- Folder: `taskpro/avatars/`

### Email Gönderimi
- Need Help modalından gönderilen emailler `taskpro.project@gmail.com`'a gider
- Brevo free tier: 300 email/gün
- Test için: Ethereal test account otomatik oluşur (development)

### JWT Token
- 30 gün geçerli
- localStorage'da saklanır
- Her istekte Bearer token olarak gönderilir

### Tema Sistemi
- 3 tema: light, dark, violet
- User model'de saklanır
- CSS custom properties ile uygulanır
- Modal'da anlık preview

---

## 🔐 Güvenlik Kontrol

- [x] .env dosyası .gitignore'da
- [x] JWT_SECRET production için değiştirilmeli
- [x] MongoDB IP whitelist ayarlandı
- [x] CORS production domain ile sınırlı
- [x] Passwords bcrypt ile hashli
- [x] Auth middleware tüm private route'larda

----

## 📚 API Endpoints

### Auth
- POST `/api/auth/register` - Kullanıcı kaydı
- POST `/api/auth/login` - Giriş
- GET `/api/auth/current` - Mevcut kullanıcı
- PUT `/api/auth/profile` - Profil güncelle
- PUT `/api/auth/theme` - Tema değiştir
- POST `/api/auth/logout` - Çıkış

### Boards
- GET `/api/boards` - Tüm boardlar
- POST `/api/boards` - Yeni board
- GET `/api/boards/:id` - Board detay
- PUT `/api/boards/:id` - Board güncelle
- DELETE `/api/boards/:id` - Board sil

### Columns
- GET `/api/columns/board/:boardId` - Board'daki kolonlar
- POST `/api/columns` - Yeni kolon
- PUT `/api/columns/:id` - Kolon güncelle
- DELETE `/api/columns/:id` - Kolon sil

### Cards
- GET `/api/cards/column/:columnId` - Kolondaki kartlar
- POST `/api/cards` - Yeni kart
- PUT `/api/cards/:id` - Kart güncelle
- DELETE `/api/cards/:id` - Kart sil

### Help
- POST `/api/help` - Yardım maili gönder

---
