
import React, { useState, useRef } from 'react';
import { geminiService } from '../services/geminiService';
import { ChatMessage } from '../types';

const Assistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Bienvenido a la consulta visionaria de VIDA. ¿Cómo podemos integrar la naturaleza en tu próximo espacio hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input && !selectedImage) return;

    const userMsg: ChatMessage = { role: 'user', text: input, image: selectedImage || undefined };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setSelectedImage(null);
    setIsLoading(true);

    try {
      const response = await geminiService.generateArchitecturalConsultation(input || 'Analiza este espacio y sugiere mejoras orgánicas.', userMsg.image);
      setMessages(prev => [...prev, { role: 'model', text: response || 'Lo siento, no pude procesar esa visión.' }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: 'Error de conexión con el estudio. Inténtalo de nuevo.' }]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
      }, 100);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="ai-vision" className="min-h-screen py-24 flex flex-col items-center justify-center px-4">
      <div className="max-w-4xl w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden flex flex-col h-[70vh] shadow-2xl">
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <div>
            <h2 className="font-playfair text-2xl">Asistente Visionario</h2>
            <p className="text-xs text-white/50 tracking-widest uppercase">Motor de IA por Gemini</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl p-4 ${msg.role === 'user' ? 'bg-green-600/20 border border-green-500/30' : 'bg-white/5 border border-white/10'}`}>
                {msg.image && <img src={msg.image} alt="Upload" className="w-full h-48 object-cover rounded-lg mb-3" />}
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex space-x-2">
                <div className="w-2 h-2 bg-white/30 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-white/30 rounded-full animate-bounce [animation-delay:-.3s]" />
                <div className="w-2 h-2 bg-white/30 rounded-full animate-bounce [animation-delay:-.5s]" />
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-white/10 bg-black/20">
          <div className="flex flex-col gap-4">
            {selectedImage && (
              <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-green-500">
                <img src={selectedImage} className="w-full h-full object-cover" />
                <button onClick={() => setSelectedImage(null)} className="absolute top-0 right-0 bg-red-500 p-0.5 rounded-bl">
                   <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            )}
            <div className="flex gap-2">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all"
                title="Sube una foto de tu espacio"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
              </button>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Describe tu visión o pregunta..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:outline-none focus:border-green-500 transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="px-6 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white rounded-xl font-bold transition-all flex items-center gap-2"
              >
                <span>Enviar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Assistant;
