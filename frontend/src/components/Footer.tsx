import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-200/50 border-t border-slate-200 py-6 px-4 md:px-12 flex flex-col md:flex-row items-center justify-between mt-auto w-full">
      <p className="text-slate-500 text-sm mb-4 md:mb-0">
        &copy; {new Date().getFullYear()} MSANTRI School Management System. All rights reserved.
      </p>
      <div className="flex items-center gap-6 text-sm text-slate-500">
        <a href="#" className="hover:text-slate-900 transition">Privacy Policy</a>
        <a href="#" className="hover:text-slate-900 transition">Terms of Service</a>
        <a href="#" className="hover:text-slate-900 transition">Support</a>
        <a href="#" className="hover:text-slate-900 transition">Contact Us</a>
      </div>
    </footer>
  );
};

export default Footer;
