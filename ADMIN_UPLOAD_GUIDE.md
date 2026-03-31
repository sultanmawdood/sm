# 🚀 Quick Start: Upload Product Images via Admin Panel

## Step 1: Start Your Servers

Open **TWO** terminal windows:

### Terminal 1 - Backend Server
```bash
cd server
npm start
```
✅ You should see: `Server running on port 5000`

### Terminal 2 - Frontend
```bash
npm run dev
```
✅ You should see: `Local: http://localhost:5173`

---

## Step 2: Access Admin Panel

1. Open browser: `http://localhost:5173/admin/login`
2. Login with your admin credentials

---

## Step 3: Upload Images to Products

### Option A: Edit Existing Product
1. Click **"Products"** in admin sidebar
2. Find the product you want to update
3. Click **"Edit"** button
4. Click on the **image upload area** (or existing image)
5. Select your image file from computer
6. Wait for upload to complete (you'll see a preview)
7. Click **"Update"** to save

### Option B: Add New Product
1. Click **"Products"** in admin sidebar
2. Click **"Add Product"** button
3. Fill in product details:
   - Name
   - Category
   - Price
   - Description
4. Click on **image upload area**
5. Select your image file
6. Click **"Create"** to save

---

## 📋 Image Requirements

- **Formats:** JPG, PNG, GIF
- **Max Size:** 5MB
- **Recommended:** 800x800px (square)

---

## 🎯 Example: Update Action Camera Image

1. Go to Products page
2. Find "Action Camera 4K" (ID: 9)
3. Click "Edit"
4. Click on current image
5. Select your new camera image
6. Click "Update"
7. Done! ✅

---

## ✅ What Happens Behind the Scenes

1. Image uploads to: `server/uploads/`
2. Server returns image URL
3. Product database updates with new image URL
4. Image displays on your website immediately

---

## 🔧 Troubleshooting

### "Upload failed" error?
- ✅ Check both servers are running
- ✅ Check file size (must be under 5MB)
- ✅ Check file format (JPG, PNG, GIF only)

### Image not showing after upload?
- ✅ Refresh the page
- ✅ Check browser console for errors
- ✅ Verify `server/uploads/` folder exists

### Can't access admin panel?
- ✅ Make sure you're logged in as admin
- ✅ Check admin credentials in `.env` file

---

## 🎉 You're All Set!

Your admin panel is ready to upload images. Just:
1. Start servers
2. Login to admin
3. Edit product
4. Upload image
5. Save!

**That's it!** 🚀
