export type BookletSeries = 'A' | 'B' | 'C' | 'D';

export type QuestionCategory =
  | 'Mathematics'
  | 'General Knowledge'
  | 'English'
  | 'Descriptive & Translation';

export type AutoQuestionType =
  | 'math-step-by-step'
  | 'objective-concise'
  | 'descriptive-model-guide';

export type OptionKey = 'A' | 'B' | 'C' | 'D';

export interface SolutionStep {
  title: string;
  explanation: string;
  formulaLatex?: string;
}

export interface DescriptiveModelGuide {
  formatType: 'Report Writing' | 'Précis / Summary Writing' | 'Translation' | 'Essay / Composition';
  marks: number;
  wordLimitOrTarget: string;
  outlineStructure: string[];
  keyThemesAndArguments: string[];
  sampleAnswerTitle: string;
  sampleAnswerBody: string;
  secondarySampleBody?: string;
}

export interface QuestionSubPart {
  partId: string;
  partLabel: string;
  promptEn: string;
  promptBn?: string;
  descriptiveGuide: DescriptiveModelGuide;
}

export interface ExamPaperSheet {
  id: string;
  fileName: string;
  shortLabel: string;
  title: string;
  year: string;
  examStage: 'Prelim (Part-I Objective)' | 'Mains (Part-II Descriptive)';
  pdfUrl: string;
  totalPages: number;
  officialQuestionCount: number;
  isSubsetOfPaperId?: string;
  hasBookletSeriesABCD: boolean;
  description: string;
}

export interface QuestionItem {
  id: string;
  paperId?: string;
  alsoInPaperIds?: string[];
  paperShortTitle?: string;
  pdfUrl?: string;
  autoType?: AutoQuestionType;
  parentQuestionLabel?: string;
  seriesNumbers: Record<BookletSeries, number>;
  pdfPages: Record<BookletSeries, number>;
  category: QuestionCategory;
  subTopic: string;
  questionEn: string;
  questionBn?: string;
  options?: Record<OptionKey, { en: string; bn?: string; isMath?: boolean }>;
  correctOption?: OptionKey;
  directAnswerSummary: string;
  keyFormulaOrConcept?: string;
  steps: SolutionStep[];
  descriptiveGuide?: DescriptiveModelGuide;
  subParts?: QuestionSubPart[];
}
