
import React, { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { generateChatResponse } from '../services/geminiService';
import { Send, Shield, Paperclip, X, Image as ImageIcon } from 'lucide-react';
import { AsclepiusLogo } from '../components/Shared';
import clsx from 'clsx';
import { useLanguage } from '../App';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  image?: string;
}

export const Chat = () => {
  const { language } = useLanguage();
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [attachment, setAttachment] = React.useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
            ? "নমস্কার। আমি অ্যাসক্লেপিয়াস এআই (Asclepius AI)। আমি তানভীর আহমেদ দ্বারা নির্মিত একটি মেডিকেল ইন্টেলিজেন্স সিস্টেম। আমি আপনার স্বাস্থ্য বিষয়ক প্রশ্নের উত্তর দিতে প্রস্তুত।"
            : "Greetings. I am **Asclepius AI**, an advanced medical intelligence system architected by **Tanvir Ahmmed**. \n\nI can assist you with:\n- Differential Diagnoses\n- Clinical Guidelines\n- Pharmacology & Mechanism of Action\n\nHow may I assist you with your clinical practice today?";
          
          setTimeout(() => {
            setMessages([{ role: 'model', text: welcomeText }]);
          }, 500);
      }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              setAttachment(reader.result as string);
          };
          reader.readAsDataURL(file);
      }
  };

  const handleSend = async () => {
    if (!input.trim() && !attachment) return;
    
    const userMsg = input;
    const userImg = attachment;
    
    setInput('');
    setAttachment(null);
    
    setMessages(prev => [...prev, { role: 'user', text: userMsg, image: userImg || undefined }]);
    setLoading(true);

    try {
        // Construct history. Note: We only send text history for now to save tokens/complexity, 
        // unless we want to maintain full multimodal context. 
        // For this implementation, we simply send the new image in the current turn.
        const historyForApi = messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
        
        const responseText = await generateChatResponse(historyForApi, userMsg, language, userImg || undefined);
        setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
        setMessages(prev => [...prev, { role: 'model', text: "Connection interruption. Please check your network and try again." }]);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100dvh-100px)] md:h-[calc(100vh-80px)] w-full max-w-5xl mx-auto flex flex-col bg-surface/80 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden shadow-2xl relative">
       {/* Header */}
       <div className="p-4 border-b border-white/5 flex items-center justify-between bg-surfaceHighlight/50 backdrop-blur-md shrink-0 z-20">
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
                   <h2 className="font-bold text-textPrimary text-sm">Asclepius AI</h2>
                   <p className="text-[10px] font-bold text-success uppercase tracking-widest">● Online • Tanvir Ahmmed</p>
               </div>
           </div>
           <div className="px-3 py-1 rounded border border-white/10 bg-white/5 text-[10px] font-bold text-textSecondary uppercase tracking-widest hidden md:block">
               Clinical Decision Support
           </div>
       </div>

       {/* Messages */}
       <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-surface custom-scrollbar">
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
                         ? "bg-surfaceHighlight border border-white/10 text-textPrimary rounded-tr-none" 
                         : "bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 text-textPrimary rounded-tl-none prose prose-invert prose-sm"
                   )}>
                       {msg.image && (
                           <div className="mb-3 rounded-lg overflow-hidden border border-white/10">
                               <img src={msg.image} alt="Attachment" className="max-w-full h-auto max-h-60" />
                           </div>
                       )}
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

       {/* Input Area */}
       <div className="p-4 bg-surfaceHighlight/30 border-t border-white/5 backdrop-blur-md shrink-0">
           {attachment && (
               <div className="mb-2 flex items-center gap-2 p-2 bg-surfaceHighlight rounded-lg w-fit border border-white/10">
                   <div className="w-8 h-8 bg-black/20 rounded flex items-center justify-center overflow-hidden">
                       <img src={attachment} className="w-full h-full object-cover" />
                   </div>
                   <span className="text-xs text-textSecondary">Image attached</span>
                   <button onClick={() => setAttachment(null)} className="p-1 hover:text-red-500 text-textSecondary"><X size={14} /></button>
               </div>
           )}
           
           <div className="relative">
               <input 
                   type="file"
                   hidden
                   ref={fileInputRef}
                   accept="image/*"
                   onChange={handleFileSelect}
               />
               
               <input 
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                   placeholder="Enter clinical query..." 
                   className="w-full bg-surfaceHighlight/80 border border-white/10 rounded-2xl pl-12 pr-24 py-4 text-sm text-textPrimary focus:border-primary focus:bg-surfaceHighlight outline-none shadow-inner transition-colors placeholder-textSecondary/50"
               />
               
               <div className="absolute left-4 top-1/2 -translate-y-1/2 text-textSecondary pointer-events-none">
                   <Shield size={18} />
               </div>

               <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                   <button 
                       onClick={() => fileInputRef.current?.click()}
                       className="p-2 text-textSecondary hover:text-primary transition-colors"
                       title="Attach Image"
                   >
                       <Paperclip size={18} />
                   </button>
                   <button 
                       onClick={handleSend}
                       disabled={!input.trim() && !attachment}
                       className="p-2 bg-primary/20 border border-primary/30 rounded-xl text-primary hover:text-white hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                       <Send size={18} />
                   </button>
               </div>
           </div>
       </div>
    </div>
  );
};
