import React, { useState, useRef, useEffect } from 'react';

// --- ICONS ---
const Icons = {
  Plus: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>,
  Settings: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
  DownloadCloud: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m8 17 4 4 4-4"/></svg>,
  CheckCircle: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>,
  Clock: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-600"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Calendar: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>,
  Trash: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>,
  Search: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Sort: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>,
  Pen: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>,
  User: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Wrench: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  Parts: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 12h6"/><path d="M9 16h6"/><path d="M9 8h6"/></svg>,
  FileText: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>,
  X: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
  Printer: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>,
  Save: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
  Wifi: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h.01"/><path d="M2 12.859a16.343 16.343 0 0 1 8-5.858"/><path d="M14.859 7.001a16.343 16.343 0 0 1 8 5.858"/><path d="M4.929 16.071a9.998 9.998 0 0 1 6.071-3.07"/><path d="M13.001 13.001a9.998 9.998 0 0 1 6.071 3.07"/><path d="M8.5 19a4.5 4.5 0 0 1 7 0"/></svg>,
  Refresh: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>,
  Lock: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  LogOut: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
};

// --- Login Page ---
function LoginPage({ onLogin, scriptUrl }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [status, setStatus] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('loading');

        const callbackName = 'login_cb_' + Math.round(100000 * Math.random());
        window[callbackName] = (data) => {
            delete window[callbackName];
            if(document.body.contains(script)) document.body.removeChild(script);
            if (data.result === 'success') {
                setStatus('success');
                setTimeout(() => onLogin(data.user, rememberMe), 500);
            } else {
                setStatus('error');
            }
        };

        const script = document.createElement('script');
        script.onerror = () => {
            setStatus('error');
            delete window[callbackName];
            if(document.body.contains(script)) document.body.removeChild(script);
        };

        const separator = scriptUrl.includes('?') ? '&' : '?';
        script.src = `${scriptUrl}${separator}callback=${callbackName}&action=login&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&t=${Date.now()}`;
        document.body.appendChild(script);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4" dir="rtl">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                     <h2 className="text-3xl font-black text-gray-900 tracking-wider mb-2">ONE ROBOTIX</h2>
                     <p className="text-gray-500">התחברות למערכת שירות</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">שם משתמש</label>
                        <div className="relative">
                            <div className="absolute top-3 right-3 text-gray-400"><Icons.User /></div>
                            <input type="text" required value={username} onChange={e => setUsername(e.target.value)} className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="הכנס שם משתמש" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">סיסמה</label>
                        <div className="relative">
                            <div className="absolute top-3 right-3 text-gray-400"><Icons.Lock /></div>
                            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="הכנס סיסמה" />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <input id="remember-me" type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer" />
                        <label htmlFor="remember-me" className="mr-2 block text-sm text-gray-900 cursor-pointer">זכור אותי במכשיר זה</label>
                    </div>
                    {status === 'error' && <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">שם משתמש או סיסמה שגויים</div>}
                    <button type="submit" disabled={status === 'loading'} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-zinc-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition disabled:opacity-50">
                        {status === 'loading' ? 'בודק נתונים...' : 'התחבר למערכת'}
                    </button>
                </form>
            </div>
        </div>
    );
}

// --- Main App Component ---
export default function App() {
  const [user, setUser] = useState(null); 
  const [showAdminModal, setShowAdminModal] = useState(false); 
  const [adminInput, setAdminInput] = useState(''); 
  const ADMIN_CODE = "1234";

  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('appSettings');
    const targetUrl = 'https://script.google.com/macros/s/AKfycbzpCjIMK4ylHrwF5XnpmjJoTF9gQpu2ELjpCFPA8KzUFbQxUVXX2oZl3wjxyHyvtvx4/exec';
    if (savedSettings) { try { return JSON.parse(savedSettings); } catch(e) {} }
    return { googleScriptUrl: targetUrl, autoSync: true, debugMode: false };
  });

  const [view, setView] = useState('list'); 
  const [reports, setReports] = useState([]);
  const [currentReport, setCurrentReport] = useState(null);
  const [syncStatus, setSyncStatus] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const formRef = useRef(null);
  const [formDataForSync, setFormDataForSync] = useState(null);

  useEffect(() => {
      const savedUser = localStorage.getItem('service_user');
      if (savedUser) {
          try { 
              const parsedUser = JSON.parse(savedUser);
              if (parsedUser && parsedUser.username) { setUser(parsedUser); } 
              else { localStorage.removeItem('service_user'); }
          } catch(e) { localStorage.removeItem('service_user'); }
      }
  }, []);

  useEffect(() => { localStorage.setItem('appSettings', JSON.stringify(settings)); }, [settings]);

  useEffect(() => {
    if (settings.googleScriptUrl && settings.autoSync) { importFromGoogleSheets(); }
  }, []);

  useEffect(() => {
      if (formDataForSync && formRef.current) {
          formRef.current.submit();
          setSyncStatus('success');
          if (!settings.debugMode) {
            setTimeout(() => {
                setSyncStatus(null);
                setFormDataForSync(null);
                if (formDataForSync.action !== 'delete') { setTimeout(importFromGoogleSheets, 2500); }
            }, 2000);
          }
      }
  }, [formDataForSync, settings.debugMode]);

  const handleLoginSuccess = (userData, remember) => {
      setUser(userData);
      if (remember) { localStorage.setItem('service_user', JSON.stringify(userData)); }
  };

  const handleLogout = () => {
      setUser(null);
      localStorage.removeItem('service_user');
      window.location.reload();
  };

  const handleAdminCheck = (e) => {
      e.preventDefault();
      if (adminInput === ADMIN_CODE) {
          setShowAdminModal(false);
          setAdminInput('');
          setView('settings');
      } else {
          alert('קוד שגוי!');
          setAdminInput('');
      }
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const syncToGoogleSheets = (reportData, action = 'upsert') => {
    if (!settings.googleScriptUrl) return;
    setSyncStatus('loading');
    const partsString = reportData.partsReplaced ? reportData.partsReplaced.map(p => p.name).join(', ') : '';
    setFormDataForSync({ ...reportData, action: action, partsReplaced: partsString, totalPrice: 0 });
  };

  const deleteFromGoogleSheets = (id) => {
    if (!settings.googleScriptUrl) return;
    setSyncStatus('loading');
    setFormDataForSync({ id: id, action: 'delete' });
  };

  const importFromGoogleSheets = async () => {
    if (!settings.googleScriptUrl) return;
    setSyncStatus('import-loading');
    const callbackName = 'jsonp_cb_' + Math.round(100000 * Math.random());
    const script = document.createElement('script');
    const timeoutId = setTimeout(() => {
         if(window[callbackName]) {
             delete window[callbackName];
             if(document.body.contains(script)) document.body.removeChild(script);
             setSyncStatus('import-error');
             setTimeout(() => setSyncStatus(null), 4000);
         }
    }, 15000);
    window[callbackName] = (data) => {
        clearTimeout(timeoutId);
        delete window[callbackName];
        if(document.body.contains(script)) document.body.removeChild(script);
        if (Array.isArray(data)) {
            const incomingReports = data.map(parseSheetRowToReport);
            setReports(incomingReports.sort((a,b) => new Date(b.date) - new Date(a.date)));
            setSyncStatus('import-success');
        } else { setSyncStatus('import-error'); }
        setTimeout(() => setSyncStatus(null), 3000);
    };
    script.onerror = () => {
        clearTimeout(timeoutId);
        delete window[callbackName];
        if (document.body.contains(script)) document.body.removeChild(script);
        setSyncStatus('import-error');
        setTimeout(() => setSyncStatus(null), 3000);
    };
    const separator = settings.googleScriptUrl.includes('?') ? '&' : '?';
    script.src = `${settings.googleScriptUrl}${separator}callback=${callbackName}&t=${Date.now()}`;
    document.body.appendChild(script);
  };

  const parseSheetRowToReport = (row) => {
      const partsString = row.partsReplaced || "";
      const partsReplaced = partsString.split(',').map(p => {
          const nameOnly = p.replace(/\s*\(\d+\)$/, '').trim();
          return nameOnly ? { name: nameOnly } : null;
      }).filter(Boolean);
      return {
          id: String(row.id), 
          date: row.date,
          startTime: '09:00', endTime: '10:00',
          clientName: row.clientName, clientAddress: row.clientAddress,
          deviceModel: row.deviceModel, problemDescription: row.problemDescription,
          workDescription: row.workDescription, partsReplaced: partsReplaced,
          status: row.status,
          technicianName: row.technicianName || '',
      };
  };

  const handleNewReport = () => {
    setCurrentReport({
      id: String(Date.now()),
      date: new Date().toISOString().split('T')[0],
      startTime: getCurrentTime(), 
      endTime: '', clientName: '', clientAddress: '',
      deviceModel: '', problemDescription: '', workDescription: '',
      partsReplaced: [], status: 'pending', 
      technicianName: user.name || '' 
    });
    setView('form');
  };

  const handleEditReport = (report) => { setCurrentReport(report); setView('form'); };
  const handleSaveReport = (reportData) => {
    const existingIndex = reports.findIndex(r => r.id === reportData.id);
    let newReports;
    if (existingIndex >= 0) { newReports = [...reports]; newReports[existingIndex] = reportData; } 
    else { newReports = [reportData, ...reports]; }
    setReports(newReports);
    if (settings.googleScriptUrl && settings.autoSync) { syncToGoogleSheets(reportData, 'upsert'); }
    setView('list');
  };
  const handleDeleteClick = (id, e) => { e.stopPropagation(); setDeleteConfirm(id); };
  const performDelete = () => {
      if (deleteConfirm) {
        setReports(reports.filter(r => r.id !== deleteConfirm));
        if (settings.googleScriptUrl && settings.autoSync) { deleteFromGoogleSheets(deleteConfirm); }
        setDeleteConfirm(null);
      }
  };
  const hardReset = () => {
      if(confirm('פעולה זו תאפס את הגדרות האפליקציה ותנסה להתחבר מחדש. להמשיך?')) {
          localStorage.removeItem('appSettings');
          localStorage.removeItem('serviceReports');
          localStorage.removeItem('service_user');
          window.location.reload();
      }
  };

  if (!user) { return <LoginPage onLogin={handleLoginSuccess} scriptUrl={settings.googleScriptUrl} />; }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans" dir="rtl">
      {!settings.debugMode && (
          <>
            <iframe name="hidden_iframe" id="hidden_iframe" style={{display: 'none'}}></iframe>
            <form ref={formRef} action={settings.googleScriptUrl} method="post" target="hidden_iframe" style={{display: 'none'}}>
                {formDataForSync && Object.keys(formDataForSync).map(key => (<input key={key} type="hidden" name={key} value={formDataForSync[key] || ''} />))}
            </form>
          </>
      )}
      {showAdminModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm text-center">
                <div className="mx-auto w-12 h-12 bg-zinc-900 text-white rounded-full flex items-center justify-center mb-4"><Icons.Lock /></div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">גישה למנהלים בלבד</h3>
                <p className="text-gray-500 mb-6 text-sm">אנא הזן קוד גישה לכניסה להגדרות</p>
                <form onSubmit={handleAdminCheck}>
                    <input type="password" autoFocus value={adminInput} onChange={(e) => setAdminInput(e.target.value)} className="w-full text-center text-2xl tracking-widest p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-zinc-900 outline-none mb-6 font-mono" placeholder="****" maxLength={6} />
                    <div className="flex gap-3 justify-center">
                        <button type="button" onClick={() => {setShowAdminModal(false); setAdminInput('');}} className="px-5 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-lg w-full">ביטול</button>
                        <button type="submit" className="px-5 py-2.5 bg-zinc-900 text-white font-bold rounded-lg w-full">אישור</button>
                    </div>
                </form>
            </div>
        </div>
      )}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm text-center">
                <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4"><Icons.Trash /></div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">למחוק את הדוח?</h3>
                <div className="flex gap-3 justify-center mt-6">
                    <button onClick={() => setDeleteConfirm(null)} className="px-5 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-lg">ביטול</button>
                    <button onClick={performDelete} className="px-5 py-2.5 bg-red-600 text-white font-bold rounded-lg">מחק דוח</button>
                </div>
            </div>
        </div>
      )}
      <nav className="bg-zinc-900 text-white shadow-xl print:hidden sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 space-x-reverse cursor-pointer" onClick={() => setView('list')}>
            <div className="flex flex-col">
                <span className="text-xl font-bold tracking-wider leading-none">ONE ROBOTIX</span>
                <span className="text-[10px] text-zinc-400 tracking-[0.2em]">SERVICE</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
              {view === 'list' && (
                <>
                    <span className="text-xs text-zinc-400 ml-2 hidden md:inline">שלום, {user.name}</span>
                    <button onClick={importFromGoogleSheets} className="text-zinc-400 hover:text-white p-2 rounded-full relative" title="רענן">
                       <Icons.DownloadCloud />
                       {syncStatus === 'import-loading' && <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>}
                    </button>
                    <button onClick={handleNewReport} className="bg-blue-600 text-white pl-4 pr-3 py-2 rounded-full font-medium flex items-center shadow-lg hover:bg-blue-500 text-sm">
                        <span className="ml-2"><Icons.Plus /></span><span>דוח חדש</span>
                    </button>
                </>
              )}
              <button onClick={() => setShowAdminModal(true)} className={`p-2 rounded-full hover:bg-zinc-800 ${view === 'settings' ? 'bg-zinc-800 text-blue-400' : 'text-zinc-400'}`}><Icons.Settings /></button>
              <button onClick={handleLogout} className="p-2 rounded-full hover:bg-red-900 text-zinc-400 hover:text-white" title="התנתק"><Icons.LogOut /></button>
          </div>
        </div>
      </nav>
      {syncStatus && (
        <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full shadow-2xl z-50 flex items-center gap-3 text-white font-medium transition-all animate-fade-in-down ${
            syncStatus.includes('error') ? 'bg-red-600' : syncStatus.includes('success') ? 'bg-green-600' : 'bg-blue-600'
        }`}>
            {syncStatus === 'loading' && <span>⏳ שולח...</span>}
            {syncStatus === 'success' && <span>✅ נשלח בהצלחה!</span>}
            {syncStatus === 'error' && <span>❌ שגיאה בשליחה.</span>}
            {syncStatus === 'import-loading' && <span>⏳ טוען נתונים...</span>}
            {syncStatus === 'import-success' && <span>✅ הנתונים נטענו!</span>}
            {syncStatus === 'import-error' && <span>❌ שגיאת טעינה. נסה לרענן.</span>}
        </div>
      )}
      <main className="max-w-5xl mx-auto p-4 md:p-6">
        {view === 'list' && <Dashboard reports={reports} onEdit={(r) => {setCurrentReport(r); setView('form')}} onDelete={handleDeleteClick} />}
        {view === 'form' && <ReportForm initialData={currentReport} onSave={handleSaveReport} onCancel={() => setView('list')} onPreview={(d) => { setCurrentReport(d); setView('preview'); }} />}
        {view === 'preview' && <PrintPreview data={currentReport} onEdit={() => setView('form')} />}
        {view === 'settings' && <SettingsPage settings={settings} onSave={(newSettings) => { setSettings(newSettings); setView('list'); }} onCancel={() => setView('list')} onHardReset={hardReset} />}
      </main>
    </div>
  );
}

function SettingsPage({ settings, onSave, onCancel, onHardReset }) {
    const [localSettings, setLocalSettings] = useState(settings);
    const [testStatus, setTestStatus] = useState(null);
    const testConnection = () => {
        setTestStatus('testing');
         const callbackName = 'jsonp_test_' + Math.round(10000 * Math.random());
         window[callbackName] = (data) => {
             delete window[callbackName];
             if(document.body.contains(script)) document.body.removeChild(script);
             setTestStatus('success');
         };
         const script = document.createElement('script');
         const separator = localSettings.googleScriptUrl.includes('?') ? '&' : '?';
         script.src = `${localSettings.googleScriptUrl}${separator}callback=${callbackName}&t=${Date.now()}`;
         script.onerror = () => {
             setTestStatus('error');
             delete window[callbackName];
             if(document.body.contains(script)) document.body.removeChild(script);
         };
         document.body.appendChild(script);
    };
    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 flex items-center text-gray-800"><Icons.Settings /><span className="mr-3">הגדרות מערכת</span></h2>
            <div className="space-y-8">
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <h3 className="font-bold text-blue-900 mb-4 flex items-center text-lg"><Icons.Settings /><span className="mr-2">חיבור לגוגל שיטס</span></h3>
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">כתובת הסקריפט (Web App URL)</label>
                        <input type="text" value={localSettings.googleScriptUrl} onChange={(e) => setLocalSettings(prev => ({...prev, googleScriptUrl: e.target.value}))} className="w-full p-3 border border-blue-200 rounded-lg text-left ltr bg-white text-sm font-mono focus:ring-2 focus:ring-blue-500 outline-none shadow-sm" dir="ltr" />
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <input type="checkbox" id="autoSync" checked={localSettings.autoSync} onChange={(e) => setLocalSettings(prev => ({...prev, autoSync: e.target.checked}))} className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                            <label htmlFor="autoSync" className="text-gray-700 font-medium cursor-pointer">סנכרון אוטומטי</label>
                        </div>
                        <div className="flex items-center gap-3 pt-4 border-t border-blue-200/50">
                            <input type="checkbox" id="debugMode" checked={localSettings.debugMode} onChange={(e) => setLocalSettings(prev => ({...prev, debugMode: e.target.checked}))} className="w-5 h-5 text-red-500 rounded focus:ring-red-500" />
                            <label htmlFor="debugMode" className="text-red-700 font-medium cursor-pointer">מצב דיבאג (הצג מנגנון נסתר)</label>
                        </div>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                         <button onClick={testConnection} className="flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-white border border-blue-200 text-blue-700 hover:bg-blue-50">
                            <Icons.Wifi /> <span className="mr-2">בדיקת חיבור</span>
                            {testStatus === 'testing' && '...'} {testStatus === 'success' && '✅ תקין'} {testStatus === 'error' && '❌ שגיאה'}
                        </button>
                        <button onClick={onHardReset} className="flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-red-50 border border-red-200 text-red-700 hover:bg-red-100">⚠️ איפוס מלא</button>
                    </div>
                </div>
            </div>
            <div className="mt-10 flex justify-end gap-3 border-t pt-6">
                <button onClick={onCancel} className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition">ביטול</button>
                <button onClick={() => onSave(localSettings)} className="px-8 py-2.5 bg-zinc-900 text-white font-bold rounded-lg hover:bg-black shadow-lg">שמור הגדרות</button>
            </div>
        </div>
    );
}

function Dashboard({ reports, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [sortBy, setSortBy] = useState('dateDesc'); 
  const [showFilters, setShowFilters] = useState(false); // State for collapsing filters

  const processedReports = reports.filter(report => {
        const matchesSearch = (report.clientName || '').toLowerCase().includes(searchTerm.toLowerCase()) || (report.clientAddress || '').toLowerCase().includes(searchTerm.toLowerCase());
        const reportDate = report.date;
        const matchesStart = dateRange.start ? reportDate >= dateRange.start : true;
        const matchesEnd = dateRange.end ? reportDate <= dateRange.end : true;
        return matchesSearch && matchesStart && matchesEnd;
    }).sort((a, b) => {
        if (sortBy === 'dateDesc') return new Date(b.date) - new Date(a.date);
        if (sortBy === 'dateAsc') return new Date(a.date) - new Date(b.date);
        if (sortBy === 'name') return a.clientName.localeCompare(b.clientName);
        return 0;
    });

  return (
    <div className="space-y-8">
      {/* Collapsible Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300">
          <button onClick={() => setShowFilters(!showFilters)} className="w-full p-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors">
              <span className="font-bold text-gray-700 flex items-center gap-2"><Icons.Search /> חיפוש וסינון</span>
              <span className="text-blue-600 text-sm font-medium">{showFilters ? 'הסתר אפשרויות' : 'הצג אפשרויות'}</span>
          </button>
          
          {showFilters && (
            <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6 items-end border-t border-gray-100 animate-fade-in-down">
                <div className="md:col-span-1">
                    <label className="text-xs font-bold text-gray-500 mb-2 block tracking-wide">חיפוש חופשי</label>
                    <div className="relative">
                        <div className="absolute top-3 right-3 text-gray-400"><Icons.Search /></div>
                        <input type="text" placeholder="לקוח, סניף..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pr-10 pl-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition" />
                    </div>
                </div>
                <div>
                    <label className="text-xs font-bold text-gray-500 mb-2 block tracking-wide">מתאריך</label>
                    <input type="date" value={dateRange.start} onChange={(e) => setDateRange(prev => ({...prev, start: e.target.value}))} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition text-gray-600" />
                </div>
                <div>
                    <label className="text-xs font-bold text-gray-500 mb-2 block tracking-wide">עד תאריך</label>
                    <input type="date" value={dateRange.end} onChange={(e) => setDateRange(prev => ({...prev, end: e.target.value}))} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition text-gray-600" />
                </div>
                <div>
                    <label className="text-xs font-bold text-gray-500 mb-2 block tracking-wide">מיון לפי</label>
                    <div className="relative">
                        <div className="absolute top-3 right-3 text-gray-400"><Icons.Sort /></div>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full pr-10 pl-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition appearance-none cursor-pointer bg-white">
                            <option value="dateDesc">תאריך (חדש לישן)</option>
                            <option value="dateAsc">תאריך (ישן לחדש)</option>
                            <option value="name">שם לקוח (א-ת)</option>
                        </select>
                    </div>
                </div>
            </div>
          )}
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h2 className="text-3xl font-bold text-gray-800">דוחות שירות</h2>
            <span className="text-gray-500 text-sm mt-1 block">נמצאו {processedReports.length} רשומות במערכת</span>
        </div>
      </div>

      <div className="grid gap-4">
        {processedReports.map(report => (
          <div key={report.id} onClick={() => onEdit(report)} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition cursor-pointer flex justify-between items-center group relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-blue-500 transition-colors"></div>
            <div className="flex items-start space-x-5 space-x-reverse">
              <div className={`p-3 rounded-full ${report.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                {report.status === 'completed' ? <Icons.CheckCircle /> : <Icons.Clock />}
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-700 transition">
                  {report.clientName}
                  {report.clientAddress && <span className="font-normal text-gray-500 text-base">, {report.clientAddress}</span>}
                </h3>
                <p className="text-gray-500 text-sm mb-2">{report.deviceModel}</p>
                <div className="flex items-center text-gray-400 text-xs mt-1 space-x-4 space-x-reverse bg-gray-50 px-2 py-1 rounded inline-block">
                    <span className="flex items-center gap-1"><Icons.Calendar /> {report.date}</span>
                    <span className="w-px h-3 bg-gray-300"></span>
                    <span className="flex items-center gap-1 text-gray-500"> {report.technicianName}</span>
                </div>
              </div>
            </div>
            <button onClick={(e) => onDelete(report.id, e)} className="text-gray-300 hover:text-red-500 p-3 rounded-full hover:bg-red-50 transition opacity-0 group-hover:opacity-100">
                <Icons.Trash />
            </button>
          </div>
        ))}
        {processedReports.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                <div className="text-gray-300 mb-4 flex justify-center"><Icons.Search /></div>
                <p className="text-gray-500 font-medium">לא נמצאו דוחות תואמים לסינון.</p>
                <button onClick={() => {setSearchTerm(''); setDateRange({start:'', end:''});}} className="text-blue-600 text-sm mt-2 hover:underline">נקה סינון</button>
            </div>
        )}
      </div>
    </div>
  );
}

function ReportForm({ initialData, onSave, onCancel, onPreview }) {
  const [formData, setFormData] = useState(initialData);
  const [newPartName, setNewPartName] = useState('');

  const handleChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); };
  const handleAddPart = () => { if (!newPartName) return; const updatedParts = [...(formData.partsReplaced || []), { name: newPartName }]; setFormData(prev => ({ ...prev, partsReplaced: updatedParts })); setNewPartName(''); };
  const removePart = (index) => { const updatedParts = formData.partsReplaced.filter((_, i) => i !== index); setFormData(prev => ({ ...prev, partsReplaced: updatedParts })); };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden max-w-5xl mx-auto">
      <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center"><h2 className="font-bold text-xl text-gray-800 flex items-center gap-2"><Icons.Pen /> עריכת דוח שירות</h2><span className="text-xs font-mono bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-bold tracking-wide">#{formData.id.toString().slice(-6)}</span></div>
      
      <div className="p-8 space-y-10">
        <section>
          <h3 className="text-blue-600 font-bold mb-5 flex items-center border-b pb-2 text-lg"><span className="ml-2"><Icons.User /></span> פרטי לקוח</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"> {/* Responsive: 1 col mobile, 2 col large */}
              <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">שם הלקוח</label>
                  <input type="text" name="clientName" value={formData.clientName} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 focus:bg-white" placeholder="שם מלא / חברה" />
              </div>
              <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">סניף</label>
                  <input type="text" name="clientAddress" value={formData.clientAddress} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 focus:bg-white" />
              </div>
              <div className="grid grid-cols-3 gap-4 col-span-1 lg:col-span-2">
                  <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">תאריך</label>
                      <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
                  </div>
                  <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">התחלה</label>
                      <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
                  </div>
                  <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">סיום</label>
                      <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
                  </div>
              </div>
          </div>
        </section>

        <section>
          <h3 className="text-blue-600 font-bold mb-5 flex items-center border-b pb-2 text-lg"><span className="ml-2"><Icons.Wrench /></span> ציוד ותקלה</h3>
          <div className="space-y-6">
              <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">דגם המכשיר</label>
                  <input type="text" name="deviceModel" value={formData.deviceModel} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition bg-gray-50 focus:bg-white" />
              </div>
              <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">תיאור התקלה (תלונת לקוח)</label>
                  <textarea name="problemDescription" value={formData.problemDescription} onChange={handleChange} rows="2" className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition bg-gray-50 focus:bg-white resize-none" />
              </div>
              <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">פירוט העבודה שבוצעה</label>
                  <textarea name="workDescription" value={formData.workDescription} onChange={handleChange} rows="4" className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition bg-gray-50 focus:bg-white resize-none" />
              </div>
          </div>
        </section>

        <section>
          <h3 className="text-blue-600 font-bold mb-5 flex items-center border-b pb-2 text-lg"><span className="ml-2"><Icons.Parts /></span> חלקים וחיוב</h3>
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
              <div className="flex gap-4 mb-4 items-end">
                  <div className="flex-grow">
                      <label className="text-xs font-bold text-gray-500 mb-1 block">שם חלק</label>
                      <input type="text" value={newPartName} onChange={(e) => setNewPartName(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none" placeholder="לדוגמה: ספק כוח" />
                  </div>
                  <button onClick={handleAddPart} className="bg-blue-600 text-white p-2.5 rounded-lg hover:bg-blue-700 transition shadow-sm"><Icons.Plus /></button>
              </div>
              
              <div className="space-y-2">
                  {formData.partsReplaced && formData.partsReplaced.length > 0 ? (
                      formData.partsReplaced.map((part, idx) => (
                          <div key={idx} className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200 text-sm shadow-sm">
                              <span className="font-medium text-gray-800">{part.name}</span>
                              <div className="flex items-center gap-4">
                                  <button onClick={() => removePart(idx)} className="text-gray-400 hover:text-red-500 transition"><Icons.X /></button>
                              </div>
                          </div>
                      ))
                  ) : <div className="text-center text-gray-400 text-sm py-2 italic">לא נוספו חלקים</div>}
              </div>
          </div>
        </section>

        <section>
             <h3 className="text-blue-600 font-bold mb-5 flex items-center border-b pb-2 text-lg"><span className="ml-2"><Icons.FileText /></span> אישור וסיום</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-2">שם המטמיע</label>
                     <input type="text" name="technicianName" value={formData.technicianName} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">סטטוס קריאה</label>
                    <div className="relative">
                        <select name="status" value={formData.status} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg outline-none bg-white appearance-none focus:ring-2 focus:ring-blue-500">
                            <option value="pending">🟠 בטיפול / פתוח</option>
                            <option value="completed">🟢 הושלם / סגור</option>
                        </select>
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"><Icons.Sort /></div>
                    </div>
                </div>
             </div>
        </section>
      </div>

      <div className="bg-gray-50 p-6 flex justify-between items-center sticky bottom-0 border-t border-gray-200 z-10">
        <button onClick={onCancel} className="text-gray-600 font-bold px-6 py-3 hover:bg-gray-200 rounded-lg transition">ביטול</button>
        <div className="flex gap-3">
            <button onClick={() => onPreview(formData)} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold flex items-center transition shadow-md active:scale-95">
                <span className="ml-2"><Icons.Printer /></span> תצוגה מקדימה
            </button>
            <button onClick={() => onSave(formData)} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold flex items-center shadow-lg transition active:scale-95 transform hover:-translate-y-0.5">
                <span className="ml-2"><Icons.Save /></span> שמור דוח
            </button>
        </div>
      </div>
    </div>
  );
}

function PrintPreview({ data, onEdit }) {
    const handlePrint = () => window.print();
    return (
        <div className="bg-white text-black min-h-screen">
            <style>{`
                @media print {
                    @page { size: A4; margin: 0; }
                    body { margin: 0; -webkit-print-color-adjust: exact; }
                    .print-container { width: 210mm; min-height: 297mm; padding: 20mm; margin: 0 auto; page-break-inside: avoid; transform: scale(0.95); transform-origin: top center; }
                }
            `}</style>
            <div className="mb-8 flex justify-between items-center print:hidden bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm max-w-[210mm] mx-auto"><button onClick={onEdit} className="text-gray-600 hover:text-black font-bold flex items-center"><span className="ml-1">→</span> חזרה לעריכה</button><button onClick={handlePrint} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold flex items-center hover:bg-blue-700 shadow transition"><span className="ml-2"><Icons.Printer /></span> הדפס / שמור כ-PDF</button></div>
            <div className="print-container max-w-[210mm] mx-auto bg-white min-h-[297mm] p-12 shadow-2xl print:shadow-none print:w-full print:max-w-none print:p-0 border border-gray-200 print:border-none relative">
                
                <div className="flex justify-between items-start border-b-4 border-black pb-6 mb-8">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">דוח שירות טכני</h1>
                        <div className="mt-2 flex items-center gap-3"><span className="text-gray-500 font-medium">מספר דוח:</span><span className="bg-gray-100 px-3 py-1 rounded font-mono font-bold text-lg">#{data.id}</span></div>
                    </div>
                    <div className="text-left flex flex-col items-end">
                        <h2 className="text-3xl font-black uppercase tracking-widest text-gray-800">One | Robotix</h2>
                        <div className="text-sm text-gray-500 font-medium mt-1 text-right leading-relaxed" dir="ltr"><p>Industrial Automation Solutions</p><p>www.onerobotix.co.il</p></div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-12 mb-10 text-sm"><div className="space-y-4"><h3 className="font-bold text-gray-900 border-b border-gray-200 pb-2 mb-3 text-lg flex items-center"><span className="ml-2"><Icons.User /></span> פרטי לקוח</h3><div className="grid grid-cols-3 gap-y-3"><span className="text-gray-500 font-medium">שם הלקוח:</span><span className="col-span-2 font-bold text-lg text-gray-900">{data.clientName}</span><span className="text-gray-500 font-medium">סניף:</span><span className="col-span-2 text-gray-800">{data.clientAddress}</span></div></div><div className="space-y-4"><h3 className="font-bold text-gray-900 border-b border-gray-200 pb-2 mb-3 text-lg flex items-center"><span className="ml-2"><Icons.Clock /></span> פרטי קריאה</h3><div className="grid grid-cols-3 gap-y-3"><span className="text-gray-500 font-medium">תאריך:</span><span className="col-span-2 font-bold text-gray-900">{data.date}</span><span className="text-gray-500 font-medium">שעות עבודה:</span><span className="col-span-2 font-mono bg-gray-50 inline-block px-2 rounded">{data.startTime} - {data.endTime}</span><span className="text-gray-500 font-medium">שם המטמיע:</span><span className="col-span-2 text-gray-800">{data.technicianName}</span><span className="text-gray-500 font-medium">סטטוס:</span><span className={`col-span-2 font-bold px-2 rounded w-fit ${data.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>{data.status === 'completed' ? 'הושלם' : 'בטיפול'}</span></div></div></div>
                <div className="mb-8 bg-gray-50 p-6 rounded-xl border border-gray-100 print:bg-transparent print:p-0 print:border-y print:rounded-none print:border-gray-200 print:py-4"><h3 className="font-bold text-gray-900 mb-3 flex items-center"><span className="ml-2"><Icons.Wrench /></span> פרטי ציוד</h3><div className="flex gap-4 text-sm"><span className="text-gray-500 font-medium">דגם המכשיר:</span><span className="font-bold text-gray-900 text-lg">{data.deviceModel}</span></div></div>
                <div className="mb-10 space-y-6"><div><h3 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wide text-gray-500">תיאור התקלה</h3><div className="text-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm min-h-[60px] text-gray-800 leading-relaxed">{data.problemDescription}</div></div><div><h3 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wide text-gray-500">פירוט העבודה שבוצעה</h3><div className="text-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm min-h-[80px] text-gray-800 leading-relaxed whitespace-pre-line">{data.workDescription}</div></div></div>
                <div className="mb-12"><h3 className="font-bold text-gray-900 mb-3 text-lg border-b-2 border-gray-800 pb-1 inline-block">חלקים שהוחלפו</h3><table className="w-full text-sm border-collapse"><thead><tr className="bg-gray-100 border-b border-gray-200 print:bg-gray-50"><th className="text-right p-3 font-bold text-gray-700">תיאור פריט</th></tr></thead><tbody>{data.partsReplaced && data.partsReplaced.length > 0 ? (data.partsReplaced.map((part, i) => (<tr key={i} className="border-b border-gray-100"><td className="p-3 text-gray-800">{part.name}</td></tr>))) : (<tr><td className="p-4 text-center text-gray-400 italic bg-gray-50 rounded">לא נרשמו חלקים</td></tr>)}</tbody></table></div>
                
                <div className="absolute bottom-6 right-0 left-0 text-center border-t border-gray-100 pt-4"><p className="text-xs text-gray-400 font-medium tracking-widest uppercase">One Robotix - Advanced Automation Service</p><p className="text-[10px] text-gray-300 mt-1">Generated by ServicePro</p></div>
            </div>
        </div>
    );
}
