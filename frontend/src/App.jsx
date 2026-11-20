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
  const [canGoBack, setCanGoBack] = useState(false);
  const [isSwitchingRole, setIsSwitchingRole] = useState(false);

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
  const [datasetInfo, setDatasetInfo] = useState({
    isCustom: false,
    filename: 'Connected Google Sheet',
    totalRows: 150,
  });

  // Initialize data on mount
  useEffect(() => {
    async function init() {
      try {
        const u = await authAPI.getMe();
        const persona = PERSONAS[u.role] || PERSONAS['Founders'] || PERSONAS['Founder'];
        const fullUser = { ...u, name: u.name || persona?.name || 'Alex Morgan', email: u.email || persona?.email || 'alex@laserai.demo' };
        setUser(fullUser);
        const [raw, dig, info] = await Promise.all([
          feedbackAPI.getRawFeedback(u.role),
          digestAPI.generateDigest(u.role),
          feedbackAPI.getDatasetInfo(),
        ]);
        setRawFeedback(raw);
        setDigest(dig);
        if (info) setDatasetInfo(info);
      } catch (e) {
        console.warn('Init error:', e);
      }
    }
    init();
  }, []);

  // Browser History & Navigation Synchronization (Enables Chrome Back Button & In-App Back)
  const pushNavState = (screen, extra = {}) => {
    const nextRole = extra.role || user.role;
    const nextSwitching = extra.isSwitchingRole !== undefined ? extra.isSwitchingRole : isSwitchingRole;
    window.history.pushState({ screen, role: nextRole, isSwitchingRole: nextSwitching }, '');
    setCanGoBack(screen > 1);
    setCurrentScreen(screen);
    if (extra.isSwitchingRole !== undefined) {
      setIsSwitchingRole(extra.isSwitchingRole);
    }
  };

  useEffect(() => {
    // Initial replaceState to track entry point in history
    if (!window.history.state) {
      window.history.replaceState({ screen: 1, role: user.role, isSwitchingRole: false }, '');
    }

    const handlePopState = (event) => {
      if (event.state && typeof event.state.screen === 'number') {
        const { screen, role: savedRole, isSwitchingRole: savedSwitching } = event.state;
        setCurrentScreen(screen);
        setIsSwitchingRole(!!savedSwitching);
        setCanGoBack(screen > 1);
        if (savedRole && savedRole !== user.role) {
          setUser((prev) => ({ ...prev, role: savedRole }));
          loadRoleData(savedRole);
        }
      } else {
        setCurrentScreen(1);
        setIsSwitchingRole(false);
        setCanGoBack(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [user.role]);

  // Unified In-App Back Button Handler
  const handleGoBack = () => {
    if (window.history.state && window.history.state.screen > 1) {
      window.history.back();
    } else {
      if (currentScreen === 5) {
        pushNavState(4);
      } else if (currentScreen === 4) {
        pushNavState(isSwitchingRole ? 3 : 1, { isSwitchingRole: false });
      } else if (currentScreen === 3) {
        if (user.authenticated) {
          pushNavState(4, { isSwitchingRole: false });
        } else {
          pushNavState(1, { isSwitchingRole: false });
        }
      } else if (currentScreen === 2) {
        pushNavState(1);
      }
    }
  };

  const loadRoleData = async (role) => {
    setLoadingDigest(true);
    setDispatchResult(null); // reset prior dispatch result
    try {
      const [dig, feedback, info] = await Promise.all([
        digestAPI.generateDigest(role),
        feedbackAPI.getRawFeedback(role),
        feedbackAPI.getDatasetInfo(),
      ]);
      setDigest(dig);
      setRawFeedback(feedback);
      if (info) setDatasetInfo(info);
    } catch (e) {
      console.error('Error loading role digest:', e);
    } finally {
      setLoadingDigest(false);
    }
  };

  const handleUploadDataset = async (file) => {
    setLoadingDigest(true);
    try {
      const res = await feedbackAPI.uploadDataset(file);
      setDatasetInfo({
        isCustom: true,
        filename: file.name,
        totalRows: res.total_rows || 0,
      });
      await loadRoleData(user.role);
      return res;
    } catch (e) {
      console.error('Failed to upload dataset:', e);
      alert('Error uploading file. Please ensure it is a valid CSV or Excel (.xlsx, .xls) file.');
    } finally {
      setLoadingDigest(false);
    }
  };

  const handleResetDataset = async () => {
    setLoadingDigest(true);
    try {
      await feedbackAPI.resetDataset();
      setDatasetInfo({
        isCustom: false,
        filename: 'Connected Google Sheet',
        totalRows: 150,
      });
      await loadRoleData(user.role);
    } catch (e) {
      console.error('Failed to reset dataset:', e);
    } finally {
      setLoadingDigest(false);
    }
  };

  // Screen 1: "Sign up" -> Screen 3 (Directly to Signup / Onboarding, no Google Auth)
  const handleStartDemo = () => {
    setUser((prev) => ({
      ...prev,
      name: '',
      email: '',
    }));
    pushNavState(3, { isSwitchingRole: false });
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
    pushNavState(4, { role: selectedRole, isSwitchingRole: false });
  };

  // Screen 2: Login -> Screen 3
  const handleLoginSuccess = async () => {
    await authAPI.mockLogin();
    setUser((prev) => ({ ...prev, authenticated: true }));
    pushNavState(3, { isSwitchingRole: false });
  };

  // Screen 4 -> Screen 3: "Switch Role" triggered from Dashboard
  const handleSwitchRoleToOnboarding = () => {
    pushNavState(3, { isSwitchingRole: true });
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
    setLoadingDigest(true);
    try {
      await authAPI.onboarding(formData);

      if (formData.customFile) {
        const uploadRes = await feedbackAPI.uploadDataset(formData.customFile);
        setDatasetInfo({
          isCustom: true,
          filename: formData.customFile.name,
          totalRows: uploadRes.total_rows || 0,
        });
      } else {
        await feedbackAPI.resetDataset();
        setDatasetInfo({
          isCustom: false,
          filename: 'Connected Google Sheet',
          totalRows: 150,
        });
      }

      await loadRoleData(formData.role);
      pushNavState(4, { role: formData.role, isSwitchingRole: false });
    } catch (e) {
      console.error('Error completing onboarding:', e);
      pushNavState(4, { isSwitchingRole: false });
    } finally {
      setLoadingDigest(false);
    }
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
    pushNavState(4, { role: newRole, isSwitchingRole: false });
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

  // Log Out handler (resets session and returns to landing)
  const handleLogout = () => {
    setUser({
      id: 'usr_demo_google',
      name: '',
      email: '',
      role: 'Founder',
      digest_frequency: 'Daily',
      slack_webhook_url: '',
      authenticated: false,
    });
    pushNavState(1, { role: 'Founder', isSwitchingRole: false });
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
          onBackToLanding={handleGoBack}
        />
      )}

      {currentScreen === 3 && (
        <OnboardingScreen
          user={user}
          loadingDigest={loadingDigest}
          onCompleteOnboarding={handleCompleteOnboarding}
          onBackToLanding={handleGoBack}
          onBackToDashboard={handleGoBack}
          isSwitchingRole={isSwitchingRole}
        />
      )}

      {currentScreen === 4 && (
        <DashboardScreen
          user={user}
          digest={digest}
          rawFeedback={rawFeedback}
          loadingDigest={loadingDigest}
          datasetInfo={datasetInfo}
          canGoBack={canGoBack}
          onGoBack={handleGoBack}
          onUploadDataset={handleUploadDataset}
          onResetDataset={handleResetDataset}
          onSwitchRoleToOnboarding={handleSwitchRoleToOnboarding}
          onLogout={handleLogout}
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
          onBackToDashboard={handleGoBack}
          onSwitchRoleToOnboarding={handleSwitchRoleToOnboarding}
          onLogout={handleLogout}
          onDispatch={handleDispatch}
          dispatchResult={dispatchResult}
          dispatching={dispatching}
        />
      )}
    </div>
  );
}
