
import React, { useState, useEffect } from 'react';
import ParticlesBG from './components/ParticlesBG';
import Assistant from './components/Assistant';
import { Project } from './types';

const PROJECTS: Project[] = [
  { id: '1', title: 'Residencial Zen', description: 'Fusión de piedra local y madera reciclada en el corazón del bosque.', category: 'Residencial', image: 'https://picsum.photos/seed/zen/800/600' },
  { id: '2', title: 'Eco-Office Vertical', description: 'Sistemas de captación de agua y fachadas vivas para el entorno urbano.', category: 'Corporativo', image: 'https://picsum.photos/seed/office/800/600' },
  { id: '3', title: 'Humedal Restaurado', description: 'Intervención paisajística para devolver el equilibrio a un ecosistema dañado.', category: 'Paisajismo', image: 'https://picsum.photos/seed/water/800/600' },
  { id: '4', title: 'Pabellón Bioma', description: 'Estructura modular biomimética inspirada en el crecimiento de las semillas.', category: 'Ecológico', image: 'https://picsum.photos/seed/bio/800/600' },
];

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999]">
        <div className="text-center">
          <h1 className="font-playfair text-3xl tracking-[10px] animate-pulse">VIDA</h1>
          <p className="text-[10px] mt-4 tracking-[3px] text-white/30 uppercase">Estructura Viva</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <ParticlesBG />

      {/* Navigation */}
      <nav className="fixed top-0 w-full p-8 md:p-12 flex justify-between items-center z-50 mix-blend-difference">
        <div className="text-2xl font-bold tracking-tighter">VIDA</div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-12 text-xs font-bold tracking-widest uppercase">
          <a href="#home" className="hover:text-green-500 transition-colors">Inicio</a>
          <a href="#philosophy" className="hover:text-green-500 transition-colors">Filosofía</a>
          <a href="#projects" className="hover:text-green-500 transition-colors">Proyectos</a>
          <a href="#ai-vision" className="hover:text-green-500 transition-colors">IA Visionaria</a>
          <a href="#contact" className="hover:text-green-500 transition-colors">Contacto</a>
        </div>

        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5"
        >
          <div className={`w-8 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-8 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-8 h-0.5 bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <a href="#home" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-playfair italic">Inicio</a>
        <a href="#philosophy" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-playfair italic">Filosofía</a>
        <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-playfair italic">Proyectos</a>
        <a href="#ai-vision" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-playfair italic">IA Visionaria</a>
        <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-playfair italic text-green-500">Contacto</a>
      </div>

      <main className="relative z-10">
        
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex flex-col justify-center px-10 md:px-24">
          <div className="max-w-5xl">
            <h1 className="font-playfair text-6xl md:text-9xl leading-[0.9] animate-in fade-in slide-in-from-bottom-12 duration-1000">
              Arquitectura <br /> 
              <span className="italic text-green-500">Orgánica</span>
            </h1>
            <p className="mt-8 text-lg md:text-2xl text-white/60 max-w-2xl font-light animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              Donde la rigidez del hormigón se rinde ante la fluidez del paisaje. Creamos espacios que no solo ocupan terreno, sino que respiran con él.
            </p>
            <div className="mt-12 flex gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
              <a href="#projects" className="px-8 py-4 border border-white hover:bg-white hover:text-black transition-all uppercase tracking-widest text-xs font-bold">Explorar Portafolio</a>
              <a href="#ai-vision" className="px-8 py-4 bg-green-600 hover:bg-green-500 transition-all uppercase tracking-widest text-xs font-bold">Consultar IA</a>
            </div>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
            <div className="w-px h-24 bg-gradient-to-b from-green-500 to-transparent animate-pulse" />
          </div>
        </section>

        {/* Philosophy Section */}
        <section id="philosophy" className="min-h-[70vh] flex items-center justify-center px-10 bg-white/5 backdrop-blur-sm py-24">
          <div className="max-w-4xl text-center">
            <h2 className="font-playfair text-4xl md:text-6xl leading-tight bg-gradient-to-r from-white via-white/80 to-white/40 bg-clip-text text-transparent italic">
              "No construimos sobre la tierra,<br className="hidden md:block"/> construimos con ella."
            </h2>
            <div className="w-24 h-px bg-green-500 mx-auto mt-12" />
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-10 md:px-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <p className="text-green-500 text-xs font-bold tracking-[5px] uppercase mb-4">Portafolio</p>
              <h2 className="font-playfair text-5xl md:text-7xl">Nuestra Huella</h2>
            </div>
            <p className="text-white/40 max-w-sm text-sm">
              Cada proyecto es una respuesta única al ecosistema que lo rodea, equilibrando funcionalidad y biodiversidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROJECTS.map((project) => (
              <div key={project.id} className="group relative overflow-hidden bg-white/5 border border-white/10 rounded-sm">
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  />
                </div>
                <div className="p-6">
                  <p className="text-[10px] text-green-500 font-bold tracking-widest uppercase mb-2">{project.category}</p>
                  <h3 className="font-playfair text-xl mb-3">{project.title}</h3>
                  <p className="text-xs text-white/50 leading-relaxed">{project.description}</p>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-2 bg-green-600 rounded-full">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI Section Integration */}
        <Assistant />

        {/* Contact Section */}
        <section id="contact" className="py-32 px-10 md:px-24 border-t border-white/10 bg-black/40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-playfair text-5xl md:text-8xl mb-8 leading-none">Iniciemos el <br /><span className="text-green-500">cambio.</span></h2>
              <p className="text-white/60 mb-12 max-w-md">
                Estamos listos para transformar tu idea en una estructura viva. Visítanos en nuestro estudio en Bogotá o agenda una sesión virtual.
              </p>
              <div className="space-y-4 text-sm tracking-widest uppercase font-bold">
                <p className="flex items-center gap-4"><span className="w-2 h-2 bg-green-500 rounded-full" /> Bogotá, Colombia</p>
                <p className="flex items-center gap-4"><span className="w-2 h-2 bg-green-500 rounded-full" /> info@vida-sas.com</p>
                <p className="flex items-center gap-4"><span className="w-2 h-2 bg-green-500 rounded-full" /> +57 300 000 0000</p>
              </div>
            </div>
            
            <div className="bg-white/5 p-8 md:p-12 rounded-2xl border border-white/10 backdrop-blur-xl">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40">Nombre</label>
                    <input type="text" className="w-full bg-white/5 border-b border-white/20 p-2 focus:outline-none focus:border-green-500 transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40">Email</label>
                    <input type="email" className="w-full bg-white/5 border-b border-white/20 p-2 focus:outline-none focus:border-green-500 transition-colors" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40">Mensaje</label>
                  <textarea rows={4} className="w-full bg-white/5 border-b border-white/20 p-2 focus:outline-none focus:border-green-500 transition-colors resize-none" />
                </div>
                <button className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-green-500 hover:text-white transition-all">Enviar Propuesta</button>
              </form>
            </div>
          </div>
        </section>

      </main>

      <footer className="py-12 px-10 md:px-24 border-t border-white/5 text-[10px] text-white/30 tracking-[3px] uppercase flex flex-col md:flex-row justify-between gap-6">
        <div>© 2025 VIDA S.A.S | ARQUITECTURA & PAISAJISMO</div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white">Instagram</a>
          <a href="#" className="hover:text-white">LinkedIn</a>
          <a href="#" className="hover:text-white">Behance</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
