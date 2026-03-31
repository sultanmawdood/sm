import React, { useState, useRef } from 'react';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  currentImage?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, currentImage }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string>(currentImage || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log('=== FILE UPLOAD DEBUG ===');
    console.log('File selected:', file.name);
    console.log('File type:', file.type);
    console.log('File size:', file.size, 'bytes');

    // Validate file type
    if (!file.type.startsWith('image/')) {
      console.error('File type validation failed:', file.type);
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      console.error('File size validation failed:', file.size);
      alert('Image size must be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
      };
      reader.readAsDataURL(file);

      // Upload to server
      const formData = new FormData();
      formData.append('image', file);

      const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';
      const uploadUrl = `${API_URL}/upload`;
      
      console.log('Uploading to:', uploadUrl);
      console.log('FormData created with image field');
      
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
        mode: 'cors',
      });

      console.log('Response received');
      console.log('Status:', response.status);
      console.log('Status Text:', response.statusText);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { error: errorText || 'Upload failed' };
        }
        
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Upload success:', data);
      
      const imageUrl = `${API_URL.replace('/api', '')}${data.imageUrl}`;
      console.log('Final image URL:', imageUrl);
      
      onImageUpload(imageUrl);
      alert('Image uploaded successfully!');
      
    } catch (error) {
      console.error('=== UPLOAD ERROR ===');
      console.error('Error type:', error instanceof Error ? error.constructor.name : typeof error);
      console.error('Error message:', error instanceof Error ? error.message : String(error));
      console.error('Full error:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Failed to upload image: ${errorMessage}`);
      setPreview(currentImage || '');
    } finally {
      setIsUploading(false);
      console.log('=== UPLOAD COMPLETE ===');
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleRemoveImage = () => {
    setPreview('');
    onImageUpload('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Product Image
      </label>
      
      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Product preview"
            className="w-full h-48 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 bg-white dark:bg-primary rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
        >
          <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <p className="text-gray-500 dark:text-gray-400 text-center">
            Click to upload image<br />
            <span className="text-sm">PNG, JPG, GIF up to 5MB</span>
          </p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {isUploading && (
        <div className="flex items-center justify-center py-2">
          <svg className="animate-spin h-5 w-5 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-sm text-gray-600 dark:text-gray-400">Uploading...</span>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;