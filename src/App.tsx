import { useEffect } from 'react';
import { AppRouter } from './app/router';
import { initAuth } from './lib/auth';

function App() {
  // Inicializa el estado de auth (no-op si Supabase no está configurado).
  useEffect(() => initAuth(), []);
  return <AppRouter />;
}

export default App;
