# Product Image Management Guide

## Method 1: Upload via Admin Dashboard (Recommended)

1. **Go to Admin Dashboard**: `http://localhost:5173/admin/products`
2. **Login**: admin / admin123
3. **Add/Edit Product**: Click "Add Product" or "Edit" on existing product
4. **Upload Image**: Click the image upload area and select your image file
5. **Supported Formats**: PNG, JPG, GIF (max 5MB)
6. **Save**: The image will be stored and displayed immediately

## Method 2: Use Local Images Folder

1. **Add Images**: Place your product images in `public/images/products/`
2. **Use in Products**: Reference them as `/images/products/your-image.jpg`
3. **Example**: 
   ```javascript
   image: "/images/products/football-jersey.jpg"
   ```

## Method 3: Use External URLs

1. **Upload to Image Hosting**: Use services like:
   - Imgur
   - Cloudinary
   - AWS S3
   - Google Drive (public links)
2. **Get Direct URL**: Copy the direct image URL
3. **Use in Product**: Paste the URL in the image field

## Image Requirements

- **Format**: PNG, JPG, GIF, WebP
- **Size**: Maximum 5MB
- **Dimensions**: Recommended 800x800px (square)
- **Quality**: High resolution for best display

## Examples of Good Product Images

- Clear, well-lit photos
- White or neutral background
- Product centered in frame
- Multiple angles (front, back, side)
- Detail shots for features

## Tips for Best Results

1. **Consistent Sizing**: Use same dimensions for all products
2. **Good Lighting**: Natural light or professional lighting
3. **Clean Background**: White or transparent backgrounds work best
4. **High Quality**: Use high-resolution images that scale well
5. **Optimize**: Compress images to reduce loading times