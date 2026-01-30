
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `Actúa como un arquitecto y paisajista de clase mundial del estudio VIDA. 
Tu filosofía se basa en la "Arquitectura Orgánica": integrar estructuras humanas con el entorno natural de forma fluida.
Ayuda a los usuarios a conceptualizar espacios, elegir materiales sostenibles y mejorar la biodiversidad en sus proyectos.
Sé poético pero profesional. Si te envían una imagen, analízala y sugiere cómo "VIDA" podría transformarla en un espacio orgánico.`;

export class GeminiService {
  private ai: any;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateArchitecturalConsultation(prompt: string, imageBase64?: string) {
    try {
      const parts: any[] = [{ text: prompt }];
      
      if (imageBase64) {
        parts.push({
          inlineData: {
            mimeType: 'image/jpeg',
            data: imageBase64.split(',')[1] || imageBase64
          }
        });
      }

      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts },
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.8,
        }
      });

      return response.text;
    } catch (error) {
      console.error("Error in consultation:", error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();
