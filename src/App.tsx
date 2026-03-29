import { lazy, Suspense } from 'react';
import './App.css';

// Pages
const UsersPage = lazy(() => import('./pages/UsersPage'));

function App() {
  return (
    <div className='w-screen h-screen relative overflow-hidden text-white p-2 md:p-10 2xl:p-20'>
      {/* Fondo gradiente animado */}
      <div className="absolute inset-0 -z-10 animate-gradient-move bg-linear-to-br from-purple-800 via-indigo-700 to-cyan-600 opacity-70 blur-2xl" />
      <Suspense fallback={<div className='text-white text-center mt-20'>Loading...</div>}>
        <UsersPage />
      </Suspense>
    </div>
  );
}

export default App;
