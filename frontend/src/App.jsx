import React, { useState, useEffect } from 'react';
import LandingScreen from './components/Screens/LandingScreen';
import LoginScreen from './components/Screens/LoginScreen';
import OnboardingScreen from './components/Screens/OnboardingScreen';
import DashboardScreen from './components/Screens/DashboardScreen';
import DigestPreviewScreen from './components/Screens/DigestPreviewScreen';
import { authAPI, feedbackAPI, digestAPI, PERSONAS } from './services/api';

export default function App() {
  // Screen state: 1: Landing, 2: Login, 3: Onboarding, 4: Dashboard, 5: Preview
  const [currentScreen, setCurrentScreen] = useState(1);

  const [user, setUser] = useState({
    id: 'usr_demo_google',
    name: '',
    email: '',
    role: 'Founder',
    digest_frequency: 'Daily',
    slack_webhook_url: '',
    authenticated: false,
  });

  const [digest, setDigest] = useState(null);
  const [rawFeedback, setRawFeedback] = useState([]);
  const [loadingDigest, setLoadingDigest] = useState(false);
  const [dispatchResult, setDispatchResult] = useState(null);
  const [dispatching, setDispatching] = useState(false);

  // Initialize data on mount
  useEffect(() => {
    async function init() {
      try {
        const u = await authAPI.getMe();
        const persona = PERSONAS[u.role] || PERSONAS['Founders'] || PERSONAS['Founder'];
        const fullUser = { ...u, name: u.name || persona?.name || 'Alex Morgan', email: u.email || persona?.email || 'alex@laserai.demo' };
        setUser(fullUser);
        const [raw, dig] = await Promise.all([
          feedbackAPI.getRawFeedback(u.role),
          digestAPI.generateDigest(u.role),
        ]);
        setRawFeedback(raw);
        setDigest(dig);
      } catch (e) {
        console.warn('Init error:', e);
      }
    }
    init();
  }, []);

  const loadRoleData = async (role) => {
    setLoadingDigest(true);
    setDispatchResult(null); // reset prior dispatch result
    try {
      const [dig, feedback] = await Promise.all([
        digestAPI.generateDigest(role),
        feedbackAPI.getRawFeedback(role),
      ]);
      setDigest(dig);
      setRawFeedback(feedback);
    } catch (e) {
      console.error('Error loading role digest:', e);
    } finally {
      setLoadingDigest(false);
    }
  };

  // Screen 1: "Try Demo Workspace" -> Screen 2
  const handleStartDemo = () => {
    setCurrentScreen(2);
  };

  // Screen 1: Quick-start as a specific persona directly -> Screen 4
  const handleSelectPersona = async (selectedRole) => {
    const persona = PERSONAS[selectedRole] || PERSONAS['Founders'] || PERSONAS['Founder'];
    const updated = {
      ...user,
      role: selectedRole,
      name: persona?.name || '',
      email: persona?.email || '',
      authenticated: true,
    };
    setUser(updated);
    await authAPI.switchRole(selectedRole);
    await loadRoleData(selectedRole);
    setCurrentScreen(4); // directly open that persona's customized perspective
  };

  // Screen 2: Login -> Screen 3
  const handleLoginSuccess = async () => {
    await authAPI.mockLogin();
    setUser((prev) => ({ ...prev, authenticated: true }));
    setCurrentScreen(3);
  };

  // Screen 3: Onboarding -> Screen 4
  const handleCompleteOnboarding = async (formData) => {
    const updated = {
      ...user,
      ...formData,
      name: formData.name?.trim() || user.name || 'Team Member',
      email: formData.email?.trim() || user.email || '',
      authenticated: true,
    };
    setUser(updated);
    await authAPI.onboarding(formData);
    await loadRoleData(formData.role);
    setCurrentScreen(4);
  };

  // Simulator Role Switcher (Screen 4 & Screen 5)
  const handleSwitchRole = async (newRole) => {
    if (newRole === user.role) return;
    const updated = {
      ...user,
      role: newRole,
    };
    setUser(updated);
    await authAPI.switchRole(newRole);
    await loadRoleData(newRole);
  };

  // Screen 5: Instant Dispatch Trigger
  const handleDispatch = async ({ recipientEmail, slackWebhookUrl }) => {
    if (!digest) return;
    setDispatching(true);
    try {
      const res = await digestAPI.dispatch(digest, recipientEmail, slackWebhookUrl);
      setDispatchResult(res);
    } catch (e) {
      setDispatchResult({
        slack_sent: false,
        slack_message: 'Failed to contact dispatcher',
        email_sent: false,
        email_message: e.message,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setDispatching(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-600 selection:text-white">
      {currentScreen === 1 && (
        <LandingScreen
          onStartDemo={handleStartDemo}
          onSelectPersona={handleSelectPersona}
        />
      )}

      {currentScreen === 2 && (
        <LoginScreen
          onLoginSuccess={handleLoginSuccess}
          onBackToLanding={() => setCurrentScreen(1)}
        />
      )}

      {currentScreen === 3 && (
        <OnboardingScreen
          user={user}
          onCompleteOnboarding={handleCompleteOnboarding}
        />
      )}

      {currentScreen === 4 && (
        <DashboardScreen
          user={user}
          digest={digest}
          rawFeedback={rawFeedback}
          loadingDigest={loadingDigest}
          onSwitchRoleToOnboarding={() => setCurrentScreen(3)}
          onRegenerate={() => loadRoleData(user.role)}
          onDispatch={handleDispatch}
          dispatchResult={dispatchResult}
          dispatching={dispatching}
        />
      )}

      {currentScreen === 5 && (
        <DigestPreviewScreen
          user={user}
          digest={digest}
          onBackToDashboard={() => setCurrentScreen(4)}
          onSwitchRoleToOnboarding={() => setCurrentScreen(3)}
          onDispatch={handleDispatch}
          dispatchResult={dispatchResult}
          dispatching={dispatching}
        />
      )}
    </div>
  );
}
