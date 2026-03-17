import React, { type ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileNav } from './MobileNav';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <Header />
        <div className="p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
      <MobileNav />
    </div>
  );
};
