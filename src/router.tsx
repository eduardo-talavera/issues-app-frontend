import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout';
import { DashboardView } from '@/views/DashboardView';
import { IssuesView } from '@/views/Issues/IssuesView';
import LoginView from '@/views/auth/LoginView';
import { AuthProvider } from './auth/AuthProvider';
import { PageNotFound } from './ui/PageNotFound';

export default function Router() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path='/' element={<DashboardView />} index />
            <Route path='/issues' element={<IssuesView />} />
          </Route>

          <Route path='/login' element={<LoginView />} />
          <Route path='/404' element={<PageNotFound />} />
          <Route path='/*' element={<Navigate to='/404' />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
