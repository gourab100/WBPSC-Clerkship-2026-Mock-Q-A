import assert from 'node:assert/strict';
import test from 'node:test';
import {
  allQuestions,
  EXAM_PAPERS,
  shift3Questions,
} from '../data/questions';
import { prelim2024Shift1Questions } from '../data/prelim2024Shift1';
import { prelim2024Shift2Questions } from '../data/prelim2024Shift2';
import { prelim2020Shift1Questions } from '../data/prelim2020Shift1';
import { prelim2020Shift2Questions } from '../data/prelim2020Shift2';
import {
  calculateExamScore,
  filterAndSortQuestions,
  getPaperTrackingStats,
  paginateQuestions,
  resolveAutoQuestionType,
  validateQuestionBankIntegrity,
} from './studyLogic';

test('All 5 Preliminary MCQ papers have 100/100 questions and valid 1-100 question numbers', () => {
  const prelimSets = [
    { name: '2024 Shift-1 (SLA/23)', questions: prelim2024Shift1Questions },
    { name: '2024 Shift-2 (SLB/23)', questions: prelim2024Shift2Questions },
    { name: '2024 Shift-3 (SLC/23)', questions: shift3Questions },
    { name: '2020 Shift-1 (DBF/19)', questions: prelim2020Shift1Questions },
    { name: '2020 Shift-2 (BDA/19)', questions: prelim2020Shift2Questions },
  ];

  for (const set of prelimSets) {
    assert.equal(set.questions.length, 100, `${set.name} should have 100 questions`);
    const integrity = validateQuestionBankIntegrity(set.questions);
    assert.equal(
      integrity.isValid,
      true,
      `Integrity errors in ${set.name}: ${integrity.errors.join('; ')}`
    );
  }
});

test('all 11 uploaded PDF sheets are 100% populated (524 unique parent questions / 530 raw sheet questions / 531 prompts w/ sub-parts)', () => {
  assert.equal(EXAM_PAPERS.length, 11);

  const stats = getPaperTrackingStats(allQuestions, EXAM_PAPERS);
  assert.equal(stats.totalExtractedParentQuestions, 524);
  assert.equal(stats.totalExtractedWithSubParts, 531);
  assert.equal(stats.totalOfficialUniqueQuestions, 524);
  assert.equal(stats.totalOfficialRawSheetQuestions, 530);

  for (const paper of EXAM_PAPERS) {
    const pStat = stats.byPaperId[paper.id];
    assert.equal(
      pStat.extractedParentCount,
      paper.officialQuestionCount,
      `Paper ${paper.id} should have ${paper.officialQuestionCount}/${paper.officialQuestionCount} extracted questions`
    );
  }
});

test('every descriptive parent question includes a structured Model Answer Guide and keeps sub-parts (1a, 1b) nested under the parent question', () => {
  const descriptiveQuestions = allQuestions.filter(
    (q) => resolveAutoQuestionType(q) === 'descriptive-model-guide'
  );
  assert.equal(descriptiveQuestions.length, 24);

  for (const q of descriptiveQuestions) {
    assert.ok(q.descriptiveGuide, `Missing descriptiveGuide on ${q.id}`);
    assert.ok(
      q.descriptiveGuide.outlineStructure.length >= 2,
      `Outline too short on ${q.id}`
    );
    assert.ok(
      q.descriptiveGuide.keyThemesAndArguments.length >= 1,
      `Key themes too short on ${q.id}`
    );
    assert.ok(
      q.descriptiveGuide.sampleAnswerBody.length >= 100,
      `Sample answer body too short on ${q.id}`
    );
  }

  const mains2024Q1 = descriptiveQuestions.find((q) => q.id === 'mains-2024-q1');
  assert.ok(mains2024Q1?.subParts);
  assert.equal(mains2024Q1.subParts.length, 2);
});

test('every mathematics question across all 5 Prelim shifts (150 Math Qs) includes step-by-step workings and LaTeX equations', () => {
  const mathQuestions = allQuestions.filter(
    (q) => resolveAutoQuestionType(q) === 'math-step-by-step'
  );
  assert.equal(mathQuestions.length, 150);

  for (const q of mathQuestions) {
    assert.ok(q.steps.length >= 1, `Math question ${q.id} should have steps`);
    const hasLatex =
      q.steps.some((s) => Boolean(s.formulaLatex)) || Boolean(q.keyFormulaOrConcept);
    assert.equal(hasLatex, true, `Math question ${q.id} should include formulaLatex`);
  }
});

test('paginateQuestions slices 100-question papers into 20-question pages accurately', () => {
  const page1 = paginateQuestions(prelim2024Shift1Questions, 1, 20);
  assert.equal(page1.items.length, 20);
  assert.equal(page1.currentPage, 1);
  assert.equal(page1.totalPages, 5);
  assert.equal(page1.startIndex, 1);
  assert.equal(page1.endIndex, 20);

  const page5 = paginateQuestions(prelim2024Shift1Questions, 5, 20);
  assert.equal(page5.items.length, 20);
  assert.equal(page5.currentPage, 5);
  assert.equal(page5.startIndex, 81);
  assert.equal(page5.endIndex, 100);
});

test('filterAndSortQuestions filters accurately by paperId and autoType', () => {
  const shift1Only = filterAndSortQuestions(allQuestions, {
    paperId: 'prelim-2024-shift-1',
    autoType: 'all',
    series: 'A',
    category: 'all',
    subTopic: 'all',
    searchQuery: '',
    attemptFilter: 'all',
    userAnswers: {},
    bookmarkedIds: new Set(),
  });
  assert.equal(shift1Only.length, 100);

  const shift2Only = filterAndSortQuestions(allQuestions, {
    paperId: 'prelim-2020-shift-2',
    autoType: 'all',
    series: 'A',
    category: 'all',
    subTopic: 'all',
    searchQuery: '',
    attemptFilter: 'all',
    userAnswers: {},
    bookmarkedIds: new Set(),
  });
  assert.equal(shift2Only.length, 100);
});

test('calculateExamScore applies +1 for correct and -0.25 negative marking for incorrect', () => {
  const firstQ = shift3Questions[0];
  const secondQ = shift3Questions[1];
  const wrongOption = secondQ.correctOption === 'A' ? 'B' : 'A';

  const score = calculateExamScore(shift3Questions, {
    [firstQ.id]: firstQ.correctOption!,
    [secondQ.id]: wrongOption,
  });

  assert.equal(score.attemptedCount, 2);
  assert.equal(score.correctCount, 1);
  assert.equal(score.incorrectCount, 1);
  assert.equal(score.netScore, 0.75);
});
