import React from 'react';
import ReactMarkdown from 'react-markdown';
import { generateChatResponse } from '../services/geminiService';
import { Send, Shield, Zap } from 'lucide-react';
import { AsclepiusLogo } from '../components/Shared';
import clsx from 'clsx';
import { useLanguage } from '../App';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export const Chat = () => {
  const { language } = useLanguage();
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-Welcome Message
  React.useEffect(() => {
      if (messages.length === 0) {
          const welcomeText = language === 'bn' 
            ? "নমস্কার। আমি অ্যাসক্লেপিয়াস এআই (Asclepius AI)। আমি একটি শিক্ষামূলক মেডিকেল অ্যাসিস্ট্যান্ট। আমি কোনো ডাক্তার নই, তাই কোনো ঔষধের ডোজ বা ব্যক্তিগত চিকিৎসা পরামর্শ দিতে পারব না। তবে সাধারণ স্বাস্থ্য তথ্য দিয়ে সাহায্য করতে পারি।"
            : "Hello. I am Asclepius AI, your educational medical assistant architected by Team Curadex. I am not a doctor and cannot provide diagnoses or medication dosages. How can I assist with general health information today?";
          
          // Small delay for realism
          setTimeout(() => {
            setMessages([{ role: 'model', text: welcomeText }]);
          }, 500);
      }
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
        const historyForApi = messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
        const responseText = await generateChatResponse(historyForApi, userMsg, language);
        setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
        setMessages(prev => [...prev, { role: 'model', text: "Connection interruption. Please try again." }]);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col bg-surface/80 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden shadow-2xl mb-8">
       {/* Header */}
       <div className="p-4 border-b border-white/5 flex items-center justify-between bg-surfaceHighlight/50 backdrop-blur-md">
           <div className="flex items-center gap-3">
               <div className="relative">
                   <div className="w-10 h-10 bg-gradient-to-tr from-primary to-secondary rounded-xl flex items-center justify-center shadow-glow">
                       <AsclepiusLogo className="w-6 h-6 text-white" />
                   </div>
                   <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#05050A] rounded-full flex items-center justify-center">
                       <div className="w-2 h-2 bg-success rounded-full animate-pulse shadow-[0_0_8px_#10b981]"></div>
                   </div>
               </div>
               <div>
                   <h2 className="font-bold text-white text-sm">Asclepius AI</h2>
                   <p className="text-[10px] font-bold text-success uppercase tracking-widest">● Online • v2.5</p>
               </div>
           </div>
           <div className="px-3 py-1 rounded border border-white/10 bg-white/5 text-[10px] font-bold text-textSecondary uppercase tracking-widest hidden md:block">
               Secure Channel • Educational Only
           </div>
       </div>

       {/* Messages */}
       <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-[#0B0E14] to-[#05050A]">
           {messages.map((msg, i) => (
               <div key={i} className={clsx("flex animate-in fade-in slide-in-from-bottom-2 duration-300", msg.role === 'user' ? "justify-end" : "justify-start")}>
                   {msg.role === 'model' && (
                       <div className="w-8 h-8 rounded-lg bg-surfaceHighlight flex items-center justify-center mr-3 mt-1 shrink-0">
                           <AsclepiusLogo className="w-4 h-4" />
                       </div>
                   )}
                   <div className={clsx(
                       "max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-lg",
                       msg.role === 'user' 
                         ? "bg-surfaceHighlight border border-white/10 text-white rounded-tr-none" 
                         : "bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 text-white rounded-tl-none"
                   )}>
                       <ReactMarkdown>{msg.text}</ReactMarkdown>
                   </div>
               </div>
           ))}
           {loading && (
               <div className="flex justify-start">
                   <div className="w-8 h-8 rounded-lg bg-surfaceHighlight flex items-center justify-center mr-3 mt-1 shrink-0">
                        <AsclepiusLogo className="w-4 h-4 animate-spin" />
                   </div>
                   <div className="bg-surfaceHighlight border border-white/5 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center h-10">
                       <span className="w-1.5 h-1.5 bg-textSecondary rounded-full animate-bounce"></span>
                       <span className="w-1.5 h-1.5 bg-textSecondary rounded-full animate-bounce delay-100"></span>
                       <span className="w-1.5 h-1.5 bg-textSecondary rounded-full animate-bounce delay-200"></span>
                   </div>
               </div>
           )}
           <div ref={messagesEndRef} />
       </div>

       {/* Input */}
       <div className="p-4 bg-surfaceHighlight/30 border-t border-white/5 backdrop-blur-md">
           <div className="relative">
               <input 
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                   placeholder="Ask Asclepius AI..." 
                   className="w-full bg-surfaceHighlight/50 border border-white/5 rounded-2xl pl-12 pr-14 py-4 text-sm text-white focus:border-primary outline-none shadow-inner"
               />
               <div className="absolute left-4 top-1/2 -translate-y-1/2 text-textSecondary">
                   <Shield size={18} />
               </div>
               <button 
                   onClick={handleSend}
                   disabled={!input.trim()}
                   className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-surface border border-white/10 rounded-xl text-textSecondary hover:text-white hover:bg-white/10 transition-colors"
               >
                   <Send size={18} />
               </button>
           </div>
       </div>
    </div>
  );
};