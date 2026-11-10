import {
  AutoQuestionType,
  BookletSeries,
  ExamPaperSheet,
  OptionKey,
  QuestionCategory,
  QuestionItem,
} from '../types/question';

export type AttemptFilter =
  | 'all'
  | 'attempted'
  | 'unattempted'
  | 'correct'
  | 'incorrect'
  | 'bookmarked';

export interface FilterCriteria {
  paperId?: string;
  autoType?: 'all' | AutoQuestionType;
  series: BookletSeries;
  category: 'all' | QuestionCategory;
  subTopic: string;
  searchQuery: string;
  attemptFilter: AttemptFilter;
  userAnswers: Record<string, OptionKey>;
  bookmarkedIds: Set<string>;
}

export interface ScoreBreakdown {
  totalQuestions: number;
  attemptedCount: number;
  unattemptedCount: number;
  correctCount: number;
  incorrectCount: number;
  positiveMarks: number;
  negativeMarks: number;
  netScore: number;
  accuracyPercent: number;
  byCategory: Record<
    QuestionCategory,
    {
      total: number;
      attempted: number;
      correct: number;
      incorrect: number;
      netScore: number;
    }
  >;
}

export interface PaperQuestionTracking {
  paperId: string;
  fileName: string;
  year: string;
  shortLabel: string;
  officialQuestionCount: number;
  extractedParentCount: number;
  extractedSubPartCount: number;
  isSubsetSheet: boolean;
}

export interface ArchiveTrackingSummary {
  byPaperId: Record<string, PaperQuestionTracking>;
  totalExtractedParentQuestions: number;
  totalExtractedWithSubParts: number;
  totalOfficialUniqueQuestions: number;
  totalOfficialRawSheetQuestions: number;
}

export function resolveAutoQuestionType(q: QuestionItem): AutoQuestionType {
  if (q.autoType) return q.autoType;
  if (q.descriptiveGuide || q.category === 'Descriptive & Translation' || !q.options) {
    return 'descriptive-model-guide';
  }
  if (q.category === 'Mathematics') {
    return 'math-step-by-step';
  }
  return 'objective-concise';
}

export function questionBelongsToPaper(q: QuestionItem, paperId: string): boolean {
  if (paperId === 'all') return true;
  if (q.paperId === paperId) return true;
  if (q.alsoInPaperIds && q.alsoInPaperIds.includes(paperId)) return true;
  return false;
}

export function getPaperTrackingStats(
  questions: QuestionItem[],
  papers: ExamPaperSheet[]
): ArchiveTrackingSummary {
  const byPaperId: Record<string, PaperQuestionTracking> = {};
  let totalOfficialUniqueQuestions = 0;
  let totalOfficialRawSheetQuestions = 0;

  for (const p of papers) {
    const matched = questions.filter((q) => questionBelongsToPaper(q, p.id));
    const extractedParentCount = matched.length;
    const extractedSubPartCount = matched.reduce(
      (sum, q) => sum + (q.subParts && q.subParts.length > 0 ? q.subParts.length : 1),
      0
    );

    byPaperId[p.id] = {
      paperId: p.id,
      fileName: p.fileName,
      year: p.year,
      shortLabel: p.shortLabel,
      officialQuestionCount: p.officialQuestionCount,
      extractedParentCount,
      extractedSubPartCount,
      isSubsetSheet: Boolean(p.isSubsetOfPaperId),
    };

    totalOfficialRawSheetQuestions += p.officialQuestionCount;
    if (!p.isSubsetOfPaperId) {
      totalOfficialUniqueQuestions += p.officialQuestionCount;
    }
  }

  const totalExtractedParentQuestions = questions.length;
  const totalExtractedWithSubParts = questions.reduce(
    (sum, q) => sum + (q.subParts && q.subParts.length > 0 ? q.subParts.length : 1),
    0
  );

  return {
    byPaperId,
    totalExtractedParentQuestions,
    totalExtractedWithSubParts,
    totalOfficialUniqueQuestions,
    totalOfficialRawSheetQuestions,
  };
}

export function filterAndSortQuestions(
  questions: QuestionItem[],
  criteria: FilterCriteria
): QuestionItem[] {
  const normalizedQuery = criteria.searchQuery.trim().toLowerCase();
  const activePaperId = criteria.paperId || 'all';
  const activeAutoType = criteria.autoType || 'all';

  return questions
    .filter((q) => {
      if (!questionBelongsToPaper(q, activePaperId)) {
        return false;
      }

      const resolvedType = resolveAutoQuestionType(q);
      if (activeAutoType !== 'all' && resolvedType !== activeAutoType) {
        return false;
      }

      if (criteria.category !== 'all' && q.category !== criteria.category) {
        return false;
      }
      if (criteria.subTopic !== 'all' && q.subTopic !== criteria.subTopic) {
        return false;
      }

      const userChoice = criteria.userAnswers[q.id];
      const isAttempted = userChoice !== undefined;
      const isCorrect = isAttempted && userChoice === q.correctOption;

      if (criteria.attemptFilter === 'attempted' && !isAttempted) return false;
      if (criteria.attemptFilter === 'unattempted' && isAttempted) return false;
      if (criteria.attemptFilter === 'correct' && !isCorrect) return false;
      if (criteria.attemptFilter === 'incorrect' && (!isAttempted || isCorrect)) return false;
      if (criteria.attemptFilter === 'bookmarked' && !criteria.bookmarkedIds.has(q.id))
        return false;

      if (normalizedQuery.length > 0) {
        const seriesNumStr = String(q.seriesNumbers[criteria.series]);
        const qNumMatch =
          normalizedQuery === seriesNumStr ||
          normalizedQuery === `q${seriesNumStr}` ||
          normalizedQuery === `#${seriesNumStr}`;

        if (qNumMatch) return true;

        const optionStrings = q.options
          ? [q.options.A.en, q.options.B.en, q.options.C.en, q.options.D.en]
          : [];

        const descriptiveStrings = q.descriptiveGuide
          ? [
              q.descriptiveGuide.sampleAnswerTitle,
              q.descriptiveGuide.sampleAnswerBody,
              q.descriptiveGuide.secondarySampleBody || '',
              ...q.descriptiveGuide.outlineStructure,
              ...q.descriptiveGuide.keyThemesAndArguments,
            ]
          : [];

        const subPartStrings = q.subParts
          ? q.subParts.flatMap((sp) => [
              sp.partLabel,
              sp.promptEn,
              sp.descriptiveGuide.sampleAnswerTitle,
              sp.descriptiveGuide.sampleAnswerBody,
            ])
          : [];

        const searchableText = [
          q.questionEn,
          q.questionBn || '',
          q.subTopic,
          q.paperShortTitle || '',
          q.parentQuestionLabel || '',
          q.directAnswerSummary,
          q.keyFormulaOrConcept || '',
          ...optionStrings,
          ...descriptiveStrings,
          ...subPartStrings,
          ...q.steps.map((s) => `${s.title} ${s.explanation}`),
        ]
          .join(' ')
          .toLowerCase();

        return searchableText.includes(normalizedQuery);
      }

      return true;
    })
    .sort((a, b) => {
      if (activePaperId === 'all' && a.paperId !== b.paperId) {
        return 0;
      }
      return a.seriesNumbers[criteria.series] - b.seriesNumbers[criteria.series];
    });
}

export function calculateExamScore(
  questions: QuestionItem[],
  userAnswers: Record<string, OptionKey>,
  negativePenalty = 0.25
): ScoreBreakdown {
  const byCategory: ScoreBreakdown['byCategory'] = {
    English: { total: 0, attempted: 0, correct: 0, incorrect: 0, netScore: 0 },
    'General Knowledge': { total: 0, attempted: 0, correct: 0, incorrect: 0, netScore: 0 },
    Mathematics: { total: 0, attempted: 0, correct: 0, incorrect: 0, netScore: 0 },
    'Descriptive & Translation': {
      total: 0,
      attempted: 0,
      correct: 0,
      incorrect: 0,
      netScore: 0,
    },
  };

  let attemptedCount = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let objectiveTotal = 0;

  for (const q of questions) {
    const cat = byCategory[q.category];
    cat.total += 1;

    if (!q.options || !q.correctOption) {
      continue;
    }
    objectiveTotal += 1;

    const chosen = userAnswers[q.id];
    if (chosen !== undefined) {
      attemptedCount += 1;
      cat.attempted += 1;
      if (chosen === q.correctOption) {
        correctCount += 1;
        cat.correct += 1;
      } else {
        incorrectCount += 1;
        cat.incorrect += 1;
      }
    }
  }

  for (const key of Object.keys(byCategory) as QuestionCategory[]) {
    const c = byCategory[key];
    c.netScore = Number((c.correct * 1 - c.incorrect * negativePenalty).toFixed(2));
  }

  const positiveMarks = correctCount * 1;
  const negativeMarks = Number((incorrectCount * negativePenalty).toFixed(2));
  const netScore = Number((positiveMarks - negativeMarks).toFixed(2));
  const accuracyPercent =
    attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;

  return {
    totalQuestions: objectiveTotal || questions.length,
    attemptedCount,
    unattemptedCount: Math.max(0, (objectiveTotal || questions.length) - attemptedCount),
    correctCount,
    incorrectCount,
    positiveMarks,
    negativeMarks,
    netScore,
    accuracyPercent,
    byCategory,
  };
}

export function validateQuestionBankIntegrity(questions: QuestionItem[]): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  if (questions.length !== 100) {
    errors.push(`Expected 100 questions, found ${questions.length}`);
  }

  const seriesList: BookletSeries[] = ['A', 'B', 'C', 'D'];
  for (const s of seriesList) {
    const seen = new Set<number>();
    for (const q of questions) {
      const n = q.seriesNumbers[s];
      if (n < 1 || n > 100) {
        errors.push(`Series ${s} has out-of-range question number ${n} on ${q.id}`);
      }
      if (seen.has(n)) {
        errors.push(`Duplicate question number ${n} in Series ${s}`);
      }
      seen.add(n);
    }
    if (seen.size !== 100) {
      errors.push(`Series ${s} only covers ${seen.size} unique numbers instead of 100`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export interface PaginationResult<T> {
  items: T[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  startIndex: number; // 1-based display start
  endIndex: number;   // 1-based display end
}

export function paginateQuestions<T>(
  items: T[],
  requestedPage: number,
  pageSize = 20
): PaginationResult<T> {
  const safePageSize = Math.max(1, pageSize);
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));
  const currentPage = Math.min(Math.max(1, requestedPage), totalPages);

  if (totalItems === 0) {
    return {
      items: [],
      currentPage: 1,
      pageSize: safePageSize,
      totalItems: 0,
      totalPages: 1,
      startIndex: 0,
      endIndex: 0,
    };
  }

  const sliceStart = (currentPage - 1) * safePageSize;
  const sliceEnd = Math.min(sliceStart + safePageSize, totalItems);

  return {
    items: items.slice(sliceStart, sliceEnd),
    currentPage,
    pageSize: safePageSize,
    totalItems,
    totalPages,
    startIndex: sliceStart + 1,
    endIndex: sliceEnd,
  };
}

