"use client";

import { useState } from "react";
import { ArrowLeft, Bell, Shield, Key, Moon, Globe, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <div className="flex flex-col h-full bg-gray-50/50 pb-24">
      <header className="flex items-center px-4 py-4 bg-white sticky top-0 z-10 border-b border-gray-100">
        <Link href="/profile" className="p-2 -ml-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight ml-2">Settings</h1>
      </header>

      <main className="flex-1 overflow-y-auto px-4 pt-6 pb-6 max-w-lg mx-auto w-full space-y-6">
        
        {/* Notifications */}
        <section>
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">Notifications</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                  <Bell size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Push Notifications</p>
                  <p className="text-xs text-gray-500">Alerts on your phone</p>
                </div>
              </div>
              <button 
                onClick={() => setPushEnabled(!pushEnabled)}
                className={`w-11 h-6 rounded-full relative transition-colors ${pushEnabled ? 'bg-primary' : 'bg-gray-200'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${pushEnabled ? 'left-5.5 translate-x-[20px]' : 'left-0.5'}`} style={{ transform: pushEnabled ? 'translateX(20px)' : 'translateX(0)' }}></div>
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                  <Globe size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Email Alerts</p>
                  <p className="text-xs text-gray-500">Job matches and updates</p>
                </div>
              </div>
              <button 
                onClick={() => setEmailEnabled(!emailEnabled)}
                className={`w-11 h-6 rounded-full relative transition-colors ${emailEnabled ? 'bg-primary' : 'bg-gray-200'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${emailEnabled ? 'left-5.5 translate-x-[20px]' : 'left-0.5'}`} style={{ transform: emailEnabled ? 'translateX(20px)' : 'translateX(0)' }}></div>
              </button>
            </div>
          </div>
        </section>

        {/* Account Details */}
        <section>
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">Account Options</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <button className="w-full flex items-center justify-between p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                  <Globe size={18} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-900">Language</p>
                  <p className="text-xs text-gray-500">English (US)</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                  <Shield size={18} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-900">Payment Methods</p>
                  <p className="text-xs text-gray-500">Manage cards & wallets</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </button>
          </div>
        </section>

        {/* Security & Privacy */}
        <section>
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">Security</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
                  <Key size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Two-Factor Auth</p>
                  <p className="text-xs text-gray-500">Extra account security</p>
                </div>
              </div>
              <button 
                onClick={() => setEmailEnabled(!emailEnabled)}
                className={`w-11 h-6 rounded-full relative transition-colors ${emailEnabled ? 'bg-primary' : 'bg-gray-200'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${emailEnabled ? 'left-5.5 translate-x-[20px]' : 'left-0.5'}`} style={{ transform: emailEnabled ? 'translateX(20px)' : 'translateX(0)' }}></div>
              </button>
            </div>
            
            <button className="w-full flex items-center justify-between p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                  <Key size={18} />
                </div>
                <p className="text-sm font-semibold text-gray-900">Change Password</p>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                  <Shield size={18} />
                </div>
                <p className="text-sm font-semibold text-gray-900">Privacy Policy</p>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </button>
          </div>
        </section>

        {/* Preferences */}
        <section>
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">Preferences</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                  <Moon size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Dark Mode</p>
                  <p className="text-xs text-gray-500">Easy on the eyes</p>
                </div>
              </div>
              <button 
                onClick={() => setDarkTheme(!darkTheme)}
                className={`w-11 h-6 rounded-full relative transition-colors ${darkTheme ? 'bg-gray-800' : 'bg-gray-200'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${darkTheme ? 'left-5.5 translate-x-[20px]' : 'left-0.5'}`} style={{ transform: darkTheme ? 'translateX(20px)' : 'translateX(0)' }}></div>
              </button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
