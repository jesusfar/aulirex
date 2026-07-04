import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { DashboardPage } from '../features/dashboard/DashboardPage';
import { PracticePage } from '../features/practice/PracticePage';
import { ReviewPage } from '../features/review/ReviewPage';
import { ErrorNotebookPage } from '../features/errors/ErrorNotebookPage';

export function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/practica" element={<PracticePage />} />
          <Route path="/repaso" element={<ReviewPage />} />
          <Route path="/errores" element={<ErrorNotebookPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
