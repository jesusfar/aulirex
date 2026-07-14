import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { PlatformLayout } from './PlatformLayout';
import { InicioPage } from '../features/inicio/InicioPage';
import { ComingSoonPage } from '../features/modulo/ComingSoonPage';
import { DashboardPage } from '../modules/ingreso-medicina/features/dashboard/DashboardPage';
import { PracticePage } from '../modules/ingreso-medicina/features/practice/PracticePage';
import { ReviewPage } from '../modules/ingreso-medicina/features/review/ReviewPage';
import { FormularioPage } from '../modules/ingreso-medicina/features/formulario/FormularioPage';
import { MoleculasPage } from '../modules/ingreso-medicina/features/moleculas/MoleculasPage';
import { SimulacroPage } from '../modules/ingreso-medicina/features/simulacro/SimulacroPage';
import { DiagnosticoPage } from '../modules/ingreso-medicina/features/diagnostico/DiagnosticoPage';
import { ComprensionPage } from '../modules/ingreso-medicina/features/comprension/ComprensionPage';
import { GendarmeriaLayout } from '../modules/ingreso-gendarmeria/features/GendarmeriaLayout';
import { DashboardPage as GendDashboardPage } from '../modules/ingreso-gendarmeria/features/dashboard/DashboardPage';
import { PracticePage as GendPracticePage } from '../modules/ingreso-gendarmeria/features/practice/PracticePage';
import { ReviewPage as GendReviewPage } from '../modules/ingreso-gendarmeria/features/review/ReviewPage';
import { FormularioPage as GendFormularioPage } from '../modules/ingreso-gendarmeria/features/formulario/FormularioPage';
import { DiagnosticoPage as GendDiagnosticoPage } from '../modules/ingreso-gendarmeria/features/diagnostico/DiagnosticoPage';
import { ComprensionPage as GendComprensionPage } from '../modules/ingreso-gendarmeria/features/comprension/ComprensionPage';
import { InstitucionalPage } from '../modules/ingreso-gendarmeria/features/institucional/InstitucionalPage';
import { RequisitosPage } from '../modules/ingreso-gendarmeria/features/requisitos/RequisitosPage';
import { LoginPage } from '../features/auth/LoginPage';
import { AdminLayout } from '../features/admin/AdminLayout';
import { QuestionsAdmin } from '../features/admin/QuestionsAdmin';
import { UsersAdmin } from '../features/admin/UsersAdmin';

// Módulo "Ingreso a Medicina": es la app original, ahora anidada bajo su slug.
const MEDICINA = 'ingreso-medicina';
const GENDARMERIA = 'ingreso-gendarmeria';

export function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        {/* Inicio: selector VHS a pantalla completa (sin chrome de plataforma) */}
        <Route path="/" element={<InicioPage />} />

        {/* Plataforma: login + placeholders de módulos */}
        <Route element={<PlatformLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/anatomia" element={<ComingSoonPage />} />
          <Route path="/residencia" element={<ComingSoonPage />} />
        </Route>

        {/* Modo admin (gate por rol dentro de AdminLayout) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="preguntas" replace />} />
          <Route path="preguntas" element={<QuestionsAdmin />} />
          <Route path="usuarios" element={<UsersAdmin />} />
        </Route>

        {/* Módulo Ingreso a Medicina */}
        <Route path={`/${MEDICINA}`} element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="practica" element={<PracticePage />} />
          <Route path="repaso" element={<ReviewPage />} />
          <Route path="errores" element={<Navigate to="../repaso" replace />} />
          <Route path="formulario" element={<FormularioPage />} />
          <Route path="moleculas" element={<MoleculasPage />} />
          <Route path="simulacro" element={<SimulacroPage />} />
          <Route path="diagnostico" element={<DiagnosticoPage />} />
          <Route path="comprension" element={<ComprensionPage />} />
        </Route>

        {/* Módulo Ingreso a Gendarmería (tema verde) */}
        <Route path={`/${GENDARMERIA}`} element={<GendarmeriaLayout />}>
          <Route index element={<GendDashboardPage />} />
          <Route path="practica" element={<GendPracticePage />} />
          <Route path="repaso" element={<GendReviewPage />} />
          <Route path="errores" element={<Navigate to="../repaso" replace />} />
          <Route path="diagnostico" element={<GendDiagnosticoPage />} />
          <Route path="comprension" element={<GendComprensionPage />} />
          <Route path="institucional" element={<InstitucionalPage />} />
          <Route path="requisitos" element={<RequisitosPage />} />
          <Route path="formulario" element={<GendFormularioPage />} />
        </Route>

        {/* Redirects de rutas planas viejas → módulo Medicina */}
        <Route path="/practica" element={<Navigate to={`/${MEDICINA}/practica`} replace />} />
        <Route path="/repaso" element={<Navigate to={`/${MEDICINA}/repaso`} replace />} />
        <Route path="/errores" element={<Navigate to={`/${MEDICINA}/repaso`} replace />} />
        <Route path="/formulario" element={<Navigate to={`/${MEDICINA}/formulario`} replace />} />
        <Route path="/moleculas" element={<Navigate to={`/${MEDICINA}/moleculas`} replace />} />
        <Route path="/simulacro" element={<Navigate to={`/${MEDICINA}/simulacro`} replace />} />
        <Route path="/diagnostico" element={<Navigate to={`/${MEDICINA}/diagnostico`} replace />} />
        <Route path="/comprension" element={<Navigate to={`/${MEDICINA}/comprension`} replace />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
