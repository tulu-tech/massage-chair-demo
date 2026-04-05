import React, { useState } from 'react';
import DashboardScreen from './screens/DashboardScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import ConsentScreen from './screens/ConsentScreen';
import LeadCaptureScreen from './screens/LeadCaptureScreen';
import QuestionScreen from './screens/QuestionScreen';
import CustomerMatchScreen from './screens/CustomerMatchScreen';
import GuidedDemoScreen from './screens/GuidedDemoScreen';
import RepPostDemoScreen from './screens/RepPostDemoScreen';
import OutputScreen from './screens/OutputScreen';

import { coreQuestions, frictionBranches } from './data/questions';
import { calculateBranchTarget, calculateFinalIntelligence } from './store/scoringLogic';
import { calculateFinalDecision } from './store/finalDecisionEngine';
import { sendToGoogleSheets } from './services/googleSheets';
import { saveLeadRecord } from './services/db';
import './App.css';

// ── Default user (login disabled) ──
const DEFAULT_USER = {
  id: 'demo-user',
  name: 'Demo Rep',
  role: 'admin',
  storeId: null,
  storeLocation: 'Orlando Showroom',
};

/*
  State Machine:
  DASHBOARD → WELCOME → CONSENT → LEAD → QUESTIONS →
  LIVE_MATCH → GUIDED_DEMO → REP_POST_DEMO → FINAL_OUTPUT → DASHBOARD
*/

export default function App() {
  const [stage, setStage] = useState('DASHBOARD');
  const [authUser] = useState(DEFAULT_USER);

  // Discovery flow state
  const [questionQueue, setQuestionQueue] = useState([...coreQuestions]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [intelligence, setIntelligence] = useState(null);

  // Lead / consent state
  const [leadData, setLeadData] = useState(null);
  const [consentData, setConsentData] = useState(null);

  // Post-demo state
  const [repData, setRepData] = useState(null);
  const [finalDecision, setFinalDecision] = useState(null);
  const [currentLeadId, setCurrentLeadId] = useState(null);

  // ── Navigation Handlers ──

  const handleNewConsult = () => setStage('WELCOME');
  const handleStartConsult = () => setStage('CONSENT');

  const handleConsentAccept = (consent) => {
    setConsentData(consent);
    setStage('LEAD');
  };

  const handleLeadSubmit = (data) => {
    setLeadData(data);
    setQuestionQueue([...coreQuestions]);
    setCurrentIdx(0);
    setAnswers([]);
    setStage('QUESTIONS');
  };

  // ── Question Flow with Dynamic Branching ──

  const handleAnswer = async (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    let nextQueue = [...questionQueue];

    // After core questions complete → inject friction branch
    if (currentIdx === coreQuestions.length - 1) {
      const branchKey = calculateBranchTarget(newAnswers);
      const branchQs = frictionBranches[branchKey] || [];
      nextQueue = [...coreQuestions, ...branchQs];
      setQuestionQueue(nextQueue);
    }

    if (currentIdx + 1 < nextQueue.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // All questions answered → calculate intelligence
      const results = calculateFinalIntelligence(newAnswers);
      setIntelligence(results);

      // Save pending lead record
      const pendingRecord = {
        customer: leadData,
        consent: consentData,
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
        repNotes: null,
        finalDecision: null,
      };
      const savedId = await saveLeadRecord(pendingRecord);
      setCurrentLeadId(savedId);

      setStage('LIVE_MATCH');
    }
  };

  // ── Post-Discovery → Demo → Post-Demo ──

  const handleBeginDemo = () => setStage('GUIDED_DEMO');
  const handleCompleteDemo = () => setStage('REP_POST_DEMO');

  const handleRepSubmit = async (data) => {
    setRepData(data);

    // Run final decision engine
    const decision = calculateFinalDecision(intelligence, data);
    setFinalDecision(decision);
    setStage('FINAL_OUTPUT');

    // Build full record
    const dbRecord = {
      id: currentLeadId,
      supabaseId: currentLeadId,
      customer: leadData,
      consent: consentData,
      repName: authUser?.name,
      repId: authUser?.id,
      storeId: authUser?.storeId,
      storeLocation: authUser?.storeLocation,
      temperature: `${decision?.leadTemperature} (${decision?.leadScore})`,
      laneName: intelligence?.demoLane,
      boardStatus: data.purchaseStatus === 'Closed Won' ? 'Closed Won' : 'Demo Completed',
      date: new Date().toISOString(),
      answers: answers.map(a => a.text),
      intelligence,
      repNotes: data,
      finalDecision: decision,
    };
    await saveLeadRecord(dbRecord);

    await sendToGoogleSheets({
      stage: 'POST_DEMO',
      repIdentity: authUser,
      store: authUser?.storeLocation,
      customer: leadData,
      intelligence,
      repNotes: data,
      finalDecision: decision,
      answers: answers.map(a => a.text),
      date: new Date().toISOString(),
    });
  };

  // ── Reset / Resume ──

  const handleRestart = () => {
    setStage('DASHBOARD');
    setQuestionQueue([...coreQuestions]);
    setCurrentIdx(0);
    setAnswers([]);
    setIntelligence(null);
    setLeadData(null);
    setConsentData(null);
    setRepData(null);
    setFinalDecision(null);
    setCurrentLeadId(null);
  };

  const handleResumeDemo = (lead) => {
    setLeadData(lead.customer);
    setIntelligence(lead.intelligence);
    setAnswers(lead.answers ? lead.answers.map(text => ({ text })) : []);
    setCurrentLeadId(lead.id || lead.supabaseId);
    setStage('REP_POST_DEMO');
  };

  const handleLogout = () => {
    console.log('Logout disabled — login screen removed for now');
  };

  // ── Render ──

  const currentQuestion = questionQueue[currentIdx];

  return (
    <div className="app-container">
      <div className="bg-glow-1"></div>
      <div className="bg-glow-2"></div>

      {stage === 'DASHBOARD' && (
        <DashboardScreen
          user={authUser}
          onNewConsult={handleNewConsult}
          onLogout={handleLogout}
          onResumeDemo={handleResumeDemo}
        />
      )}

      {stage === 'WELCOME' && (
        <WelcomeScreen onNext={handleStartConsult} />
      )}

      {stage === 'CONSENT' && (
        <ConsentScreen onAccept={handleConsentAccept} />
      )}

      {stage === 'LEAD' && (
        <LeadCaptureScreen onNext={handleLeadSubmit} />
      )}

      {stage === 'QUESTIONS' && currentQuestion && (
        <QuestionScreen
          question={currentQuestion}
          currentStep={currentIdx + 1}
          totalSteps={questionQueue.length}
          onAnswer={handleAnswer}
        />
      )}

      {stage === 'LIVE_MATCH' && (
        <CustomerMatchScreen
          results={intelligence}
          leadData={leadData}
          onBeginDemo={handleBeginDemo}
        />
      )}

      {stage === 'GUIDED_DEMO' && (
        <GuidedDemoScreen
          results={intelligence}
          leadData={leadData}
          onCompleteDemo={handleCompleteDemo}
        />
      )}

      {stage === 'REP_POST_DEMO' && (
        <RepPostDemoScreen
          results={intelligence}
          onSubmit={handleRepSubmit}
        />
      )}

      {stage === 'FINAL_OUTPUT' && (
        <OutputScreen
          results={intelligence}
          leadData={leadData}
          finalDecision={finalDecision}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
