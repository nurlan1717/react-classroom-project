import React from "react";


const Student = () => {
  return (
    <>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header with background image */}
        <div className="relative h-32 bg-slate-600 p-6">
          <div className="absolute top-4 right-4">
            <button className="text-white/80 hover:text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="6" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="12" cy="18" r="2" />
              </svg>
            </button>
          </div>
          <h2 className="text-2xl font-bold text-white">AzMP102</h2>
          <p className="text-white/80 text-sm mt-1">class room</p>
        </div>
        
        {/* Avatar */}
        <div className="relative px-6">
          <div className="absolute -top-8">
            <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center">
              <span className="text-2xl font-semibold text-white">C</span>
            </div>
          </div>
        </div>
        
        {/* Content area */}
        <div className="p-6 pt-12">
          {/* Empty state or content can go here */}
          <div className="h-32"></div>
          
          {/* Footer with icons */}
          <div className="flex items-center justify-end space-x-4 pt-4 border-t">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <Users className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <FolderOpen className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
    </>
  );
};

export default Student;
