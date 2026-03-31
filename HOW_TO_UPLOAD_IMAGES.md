# How to Upload Product Images

## Method 1: Using Admin Panel (Recommended)

Your app already has a built-in image upload system! Here's how to use it:

### Steps:

1. **Start your servers:**
   ```bash
   # Terminal 1 - Start backend server
   cd server
   npm start

   # Terminal 2 - Start frontend
   cd ..
   npm run dev
   ```

2. **Access Admin Panel:**
   - Go to: `http://localhost:5173/admin/login`
   - Login with admin credentials

3. **Upload Images:**
   - Navigate to "Products" section
   - Click "Add Product" or "Edit" existing product
   - Click on the image upload area
   - Select your image file (JPG, PNG, GIF - max 5MB)
   - The image will be uploaded to `/server/uploads/` folder
   - Complete the product form and save

### Image Upload Features:
✅ Drag & drop support
✅ Click to browse files
✅ Preview before upload
✅ Automatic file validation
✅ 5MB size limit
✅ Supports: JPEG, JPG, PNG, GIF

---

## Method 2: Manual Image Upload

If you want to manually add images to your products:

### Option A: Use Local Images

1. **Place images in public folder:**
   ```
   public/images/products/
   ├── shoe1.jpg
   ├── shirt1.jpg
   └── ...
   ```

2. **Update product data:**
   ```typescript
   // src/data/products.ts or server/data/products.js
   {
     id: 1,
     name: "Your Product",
     image: "/images/products/shoe1.jpg",  // Local path
     // ... other fields
   }
   ```

### Option B: Use External URLs

Simply update the image URL in your products file:

```typescript
{
  id: 1,
  name: "Your Product",
  image: "https://your-image-host.com/image.jpg",
  // ... other fields
}
```

---

## Method 3: Bulk Upload via Database

If you have many products to update:

1. **Prepare your images** in `server/uploads/` folder

2. **Update products in database** or data file:
   ```javascript
   // server/data/products.js
   export const products = [
     {
       id: 1,
       name: "Product 1",
       image: "/uploads/product1.jpg",
       // ...
     },
     // ... more products
   ];
   ```

---

## Image Requirements

- **Format:** JPG, PNG, GIF
- **Size:** Max 5MB per image
- **Recommended dimensions:** 800x800px (square)
- **Aspect ratio:** 1:1 (square) works best

---

## Troubleshooting

### Images not showing?
- Check if server is running
- Verify image path is correct
- Check browser console for errors
- Ensure uploads folder exists: `server/uploads/`

### Upload fails?
- Check file size (must be under 5MB)
- Verify file format (JPG, PNG, GIF only)
- Check server logs for errors

---

## Quick Example

To replace the action camera image:

1. Go to Admin Panel → Products
2. Find "Action Camera 4K" (ID: 9)
3. Click "Edit"
4. Click on image upload area
5. Select your new image
6. Click "Update"

Done! Your new image is now live.
