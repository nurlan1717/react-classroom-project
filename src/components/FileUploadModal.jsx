import React, { useState } from 'react';
import { X, Upload, Image as ImageIcon, File } from 'lucide-react';

const FileUploadModal = ({ onClose, onUpload }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      }
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!file) return;

    setIsLoading(true);
    try {
     
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result);
        onClose();
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('error', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Upload File</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleUpload}>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
              accept="image/*,.pdf,.doc,.docx"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              {preview ? (
                <img src={preview} alt="Preview" className="max-h-40 mb-4" />
              ) : (
                <>
                  <Upload size={48} className="text-gray-400 mb-2" />
                  <p className="text-gray-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-gray-500">
                    Images, PDF, DOC (max 10MB)
                  </p>
                </>
              )}
            </label>
          </div>
          {file && (
            <div className="flex items-center gap-2 mb-4 p-2 bg-gray-50 rounded">
              {file.type.startsWith('image/') ? (
                <ImageIcon size={20} className="text-gray-500" />
              ) : (
                <File size={20} className="text-gray-500" />
              )}
              <span className="text-sm truncate">{file.name}</span>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!file || isLoading}
              className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
                (!file || isLoading) && 'opacity-50 cursor-not-allowed'
              }`}
            >
              {isLoading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FileUploadModal;