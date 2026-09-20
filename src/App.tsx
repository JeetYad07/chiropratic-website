import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileStickyBar } from './components/layout/MobileStickyBar';
import { AppRoutes } from './routes/AppRoutes';

export function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 font-sans">
          <Header />
          <div className="flex-1">
            <AppRoutes />
          </div>
          <Footer />
          <MobileStickyBar />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
