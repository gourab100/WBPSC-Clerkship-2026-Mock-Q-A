import React, { useEffect, useMemo, useState } from 'react';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Clock,
  FileText,
  Flag,
  Lock,
  Play,
  RotateCcw,
  Send,
  Trophy,
  Unlock,
  XCircle,
} from 'lucide-react';
import { OptionKey, QuestionItem } from '../types/question';
import {
  buildMockTestsFromPool,
  MockTestAttemptRecord,
  MockTestDefinition,
} from '../data/mock500Part2';
import { MathBlock } from './MathBlock';

const LatexText: React.FC<{ text: string }> = ({ text }) => {
  if (text.startsWith('$') && text.endsWith('$') && text.length > 2) {
    return <MathBlock latex={text.slice(1, -1)} displayMode={false} />;
  }
  const parts = text.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((part, idx) => {
        if (part.startsWith('[') && part.endsWith(']')) {
          return (
            <span
              key={idx}
              className="underline decoration-emerald-600 decoration-2 underline-offset-4 font-bold"
            >
              {part.slice(1, -1)}
            </span>
          );
        }
        return <React.Fragment key={idx}>{part}</React.Fragment>;
      })}
    </>
  );
};

interface MockCbtExamViewProps {
  mockQuestions: QuestionItem[];
  activeSubTab: 'cbt-lobby' | 'my-tests';
  onChangeSubTab: (tab: 'cbt-lobby' | 'my-tests') => void;
  hasFullAccess: boolean;
  isAdminBypassActive: boolean;
  userEmail: string;
  userName: string;
  onRequirePaidAccess: () => void;
  completedTestNumbers: number[];
  savedAttempts: MockTestAttemptRecord[];
  onRecordCompletedAttempt: (attempt: MockTestAttemptRecord) => void;
  onExamInProgressChange?: (inProgress: boolean) => void;
}

const OPTION_KEYS: OptionKey[] = ['A', 'B', 'C', 'D'];

export const MockCbtExamView: React.FC<MockCbtExamViewProps> = ({
  mockQuestions,
  activeSubTab,
  onChangeSubTab,
  hasFullAccess,
  isAdminBypassActive,
  userEmail,
  userName,
  onRequirePaidAccess,
  completedTestNumbers,
  savedAttempts,
  onRecordCompletedAttempt,
  onExamInProgressChange,
}) => {
  // Dynamically group into 100-question Mock Tests via Math.ceil(mockQuestions.length / 100)
  const mockTests = useMemo(
    () => buildMockTestsFromPool(mockQuestions),
    [mockQuestions]
  );

  // Active running CBT session state
  const [activeTest, setActiveTest] = useState<MockTestDefinition | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, OptionKey>
  >({});
  const [descriptiveDrafts, setDescriptiveDrafts] = useState<
    Record<string, string>
  >({});
  const [visitedIds, setVisitedIds] = useState<Record<string, boolean>>({});
  const [flaggedIds, setFlaggedIds] = useState<Record<string, boolean>>({});
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState<boolean>(false);
  const [showQuitConfirm, setShowQuitConfirm] = useState<boolean>(false);

  // Sync active exam state with parent App so sidebar navigation is locked while an exam is running
  useEffect(() => {
    onExamInProgressChange?.(Boolean(activeTest));
    return () => {
      onExamInProgressChange?.(false);
    };
  }, [activeTest, onExamInProgressChange]);

  // Detailed solution inspection state inside "My Test"
  const [inspectingAttemptId, setInspectingAttemptId] = useState<string | null>(
    null
  );
  const [solutionFilter, setSolutionFilter] = useState<
    'ATTEMPTED' | 'CORRECT' | 'WRONG'
  >('ATTEMPTED');

  // Timer tick when a CBT Mock Test is active
  useEffect(() => {
    if (!activeTest) return;
    const timer = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [activeTest]);

  // Determine highest unlocked test number (Sequential Unlocking: Test 1 is unlocked; finishing Test N unlocks Test N+1)
  const highestUnlockedTestNumber = useMemo(() => {
    if (isAdminBypassActive) return mockTests.length;
    if (completedTestNumbers.length === 0) return 1;
    const maxCompleted = Math.max(...completedTestNumbers);
    return Math.min(mockTests.length, maxCompleted + 1);
  }, [isAdminBypassActive, completedTestNumbers, mockTests.length]);

  const isTestUnlocked = (testNumber: number): boolean => {
    if (isAdminBypassActive) return true;
    if (testNumber === 1) return true;
    // Mock Tests 2+ are strictly locked for unpaid visitors
    if (!hasFullAccess) return false;
    return (
      completedTestNumbers.includes(testNumber - 1) ||
      testNumber <= highestUnlockedTestNumber
    );
  };

  const handleStartMockTest = (
    test: MockTestDefinition,
    resumeAttempt?: MockTestAttemptRecord
  ) => {
    if (!hasFullAccess && !isAdminBypassActive && test.testNumber > 1) {
      onRequirePaidAccess();
      return;
    }

    if (!isTestUnlocked(test.testNumber)) {
      return;
    }

    const firstQ = test.questions[0];
    setActiveTest(test);
    setCurrentIndex(0);
    setSelectedAnswers(resumeAttempt ? { ...resumeAttempt.selectedAnswers } : {});
    setDescriptiveDrafts(
      resumeAttempt ? { ...resumeAttempt.descriptiveDrafts } : {}
    );
    setVisitedIds(firstQ ? { [firstQ.id]: true } : {});
    setFlaggedIds({});
    setElapsedSeconds(0);
    setShowSubmitConfirm(false);
    setShowQuitConfirm(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJumpToQuestion = (index: number) => {
    if (!activeTest) return;
    const targetQ = activeTest.questions[index];
    if (!targetQ) return;
    setCurrentIndex(index);
    setVisitedIds((prev) => ({ ...prev, [targetQ.id]: true }));
  };

  const handleSelectOption = (questionId: string, optionKey: OptionKey) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionKey,
    }));
    setVisitedIds((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleClearSelection = () => {
    if (!activeTest) return;
    const currentQ = activeTest.questions[currentIndex];
    if (!currentQ) return;
    setSelectedAnswers((prev) => {
      const next = { ...prev };
      delete next[currentQ.id];
      return next;
    });
    setDescriptiveDrafts((prev) => {
      const next = { ...prev };
      delete next[currentQ.id];
      return next;
    });
  };

  const handleToggleFlagForReview = () => {
    if (!activeTest) return;
    const currentQ = activeTest.questions[currentIndex];
    if (!currentQ) return;
    setFlaggedIds((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id],
    }));
    setVisitedIds((prev) => ({ ...prev, [currentQ.id]: true }));
  };

  const handleSaveAndNext = () => {
    if (!activeTest) return;
    const currentQ = activeTest.questions[currentIndex];
    if (currentQ) {
      setVisitedIds((prev) => ({ ...prev, [currentQ.id]: true }));
    }
    if (currentIndex < activeTest.questions.length - 1) {
      const nextIdx = currentIndex + 1;
      const nextQ = activeTest.questions[nextIdx];
      setCurrentIndex(nextIdx);
      if (nextQ) {
        setVisitedIds((prev) => ({ ...prev, [nextQ.id]: true }));
      }
    } else {
      setShowSubmitConfirm(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (!activeTest || currentIndex <= 0) return;
    const prevIdx = currentIndex - 1;
    const prevQ = activeTest.questions[prevIdx];
    setCurrentIndex(prevIdx);
    if (prevQ) {
      setVisitedIds((prev) => ({ ...prev, [prevQ.id]: true }));
    }
  };

  const handleFinishAndSubmitTest = () => {
    if (!activeTest) return;

    let mcqTotal = 0;
    let attemptedMcqCount = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let attemptedDescriptiveCount = 0;

    for (const q of activeTest.questions) {
      const isMcq = Boolean(q.options && q.correctOption);
      if (!isMcq) {
        if (
          descriptiveDrafts[q.id] &&
          descriptiveDrafts[q.id].trim().length > 0
        ) {
          attemptedDescriptiveCount += 1;
        }
        continue;
      }
      mcqTotal += 1;
      const chosen = selectedAnswers[q.id];
      if (!chosen) continue;
      attemptedMcqCount += 1;
      if (chosen === q.correctOption) {
        correctCount += 1;
      } else {
        wrongCount += 1;
      }
    }

    const totalAttemptedAll = attemptedMcqCount + attemptedDescriptiveCount;
    const unattemptedCount = Math.max(
      0,
      activeTest.questions.length - totalAttemptedAll
    );
    const positiveMarks = Number(correctCount.toFixed(2));
    const negativeMarks = Number((wrongCount * 0.25).toFixed(2));
    const netMcqScore = Number((positiveMarks - negativeMarks).toFixed(2));
    const accuracyPercent =
      attemptedMcqCount > 0
        ? Math.round((correctCount / attemptedMcqCount) * 100)
        : 0;

    const attemptRecord: MockTestAttemptRecord = {
      attemptId: `ATTEMPT-T${activeTest.testNumber}-${Date.now()}`,
      testNumber: activeTest.testNumber,
      testId: activeTest.testId,
      testTitle: activeTest.title,
      submittedAtIso: new Date().toISOString(),
      timeTakenSeconds: elapsedSeconds,
      totalQuestions: activeTest.questions.length,
      mcqTotal,
      attemptedMcqCount,
      correctCount,
      wrongCount,
      unattemptedCount,
      positiveMarks,
      negativeMarks,
      netMcqScore,
      accuracyPercent,
      selectedAnswers: { ...selectedAnswers },
      descriptiveDrafts: { ...descriptiveDrafts },
      flaggedIds: Object.keys(flaggedIds).filter((id) => flaggedIds[id]),
    };

    onRecordCompletedAttempt(attemptRecord);
    onExamInProgressChange?.(false);
    setActiveTest(null);
    setShowSubmitConfirm(false);
    setShowQuitConfirm(false);
    setInspectingAttemptId(attemptRecord.attemptId);
    setSolutionFilter('ATTEMPTED');
    onChangeSubTab('my-tests');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDurationClock = (totalSeconds: number): string => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Live Navigator Status Counts for the Active CBT Test
  const navigatorStats = useMemo(() => {
    if (!activeTest) {
      return { answered: 0, skipped: 0, flagged: 0, unvisited: 0 };
    }
    let answered = 0;
    let skipped = 0;
    let flagged = 0;
    let unvisited = 0;

    for (const q of activeTest.questions) {
      const isAnswered =
        Boolean(selectedAnswers[q.id]) ||
        Boolean(
          descriptiveDrafts[q.id] && descriptiveDrafts[q.id].trim().length > 0
        );
      const isFlagged = Boolean(flaggedIds[q.id]);
      const isVisited = Boolean(visitedIds[q.id]);

      if (isFlagged) {
        flagged += 1;
      } else if (isAnswered) {
        answered += 1;
      } else if (isVisited) {
        skipped += 1;
      } else {
        unvisited += 1;
      }
    }

    return { answered, skipped, flagged, unvisited };
  }, [activeTest, selectedAnswers, descriptiveDrafts, flaggedIds, visitedIds]);

  // ============================================================================
  // 1. ACTIVE SINGLE-QUESTION CBT EXAM INTERFACE
  // ============================================================================
  if (activeTest) {
    const currentQuestion = activeTest.questions[currentIndex];
    const isMainsQuestion =
      !currentQuestion.options || !currentQuestion.correctOption;
    const chosenOption = selectedAnswers[currentQuestion.id];
    const isCurrentFlagged = Boolean(flaggedIds[currentQuestion.id]);
    const remainingSeconds = Math.max(
      0,
      activeTest.durationMinutes * 60 - elapsedSeconds
    );

    return (
      <div
        data-testid="cbt-active-exam-screen"
        className="rounded-3xl border border-slate-800 bg-white shadow-xl overflow-hidden"
      >
        {/* Top Royal Navy Exam Header Bar */}
        <div className="bg-gradient-to-r from-[#0B1528] via-[#112240] to-[#0F2942] text-white px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-black text-base">
              M{activeTest.testNumber}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-extrabold tracking-tight text-white">
                  {activeTest.title} — 100 Questions
                </h2>
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Q1 to Q{activeTest.questions.length}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Candidate:{' '}
                <span className="font-semibold text-amber-300">
                  {userName || userEmail || 'WBPSC Aspirant'}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            {/* Countdown Timer Badge */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-amber-400/40">
              <Clock className="w-4 h-4 text-amber-400" />
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold leading-none">
                  Time Remaining
                </div>
                <div className="text-sm font-mono font-extrabold text-amber-300">
                  {formatDurationClock(remainingSeconds)}
                </div>
              </div>
            </div>

            <button
              type="button"
              data-testid="cbt-finish-submit-btn"
              onClick={() => setShowSubmitConfirm(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-extrabold shadow-md transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              Finish &amp; Submit Test
            </button>

            <button
              type="button"
              data-testid="cbt-quit-abandon-btn"
              onClick={() => setShowQuitConfirm(true)}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-rose-950/80 text-slate-300 hover:text-rose-200 text-xs font-bold border border-slate-700 hover:border-rose-500/50 transition-colors cursor-pointer"
            >
              Quit / Abandon Test
            </button>
          </div>
        </div>

        {/* Main Two-Column CBT Body: Single Question Center Panel + Right-Side 1–100 Navigator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
          {/* Left / Center Panel: Single Question View */}
          <div className="lg:col-span-8 p-4 sm:p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50/40">
            <div>
              {/* Question Metadata Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-slate-200">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    data-testid="cbt-current-question-badge"
                    className="px-3 py-1 rounded-xl bg-[#0B1528] text-amber-300 font-extrabold text-xs sm:text-sm shadow-xs"
                  >
                    Question {currentIndex + 1} of {activeTest.questions.length}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                    {currentQuestion.category}
                  </span>
                  {isCurrentFlagged && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-100 text-purple-800 border border-purple-300 text-xs font-bold">
                      <Flag className="w-3 h-3" /> Flagged for Review
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs font-bold">
                  {isMainsQuestion ? (
                    <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 border border-amber-300">
                      Descriptive Question
                    </span>
                  ) : (
                    <>
                      <span className="px-2 py-1 rounded-md bg-emerald-100 text-emerald-800">
                        +1.00
                      </span>
                      <span className="px-2 py-1 rounded-md bg-rose-100 text-rose-800">
                        -0.25
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Question Prompt Box */}
              <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs mb-5">
                <div
                  data-testid="cbt-question-text"
                  className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed whitespace-pre-line"
                >
                  <LatexText text={currentQuestion.questionEn} />
                </div>
              </div>

              {/* Prelims MCQ 4-Option Interactive Selector OR Mains Descriptive Practice Workspace */}
              {!isMainsQuestion && currentQuestion.options ? (
                <div className="space-y-3" data-testid="cbt-options-list">
                  {OPTION_KEYS.map((key) => {
                    const opt = currentQuestion.options?.[key];
                    if (!opt) return null;
                    const isSelected = chosenOption === key;

                    return (
                      <button
                        key={key}
                        type="button"
                        data-testid={`cbt-option-${key}`}
                        onClick={() =>
                          handleSelectOption(currentQuestion.id, key)
                        }
                        className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 cursor-pointer ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50/80 shadow-sm'
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <span
                          className={`w-8 h-8 rounded-xl flex items-center justify-center font-extrabold text-sm shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[#0B1528]/10 text-[#0B1528]'
                          }`}
                        >
                          {key}
                        </span>
                        <span
                          className={`text-sm sm:text-base font-semibold pt-0.5 leading-relaxed ${
                            isSelected ? 'text-emerald-950' : 'text-slate-800'
                          }`}
                        >
                          <LatexText text={opt.en} />
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/50 p-5 space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-amber-700" />
                      <h4 className="text-sm font-extrabold text-amber-950">
                        Descriptive Answer Workspace
                      </h4>
                    </div>
                  </div>
                  <textarea
                    rows={5}
                    data-testid="cbt-descriptive-textarea"
                    value={descriptiveDrafts[currentQuestion.id] || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setDescriptiveDrafts((prev) => ({
                        ...prev,
                        [currentQuestion.id]: val,
                      }));
                      setVisitedIds((prev) => ({
                        ...prev,
                        [currentQuestion.id]: true,
                      }));
                    }}
                    placeholder="Write your descriptive answer here..."
                    className="w-full rounded-xl border border-amber-300 bg-white p-3.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              )}
            </div>

            {/* Bottom Single-Question Control Bar: Clear Selection, Flag for Review, Previous, Save & Next */}
            <div className="mt-8 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 flex-wrap">
                <button
                  type="button"
                  data-testid="cbt-clear-selection-btn"
                  onClick={handleClearSelection}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Clear Selection
                </button>

                <button
                  type="button"
                  data-testid="cbt-flag-review-btn"
                  onClick={handleToggleFlagForReview}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                    isCurrentFlagged
                      ? 'border-purple-600 bg-purple-600 text-white'
                      : 'border-amber-400 bg-amber-50 hover:bg-amber-100 text-amber-900'
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" />
                  {isCurrentFlagged ? 'Flagged for Review' : 'Flag for Review'}
                </button>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  data-testid="cbt-prev-btn"
                  disabled={currentIndex === 0}
                  onClick={handlePreviousQuestion}
                  className="inline-flex items-center gap-1 px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 text-slate-700 text-xs sm:text-sm font-bold cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                <button
                  type="button"
                  data-testid="cbt-save-next-btn"
                  onClick={handleSaveAndNext}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#0B1528] hover:bg-emerald-700 text-white text-xs sm:text-sm font-extrabold shadow-sm transition-colors cursor-pointer"
                >
                  Save &amp; Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right-Side Question Navigator Grid (Numbers 1 to 100) */}
          <div
            data-testid="cbt-right-navigator"
            className="lg:col-span-4 bg-white p-4 sm:p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                <div>
                  <h3 className="text-sm font-extrabold text-[#0B1528]">
                    Question Navigator (Q1–Q{activeTest.questions.length})
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Click any number to jump directly
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-extrabold">
                  {navigatorStats.answered}/{activeTest.questions.length}{' '}
                  Answered
                </span>
              </div>

              {/* 4-Status Color Legend */}
              <div className="grid grid-cols-2 gap-2 mb-4 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-extrabold flex items-center justify-center text-[11px]">
                    {navigatorStats.answered}
                  </span>
                  <span className="font-bold text-slate-700">Answered</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-rose-500 text-white font-extrabold flex items-center justify-center text-[11px]">
                    {navigatorStats.skipped}
                  </span>
                  <span className="font-bold text-slate-700">
                    Skipped / Visited
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-purple-600 text-white font-extrabold flex items-center justify-center text-[11px]">
                    {navigatorStats.flagged}
                  </span>
                  <span className="font-bold text-slate-700">
                    Flagged Review
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-slate-200 text-slate-700 font-extrabold flex items-center justify-center text-[11px]">
                    {navigatorStats.unvisited}
                  </span>
                  <span className="font-bold text-slate-700">Unvisited</span>
                </div>
              </div>

              {/* 1 to 100 Scrollable Pill/Square Grid */}
              <div className="grid grid-cols-5 sm:grid-cols-10 lg:grid-cols-5 xl:grid-cols-6 gap-2 max-h-[380px] overflow-y-auto pr-1 py-1">
                {activeTest.questions.map((q, idx) => {
                  const qNum = idx + 1;
                  const isCurrent = idx === currentIndex;
                  const isAnswered =
                    Boolean(selectedAnswers[q.id]) ||
                    Boolean(
                      descriptiveDrafts[q.id] &&
                        descriptiveDrafts[q.id].trim().length > 0
                    );
                  const isFlagged = Boolean(flaggedIds[q.id]);
                  const isVisited = Boolean(visitedIds[q.id]);

                  let statusClasses =
                    'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200';
                  if (isFlagged) {
                    statusClasses =
                      'bg-purple-600 text-white border-purple-700 shadow-xs';
                  } else if (isAnswered) {
                    statusClasses =
                      'bg-emerald-600 text-white border-emerald-700 shadow-xs';
                  } else if (isVisited) {
                    statusClasses =
                      'bg-rose-500 text-white border-rose-600 shadow-xs';
                  }

                  return (
                    <button
                      key={q.id}
                      type="button"
                      data-testid={`cbt-nav-btn-${qNum}`}
                      onClick={() => handleJumpToQuestion(idx)}
                      title={`Jump to Question ${qNum}`}
                      className={`h-9 rounded-xl border text-xs font-extrabold flex items-center justify-center transition-all cursor-pointer ${statusClasses} ${
                        isCurrent
                          ? 'ring-2 ring-amber-500 ring-offset-2 scale-105'
                          : ''
                      }`}
                    >
                      {qNum}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Submit Callout in Right Navigator */}
            <div className="mt-5 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowSubmitConfirm(true)}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#0B1528] to-[#162C4E] hover:from-emerald-700 hover:to-teal-700 text-amber-300 hover:text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ClipboardCheck className="w-4 h-4" />
                Finish &amp; Submit {activeTest.title}
              </button>
            </div>
          </div>
        </div>

        {/* Submit Confirmation Modal */}
        {showSubmitConfirm && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <ClipboardCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    Submit {activeTest.title}?
                  </h3>
                  <p className="text-xs text-slate-500">
                    Your attempt will be saved to "My Test".
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-500 font-semibold">
                    Answered:
                  </span>{' '}
                  <span className="font-extrabold text-emerald-700">
                    {navigatorStats.answered}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold">
                    Skipped / Visited:
                  </span>{' '}
                  <span className="font-extrabold text-rose-600">
                    {navigatorStats.skipped}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold">
                    Flagged for Review:
                  </span>{' '}
                  <span className="font-extrabold text-purple-700">
                    {navigatorStats.flagged}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold">
                    Unvisited:
                  </span>{' '}
                  <span className="font-extrabold text-slate-700">
                    {navigatorStats.unvisited}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowSubmitConfirm(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 cursor-pointer"
                >
                  Resume Exam
                </button>
                <button
                  type="button"
                  data-testid="cbt-confirm-submit-btn"
                  onClick={handleFinishAndSubmitTest}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow-md cursor-pointer"
                >
                  Confirm &amp; View Scorecard
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quit / Abandon Test Confirmation Modal */}
        {showQuitConfirm && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div
              data-testid="cbt-quit-confirm-modal"
              className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-5"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
                  <XCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    Quit / Abandon {activeTest.title}?
                  </h3>
                  <p className="text-xs text-slate-500">
                    If you abandon now, your current progress will not be saved.
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To save your scorecard and review your attempted answers in{' '}
                <strong>My Test</strong>, click{' '}
                <strong>Finish &amp; Submit Test</strong> instead.
              </p>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  data-testid="cbt-cancel-quit-btn"
                  onClick={() => setShowQuitConfirm(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 cursor-pointer"
                >
                  Resume Exam
                </button>
                <button
                  type="button"
                  data-testid="cbt-confirm-quit-btn"
                  onClick={() => {
                    setShowQuitConfirm(false);
                    setActiveTest(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold shadow-md cursor-pointer"
                >
                  Confirm Quit &amp; Abandon
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ============================================================================
  // 2. "MY TEST" SAVED ATTEMPTS & STRICT ATTEMPTED-ONLY REVIEW RULE
  // ============================================================================
  if (activeSubTab === 'my-tests') {
    const inspectedAttempt =
      savedAttempts.find((a) => a.attemptId === inspectingAttemptId) ||
      savedAttempts[0] ||
      null;

    const inspectedTestDef = inspectedAttempt
      ? mockTests.find((t) => t.testNumber === inspectedAttempt.testNumber) ||
        null
      : null;

    // Determine exact attempted questions for the inspected attempt
    const attemptedQuestionsList =
      !inspectedAttempt || !inspectedTestDef
        ? []
        : inspectedTestDef.questions
            .map((q, idx) => ({ question: q, qNumber: idx + 1 }))
            .filter(({ question }) => {
              const isMains = !question.options || !question.correctOption;
              if (isMains) {
                return Boolean(
                  inspectedAttempt.descriptiveDrafts[question.id] &&
                    inspectedAttempt.descriptiveDrafts[question.id].trim()
                      .length > 0
                );
              }
              return Boolean(inspectedAttempt.selectedAnswers[question.id]);
            });

    const totalQuestionsInTest = inspectedTestDef
      ? inspectedTestDef.questions.length
      : 100;
    const attemptedCountInTest = attemptedQuestionsList.length;
    const isFullAnswerSheetUnlocked =
      attemptedCountInTest >= totalQuestionsInTest;

    // Questions visible in the solution list:
    // - If all 100 questions were attempted, show all 100 questions.
    // - Otherwise, show ONLY the exact questions the student actually attempted!
    const visibleSolutionItems =
      !inspectedAttempt || !inspectedTestDef
        ? []
        : (isFullAnswerSheetUnlocked
            ? inspectedTestDef.questions.map((q, idx) => ({
                question: q,
                qNumber: idx + 1,
              }))
            : attemptedQuestionsList
          ).filter(({ question }) => {
            const isMains = !question.options || !question.correctOption;
            const userChoice = inspectedAttempt.selectedAnswers[question.id];
            const isCorrect =
              !isMains &&
              Boolean(userChoice && userChoice === question.correctOption);
            const isWrong =
              !isMains &&
              Boolean(userChoice && userChoice !== question.correctOption);

            if (solutionFilter === 'CORRECT') return isCorrect;
            if (solutionFilter === 'WRONG') return isWrong;
            return true;
          });

    return (
      <div data-testid="my-test-section" className="space-y-6">
        {/* Top Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0B1528] via-[#112240] to-[#0F2942] text-white p-6 border border-amber-500/30 shadow-lg flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-extrabold mb-2">
              <Trophy className="w-3.5 h-3.5" />
              MY TEST — SCORECARDS &amp; ATTEMPT REVIEW
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold">
              My Completed Mock Tests ({savedAttempts.length})
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onChangeSubTab('cbt-lobby')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-sm cursor-pointer"
          >
            <Play className="w-4 h-4" />
            Back to Mock Tests
          </button>
        </div>

        {savedAttempts.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center mx-auto">
              <ClipboardCheck className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">
              No Mock Test Attempts Yet
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Start <strong>Free Mock Test 1 (100 Questions)</strong> and submit
              your exam to review your scorecard and attempted question
              solutions here.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              {mockTests[0] && (
                <button
                  type="button"
                  data-testid="my-test-start-free-mock-1-btn"
                  onClick={() => handleStartMockTest(mockTests[0])}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-sm transition-colors cursor-pointer"
                >
                  <Play className="w-4 h-4" />
                  Start Free Mock Test 1
                </button>
              )}
              <button
                type="button"
                onClick={() => onChangeSubTab('cbt-lobby')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B1528] text-amber-300 font-extrabold text-xs sm:text-sm cursor-pointer"
              >
                View All Mock Tests
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Attempt History List */}
            <div className="lg:col-span-4 space-y-3">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider px-1">
                Submitted Attempts ({savedAttempts.length})
              </h3>
              {savedAttempts.map((att) => {
                const isSelected =
                  inspectedAttempt?.attemptId === att.attemptId;
                const attMainsCount = Object.values(
                  att.descriptiveDrafts || {}
                ).filter((v) => v && v.trim().length > 0).length;
                const attTotalCount = att.attemptedMcqCount + attMainsCount;

                return (
                  <button
                    key={att.attemptId}
                    type="button"
                    onClick={() => {
                      setInspectingAttemptId(att.attemptId);
                      setSolutionFilter('ATTEMPTED');
                    }}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#0B1528] bg-[#0B1528] text-white shadow-md'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-base">
                        {att.testTitle}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-lg text-xs font-extrabold ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        Score: {att.netMcqScore}
                      </span>
                    </div>
                    <div
                      className={`mt-2 flex flex-wrap items-center gap-3 text-xs ${
                        isSelected ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      <span>
                        Attempted: {attTotalCount}/{att.totalQuestions}
                      </span>
                      <span>Correct: {att.correctCount}</span>
                      <span>Wrong: {att.wrongCount}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Detailed Scorecard + Attempted-Only Solutions */}
            {inspectedAttempt && inspectedTestDef && (
              <div className="lg:col-span-8 space-y-5">
                {/* Scorecard Summary Box */}
                <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                        Official CBT Scorecard
                      </span>
                      <h3 className="text-xl font-extrabold text-slate-900">
                        {inspectedAttempt.testTitle} — 100 Questions
                      </h3>
                    </div>

                    <button
                      type="button"
                      data-testid="my-test-reattempt-header-btn"
                      onClick={() =>
                        handleStartMockTest(inspectedTestDef, inspectedAttempt)
                      }
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B1528] hover:bg-emerald-700 text-amber-300 hover:text-white text-xs font-extrabold transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Reattempt {inspectedAttempt.testTitle}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-2xl bg-[#0B1528] text-white">
                      <div className="text-[11px] text-slate-300 font-semibold">
                        Net Score
                      </div>
                      <div className="text-xl font-black text-amber-300 mt-0.5">
                        {inspectedAttempt.netMcqScore}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
                      <div className="text-[11px] text-emerald-700 font-semibold">
                        Attempted
                      </div>
                      <div
                        data-testid="my-test-attempted-ratio"
                        className="text-xl font-black text-emerald-800 mt-0.5"
                      >
                        {attemptedCountInTest} / {totalQuestionsInTest}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200">
                      <div className="text-[11px] text-rose-700 font-semibold">
                        Correct / Wrong
                      </div>
                      <div className="text-xl font-black text-rose-800 mt-0.5">
                        {inspectedAttempt.correctCount} /{' '}
                        {inspectedAttempt.wrongCount}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
                      <div className="text-[11px] text-amber-800 font-semibold">
                        Accuracy / Time
                      </div>
                      <div className="text-xl font-black text-amber-900 mt-0.5">
                        {inspectedAttempt.accuracyPercent}% •{' '}
                        {formatDurationClock(inspectedAttempt.timeTakenSeconds)}
                      </div>
                    </div>
                  </div>

                  {/* Filter Tabs for Reviewing Attempted Solutions */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    {(
                      [
                        {
                          id: 'ATTEMPTED',
                          label: isFullAnswerSheetUnlocked
                            ? `All 100 Solutions (${totalQuestionsInTest})`
                            : `Attempted Questions (${attemptedCountInTest})`,
                        },
                        {
                          id: 'CORRECT',
                          label: `Correct (${inspectedAttempt.correctCount})`,
                        },
                        {
                          id: 'WRONG',
                          label: `Wrong (${inspectedAttempt.wrongCount})`,
                        },
                      ] as const
                    ).map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setSolutionFilter(tab.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-colors cursor-pointer ${
                          solutionFilter === tab.id
                            ? 'bg-[#0B1528] text-amber-300'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Protected Unattempted Questions Banner when student attempted fewer than 100 questions */}
                {!isFullAnswerSheetUnlocked && (
                  <div
                    data-testid="unattempted-lock-prompt"
                    className="rounded-3xl border-2 border-amber-400 bg-gradient-to-r from-amber-50 via-white to-amber-50 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-900 uppercase tracking-wider">
                        <Lock className="w-3.5 h-3.5 text-amber-700" />
                        Unattempted Answers Protected
                      </div>
                      <p
                        data-testid="unattempted-lock-message"
                        className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug"
                      >
                        You attempted {attemptedCountInTest} of{' '}
                        {totalQuestionsInTest} questions. Reattempt this Mock
                        Test to complete all {totalQuestionsInTest} questions
                        and unlock the full answer sheet.
                      </p>
                      <p className="text-xs text-slate-600">
                        Only the {attemptedCountInTest} question
                        {attemptedCountInTest === 1 ? '' : 's'} you answered are
                        shown below so the remaining{' '}
                        {totalQuestionsInTest - attemptedCountInTest}{' '}
                        unattempted questions stay spoiler-free for your next
                        attempt.
                      </p>
                    </div>

                    <button
                      type="button"
                      data-testid="reattempt-to-unlock-all-btn"
                      onClick={() =>
                        handleStartMockTest(inspectedTestDef, inspectedAttempt)
                      }
                      className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#0B1528] hover:bg-emerald-700 text-amber-300 hover:text-white text-xs sm:text-sm font-extrabold shadow-md transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reattempt {inspectedAttempt.testTitle}
                    </button>
                  </div>
                )}

                {/* Step-by-Step Solutions List (Strictly Attempted Questions Only unless 100/100 completed) */}
                {visibleSolutionItems.length === 0 ? (
                  <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center space-y-3">
                    <p className="text-sm font-bold text-slate-800">
                      No attempted questions match this filter.
                    </p>
                  </div>
                ) : (
                  <div
                    data-testid="attempted-solutions-list"
                    className="space-y-4"
                  >
                    {visibleSolutionItems.map(({ question: q, qNumber }) => {
                      const isMains = !q.options || !q.correctOption;
                      const userChoice =
                        inspectedAttempt.selectedAnswers[q.id];
                      const userDraft =
                        inspectedAttempt.descriptiveDrafts[q.id];
                      const isCorrect =
                        !isMains &&
                        Boolean(userChoice && userChoice === q.correctOption);
                      const isWrong =
                        !isMains &&
                        Boolean(userChoice && userChoice !== q.correctOption);

                      return (
                        <div
                          key={q.id}
                          data-testid={`reviewed-question-${qNumber}`}
                          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-1 rounded-lg bg-[#0B1528] text-amber-300 text-xs font-extrabold">
                                Q{qNumber}
                              </span>
                              <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-bold">
                                {q.category} • {q.subTopic}
                              </span>
                            </div>

                            {isMains ? (
                              <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 text-xs font-extrabold">
                                Descriptive Model Solution
                              </span>
                            ) : isCorrect ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-extrabold">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                                (+1.00)
                              </span>
                            ) : isWrong ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-100 text-rose-800 text-xs font-extrabold">
                                <XCircle className="w-3.5 h-3.5" /> Wrong
                                (-0.25)
                              </span>
                            ) : null}
                          </div>

                          <div className="text-sm sm:text-base font-bold text-slate-900 whitespace-pre-line">
                            <LatexText text={q.questionEn} />
                          </div>

                          {!isMains && q.options && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                              {OPTION_KEYS.map((k) => {
                                const opt = q.options?.[k];
                                if (!opt) return null;
                                const isRightOpt = q.correctOption === k;
                                const isUserOpt = userChoice === k;

                                return (
                                  <div
                                    key={k}
                                    className={`p-2.5 rounded-xl border text-xs sm:text-sm font-semibold flex items-start gap-2 ${
                                      isRightOpt
                                        ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold'
                                        : isUserOpt
                                        ? 'border-rose-400 bg-rose-50 text-rose-900'
                                        : 'border-slate-200 bg-slate-50/60 text-slate-700'
                                    }`}
                                  >
                                    <span className="font-extrabold">
                                      ({k})
                                    </span>
                                    <span className="flex-1">
                                      <LatexText text={opt.en} />
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          )}

                          {isMains && userDraft && (
                            <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 text-xs sm:text-sm text-slate-800">
                              <div className="font-extrabold text-slate-900 mb-1">
                                Your Submitted Response:
                              </div>
                              <div className="whitespace-pre-line">
                                {userDraft}
                              </div>
                            </div>
                          )}

                          {/* Step-by-Step Explanation / Mains Model Answer */}
                          <div className="rounded-xl bg-emerald-50/70 border border-emerald-200 p-4 space-y-2">
                            <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-900">
                              {isMains
                                ? `Model Answer — ${
                                    q.descriptiveGuide?.sampleAnswerTitle ||
                                    q.subTopic
                                  }`
                                : `Verified Answer: ${q.directAnswerSummary}`}
                            </div>
                            {q.steps.map((step, sIdx) => (
                              <div
                                key={sIdx}
                                className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line"
                              >
                                <span className="font-bold text-slate-900">
                                  {step.title}:{' '}
                                </span>
                                <LatexText text={step.explanation} />
                                {step.formulaLatex && (
                                  <div className="mt-1 font-mono text-xs text-emerald-900 bg-white/80 px-2.5 py-1 rounded border border-emerald-200 inline-block">
                                    <LatexText text={`$${step.formulaLatex}$`} />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // ============================================================================
  // 3. CLEAN MOCK TEST SELECTION CARDS (No Spoilers, No Ranges, Q1 to Q100 Each)
  // ============================================================================
  return (
    <div data-testid="cbt-mock-lobby" className="space-y-6">
      {/* Clean Header Bar */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0B1528] via-[#102240] to-[#0A253B] text-white p-6 sm:p-7 border border-amber-500/30 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            WBPSC Clerkship Mock Tests
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Select a full-length 100-question Computer-Based Mock Test (Q1 to
            Q100) below.
          </p>
        </div>

        <button
          type="button"
          data-testid="open-my-tests-btn"
          onClick={() => onChangeSubTab('my-tests')}
          className="px-4 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md flex items-center gap-2 cursor-pointer"
        >
          <Trophy className="w-4 h-4" />
          My Test ({savedAttempts.length})
        </button>
      </div>

      {/* Clean Grid of Self-Contained Q1 to Q100 Mock Test Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {mockTests.map((test) => {
          const isFreeTest = test.testNumber === 1;
          const isLockedByPaywall =
            !hasFullAccess && !isAdminBypassActive && test.testNumber > 1;
          const unlocked = isTestUnlocked(test.testNumber);
          const isCompleted = completedTestNumbers.includes(test.testNumber);
          const bestAttempt = savedAttempts
            .filter((a) => a.testNumber === test.testNumber)
            .sort((a, b) => b.netMcqScore - a.netMcqScore)[0];

          return (
            <div
              key={test.testId}
              data-testid={`mock-test-card-${test.testNumber}`}
              onClick={() => {
                if (isLockedByPaywall) {
                  onRequirePaidAccess();
                }
              }}
              className={`rounded-3xl border-2 p-5 sm:p-6 flex flex-col justify-between transition-all ${
                unlocked
                  ? 'border-slate-200 bg-white shadow-sm hover:border-[#0B1528]'
                  : isLockedByPaywall
                  ? 'border-slate-200/80 bg-white/90 hover:border-amber-400 cursor-pointer'
                  : 'border-slate-200/70 bg-slate-100/70 opacity-85'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-xl bg-[#0B1528] text-amber-300 font-extrabold text-xs">
                      Q1 to Q{test.questions.length}
                    </span>
                    {isFreeTest && (
                      <span
                        data-testid="mock-test-1-free-badge"
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-extrabold tracking-wide shadow-2xs"
                      >
                        FREE
                      </span>
                    )}
                  </div>

                  {isCompleted ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-extrabold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                    </span>
                  ) : unlocked ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-extrabold">
                      <Unlock className="w-3.5 h-3.5" />{' '}
                      {isFreeTest ? 'Free & Unlocked' : 'Available'}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-200 text-slate-700 text-xs font-bold">
                      <Lock className="w-3.5 h-3.5" /> Locked
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    {test.title} — {test.questions.length} Questions
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Full-Length CBT Exam • Q1 to Q{test.questions.length} •{' '}
                    {test.durationMinutes} Minutes
                  </p>
                </div>

                {bestAttempt && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-900">
                      Best Score: {bestAttempt.netMcqScore}
                    </span>
                    <span className="font-semibold text-emerald-700">
                      Attempted:{' '}
                      {bestAttempt.attemptedMcqCount +
                        Object.values(
                          bestAttempt.descriptiveDrafts || {}
                        ).filter((v) => v && v.trim().length > 0).length}
                      /{test.questions.length}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-200 flex items-center gap-2">
                {unlocked ? (
                  <>
                    <button
                      type="button"
                      data-testid={`start-mock-test-btn-${test.testNumber}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartMockTest(test);
                      }}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-[#0B1528] hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                    >
                      <Play className="w-4 h-4 text-amber-400" />
                      {isCompleted
                        ? `Reattempt ${test.title}`
                        : isFreeTest
                        ? `Start Free ${test.title}`
                        : `Start ${test.title}`}
                    </button>

                    {bestAttempt && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setInspectingAttemptId(bestAttempt.attemptId);
                          onChangeSubTab('my-tests');
                        }}
                        className="py-2.5 px-3 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-extrabold text-xs cursor-pointer"
                      >
                        Review
                      </button>
                    )}
                  </>
                ) : isLockedByPaywall ? (
                  <button
                    type="button"
                    data-testid={`locked-mock-test-btn-${test.testNumber}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRequirePaidAccess();
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#F5A623] hover:bg-[#E09112] text-slate-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    Unlock {test.title} (₹100)
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-200 text-slate-600 font-bold text-xs flex items-center justify-center gap-1.5 cursor-not-allowed"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    Complete Mock Test {test.testNumber - 1} to Unlock
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
