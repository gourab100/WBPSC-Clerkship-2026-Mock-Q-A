import { AutoQuestionType, ExamPaperSheet, QuestionItem } from '../types/question';
import { englishQuestions } from './englishQuestions';
import { mathQuestions } from './mathQuestions';
import { gkQuestions } from './gkQuestions';
import { mainsDescriptiveQuestions } from './mainsDescriptiveQuestions';
import { prelim2024Shift1Questions } from './prelim2024Shift1';
import { prelim2024Shift2Questions } from './prelim2024Shift2';
import { prelim2020Questions } from './prelim2020Papers';

export function classifyQuestionAutoType(q: QuestionItem): AutoQuestionType {
  if (q.autoType) return q.autoType;
  if (q.descriptiveGuide || q.category === 'Descriptive & Translation' || !q.options) {
    return 'descriptive-model-guide';
  }
  if (q.category === 'Mathematics') {
    return 'math-step-by-step';
  }
  return 'objective-concise';
}

export const EXAM_PAPERS: ExamPaperSheet[] = [
  {
    id: 'prelim-2024-shift-3',
    fileName: 'WBPSC-Clerkship-Question-Paper-2024-Shift-3_78cf71f5.pdf',
    shortLabel: '2024 Prelim Shift-3 (SLC/23)',
    title: 'WBPSC Clerkship Examination (Part-I), 2023–24 — Session III',
    year: '2024',
    examStage: 'Prelim (Part-I Objective)',
    pdfUrl: '/assets/aistudio/WBPSC-Clerkship-Question-Paper-2024-Shift-3_78cf71f5.pdf',
    totalPages: 81,
    officialQuestionCount: 100,
    hasBookletSeriesABCD: true,
    description: 'Complete 100-question objective paper (English 30, GK 40, Arithmetic 30) across Series A, B, C & D.',
  },
  {
    id: 'prelim-2024-shift-1',
    fileName: 'WBPSC-Clerkship-Question-Paper-2024-Shift-1_1e82862b.pdf',
    shortLabel: '2024 Prelim Shift-1 (SLA/23)',
    title: 'WBPSC Clerkship Examination (Part-I), 2023–24 — Session I',
    year: '2024',
    examStage: 'Prelim (Part-I Objective)',
    pdfUrl: '/assets/aistudio/WBPSC-Clerkship-Question-Paper-2024-Shift-1_1e82862b.pdf',
    totalPages: 81,
    officialQuestionCount: 100,
    hasBookletSeriesABCD: true,
    description: 'Morning shift objective paper (Code SLA/23) with step-by-step Arithmetic workings and GK/English solutions.',
  },
  {
    id: 'prelim-2024-shift-2',
    fileName: 'WBPSC-Clerkship-Question-Paper-2024-Shift-2_18c83a13.pdf',
    shortLabel: '2024 Prelim Shift-2 (SLB/23)',
    title: 'WBPSC Clerkship Examination (Part-I), 2023–24 — Session II',
    year: '2024',
    examStage: 'Prelim (Part-I Objective)',
    pdfUrl: '/assets/aistudio/WBPSC-Clerkship-Question-Paper-2024-Shift-2_18c83a13.pdf',
    totalPages: 81,
    officialQuestionCount: 100,
    hasBookletSeriesABCD: true,
    description: 'Mid-day shift objective paper (Code SLB/23) covering Pipes & Cisterns, Trains, Cube Roots, and GK/Grammar.',
  },
  {
    id: 'mains-2024',
    fileName: 'Clerkship-Mains-Question-Paper_32ff6d8a.pdf',
    shortLabel: 'Mains 2023–24 (SL/II/23)',
    title: 'WBPSC Clerkship Examination (Part-II Mains), 2023–24 — Group A & B',
    year: '2024',
    examStage: 'Mains (Part-II Descriptive)',
    pdfUrl: '/assets/aistudio/Clerkship-Mains-Question-Paper_32ff6d8a.pdf',
    totalPages: 4,
    officialQuestionCount: 6,
    hasBookletSeriesABCD: false,
    description: '6 Parent Questions (Group-A Q.1–Q.3 & Group-B Q.1–Q.3) with sub-parts 1A/1B, 3a/3b, and ১ক/১খ nested under their parent questions.',
  },
  {
    id: 'mains-2020-set3',
    fileName: 'WBPSC-Clerkship-2019-Set-3_64e0f90e.pdf',
    shortLabel: 'Mains 2020 Regular (FCP/19 Set-3)',
    title: 'WBPSC Clerkship Examination (Part-II Mains), 2019–20 (Set-3 Combined)',
    year: '2020',
    examStage: 'Mains (Part-II Descriptive)',
    pdfUrl: '/assets/aistudio/WBPSC-Clerkship-2019-Set-3_64e0f90e.pdf',
    totalPages: 8,
    officialQuestionCount: 6,
    hasBookletSeriesABCD: false,
    description: 'Combined Group-A (FCP/I/19, Q.1–Q.3) & Group-B (FCP/II/19, Q.1–Q.3) booklet with sub-parts 1a/1b nested under Q.1.',
  },
  {
    id: 'mains-2020-group-a',
    fileName: 'WBPSC-Clerkship-Mains-2020-Group-A_df628fec.pdf',
    shortLabel: 'Mains 2020 Group-A (FCP/I/19)',
    title: 'WBPSC Clerkship Mains 2020 — Group-A English Sheet (FCP/I/19)',
    year: '2020',
    examStage: 'Mains (Part-II Descriptive)',
    pdfUrl: '/assets/aistudio/WBPSC-Clerkship-Mains-2020-Group-A_df628fec.pdf',
    totalPages: 4,
    officialQuestionCount: 3,
    isSubsetOfPaperId: 'mains-2020-set3',
    hasBookletSeriesABCD: false,
    description: 'Standalone Group-A English sheet (3 Parent Questions: Q.1 [with 1a & 1b], Q.2 Orwell Précis, and Q.3 Translation).',
  },
  {
    id: 'mains-2020-group-b',
    fileName: 'WBPSC-Clerkship-Mains-Question-Paper-2020-Group-B_d16875e1.pdf',
    shortLabel: 'Mains 2020 Group-B (FCP/II/19)',
    title: 'WBPSC Clerkship Mains 2020 — Group-B Vernacular Sheet (FCP/II/19)',
    year: '2020',
    examStage: 'Mains (Part-II Descriptive)',
    pdfUrl: '/assets/aistudio/WBPSC-Clerkship-Mains-Question-Paper-2020-Group-B_d16875e1.pdf',
    totalPages: 7,
    officialQuestionCount: 3,
    isSubsetOfPaperId: 'mains-2020-set3',
    hasBookletSeriesABCD: false,
    description: 'Standalone Group-B Vernacular sheet (3 Parent Questions: Q.1 [with ১ক & ১খ], Q.2 Advertising Précis, and Q.3 Patriot Translation).',
  },
  {
    id: 'mains-2020-set4',
    fileName: 'WBPSC-Clerkship-2019-Set-4_199741ce.pdf',
    shortLabel: 'Mains 2020 Supp. (SFCP/19 Set-4)',
    title: 'WBPSC Clerkship Examination (Part-II Supplementary Mains), 2019–20 (Set-4)',
    year: '2020',
    examStage: 'Mains (Part-II Descriptive)',
    pdfUrl: '/assets/aistudio/WBPSC-Clerkship-2019-Set-4_199741ce.pdf',
    totalPages: 9,
    officialQuestionCount: 6,
    hasBookletSeriesABCD: false,
    description: '6 Parent Questions (Group-A Q.1–Q.3 & Group-B Q.1–Q.3) with sub-parts 1a/1b and ১ক/১খ nested under their parent questions.',
  },
  {
    id: 'prelim-2020-shift-1',
    fileName: 'WBPSC-Clerkship-2019-Set-2_28ca01e6.pdf',
    shortLabel: '2020 Prelim Shift-1 (DBF/19)',
    title: 'WBPSC Clerkship Examination (Part-I), 2019–20 — Set-2 (Shift-1)',
    year: '2020',
    examStage: 'Prelim (Part-I Objective)',
    pdfUrl: '/assets/aistudio/WBPSC-Clerkship-2019-Set-2_28ca01e6.pdf',
    totalPages: 21,
    officialQuestionCount: 100,
    hasBookletSeriesABCD: false,
    description: '25 Jan 2020 Morning Shift (Code DBF/19) — Compound Ratios, Cubic Identities, Compound Interest & GK/English.',
  },
  {
    id: 'prelim-2020-shift-2',
    fileName: 'WBPSC-Clerkship-25-Jan-2020-Shift-2_36ddf63b.pdf',
    shortLabel: '2020 Prelim Shift-2 (BDA/19)',
    title: 'WBPSC Clerkship Examination (Part-I), 2019–20 — 25 Jan 2020 Shift-2',
    year: '2020',
    examStage: 'Prelim (Part-I Objective)',
    pdfUrl: '/assets/aistudio/WBPSC-Clerkship-25-Jan-2020-Shift-2_36ddf63b.pdf',
    totalPages: 22,
    officialQuestionCount: 100,
    hasBookletSeriesABCD: false,
    description: '25 Jan 2020 Afternoon Shift (Code BDA/19) — Races, Loss on SP, Sum of Cubes, INA Moirang & Kamarpukur GK.',
  },
  {
    id: 'mains-2015',
    fileName: 'WBPSC_Clerkship_Main_Question_Paper_2015_e5c710a1.pdf',
    shortLabel: 'Mains 2015 (Group A & B)',
    title: 'WBPSC Clerkship Examination (Part-II Mains), 2015',
    year: '2015',
    examStage: 'Mains (Part-II Descriptive)',
    pdfUrl: '/assets/aistudio/WBPSC_Clerkship_Main_Question_Paper_2015_e5c710a1.pdf',
    totalPages: 4,
    officialQuestionCount: 6,
    hasBookletSeriesABCD: false,
    description: '6 Parent Questions (Group-A Q.1–Q.3 & Group-B Q.1–Q.3): Hooghly Boat Capsize, Wealth Précis, Science Craze, Agriculture & Hawkers.',
  },
];

export const shift3Questions: QuestionItem[] = [
  ...englishQuestions,
  ...mathQuestions,
  ...gkQuestions,
]
  .map((q) => ({
    ...q,
    paperId: 'prelim-2024-shift-3',
    paperShortTitle: '2024 Prelim Shift-3 (SLC/23)',
    pdfUrl: '/assets/aistudio/WBPSC-Clerkship-Question-Paper-2024-Shift-3_78cf71f5.pdf',
    autoType: classifyQuestionAutoType(q),
  }))
  .sort((a, b) => a.seriesNumbers.A - b.seriesNumbers.A);

export const allQuestions: QuestionItem[] = [
  ...shift3Questions,
  ...mainsDescriptiveQuestions.map((q) => ({ ...q, autoType: classifyQuestionAutoType(q) })),
  ...prelim2024Shift1Questions.map((q) => ({ ...q, autoType: classifyQuestionAutoType(q) })),
  ...prelim2024Shift2Questions.map((q) => ({ ...q, autoType: classifyQuestionAutoType(q) })),
  ...prelim2020Questions.map((q) => ({ ...q, autoType: classifyQuestionAutoType(q) })),
];

export const EXAM_METADATA = {
  title: 'WBPSC Clerkship 2026 mock Q&A',
  session: '11 Official Question Papers (5 Prelim Objective + 6 Mains Descriptive)',
  code: 'SLC/23 · SLA/23 · SLB/23 · SL/II/23 · FCP/19 · SFCP/19 · DBF/19 · BDA/19',
  timeAllowed: '1 Hour 30 Minutes (Prelim) / 1 Hour (Mains)',
  fullMarks: 100,
  negativeMarking: 0.25,
  seriesSerialNumbers: {
    A: '3190085',
    B: '3190086',
    C: '3190087',
    D: '3190088',
  },
  pdfUrl: '/assets/aistudio/WBPSC-Clerkship-Question-Paper-2024-Shift-3_78cf71f5.pdf',
};
