import React from 'react';
import { FileText, RotateCcw } from 'lucide-react';
import {
  AutoQuestionType,
  BookletSeries,
  OptionKey,
  QuestionCategory,
  QuestionItem,
} from '../types/question';
import {
  ArchiveTrackingSummary,
  AttemptFilter,
  ScoreBreakdown,
} from '../utils/studyLogic';
import { EXAM_METADATA, EXAM_PAPERS } from '../data/questions';

interface SidebarPanelProps {
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
  activeSeries: BookletSeries;
  onSelectSeries: (series: BookletSeries) => void;
  activeCategory: 'all' | QuestionCategory;
  onSelectCategory: (category: 'all' | QuestionCategory) => void;
  activeSubTopic: string;
  onSelectSubTopic: (subTopic: string) => void;
  availableSubTopics: string[];
  attemptFilter: AttemptFilter;
  onSelectAttemptFilter: (filter: AttemptFilter) => void;
  score: ScoreBreakdown;
  onResetAllAnswers: () => void;
  filteredQuestions: QuestionItem[];
  currentPage: number;
  pageSize: number;
  userAnswers: Record<string, OptionKey>;
  bookmarkedIds: Set<string>;
  onJumpToQuestionId: (questionId: string) => void;
  onOpenPaperPdf: (pdfUrl: string, title: string) => void;
}

const SERIES_LIST: BookletSeries[] = ['A', 'B', 'C', 'D'];

export const SidebarPanel: React.FC<SidebarPanelProps> = ({
  activePaperId,
  onSelectPaperId,
  activeAutoType,
  onSelectAutoType,
  autoTypeCounts,
  trackingStats,
  categoryCounts,
  activeSeries,
  onSelectSeries,
  activeCategory,
  onSelectCategory,
  activeSubTopic,
  onSelectSubTopic,
  availableSubTopics,
  attemptFilter,
  onSelectAttemptFilter,
  score,
  onResetAllAnswers,
  filteredQuestions,
  currentPage,
  pageSize,
  userAnswers,
  bookmarkedIds,
  onJumpToQuestionId,
  onOpenPaperPdf,
}) => {
  const currentPaper = EXAM_PAPERS.find((p) => p.id === activePaperId);
  const currentPaperStats = activePaperId !== 'all' ? trackingStats.byPaperId[activePaperId] : undefined;

  const pageStartIdx = (currentPage - 1) * pageSize;
  const pageEndIdx = pageStartIdx + pageSize;

  return (
    <aside className="w-full lg:w-80 shrink-0 space-y-5">
      {/* 1. Uploaded PDF Question Sheet Filter (All 11 Discovered Files) */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold text-slate-900">
            Uploaded PDF Question Sheets (11)
          </h2>
          <span className="text-[11px] font-mono-tabular text-slate-500">
            2015–2024
          </span>
        </div>

        <select
          id="paper-sheet-select"
          aria-label="Filter by uploaded PDF question sheet"
          value={activePaperId}
          onChange={(e) => {
            onSelectPaperId(e.target.value);
            onSelectSubTopic('all');
          }}
          className="w-full px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-sky-600"
        >
          <option value="all">
            All 11 Uploaded PDF Papers ({trackingStats.totalExtractedParentQuestions}/{trackingStats.totalOfficialUniqueQuestions} Unique Qs · {trackingStats.totalExtractedWithSubParts} w/ Sub-parts)
          </option>
          <optgroup label="Prelim (Part-I Objective MCQ Sheets — 100/100 Each)">
            {EXAM_PAPERS.filter((p) => p.examStage === 'Prelim (Part-I Objective)').map((p) => {
              const st = trackingStats.byPaperId[p.id];
              return (
                <option key={p.id} value={p.id}>
                  {p.shortLabel} — {st.extractedParentCount}/{st.officialQuestionCount} Qs
                </option>
              );
            })}
          </optgroup>
          <optgroup label="Mains (Part-II Descriptive Sheets — Re-Indexed by Parent Q)">
            {EXAM_PAPERS.filter((p) => p.examStage === 'Mains (Part-II Descriptive)').map((p) => {
              const st = trackingStats.byPaperId[p.id];
              return (
                <option key={p.id} value={p.id}>
                  {p.shortLabel} — {st.extractedParentCount}/{st.officialQuestionCount} Parent Qs ({st.extractedSubPartCount} Sub-parts)
                </option>
              );
            })}
          </optgroup>
        </select>

        {currentPaper && currentPaperStats ? (
          <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg space-y-2">
            <div className="text-[11px] text-slate-600 leading-relaxed">
              <strong className="text-slate-900 block">{currentPaper.title}</strong>
              <span className="font-mono-tabular text-sky-800 font-semibold block my-0.5">
                Extracted: {currentPaperStats.extractedParentCount} / {currentPaperStats.officialQuestionCount} Parent Qs (100%)
                {currentPaperStats.extractedSubPartCount > currentPaperStats.extractedParentCount
                  ? ` · ${currentPaperStats.extractedSubPartCount} prompts w/ 1a/1b`
                  : ''}
              </span>
              <span>{currentPaper.description}</span>
            </div>
            <button
              type="button"
              onClick={() => onOpenPaperPdf(currentPaper.pdfUrl, currentPaper.shortLabel)}
              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-slate-200 text-xs font-semibold text-sky-700 hover:bg-sky-50 transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Original {currentPaper.shortLabel} PDF</span>
            </button>
          </div>
        ) : (
          <div className="text-[11px] text-slate-500 leading-normal space-y-1">
            <p>
              All <strong className="font-semibold text-slate-800 font-mono-tabular">5</strong> Prelim MCQ sheets are populated at{' '}
              <strong className="font-semibold text-slate-800 font-mono-tabular">100/100</strong> questions each (<strong className="font-semibold text-slate-800 font-mono-tabular">500</strong> MCQs), plus all{' '}
              <strong className="font-semibold text-slate-800 font-mono-tabular">24/24</strong> Mains Parent Questions (<strong className="font-semibold text-slate-800 font-mono-tabular">{trackingStats.totalExtractedParentQuestions}</strong> unique parent Qs / <strong className="font-semibold text-slate-800 font-mono-tabular">{trackingStats.totalExtractedWithSubParts}</strong> total w/ sub-parts 1a/1b).
            </p>
          </div>
        )}
      </div>

      {/* 2. Auto-Detected Question Type Filter (The 3 Core Layouts) */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2.5">
        <h2 className="text-xs font-semibold text-slate-900">
          Auto-Classified Question Types
        </h2>
        <div className="space-y-1.5">
          {(
            [
              {
                key: 'all',
                label: 'All Question Formats',
                sub: `${autoTypeCounts.all} Parent Qs (${autoTypeCounts.subPartTotal} w/ sub-parts)`,
                count: autoTypeCounts.all,
              },
              {
                key: 'math-step-by-step',
                label: '1. Mathematics (Step-by-Step)',
                sub: 'Equations & algebraic workings',
                count: autoTypeCounts.math,
              },
              {
                key: 'objective-concise',
                label: '2. Objective, GK & Grammar',
                sub: 'Direct, accurate & concise answers',
                count: autoTypeCounts.objective,
              },
              {
                key: 'descriptive-model-guide',
                label: '3. Descriptive Model Guides',
                sub: 'Parent Qs w/ nested 1a & 1b sub-parts',
                count: autoTypeCounts.descriptive,
              },
            ] as const
          ).map((item) => {
            const isSelected = activeAutoType === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  onSelectAutoType(item.key);
                  onSelectSubTopic('all');
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
                }`}
              >
                <div className="min-w-0 pr-2">
                  <span className="block text-xs font-semibold truncate">{item.label}</span>
                  <span
                    className={`block text-[10px] truncate ${
                      isSelected ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    {item.sub}
                  </span>
                </div>
                <span
                  className={`font-mono-tabular text-xs font-semibold shrink-0 ${
                    isSelected ? 'text-sky-300' : 'text-slate-600'
                  }`}
                >
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Subject / Section & Topic Filter */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
        <h2 className="text-xs font-semibold text-slate-900">
          Filter by Subject Section
        </h2>
        <div className="space-y-1.5">
          {(
            [
              { key: 'all', label: 'All Subjects', count: categoryCounts.all },
              {
                key: 'Mathematics',
                label: 'Mathematics (Arithmetics)',
                count: categoryCounts.Mathematics,
              },
              {
                key: 'General Knowledge',
                label: 'General Studies (GK)',
                count: categoryCounts['General Knowledge'],
              },
              { key: 'English', label: 'General English', count: categoryCounts.English },
              {
                key: 'Descriptive & Translation',
                label: 'Descriptive & Translation (Mains)',
                count: categoryCounts['Descriptive & Translation'],
              },
            ] as const
          ).map((item) => {
            const isSelected = activeCategory === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  onSelectCategory(item.key);
                  onSelectSubTopic('all');
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-sky-600 text-white'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="truncate">{item.label}</span>
                <span
                  className={`font-mono-tabular text-xs ${
                    isSelected ? 'text-white' : 'text-slate-500'
                  }`}
                >
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sub-Topic Dropdown */}
        <div className="pt-2 border-t border-slate-100">
          <label
            htmlFor="subtopic-select"
            className="block text-xs font-medium text-slate-700 mb-1.5"
          >
            Topic / Concept Filter
          </label>
          <select
            id="subtopic-select"
            value={activeSubTopic}
            onChange={(e) => onSelectSubTopic(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-sky-600"
          >
            <option value="all">All Topics ({availableSubTopics.length})</option>
            {availableSubTopics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 4. Booklet Series Selector (Sheets A, B, C, D) */}
      <div className="bg-white border border-slate-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-xs font-semibold text-slate-900">
            Test Booklet Series (A / B / C / D)
          </h2>
          <span className="text-xs font-mono-tabular text-slate-500">
            No. {EXAM_METADATA.seriesSerialNumbers[activeSeries]}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-lg">
          {SERIES_LIST.map((series) => {
            const isActive = activeSeries === series;
            return (
              <button
                key={series}
                type="button"
                onClick={() => onSelectSeries(series)}
                className={`py-2 px-2 rounded-md text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Series {series}
              </button>
            );
          })}
        </div>
        <p className="text-[11px] text-slate-500 mt-2 leading-normal">
          Maps question numbers and PDF pages to Booklet Series {activeSeries} for 2024 Prelim papers.
        </p>
      </div>

      {/* 5. Live Practice Scoreboard (WBPSC 0.25 Negative Marking) */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold text-slate-900">
            Objective Practice Scoreboard
          </h2>
          {score.attemptedCount > 0 && (
            <button
              type="button"
              onClick={onResetAllAnswers}
              className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-medium cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 bg-slate-50 border border-slate-200/70 rounded-lg p-3">
          <div>
            <span className="text-[11px] text-slate-500 block">Net Score</span>
            <span className="text-xl font-bold font-mono-tabular text-slate-900">
              {score.netScore.toFixed(2)}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block">Attempted / Accuracy</span>
            <span className="text-sm font-semibold font-mono-tabular text-slate-800 mt-1 block">
              {score.attemptedCount}/{score.totalQuestions} · {score.accuracyPercent}%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1.5 text-center text-xs font-mono-tabular">
          <div className="p-2 rounded bg-emerald-50/70 border border-emerald-200/60 text-emerald-900">
            <span className="block text-[10px] font-sans text-emerald-700">Correct (+1)</span>
            <span className="font-semibold">{score.correctCount}</span>
          </div>
          <div className="p-2 rounded bg-rose-50/70 border border-rose-200/60 text-rose-900">
            <span className="block text-[10px] font-sans text-rose-700">Wrong (–0.25)</span>
            <span className="font-semibold">{score.incorrectCount}</span>
          </div>
          <div className="p-2 rounded bg-slate-50 border border-slate-200/80 text-slate-700">
            <span className="block text-[10px] font-sans text-slate-500">Saved</span>
            <span className="font-semibold">{bookmarkedIds.size}</span>
          </div>
        </div>

        {/* Filter by Attempt Status */}
        <div className="pt-2 border-t border-slate-100">
          <span className="block text-[11px] font-medium text-slate-500 mb-1.5">
            Filter by Practice Status
          </span>
          <div className="flex flex-wrap gap-1">
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
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  attemptFilter === st.id
                    ? 'bg-sky-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Scrollable Question Index (Auto-switches pagination page on click) */}
      <div className="bg-white border border-slate-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-1.5">
          <h2 className="text-xs font-semibold text-slate-900">
            Scrollable Question Index
          </h2>
          <span className="text-xs font-mono-tabular text-slate-500">
            {filteredQuestions.length} total
          </span>
        </div>
        <p className="text-[11px] text-slate-500 mb-2.5">
          Click any question number to jump directly to its page and card (outlined cells are on Page {currentPage}).
        </p>
        <div className="grid grid-cols-10 gap-1 max-h-56 overflow-y-auto pr-1">
          {filteredQuestions.map((q, idx) => {
            const num = q.seriesNumbers[activeSeries];
            const ans = userAnswers[q.id];
            const isSaved = bookmarkedIds.has(q.id);
            const isOnCurrentPage = idx >= pageStartIdx && idx < pageEndIdx;

            let cellClass = isOnCurrentPage
              ? 'bg-sky-50 text-sky-900 hover:bg-sky-100 border-sky-300 font-semibold'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200';

            if (ans !== undefined) {
              cellClass =
                ans === q.correctOption
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-rose-600 text-white border-rose-600';
            } else if (isSaved) {
              cellClass = 'bg-amber-100 text-amber-900 border-amber-300';
            }

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => onJumpToQuestionId(q.id)}
                title={`Jump to Question ${num} (${q.paperShortTitle || q.category}) — Page ${Math.floor(idx / pageSize) + 1}`}
                className={`h-7 rounded text-[11px] font-mono-tabular border flex items-center justify-center transition-colors cursor-pointer ${cellClass}`}
              >
                {num}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
