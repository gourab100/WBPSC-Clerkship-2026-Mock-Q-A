import React, { useEffect, useMemo, useState } from 'react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Languages,
  Search,
  X,
} from 'lucide-react';
import { allQuestions, EXAM_METADATA, EXAM_PAPERS } from './data/questions';
import {
  AutoQuestionType,
  BookletSeries,
  OptionKey,
  QuestionCategory,
} from './types/question';
import {
  AttemptFilter,
  calculateExamScore,
  filterAndSortQuestions,
  getPaperTrackingStats,
  paginateQuestions,
  questionBelongsToPaper,
  resolveAutoQuestionType,
} from './utils/studyLogic';
import { SidebarPanel } from './components/SidebarPanel';
import { QuestionCard } from './components/QuestionCard';
import { PdfReferenceModal } from './components/PdfReferenceModal';

export default function App() {
  const [activePaperId, setActivePaperId] = useState<string>('all');
  const [activeAutoType, setActiveAutoType] = useState<'all' | AutoQuestionType>('all');
  const [activeSeries, setActiveSeries] = useState<BookletSeries>('A');
  const [activeCategory, setActiveCategory] = useState<'all' | QuestionCategory>('all');
  const [activeSubTopic, setActiveSubTopic] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [attemptFilter, setAttemptFilter] = useState<AttemptFilter>('all');
  const [showBengali, setShowBengali] = useState<boolean>(true);

  // Pagination state (20 questions per page default)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);

  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set(['q-math-31', 'mains-2024-q1', 'sla23-q31'])
  );
  const [userAnswers, setUserAnswers] = useState<Record<string, OptionKey>>({});
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => new Set());

  const [pdfModalOpen, setPdfModalOpen] = useState<boolean>(false);
  const [pdfPage, setPdfPage] = useState<number>(1);
  const [pdfUrl, setPdfUrl] = useState<string>(EXAM_METADATA.pdfUrl);
  const [pdfPaperTitle, setPdfPaperTitle] = useState<string>('2024 Prelim Shift-3 (SLC/23)');

  const trackingStats = useMemo(
    () => getPaperTrackingStats(allQuestions, EXAM_PAPERS),
    []
  );

  // Questions scoped to the currently selected PDF sheet (for accurate sidebar counts)
  const paperScopedQuestions = useMemo(() => {
    if (activePaperId === 'all') return allQuestions;
    return allQuestions.filter((q) => questionBelongsToPaper(q, activePaperId));
  }, [activePaperId]);

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

      subPartTotal += q.subParts && q.subParts.length > 0 ? q.subParts.length : 1;
    }
    return {
      all: paperScopedQuestions.length,
      math,
      objective,
      descriptive,
      subPartTotal,
    };
  }, [paperScopedQuestions]);

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
    return counts;
  }, [paperScopedQuestions]);

  const availableSubTopics = useMemo(() => {
    const set = new Set<string>();
    for (const q of paperScopedQuestions) {
      if (activeCategory === 'all' || q.category === activeCategory) {
        if (activeAutoType === 'all' || resolveAutoQuestionType(q) === activeAutoType) {
          set.add(q.subTopic);
        }
      }
    }
    return Array.from(set).sort();
  }, [paperScopedQuestions, activeCategory, activeAutoType]);

  const filteredQuestions = useMemo(() => {
    return filterAndSortQuestions(allQuestions, {
      paperId: activePaperId,
      autoType: activeAutoType,
      series: activeSeries,
      category: activeCategory,
      subTopic: activeSubTopic,
      searchQuery,
      attemptFilter,
      userAnswers,
      bookmarkedIds,
    });
  }, [
    activePaperId,
    activeAutoType,
    activeSeries,
    activeCategory,
    activeSubTopic,
    searchQuery,
    attemptFilter,
    userAnswers,
    bookmarkedIds,
  ]);

  // Reset to Page 1 whenever filter criteria change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    activePaperId,
    activeAutoType,
    activeSeries,
    activeCategory,
    activeSubTopic,
    searchQuery,
    attemptFilter,
    pageSize,
  ]);

  const pagination = useMemo(() => {
    return paginateQuestions(filteredQuestions, currentPage, pageSize);
  }, [filteredQuestions, currentPage, pageSize]);

  const score = useMemo(() => {
    return calculateExamScore(paperScopedQuestions, userAnswers, EXAM_METADATA.negativeMarking);
  }, [paperScopedQuestions, userAnswers]);

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
  };

  const handleClearOption = (id: string) => {
    setUserAnswers((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const handleResetAllAnswers = () => {
    setUserAnswers({});
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
      const p = EXAM_PAPERS.find((item) => item.id === activePaperId);
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
    const idx = filteredQuestions.findIndex((q) => q.id === questionId);
    if (idx !== -1) {
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
    }
    const el = document.getElementById(`question-card-${questionId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleChangePage = (nextPage: number) => {
    const clamped = Math.min(Math.max(1, nextPage), pagination.totalPages);
    setCurrentPage(clamped);
    const feedTop = document.getElementById('question-feed-top');
    if (feedTop) {
      feedTop.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleResetFilters = () => {
    setActivePaperId('all');
    setActiveAutoType('all');
    setActiveCategory('all');
    setActiveSubTopic('all');
    setSearchQuery('');
    setAttemptFilter('all');
    setCurrentPage(1);
  };

  const activePaperMeta = EXAM_PAPERS.find((p) => p.id === activePaperId);

  // Compute visible page number buttons
  const visiblePageNumbers = useMemo(() => {
    const total = pagination.totalPages;
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
  }, [pagination.totalPages, pagination.currentPage]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-2 sm:gap-8 px-4 sm:px-8 py-3 bg-white/95 backdrop-blur border-b border-slate-200">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            handleResetFilters();
          }}
          className="text-sm sm:text-lg font-bold tracking-tight text-slate-900 font-display whitespace-nowrap shrink-0"
        >
          WBPSC Clerkship 2026 mock Q&amp;A
        </a>

        {/* Zone 2: 4 concise single-line navigation links for the Auto-Detected Categories */}
        <nav
          aria-label="Auto-Classified Question Categories"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
        >
          <button
            type="button"
            onClick={() => {
              setActiveAutoType('all');
              setActiveCategory('all');
              setActiveSubTopic('all');
            }}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeAutoType === 'all' && activeCategory === 'all'
                ? 'text-slate-900 underline decoration-sky-600 decoration-2 underline-offset-8 font-semibold'
                : ''
            }`}
          >
            All Parent Qs ({autoTypeCounts.all})
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveAutoType('math-step-by-step');
              setActiveCategory('all');
              setActiveSubTopic('all');
            }}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeAutoType === 'math-step-by-step'
                ? 'text-slate-900 underline decoration-sky-600 decoration-2 underline-offset-8 font-semibold'
                : ''
            }`}
          >
            1. Step-by-Step Math ({autoTypeCounts.math})
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveAutoType('objective-concise');
              setActiveCategory('all');
              setActiveSubTopic('all');
            }}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeAutoType === 'objective-concise'
                ? 'text-slate-900 underline decoration-sky-600 decoration-2 underline-offset-8 font-semibold'
                : ''
            }`}
          >
            2. Objective GK &amp; Grammar ({autoTypeCounts.objective})
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveAutoType('descriptive-model-guide');
              setActiveCategory('all');
              setActiveSubTopic('all');
            }}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeAutoType === 'descriptive-model-guide'
                ? 'text-slate-900 underline decoration-sky-600 decoration-2 underline-offset-8 font-semibold'
                : ''
            }`}
          >
            3. Descriptive Parent Qs ({autoTypeCounts.descriptive})
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() =>
              handleOpenPdfAtPage(
                1,
                activePaperMeta?.pdfUrl || EXAM_METADATA.pdfUrl,
                activePaperMeta?.shortLabel || '2024 Prelim Shift-3 (SLC/23)'
              )
            }
            className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Question Paper PDF
          </button>
        </div>
      </header>

      {/* Main Content Container */}
      <main id="top" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-8">
        {/* Paper Overview & Study Controls Banner */}
        <section className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-1.5">
                <span>
                  {activePaperMeta ? activePaperMeta.examStage : EXAM_METADATA.session}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-tabular">
                  {activePaperMeta
                    ? `${trackingStats.byPaperId[activePaperMeta.id]?.extractedParentCount} / ${activePaperMeta.officialQuestionCount} Sheet Parent Qs (100% Complete)`
                    : `${trackingStats.totalExtractedParentQuestions} / ${trackingStats.totalOfficialUniqueQuestions} Unique Parent Qs (${trackingStats.totalExtractedWithSubParts} w/ Sub-parts 1a/1b)`}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight text-balance">
                {activePaperMeta
                  ? `${activePaperMeta.title} — Solved Study Guide`
                  : `${EXAM_METADATA.title} — Complete 100/100 Paginated Dashboard`}
              </h1>
            </div>

            {/* 3 Auto-Detected Category Summary Metrics (Unboxed Tabular Figures) */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 text-xs shrink-0">
              <div>
                <span className="text-slate-500 block whitespace-nowrap">
                  1. Mathematics
                </span>
                <span className="font-mono-tabular font-semibold text-slate-900 text-sm block mt-0.5">
                  {autoTypeCounts.math} Parent Qs
                </span>
                <span className="block text-[11px] text-slate-400 whitespace-nowrap">
                  Step-by-step LaTeX
                </span>
              </div>
              <div>
                <span className="text-slate-500 block whitespace-nowrap">
                  2. Objective &amp; GK
                </span>
                <span className="font-mono-tabular font-semibold text-slate-900 text-sm block mt-0.5">
                  {autoTypeCounts.objective} Parent Qs
                </span>
                <span className="block text-[11px] text-slate-400 whitespace-nowrap">
                  Direct concise answers
                </span>
              </div>
              <div>
                <span className="text-slate-500 block whitespace-nowrap">
                  3. Descriptive Mains
                </span>
                <span className="font-mono-tabular font-semibold text-slate-900 text-sm block mt-0.5">
                  {autoTypeCounts.descriptive} Parent Qs
                </span>
                <span className="block text-[11px] text-slate-400 whitespace-nowrap">
                  Sub-parts 1a/1b nested
                </span>
              </div>
            </div>
          </div>

          {/* Search & Interactive Workspace Toolbar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across all 524 questions (11 PDFs) by text, math formula, report topic, translation, or #..."
                aria-label="Search questions, topics, or question number"
                className="w-full pl-10 pr-9 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-sky-600 transition-colors"
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

            {/* Action Buttons: Page Size Selector + Bilingual Toggle + Expand/Collapse Page */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
                <label htmlFor="page-size-select" className="text-slate-500 font-medium">
                  Per page:
                </label>
                <select
                  id="page-size-select"
                  aria-label="Questions per page"
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="font-mono-tabular font-semibold text-slate-900 bg-transparent focus:outline-none cursor-pointer"
                >
                  <option value={20}>20 Qs</option>
                  <option value={50}>50 Qs</option>
                  <option value={100}>100 Qs</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setShowBengali((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  showBengali
                    ? 'bg-sky-50 border-sky-200 text-sky-900'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Languages className="w-4 h-4 text-sky-700" />
                <span>{showBengali ? 'Bilingual (EN + বাংলা)' : 'English Only'}</span>
              </button>

              <button
                type="button"
                onClick={handleToggleExpandCurrentPage}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
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

        {/* Two-Column Dashboard Layout: Sidebar + Paginated Question Cards Feed */}
        <div className="flex flex-col lg:flex-row items-start gap-6">
          <SidebarPanel
            activePaperId={activePaperId}
            onSelectPaperId={setActivePaperId}
            activeAutoType={activeAutoType}
            onSelectAutoType={setActiveAutoType}
            autoTypeCounts={autoTypeCounts}
            trackingStats={trackingStats}
            categoryCounts={categoryCounts}
            activeSeries={activeSeries}
            onSelectSeries={setActiveSeries}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            activeSubTopic={activeSubTopic}
            onSelectSubTopic={setActiveSubTopic}
            availableSubTopics={availableSubTopics}
            attemptFilter={attemptFilter}
            onSelectAttemptFilter={setAttemptFilter}
            score={score}
            onResetAllAnswers={handleResetAllAnswers}
            filteredQuestions={filteredQuestions}
            currentPage={pagination.currentPage}
            pageSize={pagination.pageSize}
            userAnswers={userAnswers}
            bookmarkedIds={bookmarkedIds}
            onJumpToQuestionId={handleJumpToQuestionId}
            onOpenPaperPdf={handleOpenPaperPdf}
          />

          {/* Main Paginated Question Feed */}
          <div id="question-feed-top" className="flex-1 w-full min-w-0 space-y-4">
            {/* Top Status & Pagination Bar */}
            <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
              <div>
                Showing{' '}
                <span className="font-mono-tabular font-semibold text-slate-900">
                  {pagination.startIndex}–{pagination.endIndex}
                </span>{' '}
                of{' '}
                <span className="font-mono-tabular font-semibold text-slate-900">
                  {filteredQuestions.length}
                </span>{' '}
                matched questions (Database:{' '}
                <span className="font-mono-tabular font-semibold text-slate-900">
                  {paperScopedQuestions.length}
                </span>
                {activePaperMeta ? (
                  <>
                    {' '}
                    / <span className="font-mono-tabular">{activePaperMeta.officialQuestionCount}</span>{' '}
                    in <span className="font-semibold text-slate-900">{activePaperMeta.shortLabel}</span>
                  </>
                ) : (
                  <>
                    {' '}
                    unique parent Qs across 11 PDFs ·{' '}
                    <span className="font-mono-tabular">{autoTypeCounts.subPartTotal}</span> w/ sub-parts
                  </>
                )}
                )
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {(activePaperId !== 'all' ||
                  activeAutoType !== 'all' ||
                  activeCategory !== 'all' ||
                  activeSubTopic !== 'all' ||
                  searchQuery.trim() !== '' ||
                  attemptFilter !== 'all') && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-xs font-medium text-sky-700 hover:underline mr-2 cursor-pointer"
                  >
                    Clear filters
                  </button>
                )}

                {pagination.totalPages > 1 && (
                  <div className="inline-flex items-center gap-1">
                    <button
                      type="button"
                      disabled={pagination.currentPage <= 1}
                      onClick={() => handleChangePage(pagination.currentPage - 1)}
                      aria-label="Previous page"
                      className="p-1.5 rounded-md border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2 font-mono-tabular font-semibold text-slate-800">
                      Page {pagination.currentPage} / {pagination.totalPages}
                    </span>
                    <button
                      type="button"
                      disabled={pagination.currentPage >= pagination.totalPages}
                      onClick={() => handleChangePage(pagination.currentPage + 1)}
                      aria-label="Next page"
                      className="p-1.5 rounded-md border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Paginated Question Cards List or Empty State */}
            {pagination.items.length > 0 ? (
              <>
                <div className="space-y-4">
                  {pagination.items.map((question) => (
                    <QuestionCard
                      key={question.id}
                      question={question}
                      activeSeries={activeSeries}
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

                {/* Bottom Pagination Navigation Bar */}
                {pagination.totalPages > 1 && (
                  <nav
                    aria-label="Question Feed Pagination"
                    className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3"
                  >
                    <div className="text-xs text-slate-600 font-mono-tabular">
                      Page <strong className="text-slate-900">{pagination.currentPage}</strong> of{' '}
                      <strong className="text-slate-900">{pagination.totalPages}</strong> · Showing items{' '}
                      <strong className="text-slate-900">
                        {pagination.startIndex}–{pagination.endIndex}
                      </strong>{' '}
                      of <strong className="text-slate-900">{pagination.totalItems}</strong>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        type="button"
                        disabled={pagination.currentPage <= 1}
                        onClick={() => handleChangePage(pagination.currentPage - 1)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        <span>Prev</span>
                      </button>

                      {visiblePageNumbers.map((pageNum, idx) => {
                        const prevPage = idx > 0 ? visiblePageNumbers[idx - 1] : null;
                        const showEllipsis = prevPage !== null && pageNum - prevPage > 1;
                        const isCurrent = pageNum === pagination.currentPage;

                        return (
                          <React.Fragment key={pageNum}>
                            {showEllipsis && (
                              <span className="px-1.5 text-xs text-slate-400 select-none">…</span>
                            )}
                            <button
                              type="button"
                              onClick={() => handleChangePage(pageNum)}
                              className={`min-w-[32px] h-8 px-2 rounded-lg text-xs font-mono-tabular font-semibold border transition-colors cursor-pointer ${
                                isCurrent
                                  ? 'bg-slate-900 text-white border-slate-900'
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
                        disabled={pagination.currentPage >= pagination.totalPages}
                        onClick={() => handleChangePage(pagination.currentPage + 1)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                      >
                        <span>Next</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </nav>
                )}
              </>
            ) : (
              <div className="bg-white border border-slate-200 rounded-xl p-10 text-center space-y-3">
                <h3 className="text-base font-semibold text-slate-900">
                  No questions match your current filters
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                  Try clearing your search query or switching back to &ldquo;All 11 Uploaded PDF Papers&rdquo; and &ldquo;All Question Formats&rdquo;.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Quiet Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-5 px-4 sm:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            WBPSC Clerkship Examination Archive (2015–2024) · 11 Official Prelim &amp; Mains Question Sheets
          </span>
          <span className="font-mono-tabular">
            {trackingStats.totalExtractedParentQuestions} / {trackingStats.totalOfficialUniqueQuestions} Unique Parent Qs ({trackingStats.totalExtractedWithSubParts} w/ Sub-parts 1a/1b) · 100% Extracted
          </span>
        </div>
      </footer>

      {/* PDF Viewer Modal */}
      <PdfReferenceModal
        isOpen={pdfModalOpen}
        initialPage={pdfPage}
        pdfUrl={pdfUrl}
        paperTitle={pdfPaperTitle}
        activeSeries={activeSeries}
        onClose={() => setPdfModalOpen(false)}
        onChangePage={setPdfPage}
        onChangePdfUrl={(newUrl, newTitle) => {
          setPdfUrl(newUrl);
          setPdfPaperTitle(newTitle);
          setPdfPage(1);
        }}
      />
    </div>
  );
}
