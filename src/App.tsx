import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ClipboardCheck,
  FileText,
  Lock,
  LogOut,
  MonitorCheck,
  Play,
  Search,
  Settings,
  ShieldCheck,
  User,
  X,
} from 'lucide-react';
import {
  allQuestions as baseQuestions,
  EXAM_METADATA,
  EXAM_PAPERS as basePapers,
} from './data/questions';
import {
  AutoQuestionType,
  ExamPaperSheet,
  OptionKey,
  QuestionCategory,
  QuestionItem,
} from './types/question';
import {
  AttemptFilter,
  calculateExamScore,
  filterAndSortQuestions,
  getFreePreviewQuestions,
  getPaperTrackingStats,
  paginateQuestions,
  questionBelongsToPaper,
  resolveAutoQuestionType,
} from './utils/studyLogic';
import { SidebarPanel } from './components/SidebarPanel';
import { QuestionCard } from './components/QuestionCard';
import { PdfReferenceModal } from './components/PdfReferenceModal';
import {
  ADMIN_EMAIL,
  CourseOfferCard,
  GoogleGLogo,
  StudentSignInScreen,
  UpiPaymentSettings,
  UpiQrPaymentScreen,
  UtrSubmissionRecord,
} from './components/PaywallLockScreen';
import { AdminOptionModal } from './components/AdminOptionModal';
import {
  INITIAL_MOCK_QUESTIONS,
  MockTestAttemptRecord,
} from './data/mock500Part2';
import { MockCbtExamView } from './components/MockCbtExamView';
import { FloatingSupportChat } from './components/FloatingSupportChat';

// Active v2 Storage Keys (purges all legacy v1 / sticky admin / cached test keys)
const STORAGE_SCHEMA_VERSION_KEY = 'wbpsc_portal_schema_v2';
const STORAGE_CUSTOM_QUESTIONS_KEY = 'wbpsc_custom_questions_v2';
const STORAGE_CUSTOM_PAPERS_KEY = 'wbpsc_custom_papers_v2';
const STORAGE_CUSTOM_MOCK_QUESTIONS_KEY = 'wbpsc_custom_mock_questions_v2';
const STORAGE_COMPLETED_MOCK_TESTS_KEY = 'wbpsc_completed_mock_tests_v2';
const STORAGE_SAVED_MOCK_ATTEMPTS_KEY = 'wbpsc_saved_mock_attempts_v2';
const STORAGE_PAID_EMAILS_KEY = 'wbpsc_paid_emails_v2';
const STORAGE_USER_EMAIL_KEY = 'wbpsc_user_email_v2';
const STORAGE_USER_NAME_KEY = 'wbpsc_user_name_v2';
const STORAGE_UPI_SETTINGS_KEY = 'wbpsc_upi_settings_v2';
const STORAGE_UTR_SUBMISSIONS_KEY = 'wbpsc_utr_submissions_v2';

const LEGACY_KEYS_TO_PURGE = [
  'isAdmin',
  'isPaid',
  'mockResults',
  'myTests',
  'user',
  'admin',
  'wbpsc_admin_authenticated_v1',
  'wbpsc_clerkship_admin_bypass_2026',
  'wbpsc_admin_pin',
  'wbpsc_user_email_v1',
  'wbpsc_user_name_v1',
  'wbpsc_paid_emails_v1',
  'wbpsc_completed_mock_tests_v1',
  'wbpsc_saved_mock_attempts_v1',
  'wbpsc_utr_submissions_v1',
];

function purgeLegacyAndUnverifiedBrowserStorage(): void {
  try {
    // 1. Always remove all legacy v1 / sticky admin / old build keys
    for (const key of LEGACY_KEYS_TO_PURGE) {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    }

    // 2. One-time schema migration wipe to clear any leftover keys from earlier builds
    if (localStorage.getItem(STORAGE_SCHEMA_VERSION_KEY) !== '2.0') {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k !== STORAGE_UPI_SETTINGS_KEY) {
          keysToRemove.push(k);
        }
      }
      for (const k of keysToRemove) {
        localStorage.removeItem(k);
      }
      sessionStorage.clear();
      localStorage.setItem(STORAGE_SCHEMA_VERSION_KEY, '2.0');
    }

    // 3. Validate active user email session; if no valid email exists, wipe session & mock test state
    const activeEmail = (
      localStorage.getItem(STORAGE_USER_EMAIL_KEY) || ''
    ).trim();
    if (!activeEmail || !activeEmail.includes('@')) {
      localStorage.removeItem(STORAGE_USER_EMAIL_KEY);
      localStorage.removeItem(STORAGE_USER_NAME_KEY);
      localStorage.removeItem(STORAGE_COMPLETED_MOCK_TESTS_KEY);
      localStorage.removeItem(STORAGE_SAVED_MOCK_ATTEMPTS_KEY);
      sessionStorage.clear();
    }
  } catch {
    // Ignore storage access errors in private/restricted iframes
  }
}

type ViewMode = 'questions' | 'signin' | 'payment';
type PrimarySectionTab =
  | 'demo-practice'
  | 'pyq-archive'
  | 'cbt-mock-tests'
  | 'my-tests';

export default function App() {
  // Run immediate synchronous storage sanitization before reading initial state
  useState(() => {
    purgeLegacyAndUnverifiedBrowserStorage();
    return true;
  });

  useEffect(() => {
    purgeLegacyAndUnverifiedBrowserStorage();
  }, []);

  // Dynamic Question Bank State (Base Archive + Dynamically Uploaded Papers)
  const [customQuestions, setCustomQuestions] = useState<QuestionItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CUSTOM_QUESTIONS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore storage errors
    }
    return [];
  });

  const [customPapers, setCustomPapers] = useState<ExamPaperSheet[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CUSTOM_PAPERS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore storage errors
    }
    return [];
  });

  const dynamicQuestions = useMemo(
    () => [...baseQuestions, ...customQuestions],
    [customQuestions]
  );

  const dynamicPapers = useMemo(() => {
    const map = new Map<string, ExamPaperSheet>();
    for (const p of basePapers) map.set(p.id, p);
    for (const p of customPapers) map.set(p.id, p);
    return Array.from(map.values());
  }, [customPapers]);

  // Separate 500-Question CBT Mock Test Pool (Mock Test 1 to Mock Test 5, + dynamic uploads for Mock Test 6-10)
  const [customMockQuestions, setCustomMockQuestions] = useState<QuestionItem[]>(
    () => {
      try {
        const saved = localStorage.getItem(STORAGE_CUSTOM_MOCK_QUESTIONS_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch {
        // Ignore storage errors
      }
      return [];
    }
  );

  const dynamicMockQuestions = useMemo(
    () => [...INITIAL_MOCK_QUESTIONS, ...customMockQuestions],
    [customMockQuestions]
  );

  const [completedMockTestNumbers, setCompletedMockTestNumbers] = useState<
    number[]
  >(() => {
    try {
      const saved = localStorage.getItem(STORAGE_COMPLETED_MOCK_TESTS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore storage errors
    }
    return [];
  });

  const [savedMockAttempts, setSavedMockAttempts] = useState<
    MockTestAttemptRecord[]
  >(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SAVED_MOCK_ATTEMPTS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore storage errors
    }
    return [];
  });

  // Start on "Demo / Practice Set" landing view matching Image 1
  const [primarySectionTab, setPrimarySectionTab] =
    useState<PrimarySectionTab>('demo-practice');

  const [adminPreviewFreeMode, setAdminPreviewFreeMode] =
    useState<boolean>(false);

  const [userEmail, setUserEmail] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_USER_EMAIL_KEY) || '';
    } catch {
      return '';
    }
  });

  const [userName, setUserName] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_USER_NAME_KEY) || '';
    } catch {
      return '';
    }
  });

  const [paidEmails, setPaidEmails] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PAID_EMAILS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore storage errors
    }
    return [];
  });

  const [upiSettings, setUpiSettings] = useState<UpiPaymentSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_UPI_SETTINGS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return {
            upiId: parsed.upiId || 'gourab.saheb100@okaxis',
            payeeName: parsed.payeeName || 'WBPSC Clerkship Archive',
            qrCodeDataUrl: parsed.qrCodeDataUrl || '',
          };
        }
      }
    } catch {
      // Ignore storage errors
    }
    return {
      upiId: 'gourab.saheb100@okaxis',
      payeeName: 'WBPSC Clerkship Archive',
      qrCodeDataUrl: '',
    };
  });

  const [utrSubmissions, setUtrSubmissions] = useState<UtrSubmissionRecord[]>(
    () => {
      try {
        const saved = localStorage.getItem(STORAGE_UTR_SUBMISSIONS_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch {
        // Ignore storage errors
      }
      return [];
    }
  );

  const [viewMode, setViewMode] = useState<ViewMode>('questions');
  const [profileDropdownOpen, setProfileDropdownOpen] =
    useState<boolean>(false);
  const [adminModalOpen, setAdminModalOpen] = useState<boolean>(false);
  const [isExamInProgress, setIsExamInProgress] = useState<boolean>(false);
  const [examLockNotice, setExamLockNotice] = useState<boolean>(false);

  useEffect(() => {
    if (!examLockNotice) return;
    const timer = window.setTimeout(() => {
      setExamLockNotice(false);
    }, 3500);
    return () => window.clearTimeout(timer);
  }, [examLockNotice]);

  useEffect(() => {
    if (!isExamInProgress) {
      setExamLockNotice(false);
    }
  }, [isExamInProgress]);

  // CRITICAL RULE: Admin privileges apply ONLY while active logged-in email === 'gourab.saheb100@gmail.com'
  const normalizedUserEmail = userEmail.trim().toLowerCase();
  const isAdminAuthenticated = normalizedUserEmail === ADMIN_EMAIL;
  const isAdminUser = isAdminAuthenticated;

  const isPaid =
    Boolean(normalizedUserEmail) && paidEmails.includes(normalizedUserEmail);

  // Full access is unlocked ONLY when (isPaid === true) OR (logged in as gourab.saheb100@gmail.com and not testing free mode)
  const isUnlocked =
    isPaid || (isAdminAuthenticated && !adminPreviewFreeMode);

  const currentUserSubmission = useMemo(
    () =>
      utrSubmissions.find(
        (s) => s.email.trim().toLowerCase() === normalizedUserEmail
      ) || null,
    [utrSubmissions, normalizedUserEmail]
  );

  // In Previous Year Questions, activePaperId === 'all' shows the Year-Wise / Set-Wise Paper Cards Lobby (no 1-27 pages dump!)
  const [activePaperId, setActivePaperId] = useState<string>('all');
  const [activeAutoType, setActiveAutoType] =
    useState<'all' | AutoQuestionType>('all');
  const [activeCategory, setActiveCategory] =
    useState<'all' | QuestionCategory>('all');
  const [activeSubTopic, setActiveSubTopic] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [attemptFilter, setAttemptFilter] = useState<AttemptFilter>('all');
  const [showBengali, setShowBengali] = useState<boolean>(true);

  // Pagination state inside a selected Year-wise Paper (20 questions per page)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(20);

  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set()
  );
  const [userAnswers, setUserAnswers] = useState<Record<string, OptionKey>>({});
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(
    () => new Set()
  );

  const [pdfModalOpen, setPdfModalOpen] = useState<boolean>(false);
  const [pdfPage, setPdfPage] = useState<number>(1);
  const [pdfUrl, setPdfUrl] = useState<string>(EXAM_METADATA.pdfUrl);
  const [pdfPaperTitle, setPdfPaperTitle] = useState<string>(
    '2024 Prelim Shift-3 (SLC/23)'
  );

  const trackingStats = useMemo(
    () => getPaperTrackingStats(dynamicQuestions, dynamicPapers),
    [dynamicQuestions, dynamicPapers]
  );

  // Total Prelims & Mains counts across the entire dynamic question bank
  const archiveStageTotals = useMemo(() => {
    let prelimCount = 0;
    let mainsCount = 0;
    let mathCount = 0;
    let objectiveConciseCount = 0;
    for (const q of dynamicQuestions) {
      const t = resolveAutoQuestionType(q);
      if (t === 'descriptive-model-guide') {
        mainsCount += 1;
      } else {
        prelimCount += 1;
        if (t === 'math-step-by-step') mathCount += 1;
        else objectiveConciseCount += 1;
      }
    }
    return {
      total: dynamicQuestions.length,
      prelimCount,
      mainsCount,
      mathCount,
      objectiveConciseCount,
    };
  }, [dynamicQuestions]);

  // Free Preview Pool (Strictly 20 Prelims Objective MCQs for Demo / Practice Set)
  const freePreviewPool = useMemo(
    () => getFreePreviewQuestions(dynamicQuestions, 20),
    [dynamicQuestions]
  );

  // Questions scoped to the currently active Year-Wise Paper (or Demo Practice Set)
  const paperScopedQuestions = useMemo(() => {
    if (!isUnlocked || primarySectionTab === 'demo-practice') {
      return freePreviewPool;
    }
    if (activePaperId === 'all') return [];
    return dynamicQuestions.filter((q) =>
      questionBelongsToPaper(q, activePaperId)
    );
  }, [
    isUnlocked,
    primarySectionTab,
    freePreviewPool,
    dynamicQuestions,
    activePaperId,
  ]);

  const autoTypeCounts = useMemo(() => {
    let math = 0;
    let objective = 0;
    let descriptive = 0;
    let subPartTotal = 0;
    for (const q of paperScopedQuestions) {
      const t = resolveAutoQuestionType(q);
      if (t === 'math-step-by-step') math += 1;
      else if (t === 'objective-concise') objective += 1;
      else descriptive += 1;

      subPartTotal +=
        q.subParts && q.subParts.length > 0 ? q.subParts.length : 1;
    }
    return {
      all: paperScopedQuestions.length,
      math,
      objective,
      descriptive: isUnlocked ? descriptive : archiveStageTotals.mainsCount,
      subPartTotal,
    };
  }, [paperScopedQuestions, isUnlocked, archiveStageTotals.mainsCount]);

  const categoryCounts = useMemo(() => {
    const counts = {
      all: paperScopedQuestions.length,
      Mathematics: 0,
      'General Knowledge': 0,
      English: 0,
      'Descriptive & Translation': 0,
    };
    for (const q of paperScopedQuestions) {
      counts[q.category] += 1;
    }
    if (!isUnlocked) {
      counts['Descriptive & Translation'] = archiveStageTotals.mainsCount;
    }
    return counts;
  }, [paperScopedQuestions, isUnlocked, archiveStageTotals.mainsCount]);

  const availableSubTopics = useMemo(() => {
    const set = new Set<string>();
    for (const q of paperScopedQuestions) {
      if (activeCategory === 'all' || q.category === activeCategory) {
        if (
          activeAutoType === 'all' ||
          resolveAutoQuestionType(q) === activeAutoType
        ) {
          set.add(q.subTopic);
        }
      }
    }
    return Array.from(set).sort();
  }, [paperScopedQuestions, activeCategory, activeAutoType]);

  const filteredQuestions = useMemo(() => {
    const useDemoPool = !isUnlocked || primarySectionTab === 'demo-practice';
    if (!useDemoPool && activePaperId === 'all') {
      return [];
    }
    const sourcePool = useDemoPool ? freePreviewPool : dynamicQuestions;
    return filterAndSortQuestions(sourcePool, {
      paperId: !useDemoPool ? activePaperId : 'all',
      autoType: activeAutoType,
      series: 'A',
      category: activeCategory,
      subTopic: activeSubTopic,
      searchQuery,
      attemptFilter,
      userAnswers,
      bookmarkedIds,
    });
  }, [
    isUnlocked,
    primarySectionTab,
    dynamicQuestions,
    freePreviewPool,
    activePaperId,
    activeAutoType,
    activeCategory,
    activeSubTopic,
    searchQuery,
    attemptFilter,
    userAnswers,
    bookmarkedIds,
  ]);

  // Group Year-Wise / Set-Wise Previous Papers dynamically by Year for the PYQ Lobby
  const papersGroupedByYear = useMemo(() => {
    const groups = new Map<string, ExamPaperSheet[]>();
    for (const paper of dynamicPapers) {
      const y = paper.year || 'Other';
      const existing = groups.get(y) || [];
      existing.push(paper);
      groups.set(y, existing);
    }
    return Array.from(groups.entries()).sort((a, b) =>
      b[0].localeCompare(a[0])
    );
  }, [dynamicPapers]);

  // Reset to Page 1 whenever filter criteria change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    activePaperId,
    activeAutoType,
    activeCategory,
    activeSubTopic,
    searchQuery,
    attemptFilter,
    pageSize,
  ]);

  const pagination = useMemo(() => {
    return paginateQuestions(filteredQuestions, currentPage, pageSize);
  }, [filteredQuestions, currentPage, pageSize]);

  const displayTotalPages = pagination.totalPages;

  const currentPageQuestionIds = useMemo(() => {
    return new Set(pagination.items.map((q) => q.id));
  }, [pagination.items]);

  const score = useMemo(() => {
    return calculateExamScore(
      paperScopedQuestions,
      userAnswers,
      EXAM_METADATA.negativeMarking
    );
  }, [paperScopedQuestions, userAnswers]);

  const scrollToFeedTop = () => {
    const feedTop = document.getElementById('question-feed-top');
    if (feedTop) {
      feedTop.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  /**
   * Strict Navigation Lock & Redirect Trigger:
   * - If unauthenticated (`!userEmail`), ALWAYS go strictly to Step 1 (`signin`).
   * - If authenticated (`userEmail`) and not unlocked, go to Step 2 (`payment`).
   * - If already unlocked, open Previous Year Questions Year-Wise Cards Lobby.
   */
  const handleTriggerUnlockFlow = () => {
    setProfileDropdownOpen(false);
    if (isExamInProgress) {
      setExamLockNotice(true);
      return;
    }
    if (isUnlocked) {
      setPrimarySectionTab('pyq-archive');
      setActivePaperId('all');
      setViewMode('questions');
      scrollToFeedTop();
      return;
    }
    if (!userEmail.trim()) {
      setViewMode('signin');
    } else {
      setViewMode('payment');
    }
    scrollToFeedTop();
  };

  /**
   * Strict Sidebar Section Navigation Handler:
   * - While a Mock Test is actively running (`isExamInProgress === true`), lock all sidebar navigation items
   *   and show the "Complete and submit your active Mock Test first." notice.
   * - 'demo-practice', 'cbt-mock-tests' (with Free Mock Test 1), and 'my-tests' (for Free Mock Test 1 scorecards)
   *   are accessible to all visitors when no exam is actively running.
   * - Clicking 'pyq-archive' when `!isUnlocked` immediately blocks access and redirects
   *   straight to the Split-Screen Google Login & ₹100 QR Payment page.
   */
  const handleNavigateSection = (targetTab: PrimarySectionTab) => {
    setProfileDropdownOpen(false);
    if (isExamInProgress) {
      setExamLockNotice(true);
      return;
    }
    if (targetTab === 'demo-practice') {
      setPrimarySectionTab('demo-practice');
      setActivePaperId('all');
      setActiveAutoType('all');
      setActiveCategory('all');
      setActiveSubTopic('all');
      setCurrentPage(1);
      setViewMode('questions');
      scrollToFeedTop();
      return;
    }

    if (targetTab === 'cbt-mock-tests' || targetTab === 'my-tests') {
      setPrimarySectionTab(targetTab);
      setViewMode('questions');
      scrollToFeedTop();
      return;
    }

    // Strict 100% Lock on 'pyq-archive' for Unpaid / Logged-Out Visitors
    if (!isUnlocked) {
      if (!userEmail.trim()) {
        setViewMode('signin');
      } else {
        setViewMode('payment');
      }
      scrollToFeedTop();
      return;
    }

    setPrimarySectionTab(targetTab);
    if (targetTab === 'pyq-archive') {
      setActivePaperId('all');
      setActiveAutoType('all');
      setActiveCategory('all');
      setActiveSubTopic('all');
      setCurrentPage(1);
    }
    setViewMode('questions');
    scrollToFeedTop();
  };

  /**
   * Step 1 Completion: Immediately after signing in:
   * - If admin email (`gourab.saheb100@gmail.com`) or already marked paid -> unlock and open Year-Wise Previous Year Questions.
   * - Otherwise -> automatically redirect to the ₹100 QR Payment page (`payment`).
   */
  const handleSignInSuccess = (email: string, name: string) => {
    const cleanEmail = email.trim();
    const cleanLower = cleanEmail.toLowerCase();
    const resolvedName = name.trim() || cleanEmail.split('@')[0];

    setUserEmail(cleanEmail);
    setUserName(resolvedName);
    try {
      localStorage.setItem(STORAGE_USER_EMAIL_KEY, cleanEmail);
      localStorage.setItem(STORAGE_USER_NAME_KEY, resolvedName);
    } catch {
      // Ignore storage error
    }

    if (cleanLower === ADMIN_EMAIL || paidEmails.includes(cleanLower)) {
      setAdminPreviewFreeMode(false);
      setPrimarySectionTab('pyq-archive');
      setActivePaperId('all');
      setViewMode('questions');
      scrollToFeedTop();
      return;
    }

    // Strict Flow Step 2: Auto-redirect newly signed-in unpaid student to ₹100 QR Payment page
    setViewMode('payment');
    scrollToFeedTop();
  };

  /**
   * Complete Session & Legacy Cache Wipe on Sign Out
   */
  const handleSignOut = () => {
    setUserEmail('');
    setUserName('');
    setAdminPreviewFreeMode(false);
    setProfileDropdownOpen(false);
    setActivePaperId('all');
    setActiveAutoType('all');
    setActiveCategory('all');
    setActiveSubTopic('all');
    setSearchQuery('');
    setAttemptFilter('all');
    setCurrentPage(1);
    setUserAnswers({});
    setExpandedIds(new Set());
    setBookmarkedIds(new Set());
    setCompletedMockTestNumbers([]);
    setSavedMockAttempts([]);
    setPrimarySectionTab('demo-practice');
    setViewMode('questions');

    try {
      for (const key of LEGACY_KEYS_TO_PURGE) {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
      }
      localStorage.removeItem(STORAGE_USER_EMAIL_KEY);
      localStorage.removeItem(STORAGE_USER_NAME_KEY);
      localStorage.removeItem(STORAGE_COMPLETED_MOCK_TESTS_KEY);
      localStorage.removeItem(STORAGE_SAVED_MOCK_ATTEMPTS_KEY);
      sessionStorage.clear();
    } catch {
      // Ignore storage error
    }
  };

  const handleAuthenticateAdmin = () => {
    setAdminPreviewFreeMode(false);
    setUserEmail(ADMIN_EMAIL);
    setUserName('Gourab Saheb (Admin)');
    setPrimarySectionTab('pyq-archive');
    setActivePaperId('all');
    setViewMode('questions');
    try {
      localStorage.setItem(STORAGE_USER_EMAIL_KEY, ADMIN_EMAIL);
      localStorage.setItem(STORAGE_USER_NAME_KEY, 'Gourab Saheb (Admin)');
    } catch {
      // Ignore storage error
    }
  };

  const handleLogoutAdmin = () => {
    handleSignOut();
  };

  const handleSubmitUtrVerification = (utrNumber: string) => {
    const newRecord: UtrSubmissionRecord = {
      email: userEmail,
      name: userName || userEmail.split('@')[0],
      utrNumber,
      submittedAt: new Date().toLocaleString(),
      status: 'pending_verification',
    };

    setUtrSubmissions((prev) => {
      const filtered = prev.filter(
        (item) => item.email.trim().toLowerCase() !== normalizedUserEmail
      );
      const updated = [newRecord, ...filtered];
      try {
        localStorage.setItem(
          STORAGE_UTR_SUBMISSIONS_KEY,
          JSON.stringify(updated)
        );
      } catch {
        // Ignore storage error
      }
      return updated;
    });
  };

  const handleApproveUtrSubmission = (emailToApprove: string) => {
    const cleanLower = emailToApprove.trim().toLowerCase();
    setPaidEmails((prev) => {
      const updated = Array.from(new Set([...prev, cleanLower]));
      try {
        localStorage.setItem(STORAGE_PAID_EMAILS_KEY, JSON.stringify(updated));
      } catch {
        // Ignore storage error
      }
      return updated;
    });

    setUtrSubmissions((prev) => {
      const updated = prev.map((item) =>
        item.email.trim().toLowerCase() === cleanLower
          ? { ...item, status: 'approved' as const }
          : item
      );
      try {
        localStorage.setItem(
          STORAGE_UTR_SUBMISSIONS_KEY,
          JSON.stringify(updated)
        );
      } catch {
        // Ignore storage error
      }
      return updated;
    });
  };

  const handleUpdateUpiSettings = (nextSettings: UpiPaymentSettings) => {
    setUpiSettings(nextSettings);
    try {
      localStorage.setItem(
        STORAGE_UPI_SETTINGS_KEY,
        JSON.stringify(nextSettings)
      );
    } catch {
      // Ignore storage error
    }
  };

  const handleAddExtractedQuestions = (
    newQuestions: QuestionItem[],
    newPaper?: ExamPaperSheet
  ) => {
    setCustomQuestions((prev) => {
      const updated = [...prev, ...newQuestions];
      try {
        localStorage.setItem(
          STORAGE_CUSTOM_QUESTIONS_KEY,
          JSON.stringify(updated)
        );
      } catch {
        // Ignore storage error
      }
      return updated;
    });

    if (newPaper) {
      setCustomPapers((prev) => {
        const filtered = prev.filter((p) => p.id !== newPaper.id);
        const updated = [...filtered, newPaper];
        try {
          localStorage.setItem(
            STORAGE_CUSTOM_PAPERS_KEY,
            JSON.stringify(updated)
          );
        } catch {
          // Ignore storage error
        }
        return updated;
      });
    }
  };

  const handleClearCustomQuestions = () => {
    setCustomQuestions([]);
    setCustomPapers([]);
    setCustomMockQuestions([]);
    setActivePaperId('all');
    try {
      localStorage.removeItem(STORAGE_CUSTOM_QUESTIONS_KEY);
      localStorage.removeItem(STORAGE_CUSTOM_PAPERS_KEY);
      localStorage.removeItem(STORAGE_CUSTOM_MOCK_QUESTIONS_KEY);
    } catch {
      // Ignore storage error
    }
  };

  const handleAddExtractedMockQuestions = (newMockQs: QuestionItem[]) => {
    setCustomMockQuestions((prev) => {
      const updated = [...prev, ...newMockQs];
      try {
        localStorage.setItem(
          STORAGE_CUSTOM_MOCK_QUESTIONS_KEY,
          JSON.stringify(updated)
        );
      } catch {
        // Ignore storage error
      }
      return updated;
    });
  };

  const handleRecordCompletedMockAttempt = (attempt: MockTestAttemptRecord) => {
    setSavedMockAttempts((prev) => {
      const updated = [attempt, ...prev];
      try {
        localStorage.setItem(
          STORAGE_SAVED_MOCK_ATTEMPTS_KEY,
          JSON.stringify(updated)
        );
      } catch {
        // Ignore storage error
      }
      return updated;
    });

    setCompletedMockTestNumbers((prev) => {
      if (prev.includes(attempt.testNumber)) return prev;
      const updated = [...prev, attempt.testNumber].sort((a, b) => a - b);
      try {
        localStorage.setItem(
          STORAGE_COMPLETED_MOCK_TESTS_KEY,
          JSON.stringify(updated)
        );
      } catch {
        // Ignore storage error
      }
      return updated;
    });
  };

  const handleToggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const allPageExpanded =
    pagination.items.length > 0 &&
    pagination.items.every((q) => expandedIds.has(q.id));

  const handleToggleExpandCurrentPage = () => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (allPageExpanded) {
        for (const q of pagination.items) {
          next.delete(q.id);
        }
      } else {
        for (const q of pagination.items) {
          next.add(q.id);
        }
      }
      return next;
    });
  };

  const handleSelectOption = (id: string, option: OptionKey) => {
    setUserAnswers((prev) => ({
      ...prev,
      [id]: option,
    }));
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const handleClearOption = (id: string) => {
    setUserAnswers((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleResetAllAnswers = () => {
    setUserAnswers({});
    setExpandedIds(new Set());
  };

  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleOpenPdfAtPage = (
    page: number,
    targetUrl?: string,
    targetTitle?: string
  ) => {
    setPdfPage(page);
    if (targetUrl) {
      setPdfUrl(targetUrl);
    } else if (activePaperId !== 'all') {
      const p = dynamicPapers.find((item) => item.id === activePaperId);
      if (p) setPdfUrl(p.pdfUrl);
    }
    if (targetTitle) {
      setPdfPaperTitle(targetTitle);
    }
    setPdfModalOpen(true);
  };

  const handleOpenPaperPdf = (targetUrl: string, title: string) => {
    setPdfUrl(targetUrl);
    setPdfPaperTitle(title);
    setPdfPage(1);
    setPdfModalOpen(true);
  };

  const handleJumpToQuestionId = (questionId: string) => {
    if (!isUnlocked) {
      handleTriggerUnlockFlow();
      return;
    }

    let idx = filteredQuestions.findIndex((q) => q.id === questionId);
    if (idx === -1) {
      setActiveAutoType('all');
      setActiveCategory('all');
      setActiveSubTopic('all');
      setSearchQuery('');
      setAttemptFilter('all');
      const sortedPaper = [...paperScopedQuestions].sort(
        (a, b) => a.seriesNumbers.A - b.seriesNumbers.A
      );
      idx = sortedPaper.findIndex((q) => q.id === questionId);
      const targetPage = idx !== -1 ? Math.floor(idx / pageSize) + 1 : 1;
      setTimeout(() => {
        setCurrentPage(targetPage);
        setTimeout(() => {
          const el = document.getElementById(`question-card-${questionId}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 60);
      }, 20);
      return;
    }

    const targetPage = Math.floor(idx / pageSize) + 1;
    if (targetPage !== pagination.currentPage) {
      setCurrentPage(targetPage);
      setTimeout(() => {
        const el = document.getElementById(`question-card-${questionId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 60);
      return;
    }

    const el = document.getElementById(`question-card-${questionId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleChangePage = (nextPage: number) => {
    if (!isUnlocked) {
      handleTriggerUnlockFlow();
      return;
    }
    setViewMode('questions');
    const clamped = Math.min(Math.max(1, nextPage), pagination.totalPages);
    setCurrentPage(clamped);
    scrollToFeedTop();
  };

  const handleResetFilters = () => {
    setActiveAutoType('all');
    setActiveCategory('all');
    setActiveSubTopic('all');
    setSearchQuery('');
    setAttemptFilter('all');
    setCurrentPage(1);
    setViewMode('questions');
  };

  const activePaperMeta = dynamicPapers.find((p) => p.id === activePaperId);

  // Compute visible page number buttons for the selected Year-wise Paper
  const visiblePageNumbers = useMemo(() => {
    const total = displayTotalPages;
    const current = pagination.currentPage;
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    const pages = new Set<number>([1, total, current, current - 1, current + 1]);
    if (current <= 3) {
      pages.add(2);
      pages.add(3);
      pages.add(4);
    }
    if (current >= total - 2) {
      pages.add(total - 1);
      pages.add(total - 2);
      pages.add(total - 3);
    }
    return Array.from(pages)
      .filter((p) => p >= 1 && p <= total)
      .sort((a, b) => a - b);
  }, [displayTotalPages, pagination.currentPage]);

  const isLoggedIn = Boolean(userEmail.trim());
  const displayAccountEmail = userEmail.trim();
  const accountStatusLabel = isUnlocked
    ? 'Full Access Unlocked'
    : 'Free Preview';

  const topHeaderPageTitle =
    isExamInProgress
      ? 'Active CBT Mock Test in Progress (Q1 to Q100)'
      : viewMode === 'signin'
      ? 'Candidate Sign-In — Unlock Complete Exam Access'
      : viewMode === 'payment'
      ? '₹100 Google Pay / UPI QR Verification'
      : primarySectionTab === 'cbt-mock-tests'
      ? 'Computer-Based Mock Tests (Q1 to Q100)'
      : primarySectionTab === 'my-tests'
      ? 'My Test — Saved Scorecards & Attempt Review'
      : !isUnlocked || primarySectionTab === 'demo-practice'
      ? 'Demo & Practice Set (Free Sample Questions)'
      : primarySectionTab === 'pyq-archive'
      ? activePaperMeta
        ? activePaperMeta.title
        : 'Previous Year Questions — Year-Wise Papers'
      : 'Demo & Practice Set (Free Sample Questions)';

  const examLockTooltip = isExamInProgress
    ? 'Complete and submit your active Mock Test first.'
    : undefined;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#EBEEF3] text-slate-900">
      {/* =====================================================================
          PERSISTENT DARK ROYAL NAVY LEFT SIDEBAR (Matches Image 1 & Prompt)
          ===================================================================== */}
      <aside
        data-testid="global-left-sidebar"
        className="w-full md:w-64 lg:w-68 bg-[#162238] text-white shrink-0 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800/80 md:sticky md:top-0 md:h-screen z-40"
      >
        <div>
          {/* Top Brand Emblem & Title Lockup */}
          <div className="px-5 py-5 border-b border-white/10">
            <a
              href="#top"
              title={examLockTooltip}
              onClick={(e) => {
                e.preventDefault();
                handleNavigateSection('demo-practice');
              }}
              className={`flex items-center gap-3 group ${
                isExamInProgress ? 'cursor-not-allowed opacity-75' : ''
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-white/10 border border-amber-400/40 flex items-center justify-center text-lg shadow-xs shrink-0">
                🏛️
              </div>
              <div>
                <div className="text-sm sm:text-base font-extrabold tracking-tight text-white leading-snug">
                  WBPSC Clerkship
                </div>
                <div className="text-xs font-bold text-slate-300">2026</div>
              </div>
            </a>
          </div>

          {/* Primary Navigation Links (Without Question Counts) */}
          <nav
            data-testid="primary-section-switcher"
            aria-label="Primary Portal Navigation"
            className="p-3.5 space-y-1.5"
          >
            {/* 1. Demo / Practice Set */}
            <button
              type="button"
              data-testid="tab-demo-practice"
              aria-disabled={isExamInProgress}
              title={examLockTooltip}
              onClick={() => handleNavigateSection('demo-practice')}
              className={`w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all text-left ${
                isExamInProgress
                  ? 'opacity-50 cursor-not-allowed text-slate-400 bg-white/5'
                  : primarySectionTab === 'demo-practice' &&
                    viewMode === 'questions'
                  ? 'bg-[#253655] text-white shadow-sm border border-white/10 cursor-pointer'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white cursor-pointer'
              }`}
            >
              <span className="flex items-center gap-3 truncate">
                <Play className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="truncate">Demo / Practice Set</span>
              </span>
              {isExamInProgress && (
                <Lock className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
              )}
            </button>

            {/* 2. Previous Year Questions */}
            <button
              type="button"
              data-testid="tab-pyq-archive"
              aria-disabled={isExamInProgress}
              title={examLockTooltip}
              onClick={() => handleNavigateSection('pyq-archive')}
              className={`w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all text-left ${
                isExamInProgress
                  ? 'opacity-50 cursor-not-allowed text-slate-400 bg-white/5'
                  : isUnlocked &&
                    primarySectionTab === 'pyq-archive' &&
                    viewMode === 'questions'
                  ? 'bg-[#253655] text-white shadow-sm border border-white/10 cursor-pointer'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white cursor-pointer'
              }`}
            >
              <span className="flex items-center gap-3 truncate">
                {!isUnlocked || isExamInProgress ? (
                  <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                ) : (
                  <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
                <span className="truncate">Previous Year Questions</span>
              </span>
            </button>

            {/* 3. Mock Test (Accessible to All — Locked while an active Mock Test is in progress) */}
            <button
              type="button"
              data-testid="tab-cbt-mock-tests"
              aria-disabled={isExamInProgress}
              title={examLockTooltip}
              onClick={() => handleNavigateSection('cbt-mock-tests')}
              className={`w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all text-left ${
                isExamInProgress
                  ? 'bg-[#253655]/80 text-amber-300 border border-amber-400/30 cursor-not-allowed'
                  : primarySectionTab === 'cbt-mock-tests' &&
                    viewMode === 'questions'
                  ? 'bg-[#253655] text-white shadow-sm border border-white/10 cursor-pointer'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white cursor-pointer'
              }`}
            >
              <span className="flex items-center gap-3 truncate">
                <MonitorCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">Mock Test</span>
              </span>
              {isExamInProgress ? (
                <span className="px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-extrabold shrink-0">
                  IN PROGRESS
                </span>
              ) : !isUnlocked ? (
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-extrabold shrink-0">
                  1 FREE
                </span>
              ) : null}
            </button>

            {/* 4. My Test */}
            <button
              type="button"
              data-testid="tab-my-tests"
              aria-disabled={isExamInProgress}
              title={examLockTooltip}
              onClick={() => handleNavigateSection('my-tests')}
              className={`w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all text-left ${
                isExamInProgress
                  ? 'opacity-50 cursor-not-allowed text-slate-400 bg-white/5'
                  : primarySectionTab === 'my-tests' &&
                    viewMode === 'questions'
                  ? 'bg-[#253655] text-white shadow-sm border border-white/10 cursor-pointer'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white cursor-pointer'
              }`}
            >
              <span className="flex items-center gap-3 truncate">
                <ClipboardCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">My Test</span>
              </span>
              {isExamInProgress && (
                <Lock className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
              )}
            </button>

            {/* Active Exam Sidebar Lock Banner / Toast Notice */}
            {isExamInProgress && (
              <div
                data-testid="sidebar-exam-lock-notice"
                role="status"
                className={`mt-3 p-3 rounded-xl border text-xs leading-relaxed transition-all ${
                  examLockNotice
                    ? 'bg-amber-500/25 border-amber-400 text-amber-200 shadow-md ring-2 ring-amber-400/40'
                    : 'bg-slate-900/60 border-white/10 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-1.5 font-extrabold text-amber-300 mb-0.5">
                  <Lock className="w-3.5 h-3.5 shrink-0" />
                  <span>Exam Navigation Locked</span>
                </div>
                <p data-testid="exam-lock-toast-text">
                  Complete and submit your active Mock Test first.
                </p>
              </div>
            )}

            {/* Invisible Admin Controls in Sidebar — Appears ONLY when gourab.saheb100@gmail.com is logged in */}
            {isAdminUser && (
              <div className="pt-3 mt-3 border-t border-white/10">
                <button
                  type="button"
                  data-testid="sidebar-admin-panel-btn"
                  onClick={() => setAdminModalOpen(true)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 hover:bg-amber-500/30 text-xs font-extrabold transition-colors cursor-pointer"
                >
                  <Settings className="w-4 h-4 shrink-0" />
                  <span>Admin Control Panel</span>
                </button>
              </div>
            )}
          </nav>
        </div>

        {/* Bottom Sidebar Footer Status */}
        <div className="hidden md:block p-4 border-t border-white/10 space-y-2.5">
          {!isUnlocked ? (
            <button
              type="button"
              aria-disabled={isExamInProgress}
              title={examLockTooltip}
              onClick={handleTriggerUnlockFlow}
              className={`w-full py-2.5 px-3 rounded-xl font-extrabold text-xs shadow-sm transition-colors flex items-center justify-center gap-1.5 ${
                isExamInProgress
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-60'
                  : 'bg-[#F5A623] hover:bg-[#E09112] text-slate-950 cursor-pointer'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Unlock Full Portal (₹100)</span>
            </button>
          ) : (
            <div className="px-3 py-2 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Lifetime Access Active</span>
            </div>
          )}
          <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
            <span>WBPSC Clerkship 2026</span>
            {isAdminUser && (
              <button
                type="button"
                data-testid="top-nav-option-btn"
                onClick={() => setAdminModalOpen(true)}
                title="Admin Option & Upload"
                className="text-amber-300 hover:text-amber-200 font-bold transition-colors cursor-pointer"
              >
                Option
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* =====================================================================
          RIGHT MAIN WORKSPACE COLUMN (Persistent Top Header + Soft Off-White Canvas)
          ===================================================================== */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Persistent Top Header Bar (Matches Image 1) */}
        <header className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-3 px-4 sm:px-8 py-3.5 bg-white/95 backdrop-blur border-b border-slate-200/90 shadow-2xs">
          {/* Left: Dynamic Page Title */}
          <h1 className="text-base sm:text-xl font-extrabold tracking-tight text-[#0B192C] truncate">
            {topHeaderPageTitle}
          </h1>

          {/* Right: "[ English | বাংলা ]" Pill Toggle + "Sign in with Google" / Profile Menu */}
          <div className="relative flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              data-testid="top-language-toggle-btn"
              onClick={() => setShowBengali((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                showBengali
                  ? 'bg-slate-100 border-slate-300 text-slate-900'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>[ English | বাংলা ]</span>
            </button>

            {!isLoggedIn ? (
              <button
                type="button"
                data-testid="top-nav-signin-btn"
                aria-disabled={isExamInProgress}
                title={examLockTooltip}
                onClick={() => {
                  if (isExamInProgress) {
                    setExamLockNotice(true);
                    return;
                  }
                  setViewMode('signin');
                  scrollToFeedTop();
                }}
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold border shadow-2xs transition-all whitespace-nowrap shrink-0 ${
                  isExamInProgress
                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                    : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-300 cursor-pointer'
                }`}
              >
                <GoogleGLogo className="w-3.5 h-3.5" />
                <span>Sign in with Google</span>
              </button>
            ) : (
              <div className="relative">
                <button
                  type="button"
                  data-testid="top-nav-profile-btn"
                  aria-disabled={isExamInProgress}
                  title={examLockTooltip}
                  onClick={() => {
                    if (isExamInProgress) {
                      setExamLockNotice(true);
                      return;
                    }
                    setProfileDropdownOpen((prev) => !prev);
                  }}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-colors whitespace-nowrap ${
                    isExamInProgress
                      ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-slate-100 border-slate-300 text-slate-900 hover:bg-slate-200 cursor-pointer'
                  }`}
                >
                  <User className="w-3.5 h-3.5 text-[#162238]" />
                  <span>Profile</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      isUnlocked
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {accountStatusLabel}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {profileDropdownOpen && (
                  <div
                    data-testid="profile-dropdown-menu"
                    className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-50 space-y-3 text-xs"
                  >
                    <div className="pb-2.5 border-b border-slate-100 space-y-1">
                      <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-bold">
                        Google Account
                      </span>
                      <div
                        data-testid="profile-email-display"
                        className="font-extrabold text-slate-900 truncate"
                      >
                        {displayAccountEmail}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">
                        Account Status:
                      </span>
                      <span
                        data-testid="profile-status-badge"
                        className={`px-2 py-0.5 rounded-full font-bold ${
                          isUnlocked
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {accountStatusLabel}
                      </span>
                    </div>

                    {!isUnlocked && (
                      <button
                        type="button"
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          setViewMode('payment');
                          scrollToFeedTop();
                        }}
                        className="w-full py-2.5 px-3 rounded-xl bg-[#F5A623] text-slate-950 font-extrabold hover:bg-[#E09112] transition-colors text-center cursor-pointer"
                      >
                        Complete ₹100 Google Pay QR Payment →
                      </button>
                    )}

                    {isAdminUser && (
                      <button
                        type="button"
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          setAdminModalOpen(true);
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-[#162238] text-amber-300 font-bold hover:bg-[#1E2E4A] transition-colors text-center cursor-pointer"
                      >
                        Open Admin Option Panel
                      </button>
                    )}

                    <div className="pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        data-testid="profile-signout-btn"
                        onClick={handleSignOut}
                        className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-bold hover:bg-rose-100 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Floating Top Notice when user clicks a locked sidebar tab during an active Mock Test */}
        {isExamInProgress && examLockNotice && (
          <div
            data-testid="active-exam-lock-toast"
            role="alert"
            className="mx-4 sm:mx-8 mt-4 px-4 py-3 rounded-2xl bg-[#162238] text-amber-300 border border-amber-400/50 shadow-lg flex items-center justify-between gap-3 text-xs sm:text-sm font-extrabold"
          >
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Complete and submit your active Mock Test first.</span>
            </div>
            <button
              type="button"
              onClick={() => setExamLockNotice(false)}
              className="text-xs text-slate-300 hover:text-white underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Main Content Canvas */}
        <main
          id="top"
          className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-8"
        >
          {/* Strict Flow Step 1: Split-Screen Login & Unlock Page (Matches Image 2) */}
          {!isUnlocked && viewMode === 'signin' ? (
            <div id="question-feed-top">
              <StudentSignInScreen
                totalQuestions={dynamicQuestions.length}
                onSignInSuccess={handleSignInSuccess}
                onReturnToFreePreview={() => {
                  setPrimarySectionTab('demo-practice');
                  setViewMode('questions');
                }}
                onOpenAdminModal={() => setAdminModalOpen(true)}
              />
            </div>
          ) : !isUnlocked && viewMode === 'payment' ? (
            /* Strict Flow Step 2: Split-Screen ₹100 Google Pay QR Payment Page */
            <div id="question-feed-top">
              {!userEmail.trim() ? (
                <StudentSignInScreen
                  totalQuestions={dynamicQuestions.length}
                  onSignInSuccess={handleSignInSuccess}
                  onReturnToFreePreview={() => {
                    setPrimarySectionTab('demo-practice');
                    setViewMode('questions');
                  }}
                  onOpenAdminModal={() => setAdminModalOpen(true)}
                />
              ) : (
                <UpiQrPaymentScreen
                  totalQuestions={dynamicQuestions.length}
                  userEmail={userEmail}
                  userName={userName}
                  upiSettings={upiSettings}
                  existingSubmission={currentUserSubmission}
                  onSubmitUtrVerification={handleSubmitUtrVerification}
                  onReturnToFreePreview={() => {
                    setPrimarySectionTab('demo-practice');
                    setViewMode('questions');
                  }}
                  onOpenAdminModal={() => setAdminModalOpen(true)}
                />
              )}
            </div>
          ) : primarySectionTab === 'cbt-mock-tests' ||
            primarySectionTab === 'my-tests' ? (
            /* =================================================================
               SCREEN 4 & 5: MOCK TEST & MY TEST
               - Accessible to all visitors!
               - Mock Test 1 (100 Questions) is FREE & Unlocked for everyone.
               - Mock Test 2, 3, 4, 5+ are Strictly LOCKED for unpaid users (clicking redirects to Login & ₹100 Unlock Page).
               ================================================================= */
            <MockCbtExamView
              mockQuestions={dynamicMockQuestions}
              activeSubTab={
                primarySectionTab === 'my-tests' ? 'my-tests' : 'cbt-lobby'
              }
              onChangeSubTab={(sub) =>
                setPrimarySectionTab(
                  sub === 'my-tests' ? 'my-tests' : 'cbt-mock-tests'
                )
              }
              hasFullAccess={isUnlocked}
              isAdminBypassActive={
                isAdminAuthenticated && !adminPreviewFreeMode
              }
              userEmail={displayAccountEmail}
              userName={userName}
              onRequirePaidAccess={handleTriggerUnlockFlow}
              completedTestNumbers={completedMockTestNumbers}
              savedAttempts={savedMockAttempts}
              onRecordCompletedAttempt={handleRecordCompletedMockAttempt}
              onExamInProgressChange={setIsExamInProgress}
            />
          ) : !isUnlocked || primarySectionTab === 'demo-practice' ? (
            /* =================================================================
               SCREEN 1: DEMO / PRACTICE SET (LANDING PAGE — MATCHES IMAGE 1)
               ================================================================= */
            <div id="question-feed-top" className="space-y-6">
              {/* Two-Column Grid of White Rounded MCQ Cards (Matches Image 1) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                {freePreviewPool.map((question, idx) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    displayIndex={idx + 1}
                    showBengali={showBengali}
                    isExpanded={expandedIds.has(question.id)}
                    onToggleExpand={handleToggleExpand}
                    selectedOption={userAnswers[question.id]}
                    onSelectOption={handleSelectOption}
                    onClearOption={handleClearOption}
                    isBookmarked={bookmarkedIds.has(question.id)}
                    onToggleBookmark={handleToggleBookmark}
                    onOpenPdfAtPage={handleOpenPdfAtPage}
                  />
                ))}
              </div>

              {/* Bottom Locked Gateway Cards + Golden "Sign In with Google to Unlock All for ₹100" Button (Matches Image 1) */}
              <CourseOfferCard
                totalQuestions={dynamicQuestions.length}
                totalPrelimQuestions={archiveStageTotals.prelimCount}
                totalMainsQuestions={archiveStageTotals.mainsCount}
                totalPapers={dynamicPapers.length}
                onClickUnlockCta={handleTriggerUnlockFlow}
                onClickPreviousYearPapers={() =>
                  handleNavigateSection('pyq-archive')
                }
                onClickSequentialMockTests={() =>
                  handleNavigateSection('cbt-mock-tests')
                }
              />
            </div>
          ) : activePaperId === 'all' ? (
            /* =================================================================
               SCREEN 3A: PREVIOUS YEAR QUESTIONS — YEAR-WISE / PAPER-WISE CARDS
               (No "Pages 1 to 27" all-questions dump! Clean Year-Wise Cards)
               ================================================================= */
            <div
              id="question-feed-top"
              data-testid="pyq-yearwise-lobby"
              className="space-y-8"
            >
              {/* Top Royal Navy Banner */}
              <section className="rounded-3xl bg-gradient-to-r from-[#0F1B2E] via-[#162238] to-[#1B2B48] text-white p-6 sm:p-8 border border-amber-400/30 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-extrabold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>YEAR-WISE &amp; SET-WISE OFFICIAL PAPERS</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Select a Previous Year Question Paper
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                    Choose any specific year and shift below to open its
                    complete solved question sheet with a dedicated scrollable
                    question index and original PDF reference.
                  </p>
                </div>
              </section>

              {/* Year-Grouped Clickable Paper Cards */}
              {papersGroupedByYear.map(([yearLabel, yearPapers]) => (
                <section key={yearLabel} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-1.5 rounded-full bg-[#162238] text-[#F5A623] text-sm font-extrabold tracking-tight shadow-xs">
                      {yearLabel} Examination Papers
                    </span>
                    <div className="h-px flex-1 bg-slate-300/80" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {yearPapers.map((paper) => {
                      const isPrelim =
                        paper.examStage === 'Prelim (Part-I Objective)';
                      return (
                        <div
                          key={paper.id}
                          data-testid={`year-paper-card-${paper.id}`}
                          className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all flex flex-col justify-between space-y-5"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between gap-2">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                                  isPrelim
                                    ? 'bg-[#0D8A6A] text-white'
                                    : 'bg-[#162238] text-amber-300'
                                }`}
                              >
                                {isPrelim
                                  ? `${paper.year} Prelims`
                                  : `${paper.year} Mains`}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  handleOpenPaperPdf(
                                    paper.pdfUrl,
                                    paper.shortLabel
                                  )
                                }
                                className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-[#162238] cursor-pointer"
                                title="View Original Question Paper PDF"
                              >
                                <FileText className="w-3.5 h-3.5" />
                                <span>PDF</span>
                              </button>
                            </div>

                            <h3 className="text-lg font-extrabold text-[#0B192C] leading-snug">
                              {paper.shortLabel}
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                              {paper.title}
                            </p>
                          </div>

                          <button
                            type="button"
                            data-testid={`open-paper-btn-${paper.id}`}
                            onClick={() => {
                              setActivePaperId(paper.id);
                              setActiveCategory('all');
                              setActiveSubTopic('all');
                              setCurrentPage(1);
                              scrollToFeedTop();
                            }}
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#F5A623] hover:bg-[#E09112] text-slate-950 text-xs sm:text-sm font-extrabold shadow-xs transition-colors cursor-pointer"
                          >
                            <BookOpen className="w-4 h-4" />
                            <span>Open {paper.shortLabel}</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            /* =================================================================
               SCREEN 3B: SELECTED YEAR'S QUESTION SHEET (With Per-Year Question Index)
               ================================================================= */
            <>
              {/* Top Bar inside Selected Year Paper: Back to All Year Cards + Search + Expand Answers */}
              <section className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 mb-6 shadow-md space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <button
                    type="button"
                    data-testid="back-to-year-cards-btn"
                    onClick={() => {
                      setActivePaperId('all');
                      handleResetFilters();
                    }}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#162238] text-amber-300 hover:bg-[#1E2E4A] text-xs font-extrabold transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to All Year-Wise Papers</span>
                  </button>

                  {activePaperMeta && (
                    <span className="text-xs sm:text-sm font-extrabold text-[#0B192C]">
                      {activePaperMeta.shortLabel} · {activePaperMeta.examStage}
                    </span>
                  )}
                </div>

                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search questions within this paper..."
                      aria-label="Search questions, topics, or question number"
                      className="w-full pl-10 pr-9 py-2.5 text-sm bg-[#F4F6F9] border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#162238] transition-colors"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        aria-label="Clear search query"
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleToggleExpandCurrentPage}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-extrabold bg-[#162238] text-amber-300 hover:bg-[#1E2E4A] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>
                        {allPageExpanded
                          ? 'Collapse Page Answers'
                          : 'Expand Page Answers'}
                      </span>
                      {allPageExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </section>

              {/* Two-Column Dashboard Layout: Per-Year Question Index Sidebar + Selected Paper Questions */}
              <div className="flex flex-col lg:flex-row items-start gap-6">
                <SidebarPanel
                  papers={dynamicPapers}
                  totalQuestionsCount={dynamicQuestions.length}
                  isUnlocked={isUnlocked}
                  onRequestPaywall={handleTriggerUnlockFlow}
                  activePaperId={activePaperId}
                  onSelectPaperId={setActivePaperId}
                  activeAutoType={activeAutoType}
                  onSelectAutoType={setActiveAutoType}
                  autoTypeCounts={autoTypeCounts}
                  trackingStats={trackingStats}
                  categoryCounts={categoryCounts}
                  activeCategory={activeCategory}
                  onSelectCategory={setActiveCategory}
                  activeSubTopic={activeSubTopic}
                  onSelectSubTopic={setActiveSubTopic}
                  availableSubTopics={availableSubTopics}
                  attemptFilter={attemptFilter}
                  onSelectAttemptFilter={setAttemptFilter}
                  score={score}
                  onResetAllAnswers={handleResetAllAnswers}
                  paperScopedQuestions={paperScopedQuestions}
                  currentPageQuestionIds={currentPageQuestionIds}
                  currentPage={pagination.currentPage}
                  userAnswers={userAnswers}
                  bookmarkedIds={bookmarkedIds}
                  onJumpToQuestionId={handleJumpToQuestionId}
                  onOpenPaperPdf={handleOpenPaperPdf}
                />

                {/* Selected Year Paper Paginated Question Feed */}
                <div
                  id="question-feed-top"
                  className="flex-1 w-full min-w-0 space-y-5"
                >
                  {/* Top Status & Paper-Scoped Pagination Bar */}
                  <div className="bg-white border border-slate-200/90 rounded-2xl px-5 py-3.5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
                    <div>
                      {activePaperMeta && (
                        <span className="font-bold text-slate-800">
                          {activePaperMeta.shortLabel} · Showing Questions{' '}
                          {pagination.startIndex}–{pagination.endIndex}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {(activeCategory !== 'all' ||
                        activeSubTopic !== 'all' ||
                        searchQuery.trim() !== '' ||
                        attemptFilter !== 'all') && (
                        <button
                          type="button"
                          onClick={handleResetFilters}
                          className="text-xs font-bold text-[#162238] hover:underline mr-2 cursor-pointer"
                        >
                          Clear filters
                        </button>
                      )}

                      {displayTotalPages > 1 && (
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            disabled={pagination.currentPage <= 1}
                            onClick={() =>
                              handleChangePage(pagination.currentPage - 1)
                            }
                            aria-label="Previous page"
                            className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 font-mono-tabular font-bold text-slate-800">
                            Sheet Part {pagination.currentPage} /{' '}
                            {displayTotalPages}
                          </span>
                          <button
                            type="button"
                            data-testid="top-next-page-btn"
                            disabled={
                              pagination.currentPage >= pagination.totalPages
                            }
                            onClick={() =>
                              handleChangePage(pagination.currentPage + 1)
                            }
                            aria-label="Next page"
                            className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {pagination.items.length > 0 ? (
                    <>
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 items-start">
                        {pagination.items.map((question) => (
                          <QuestionCard
                            key={question.id}
                            question={question}
                            showBengali={showBengali}
                            isExpanded={expandedIds.has(question.id)}
                            onToggleExpand={handleToggleExpand}
                            selectedOption={userAnswers[question.id]}
                            onSelectOption={handleSelectOption}
                            onClearOption={handleClearOption}
                            isBookmarked={bookmarkedIds.has(question.id)}
                            onToggleBookmark={handleToggleBookmark}
                            onOpenPdfAtPage={handleOpenPdfAtPage}
                          />
                        ))}
                      </div>

                      {/* Bottom Pagination Bar for Selected Year Paper */}
                      {displayTotalPages > 1 && (
                        <nav
                          aria-label="Question Feed Pagination"
                          className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3"
                        >
                          <div className="text-xs text-slate-600 font-mono-tabular">
                            {activePaperMeta?.shortLabel} · Part{' '}
                            <strong className="text-slate-900">
                              {pagination.currentPage}
                            </strong>{' '}
                            of{' '}
                            <strong className="text-slate-900">
                              {displayTotalPages}
                            </strong>
                          </div>

                          <div className="flex flex-wrap items-center gap-1.5">
                            <button
                              type="button"
                              disabled={pagination.currentPage <= 1}
                              onClick={() =>
                                handleChangePage(pagination.currentPage - 1)
                              }
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                              <span>Prev</span>
                            </button>

                            {visiblePageNumbers.map((pageNum, idx) => {
                              const prevPage =
                                idx > 0 ? visiblePageNumbers[idx - 1] : null;
                              const showEllipsis =
                                prevPage !== null && pageNum - prevPage > 1;
                              const isCurrent =
                                pageNum === pagination.currentPage;

                              return (
                                <React.Fragment key={pageNum}>
                                  {showEllipsis && (
                                    <span className="px-1.5 text-xs text-slate-400 select-none">
                                      …
                                    </span>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => handleChangePage(pageNum)}
                                    className={`min-w-[34px] h-8 px-2.5 rounded-xl text-xs font-mono-tabular font-extrabold border transition-colors cursor-pointer ${
                                      isCurrent
                                        ? 'bg-[#162238] text-amber-300 border-[#162238]'
                                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                    }`}
                                  >
                                    {pageNum}
                                  </button>
                                </React.Fragment>
                              );
                            })}

                            <button
                              type="button"
                              data-testid="bottom-next-page-btn"
                              disabled={
                                pagination.currentPage >= pagination.totalPages
                              }
                              onClick={() =>
                                handleChangePage(pagination.currentPage + 1)
                              }
                              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-[#F5A623] text-slate-950 text-xs font-extrabold hover:bg-[#E09112] disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                            >
                              <span>Next</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </nav>
                      )}
                    </>
                  ) : (
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-10 text-center space-y-3 shadow-sm">
                      <h3 className="text-base font-extrabold text-slate-900">
                        No questions match your current filters
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                        Try clearing your search query or resetting your active
                        subject filter.
                      </p>
                      <button
                        type="button"
                        onClick={handleResetFilters}
                        className="px-4 py-2 rounded-xl text-xs font-extrabold bg-[#162238] text-amber-300 hover:bg-[#1E2E4A] transition-colors cursor-pointer"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </main>

        {/* Quiet Footer */}
        <footer className="mt-12 border-t border-slate-200/80 bg-white/80 py-4 px-4 sm:px-8 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>WBPSC Clerkship 2026 Preparation Portal</span>
            <span>Previous Year Questions &amp; Sequential Mock Tests</span>
          </div>
        </footer>
      </div>

      {/* Persistent Floating Bottom-Right "AI Help & Payment Support" Chat Bubble (Matches Image 1) */}
      <FloatingSupportChat
        isUnlocked={isUnlocked}
        isLoggedIn={isLoggedIn}
        userEmail={displayAccountEmail}
        upiId={upiSettings.upiId}
        onTriggerSignInOrPayment={handleTriggerUnlockFlow}
      />

      {/* PDF Viewer Modal */}
      <PdfReferenceModal
        isOpen={pdfModalOpen}
        initialPage={pdfPage}
        pdfUrl={pdfUrl}
        paperTitle={pdfPaperTitle}
        onClose={() => setPdfModalOpen(false)}
        onChangePdfUrl={(newUrl, newTitle) => {
          setPdfUrl(newUrl);
          setPdfPaperTitle(newTitle);
          setPdfPage(1);
        }}
      />

      {/* Admin "Option" Modal (Restricted to gourab.saheb100@gmail.com) */}
      <AdminOptionModal
        isOpen={adminModalOpen}
        isAdminAuthenticated={isAdminAuthenticated}
        adminPreviewFreeMode={adminPreviewFreeMode}
        onToggleAdminPreviewFreeMode={() =>
          setAdminPreviewFreeMode((prev) => !prev)
        }
        onAuthenticateAdmin={handleAuthenticateAdmin}
        onLogoutAdmin={handleLogoutAdmin}
        onClose={() => setAdminModalOpen(false)}
        allQuestions={dynamicQuestions}
        customQuestions={customQuestions}
        mockQuestions={dynamicMockQuestions}
        onAddExtractedQuestions={handleAddExtractedQuestions}
        onAddExtractedMockQuestions={handleAddExtractedMockQuestions}
        onClearCustomQuestions={handleClearCustomQuestions}
        upiSettings={upiSettings}
        onUpdateUpiSettings={handleUpdateUpiSettings}
        utrSubmissions={utrSubmissions}
        onApproveUtrSubmission={handleApproveUtrSubmission}
      />
    </div>
  );
}
