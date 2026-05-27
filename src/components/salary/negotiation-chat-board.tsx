import { motion, AnimatePresence } from 'framer-motion';
import { RecruiterArchetype, DialogueNode, UserChoice } from '@/types/salary';
import { Badge } from '@/components/ui/badge';
import { ShieldAlert, MessageSquare } from 'lucide-react';
import { useEffect, useRef } from 'react';

export interface ChatMessage {
  id: string;
  sender: 'recruiter' | 'user';
  text: string;
  timestamp: Date;
  nodeId?: string; // For tracing
  sentiment?: string; // Recruiter sentiment
}

interface NegotiationChatBoardProps {
  recruiter: RecruiterArchetype;
  messages: ChatMessage[];
  isTyping: boolean;
}

export function NegotiationChatBoard({
  recruiter,
  messages,
  isTyping
}: NegotiationChatBoardProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages or typing indicator appears
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-full bg-background relative overflow-hidden">
      {/* Chat Header */}
      <div className="h-14 border-b border-border/50 flex items-center px-6 shrink-0 bg-card/50 backdrop-blur-md absolute top-0 left-0 w-full z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="text-xl">{recruiter.avatar}</span>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-background" />
          </div>
          <div>
            <h2 className="font-semibold text-sm leading-tight">{recruiter.name}</h2>
            <p className="text-[10px] text-muted-foreground">{recruiter.company}</p>
          </div>
        </div>
        
        <div className="ml-auto flex items-center gap-2">
          <Badge variant="outline" className="text-[10px] bg-background">
            Live Session
          </Badge>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 pt-20 pb-6 scrollbar-hide space-y-6"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-60">
            <MessageSquare className="w-10 h-10 mb-3 opacity-30" />
            <p className="text-sm">Initiating connection with {recruiter.name}...</p>
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => {
            const isRecruiter = msg.sender === 'recruiter';
            
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex w-full ${isRecruiter ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex max-w-[85%] ${isRecruiter ? 'flex-row' : 'flex-row-reverse'} gap-3`}>
                  
                  {isRecruiter && (
                    <div className="w-8 h-8 rounded-full bg-card border border-border/50 flex items-center justify-center shrink-0 shadow-sm text-lg mt-1">
                      {recruiter.avatar}
                    </div>
                  )}

                  <div className={`flex flex-col ${isRecruiter ? 'items-start' : 'items-end'}`}>
                    {isRecruiter && msg.sentiment && (
                      <span className="text-[10px] text-muted-foreground mb-1 ml-1 flex items-center gap-1">
                        {msg.sentiment}
                      </span>
                    )}
                    
                    <div 
                      className={`p-3.5 sm:p-4 text-[13px] sm:text-sm leading-relaxed shadow-sm ${
                        isRecruiter 
                          ? 'bg-card border border-border/50 text-card-foreground rounded-2xl rounded-tl-sm' 
                          : 'bg-foreground text-background rounded-2xl rounded-tr-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-muted-foreground mt-1 opacity-70">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {isTyping && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex w-full justify-start"
            >
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-card border border-border/50 flex items-center justify-center shrink-0 shadow-sm text-lg mt-1">
                  {recruiter.avatar}
                </div>
                <div className="bg-card border border-border/50 rounded-2xl rounded-tl-sm p-3.5 shadow-sm flex items-center gap-1.5 h-[42px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
