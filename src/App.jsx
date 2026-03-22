import React, { useState, useEffect } from 'react';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import ConsentScreen from './screens/ConsentScreen';
import LeadCaptureScreen from './screens/LeadCaptureScreen';
import QuestionScreen from './screens/QuestionScreen';
import CustomerMatchScreen from './screens/CustomerMatchScreen';
import OutputScreen from './screens/OutputScreen';
import RepPostDemoScreen from './screens/RepPostDemoScreen';

import { coreQuestions, branches, fitQuestion } from './data/questions';
import { calculateBranchTarget, calculateFinalIntelligence } from './store/scoringLogic';
import { sendToGoogleSheets } from './services/googleSheets';
import { saveLeadRecord } from './services/db';
import { isSupabaseConfigured, getSession, signOut } from './services/supabase';
import './App.css';

export default function App() {
  const [stage, setStage] = useState('LOGIN'); 
  const [authUser, setAuthUser] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(true);

  const [questionQueue, setQuestionQueue] = useState([...coreQuestions]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [intelligence, setIntelligence] = useState(null);
  const [leadData, setLeadData] = useState(null);
  const [medicalConsent, setMedicalConsent] = useState(null);
  const [repData, setRepData] = useState(null);
  const [currentLeadId, setCurrentLeadId] = useState(null);

  // ── Session Persistence: Auto-login on page refresh ──
  useEffect(() => {
    async function checkSession() {
      if (isSupabaseConfigured()) {
        try {
          const user = await getSession();
          if (user) {
            setAuthUser(user);
            setStage('DASHBOARD');
          }
        } catch (err) {
          console.error('Session check failed:', err);
        }
      }
      setSessionLoading(false);
    }
    checkSession();
  }, []);

  const handleLogin = (user) => {
    setAuthUser(user);
    setStage('DASHBOARD');
  };

  const handleLogout = async () => {
    await signOut();
    setAuthUser(null);
    setStage('LOGIN');
  };

  const handleNewConsult = () => {
    setStage('WELCOME');
  };
  
  const handleStartConsult = () => setStage('CONSENT');
  
  const handleConsentAccept = (consentData) => {
    setMedicalConsent(consentData);
    setStage('LEAD');
  };
  
  const handleLeadSubmit = (data) => {
    setLeadData(data);
    setQuestionQueue([...coreQuestions]);
    setCurrentIdx(0);
    setAnswers([]);
    setStage('QUESTIONS');
  };

  const handleAnswer = async (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    let nextQueue = [...questionQueue];

    // Branch Injection Logic
    if (currentIdx === coreQuestions.length - 1) {
       const branchKey = calculateBranchTarget(newAnswers);
       const branchQs = branches[branchKey] || [];
       nextQueue = [...coreQuestions, ...branchQs, fitQuestion];
       setQuestionQueue(nextQueue);
    }

    if (currentIdx + 1 < nextQueue.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      const results = calculateFinalIntelligence(newAnswers);
      setIntelligence(results);

      // Save Initial Pending Record
      const pendingRecord = {
        customer: leadData,
        medicalConsent: medicalConsent,
        repName: authUser?.name,
        repId: authUser?.id,
        storeId: authUser?.storeId,
        storeLocation: authUser?.storeLocation,
        temperature: 'Pending Demo',
        laneName: results?.demoLane,
        boardStatus: 'Demo Pending',
        date: new Date().toISOString(),
        answers: newAnswers.map(a => a.text),
        intelligence: results,
        repNotes: null
      };
      const savedId = await saveLeadRecord(pendingRecord);
      setCurrentLeadId(savedId);

      setStage('PRE_OUTPUT'); 
    }
  };

  const handleBeginDemo = () => {
    setStage('REP_FORM');
  };

  const handleRepSubmit = async (data) => {
    setRepData(data);
    setStage('FINAL_OUTPUT');

    const dbRecord = {
      id: currentLeadId,
      supabaseId: currentLeadId,
      customer: leadData,
      medicalConsent: medicalConsent,
      repName: authUser?.name,
      repId: authUser?.id,
      storeId: authUser?.storeId,
      storeLocation: authUser?.storeLocation,
      temperature: data.temperature,
      laneName: intelligence?.demoLane,
      boardStatus: data.didPurchase ? 'Closed Won' : 'Demo Completed',
      date: new Date().toISOString(),
      answers: answers.map(a => a.text),
      intelligence: intelligence,
      repNotes: data
    };
    await saveLeadRecord(dbRecord);

    await sendToGoogleSheets({
      stage: 'POST_DEMO',
      repIdentity: authUser,
      store: authUser?.storeLocation,
      customer: leadData,
      intelligence: intelligence,
      repNotes: data,
      answers: answers.map(a => a.text),
      date: new Date().toISOString()
    });
  };

  const handleRestart = () => {
    setStage('DASHBOARD');
    setQuestionQueue([...coreQuestions]);
    setCurrentIdx(0);
    setAnswers([]);
    setIntelligence(null);
    setLeadData(null);
    setMedicalConsent(null);
    setRepData(null);
    setCurrentLeadId(null);
  };

  const handleResumeDemo = (lead) => {
     setLeadData(lead.customer);
     setIntelligence(lead.intelligence);
     setAnswers(lead.answers ? lead.answers.map(text => ({text})) : []);
     setCurrentLeadId(lead.id || lead.supabaseId);
     setStage('REP_FORM');
  };

  // Show loading screen while checking session
  if (sessionLoading) {
    return (
      <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="bg-glow-1"></div>
        <div className="bg-glow-2"></div>
        <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
          <div style={{ width: '40px', height: '40px', border: '3px solid var(--glass-border)', borderTop: '3px solid var(--accent-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }}></div>
          <p>Loading session...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questionQueue[currentIdx];

  return (
    <div className="app-container">
      <div className="bg-glow-1"></div>
      <div className="bg-glow-2"></div>
      
      {stage === 'LOGIN' && <LoginScreen onLogin={handleLogin} />}
      {stage === 'DASHBOARD' && <DashboardScreen user={authUser} onNewConsult={handleNewConsult} onLogout={handleLogout} onResumeDemo={handleResumeDemo} />}
      {stage === 'WELCOME' && <WelcomeScreen onNext={handleStartConsult} />}
      {stage === 'CONSENT' && <ConsentScreen onAccept={handleConsentAccept} />}
      {stage === 'LEAD' && <LeadCaptureScreen onNext={handleLeadSubmit} />}
      {stage === 'QUESTIONS' && currentQuestion && (
        <QuestionScreen 
          question={currentQuestion} 
          currentStep={currentIdx + 1} 
          totalSteps={questionQueue.length} 
          onAnswer={handleAnswer} 
        />
      )}
      {stage === 'PRE_OUTPUT' && (
        <CustomerMatchScreen results={intelligence} leadData={leadData} onBeginDemo={handleBeginDemo} />
      )}
      {stage === 'REP_FORM' && (
        <RepPostDemoScreen results={intelligence} onSubmit={handleRepSubmit} />
      )}
      {stage === 'FINAL_OUTPUT' && (
        <OutputScreen results={intelligence} leadData={leadData} answers={answers} repData={repData} onRestart={handleRestart} onBeginDemo={handleBeginDemo} />
      )}
    </div>
  );
}
