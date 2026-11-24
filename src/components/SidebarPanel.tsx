import React, { useMemo } from 'react';
import { ArrowLeft, FileText, Lock, RotateCcw } from 'lucide-react';
import {
  AutoQuestionType,
  ExamPaperSheet,
  OptionKey,
  QuestionCategory,
  QuestionItem,
} from '../types/question';
import {
  ArchiveTrackingSummary,
  AttemptFilter,
  ScoreBreakdown,
} from '../utils/studyLogic';

interface SidebarPanelProps {
  papers: ExamPaperSheet[];
  totalQuestionsCount: number;
  isUnlocked: boolean;
  onRequestPaywall: () => void;
  activePaperId: string;
  onSelectPaperId: (paperId: string) => void;
  activeAutoType: 'all' | AutoQuestionType;
  onSelectAutoType: (autoType: 'all' | AutoQuestionType) => void;
  autoTypeCounts: {
    all: number;
    math: number;
    objective: number;
    descriptive: number;
    subPartTotal: number;
  };
  trackingStats: ArchiveTrackingSummary;
  categoryCounts: {
    all: number;
    Mathematics: number;
    'General Knowledge': number;
    English: number;
    'Descriptive & Translation': number;
  };
  activeCategory: 'all' | QuestionCategory;
  onSelectCategory: (category: 'all' | QuestionCategory) => void;
  activeSubTopic: string;
  onSelectSubTopic: (subTopic: string) => void;
  availableSubTopics: string[];
  attemptFilter: AttemptFilter;
  onSelectAttemptFilter: (filter: AttemptFilter) => void;
  score: ScoreBreakdown;
  onResetAllAnswers: () => void;
  paperScopedQuestions: QuestionItem[];
  currentPageQuestionIds: Set<string>;
  currentPage: number;
  userAnswers: Record<string, OptionKey>;
  bookmarkedIds: Set<string>;
  onJumpToQuestionId: (questionId: string) => void;
  onOpenPaperPdf: (pdfUrl: string, title: string) => void;
}

export const SidebarPanel: React.FC<SidebarPanelProps> = ({
  papers,
  isUnlocked,
  onRequestPaywall,
  activePaperId,
  onSelectPaperId,
  activeCategory,
  onSelectCategory,
  activeSubTopic,
  onSelectSubTopic,
  availableSubTopics,
  attemptFilter,
  onSelectAttemptFilter,
  score,
  onResetAllAnswers,
  paperScopedQuestions,
  currentPageQuestionIds,
  currentPage,
  userAnswers,
  bookmarkedIds,
  onJumpToQuestionId,
  onOpenPaperPdf,
}) => {
  const currentPaper = papers.find((p) => p.id === activePaperId);

  const prelimPapers = useMemo(
    () => papers.filter((p) => p.examStage === 'Prelim (Part-I Objective)'),
    [papers]
  );
  const mainsPapers = useMemo(
    () => papers.filter((p) => p.examStage === 'Mains (Part-II Descriptive)'),
    [papers]
  );

  // Ordered questions exclusively for the selected Year-wise Question Sheet
  const orderedPaperQuestions = useMemo(() => {
    if (!isUnlocked || activePaperId === 'all') return [];
    return [...paperScopedQuestions].sort(
      (a, b) => a.seriesNumbers.A - b.seriesNumbers.A
    );
  }, [isUnlocked, activePaperId, paperScopedQuestions]);

  return (
    <aside className="w-full lg:w-76 shrink-0 space-y-5">
      {/* 1. Clean Year-wise Previous Papers Switcher & Back to All Year Cards Button */}
      <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-md">
        <div className="bg-[#162238] text-white px-4 py-3 flex items-center justify-between">
          <h2 className="text-xs font-extrabold tracking-wide uppercase">
            Selected Year Paper
          </h2>
          <button
            type="button"
            data-testid="sidebar-back-to-year-cards-btn"
            onClick={() => {
              onSelectPaperId('all');
              onSelectSubTopic('all');
            }}
            className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 hover:bg-amber-500/30 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>All Years</span>
          </button>
        </div>

        <div className="p-4 space-y-3">
          <select
            id="paper-sheet-select"
            aria-label="Select Year-wise Previous Paper"
            value={activePaperId}
            onChange={(e) => {
              onSelectPaperId(e.target.value);
              onSelectSubTopic('all');
            }}
            className="w-full px-3.5 py-2.5 text-xs font-bold bg-[#F4F6F9] border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#162238]"
          >
            <option value="all">← View All Year-Wise Paper Cards</option>
            <optgroup label="Prelims (Objective Papers)">
              {prelimPapers.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.shortLabel}
                </option>
              ))}
            </optgroup>
            <optgroup label="Mains (Descriptive Papers)">
              {mainsPapers.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.shortLabel}
                </option>
              ))}
            </optgroup>
          </select>

          {currentPaper && (
            <div className="p-3 bg-[#F4F6F9] border border-slate-200/80 rounded-xl space-y-2.5">
              <div className="text-xs text-slate-600 leading-relaxed">
                <strong className="text-slate-900 block font-extrabold">
                  {currentPaper.title}
                </strong>
                <span className="text-slate-500 block mt-0.5">
                  {currentPaper.year} · {currentPaper.examStage}
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  onOpenPaperPdf(currentPaper.pdfUrl, currentPaper.shortLabel)
                }
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#162238] text-amber-300 text-xs font-bold hover:bg-[#1E2E4A] transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View {currentPaper.shortLabel} PDF</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2. Scrollable Question Index (Exclusively for the active Year-wise Question Sheet) */}
      {isUnlocked &&
        activePaperId !== 'all' &&
        currentPaper &&
        orderedPaperQuestions.length > 0 && (
          <div
            data-testid="paper-question-index"
            className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-md"
          >
            <div className="bg-[#162238] text-white px-4 py-3 flex items-center justify-between">
              <h2 className="text-xs font-extrabold tracking-wide uppercase">
                {currentPaper.shortLabel} Index
              </h2>
              <span className="text-xs font-mono-tabular font-extrabold text-amber-300">
                Q1–Q{orderedPaperQuestions.length}
              </span>
            </div>

            <div className="p-4">
              <p className="text-xs text-slate-500 mb-3">
                Jump directly to any question in this paper (Page {currentPage}
                ).
              </p>
              <div
                className={`grid ${
                  orderedPaperQuestions.length <= 6
                    ? 'grid-cols-6'
                    : 'grid-cols-5'
                } gap-1.5 max-h-60 overflow-y-auto pr-1`}
              >
                {orderedPaperQuestions.map((q, idx) => {
                  const displayNum = idx + 1;
                  const ans = userAnswers[q.id];
                  const isSaved = bookmarkedIds.has(q.id);
                  const isOnCurrentPage = currentPageQuestionIds.has(q.id);

                  let cellClass = isOnCurrentPage
                    ? 'bg-[#162238] text-amber-300 border-[#162238] font-extrabold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200';

                  if (ans !== undefined) {
                    cellClass =
                      ans === q.correctOption
                        ? 'bg-[#22A06B] text-white border-[#22A06B] font-bold'
                        : 'bg-rose-600 text-white border-rose-600 font-bold';
                  } else if (isSaved) {
                    cellClass =
                      'bg-amber-100 text-amber-900 border-amber-300 font-bold';
                  }

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => onJumpToQuestionId(q.id)}
                      title={`Jump to Q${displayNum}`}
                      className={`h-7 rounded-lg text-[11px] font-mono-tabular border flex items-center justify-center transition-colors cursor-pointer ${cellClass}`}
                    >
                      Q{displayNum}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      {/* 3. Clean Subject & Topic Filter within the Selected Paper */}
      <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-md">
        <div className="bg-[#162238] text-white px-4 py-3">
          <h2 className="text-xs font-extrabold tracking-wide uppercase">
            Filter by Subject
          </h2>
        </div>

        <div className="p-4 space-y-3">
          <div className="space-y-1.5">
            {(
              [
                {
                  key: 'all',
                  label: 'All Subjects',
                  locked: false,
                },
                {
                  key: 'Mathematics',
                  label: 'WBPSC Arithmetic (Math)',
                  locked: false,
                },
                {
                  key: 'General Knowledge',
                  label: 'West Bengal GK & Studies',
                  locked: false,
                },
                {
                  key: 'English',
                  label: 'General English',
                  locked: false,
                },
                {
                  key: 'Descriptive & Translation',
                  label: 'Descriptive & Translation (Mains)',
                  locked: !isUnlocked,
                },
              ] as const
            ).map((item) => {
              const isSelected = activeCategory === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    if (item.locked) {
                      onRequestPaywall();
                      return;
                    }
                    onSelectCategory(item.key);
                    onSelectSubTopic('all');
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#162238] text-amber-300 shadow-2xs'
                      : 'bg-[#F4F6F9] text-slate-700 hover:bg-slate-200/70'
                  }`}
                >
                  <span className="flex items-center gap-1.5 truncate">
                    {item.locked && (
                      <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    )}
                    <span className="truncate">{item.label}</span>
                  </span>
                  {item.locked && <span className="text-xs">🔒</span>}
                </button>
              );
            })}
          </div>

          {/* Sub-Topic Dropdown */}
          <div className="pt-2 border-t border-slate-100">
            <label
              htmlFor="subtopic-select"
              className="block text-xs font-bold text-slate-700 mb-1.5"
            >
              Topic Filter
            </label>
            <select
              id="subtopic-select"
              value={activeSubTopic}
              onChange={(e) => onSelectSubTopic(e.target.value)}
              className="w-full px-3 py-2 text-xs font-medium bg-[#F4F6F9] border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-[#162238]"
            >
              <option value="all">All Topics</option>
              {availableSubTopics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 4. Practice Scoreboard */}
      <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-md">
        <div className="bg-[#162238] text-white px-4 py-3 flex items-center justify-between">
          <h2 className="text-xs font-extrabold tracking-wide uppercase">
            Paper Scoreboard
          </h2>
          {score.attemptedCount > 0 && (
            <button
              type="button"
              onClick={onResetAllAnswers}
              className="inline-flex items-center gap-1 text-xs text-amber-300 hover:text-amber-200 font-bold cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All</span>
            </button>
          )}
        </div>

        <div className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 bg-[#F4F6F9] border border-slate-200/70 rounded-xl p-3">
            <div>
              <span className="text-[11px] font-semibold text-slate-500 block">
                Net Score
              </span>
              <span className="text-xl font-extrabold font-mono-tabular text-[#0B192C]">
                {score.netScore.toFixed(2)}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-500 block">
                Accuracy
              </span>
              <span className="text-sm font-extrabold font-mono-tabular text-emerald-700 mt-1 block">
                {score.accuracyPercent}%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1.5 text-center text-xs font-mono-tabular">
            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-900">
              <span className="block text-[10px] font-sans font-bold text-emerald-700">
                Correct (+1)
              </span>
              <span className="font-extrabold">{score.correctCount}</span>
            </div>
            <div className="p-2 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-900">
              <span className="block text-[10px] font-sans font-bold text-rose-700">
                Wrong (–0.25)
              </span>
              <span className="font-extrabold">{score.incorrectCount}</span>
            </div>
            <div className="p-2 rounded-xl bg-[#F4F6F9] border border-slate-200/80 text-slate-800">
              <span className="block text-[10px] font-sans font-bold text-slate-500">
                Saved
              </span>
              <span className="font-extrabold">{bookmarkedIds.size}</span>
            </div>
          </div>

          {/* Filter by Attempt Status */}
          <div className="pt-2 border-t border-slate-100">
            <span className="block text-[11px] font-bold text-slate-500 mb-1.5">
              Filter by Practice Status
            </span>
            <div className="flex flex-wrap gap-1.5">
              {(
                [
                  { id: 'all', label: 'All' },
                  { id: 'unattempted', label: 'Unattempted' },
                  { id: 'correct', label: 'Correct' },
                  { id: 'incorrect', label: 'Wrong' },
                  { id: 'bookmarked', label: 'Saved' },
                ] as const
              ).map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => onSelectAttemptFilter(st.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                    attemptFilter === st.id
                      ? 'bg-[#162238] text-amber-300'
                      : 'bg-[#F4F6F9] text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
