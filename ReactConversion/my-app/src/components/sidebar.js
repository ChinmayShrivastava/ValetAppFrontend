import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ children }) {
  return (
    <div>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        {/* SVG content */}
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 h-screen transition-transform -translate-x-full md:translate-x-0 w-1/5 min-w-auto"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#FFE4BC]">
          <ul className="space-y-2 font-medium">
            {/* ... other list items ... */}
            <li>
              <Link to="/" className="flex items-center p-2 text-gray-900 rounded-lg bg-[#0085FF] hover:bg-[#0061BA] group">
                {/* SVG content */}
                <span className="flex-1 ml-3 whitespace-nowrap text-white">New Note</span>
              </Link>
            </li>
            <li>
              <Link to="/documents" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                {/* SVG content */}
                <span className="flex-1 ml-3 whitespace-nowrap text-black">Documents</span>
              </Link>
            </li>
            <li>
              <Link to="/findnotes" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                {/* SVG content */}
                <span className="flex-1 ml-3 whitespace-nowrap text-black">Find Notes</span>
              </Link>
            </li>
            {/* ... more list items ... */}
            <li>
              <Link to="/login?logout=1" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                {/* SVG content */}
                <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
