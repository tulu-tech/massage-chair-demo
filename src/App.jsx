import React, { useState } from 'react';
// import LoginScreen from './screens/LoginScreen'; // TODO: re-enable later
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
import './App.css';

// Default user while login is disabled
const DEFAULT_USER = {
  id: 'demo-user',
  name: 'Demo Rep',
  role: 'admin',
  storeId: null,
  storeLocation: 'Orlando Showroom',
};

export default function App() {
  const [stage, setStage] = useState('DASHBOARD'); 
  const [authUser, setAuthUser] = useState(DEFAULT_USER);

  const [questionQueue, setQuestionQueue] = useState([...coreQuestions]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [intelligence, setIntelligence] = useState(null);
  const [leadData, setLeadData] = useState(null);
  const [medicalConsent, setMedicalConsent] = useState(null);
  const [repData, setRepData] = useState(null);
  const [currentLeadId, setCurrentLeadId] = useState(null);

  // TODO: Re-enable auth/session logic later

  const handleLogout = () => {
    // TODO: Re-enable real logout later
    console.log('Logout disabled — login screen removed for now');
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



  const currentQuestion = questionQueue[currentIdx];

  return (
    <div className="app-container">
      <div className="bg-glow-1"></div>
      <div className="bg-glow-2"></div>
      
      {/* LOGIN screen disabled — will re-enable later */}
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
