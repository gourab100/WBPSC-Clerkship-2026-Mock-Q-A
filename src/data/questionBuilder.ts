import {
  BookletSeries,
  OptionKey,
  QuestionCategory,
  QuestionItem,
  SolutionStep,
} from '../types/question';

export interface CompactMcqInput {
  qNum: number;
  pageA: number;
  seriesMap?: [number, number, number, number]; // [A, B, C, D]
  pagesMap?: [number, number, number, number]; // [pageA, pageB, pageC, pageD]
  cat: QuestionCategory;
  topic: string;
  qEn: string;
  qBn?: string;
  opts: [string, string, string, string];
  optsBn?: [string, string, string, string];
  ans: OptionKey;
  summary: string;
  concept?: string;
  steps: Array<[string, string, string?]>; // [title, explanation, formulaLatex?]
}

export interface CompactPaperQuestion {
  q: number;
  page: number;
  cat: QuestionCategory;
  topic: string;
  en: string;
  bn?: string;
  opts: [string, string, string, string];
  optsBn?: [string, string, string, string];
  ans: OptionKey;
  summary: string;
  concept?: string;
  steps?: SolutionStep[];
}

export function buildPaperQuestions(
  prefix: string,
  paperId: string,
  paperShortTitle: string,
  pdfUrl: string,
  hasSeriesABCD: boolean,
  items: CompactMcqInput[]
): QuestionItem[];
export function buildPaperQuestions(
  paperId: string,
  paperShortTitle: string,
  pdfUrl: string,
  prefix: string,
  items: CompactPaperQuestion[]
): QuestionItem[];
export function buildPaperQuestions(
  arg1: string,
  arg2: string,
  arg3: string,
  arg4: string,
  arg5: boolean | CompactPaperQuestion[],
  arg6?: CompactMcqInput[]
): QuestionItem[] {
  if (Array.isArray(arg5)) {
    const paperId = arg1;
    const paperShortTitle = arg2;
    const pdfUrl = arg3;
    const prefix = arg4;
    const items = arg5;

    return items.map((item) => {
      const n = item.q;
      const steps: SolutionStep[] =
        item.steps && item.steps.length > 0
          ? item.steps
          : [
              {
                title: item.cat === 'English' ? 'Grammar & Lexical Rule' : 'Key Fact & Explanation',
                explanation: item.summary,
              },
            ];

      return {
        id: `${prefix}-q${n}`,
        paperId,
        paperShortTitle,
        pdfUrl,
        autoType: item.cat === 'Mathematics' ? 'math-step-by-step' : 'objective-concise',
        seriesNumbers: { A: n, B: n, C: n, D: n },
        pdfPages: { A: item.page, B: item.page, C: item.page, D: item.page },
        category: item.cat,
        subTopic: item.topic,
        questionEn: item.en,
        ...(item.bn ? { questionBn: item.bn } : {}),
        options: {
          A: { en: item.opts[0], ...(item.optsBn ? { bn: item.optsBn[0] } : {}) },
          B: { en: item.opts[1], ...(item.optsBn ? { bn: item.optsBn[1] } : {}) },
          C: { en: item.opts[2], ...(item.optsBn ? { bn: item.optsBn[2] } : {}) },
          D: { en: item.opts[3], ...(item.optsBn ? { bn: item.optsBn[3] } : {}) },
        },
        correctOption: item.ans,
        directAnswerSummary: item.summary,
        ...(item.concept ? { keyFormulaOrConcept: item.concept } : {}),
        steps,
      };
    });
  }

  const prefix = arg1;
  const paperId = arg2;
  const paperShortTitle = arg3;
  const pdfUrl = arg4;
  const hasSeriesABCD = arg5;
  const items = arg6 || [];

  return items.map((item) => {
    const n = item.qNum;
    const isEnglish = n <= 30 && hasSeriesABCD;
    const defaultSeries: Record<BookletSeries, number> = hasSeriesABCD
      ? isEnglish
        ? {
            A: n,
            B: ((n + 11 - 1) % 30) + 1,
            C: ((n + 21 - 1) % 30) + 1,
            D: ((n + 5 - 1) % 30) + 1,
          }
        : {
            A: n,
            B: ((n - 31 + 19) % 70) + 31,
            C: ((n - 31 + 37) % 70) + 31,
            D: ((n - 31 + 53) % 70) + 31,
          }
      : { A: n, B: n, C: n, D: n };

    const seriesNumbers: Record<BookletSeries, number> = defaultSeries;

    const pdfPages: Record<BookletSeries, number> = item.pagesMap
      ? {
          A: item.pagesMap[0],
          B: item.pagesMap[1],
          C: item.pagesMap[2],
          D: item.pagesMap[3],
        }
      : hasSeriesABCD
      ? {
          A: item.pageA,
          B: item.pageA + 20,
          C: item.pageA + 40,
          D: item.pageA + 60,
        }
      : {
          A: item.pageA,
          B: item.pageA,
          C: item.pageA,
          D: item.pageA,
        };

    const steps: SolutionStep[] = item.steps.map(([title, explanation, formulaLatex]) => ({
      title,
      explanation,
      ...(formulaLatex ? { formulaLatex } : {}),
    }));

    return {
      id: `${prefix}-q${n}`,
      paperId,
      paperShortTitle,
      pdfUrl,
      autoType: item.cat === 'Mathematics' ? 'math-step-by-step' : 'objective-concise',
      seriesNumbers,
      pdfPages,
      category: item.cat,
      subTopic: item.topic,
      questionEn: item.qEn,
      ...(item.qBn ? { questionBn: item.qBn } : {}),
      options: {
        A: { en: item.opts[0], ...(item.optsBn ? { bn: item.optsBn[0] } : {}) },
        B: { en: item.opts[1], ...(item.optsBn ? { bn: item.optsBn[1] } : {}) },
        C: { en: item.opts[2], ...(item.optsBn ? { bn: item.optsBn[2] } : {}) },
        D: { en: item.opts[3], ...(item.optsBn ? { bn: item.optsBn[3] } : {}) },
      },
      correctOption: item.ans,
      directAnswerSummary: item.summary,
      ...(item.concept ? { keyFormulaOrConcept: item.concept } : {}),
      steps,
    };
  });
}
