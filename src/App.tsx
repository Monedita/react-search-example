import { lazy, Suspense } from 'react';
import './App.css';

// Pages
const UsersPage = lazy(() => import('./pages/UsersPage'));

function App() {
  return (
    <div className='w-screen h-screen overflow-hidden bg-black text-white p-2 md:p-10 2xl:p-20'>
      <Suspense fallback={<div className='text-white text-center mt-20'>Loading...</div>}>
        <UsersPage />
      </Suspense>
    </div>
  );
}

export default App;
