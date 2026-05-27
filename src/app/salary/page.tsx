'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SCENARIOS, getDialogueFlow } from '@/lib/engines/salaryScenarios';
import { Scenario, RecruiterArchetype, DialogueNodeId, DialogueNode, UserChoice } from '@/types/salary';

import { ImmersiveSetup } from '@/components/salary/immersive-setup';
import { NegotiationChatBoard, ChatMessage } from '@/components/salary/negotiation-chat-board';
import { IntelligenceDashboard } from '@/components/salary/intelligence-dashboard';
import { ActionConsole } from '@/components/salary/action-console';
import { RotateCcw } from 'lucide-react';

export default function SalaryCommandCenter() {
  const [phase, setPhase] = useState<'setup' | 'negotiation' | 'outcome'>('setup');
  
  // Setup State
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [selectedRecruiter, setSelectedRecruiter] = useState<RecruiterArchetype | null>(null);
  
  // Negotiation State
  const [currentNodeId, setCurrentNodeId] = useState<DialogueNodeId>('intro');
  const [leverage, setLeverage] = useState(50);
  const [stress, setStress] = useState(30);
  const [currentBase, setCurrentBase] = useState(0);
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [actionsDisabled, setActionsDisabled] = useState(false);

  // Cached dialogue flow based on selected recruiter
  const dialogueFlow = useRef<Record<DialogueNodeId, DialogueNode> | null>(null);

  const startSimulation = () => {
    if (!selectedScenario || !selectedRecruiter) return;
    
    // Initialize state
    dialogueFlow.current = getDialogueFlow(selectedRecruiter);
    setLeverage(selectedRecruiter.baseLeverage);
    setStress(selectedRecruiter.pressureFrequency * 100);
    setCurrentBase(selectedRecruiter.initialOffer.base);
    
    setMessages([]);
    setPhase('negotiation');
    
    // Trigger initial message
    triggerRecruiterMessage('intro');
  };

  const triggerRecruiterMessage = (nodeId: DialogueNodeId) => {
    if (!dialogueFlow.current) return;
    const node = dialogueFlow.current[nodeId];
    
    setCurrentNodeId(nodeId);
    setActionsDisabled(true);
    setIsTyping(true);

    const delay = node.delayMs || 2500;

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'recruiter',
          text: node.recruiterMessage,
          timestamp: new Date(),
          nodeId: node.id,
          sentiment: node.recruiterSentiment
        }
      ]);
      setActionsDisabled(false);
    }, delay);
  };

  const handleChoice = (choice: UserChoice) => {
    // 1. Add user message
    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'user',
        text: choice.text,
        timestamp: new Date()
      }
    ]);

    // 2. Apply impacts
    setLeverage(prev => Math.max(0, Math.min(100, prev + choice.impact.leverageChange)));
    setStress(prev => Math.max(0, Math.min(100, prev + choice.impact.stressChange)));
    if (choice.impact.baseChange) {
      setCurrentBase(prev => prev + choice.impact.baseChange!);
    }

    // 3. Move to next node or outcome
    if (choice.nextNodeId === 'outcome') {
      setTimeout(() => setPhase('outcome'), 1000);
    } else {
      triggerRecruiterMessage(choice.nextNodeId as DialogueNodeId);
    }
  };

  const currentNode = dialogueFlow.current ? dialogueFlow.current[currentNodeId] : null;

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] lg:h-screen bg-background overflow-hidden relative">
      {/* Background Abstract Gradients */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald/5 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {phase !== 'setup' && (
        <div className="absolute top-4 right-4 z-50">
          <button
            onClick={() => setPhase('setup')}
            className="flex items-center gap-2 bg-background/80 backdrop-blur-md border border-border shadow-sm px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Abort
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {phase === 'setup' && (
          <motion.div key="setup" className="absolute inset-0 z-10 overflow-y-auto">
            <ImmersiveSetup 
              scenarios={SCENARIOS}
              selectedScenario={selectedScenario}
              selectedRecruiter={selectedRecruiter}
              onSelectScenario={setSelectedScenario}
              onSelectRecruiter={setSelectedRecruiter}
              onStart={startSimulation}
            />
          </motion.div>
        )}

        {phase === 'negotiation' && selectedRecruiter && currentNode && (
          <motion.div 
            key="negotiation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-10 flex flex-col lg:flex-row bg-transparent"
          >
            {/* Left/Main: Chat & Actions */}
            <div className="flex-1 flex flex-col min-w-0 h-full relative z-20 shadow-[10px_0_30px_-15px_rgba(0,0,0,0.05)] border-r border-border/40">
              <div className="flex-1 overflow-hidden relative">
                <NegotiationChatBoard 
                  recruiter={selectedRecruiter}
                  messages={messages}
                  isTyping={isTyping}
                />
              </div>
              <ActionConsole 
                choices={currentNode.choices}
                onSelectChoice={handleChoice}
                disabled={actionsDisabled || isTyping}
                thinkingMoment={!isTyping ? currentNode.thinkingMoment : undefined}
              />
            </div>

            {/* Right: Intelligence Dashboard */}
            <div className="w-full lg:w-[360px] xl:w-[400px] shrink-0 h-[40vh] lg:h-full bg-background/50 backdrop-blur-md z-10 relative">
              <IntelligenceDashboard 
                recruiter={selectedRecruiter}
                currentLeverage={leverage}
                stressLevel={stress}
                currentBase={currentBase}
              />
            </div>
          </motion.div>
        )}

        {phase === 'outcome' && selectedRecruiter && (
          <motion.div key="outcome" className="absolute inset-0 z-10 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="text-center max-w-lg bg-card border border-border shadow-2xl rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
              <h2 className="text-3xl font-bold tracking-tight mb-2">Negotiation Concluded</h2>
              <p className="text-muted-foreground mb-8">You successfully navigated the dialogue with {selectedRecruiter.name}.</p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-background border border-border/50 rounded-2xl p-4">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">Final Base</span>
                  <span className="text-2xl font-bold text-foreground">₹{currentBase.toFixed(1)}L</span>
                </div>
                <div className="bg-background border border-border/50 rounded-2xl p-4">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">Final Leverage</span>
                  <span className="text-2xl font-bold text-violet">{leverage}%</span>
                </div>
              </div>

              <button 
                onClick={() => setPhase('setup')}
                className="w-full py-4 bg-foreground text-background rounded-xl font-medium hover:bg-foreground/90 transition-all shadow-md active:scale-[0.98]"
              >
                Return to Command Center
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
