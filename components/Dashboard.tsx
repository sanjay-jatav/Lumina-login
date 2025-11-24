import React from 'react';
import { User, LogOut, LayoutDashboard, Settings, User as UserIcon, Bell, ShieldCheck } from 'lucide-react';
import Button from './Button';

interface DashboardProps {
  user: { name: string; email: string } | null;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-400 rounded-lg shadow-sm" />
              <span className="text-xl font-bold text-slate-900">Lumina</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>
              <div className="h-8 w-px bg-slate-200 mx-2"></div>
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-slate-900">{user?.name || 'User'}</p>
                  <p className="text-xs text-slate-500">{user?.email || 'email@example.com'}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden border border-slate-200">
                  <img src={`https://picsum.photos/100/100?seed=${user?.email}`} alt="Avatar" className="w-full h-full object-cover"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Sidebar */}
          <div className="hidden md:block md:col-span-3 lg:col-span-2 space-y-1">
            <div className="space-y-1">
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-primary-700 bg-primary-50 rounded-lg">
                <LayoutDashboard size={18} />
                Dashboard
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                <UserIcon size={18} />
                Profile
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                <Settings size={18} />
                Settings
              </button>
            </div>
            
            <div className="pt-8">
              <Button variant="outline" fullWidth onClick={onLogout} className="border-red-200 text-red-600 hover:bg-red-50">
                <LogOut size={16} className="mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="md:col-span-9 lg:col-span-10 space-y-6">
            
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl shadow-primary-900/10">
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
              <p className="text-primary-100 max-w-2xl">
                Here is what's happening with your projects today. You have completed 85% of your weekly goals.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Total Projects', value: '12', trend: '+2.5%' },
                { label: 'Active Tasks', value: '24', trend: '-4.1%' },
                { label: 'Team Members', value: '8', trend: '+0.0%' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                    <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${stat.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {stat.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity Placeholder */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <h3 className="font-semibold text-slate-900">Recent Login Activity</h3>
                <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">View All</button>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                        <ShieldCheck size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">Successful login from Chrome on MacOS</p>
                        <p className="text-xs text-slate-500">Today at {10 + i}:30 AM • IP: 192.168.1.{i}</p>
                      </div>
                      <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Secure</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Logout (visible only on small screens) */}
            <div className="md:hidden">
              <Button variant="secondary" fullWidth onClick={onLogout} className="text-red-600">
                <LogOut size={16} className="mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;