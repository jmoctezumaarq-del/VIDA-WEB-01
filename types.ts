
export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'Residencial' | 'Corporativo' | 'Paisajismo' | 'Ecológico';
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  image?: string;
}
