import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { DashboardPage } from '../features/dashboard/DashboardPage';
import { PracticePage } from '../features/practice/PracticePage';
import { ReviewPage } from '../features/review/ReviewPage';
import { FormularioPage } from '../features/formulario/FormularioPage';
import { MoleculasPage } from '../features/moleculas/MoleculasPage';

export function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/practica" element={<PracticePage />} />
          <Route path="/repaso" element={<ReviewPage />} />
          <Route path="/errores" element={<Navigate to="/repaso" replace />} />
          <Route path="/formulario" element={<FormularioPage />} />
          <Route path="/moleculas" element={<MoleculasPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
