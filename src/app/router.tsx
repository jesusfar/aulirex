import { lazy, Suspense, type ComponentType } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { PlatformLayout } from './PlatformLayout';
import { GendarmeriaLayout } from '../modules/ingreso-gendarmeria/features/GendarmeriaLayout';
import { AdminLayout } from '../features/admin/AdminLayout';
import { InicioPage } from '../features/inicio/InicioPage';

// Páginas cargadas de forma diferida (code-splitting): cada ruta queda en su
// propio chunk, así abrir un módulo no descarga ni parsea el otro. Los layouts
// se mantienen estáticos porque son el chrome inmediato.
const named = (load: () => Promise<Record<string, unknown>>, key: string) =>
  lazy(() => load().then((m) => ({ default: m[key] as ComponentType })));

const ComingSoonPage = named(() => import('../features/modulo/ComingSoonPage'), 'ComingSoonPage');
const LoginPage = named(() => import('../features/auth/LoginPage'), 'LoginPage');
const QuestionsAdmin = named(() => import('../features/admin/QuestionsAdmin'), 'QuestionsAdmin');
const UsersAdmin = named(() => import('../features/admin/UsersAdmin'), 'UsersAdmin');

// Ingreso a Medicina
const DashboardPage = named(() => import('../modules/ingreso-medicina/features/dashboard/DashboardPage'), 'DashboardPage');
const PracticePage = named(() => import('../modules/ingreso-medicina/features/practice/PracticePage'), 'PracticePage');
const ReviewPage = named(() => import('../modules/ingreso-medicina/features/review/ReviewPage'), 'ReviewPage');
const FormularioPage = named(() => import('../modules/ingreso-medicina/features/formulario/FormularioPage'), 'FormularioPage');
const MoleculasPage = named(() => import('../modules/ingreso-medicina/features/moleculas/MoleculasPage'), 'MoleculasPage');
const SimulacroPage = named(() => import('../modules/ingreso-medicina/features/simulacro/SimulacroPage'), 'SimulacroPage');
const DiagnosticoPage = named(() => import('../modules/ingreso-medicina/features/diagnostico/DiagnosticoPage'), 'DiagnosticoPage');
const ComprensionPage = named(() => import('../modules/ingreso-medicina/features/comprension/ComprensionPage'), 'ComprensionPage');

// Ingreso a Gendarmería
const GendDashboardPage = named(() => import('../modules/ingreso-gendarmeria/features/dashboard/DashboardPage'), 'DashboardPage');
const GendPracticePage = named(() => import('../modules/ingreso-gendarmeria/features/practice/PracticePage'), 'PracticePage');
const GendReviewPage = named(() => import('../modules/ingreso-gendarmeria/features/review/ReviewPage'), 'ReviewPage');
const GendFormularioPage = named(() => import('../modules/ingreso-gendarmeria/features/formulario/FormularioPage'), 'FormularioPage');
const GendDiagnosticoPage = named(() => import('../modules/ingreso-gendarmeria/features/diagnostico/DiagnosticoPage'), 'DiagnosticoPage');
const GendComprensionPage = named(() => import('../modules/ingreso-gendarmeria/features/comprension/ComprensionPage'), 'ComprensionPage');
const InstitucionalPage = named(() => import('../modules/ingreso-gendarmeria/features/institucional/InstitucionalPage'), 'InstitucionalPage');
const RequisitosPage = named(() => import('../modules/ingreso-gendarmeria/features/requisitos/RequisitosPage'), 'RequisitosPage');

const MEDICINA = 'ingreso-medicina';
const GENDARMERIA = 'ingreso-gendarmeria';

function PageFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center" aria-busy="true">
      <div className="size-8 animate-spin rounded-full border-2 border-white/15 border-t-white/70" />
    </div>
  );
}

export function AppRouter() {
  return (
    <HashRouter>
      <Suspense fallback={<PageFallback />}>
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
      </Suspense>
    </HashRouter>
  );
}
