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
  getFreePreviewQuestions,
  getPaperTrackingStats,
  normalizeExtractedQuestions,
  paginateQuestions,
  resolveAutoQuestionType,
  validateQuestionBankIntegrity,
} from './studyLogic';
import {
  ALL_RAW_MOCK_500,
  buildMockTestsFromPool,
  INITIAL_MOCK_QUESTIONS,
} from '../data/mock500Part2';

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

test('all uploaded PDF sheets are 100% populated and tracking stats scale dynamically with questions.length', () => {
  const stats = getPaperTrackingStats(allQuestions, EXAM_PAPERS);
  assert.equal(stats.totalExtractedParentQuestions, allQuestions.length);

  for (const paper of EXAM_PAPERS) {
    const pStat = stats.byPaperId[paper.id];
    assert.equal(
      pStat.extractedParentCount,
      paper.officialQuestionCount,
      `Paper ${paper.id} should have ${paper.officialQuestionCount}/${paper.officialQuestionCount} extracted questions`
    );
  }
});

test('getFreePreviewQuestions returns exactly 20 Prelims Objective MCQ questions (GK, Math, English) and zero Mains descriptive questions', () => {
  const preview = getFreePreviewQuestions(allQuestions, 20);
  assert.equal(preview.length, 20);

  const hasDescriptive = preview.some(
    (q) =>
      q.category === 'Descriptive & Translation' ||
      resolveAutoQuestionType(q) === 'descriptive-model-guide' ||
      !q.options
  );
  assert.equal(hasDescriptive, false);

  const categories = new Set(preview.map((q) => q.category));
  assert.equal(categories.has('English'), true);
  assert.equal(categories.has('General Knowledge'), true);
  assert.equal(categories.has('Mathematics'), true);
});

test('normalizeExtractedQuestions converts newly extracted MCQ and Mains questions and increments dynamic bank count', () => {
  const added = normalizeExtractedQuestions(
    [
      {
        category: 'General Knowledge',
        subTopic: 'West Bengal Geography',
        questionEn: 'Which river is known as the Sorrow of Bengal?',
        optionA: 'Damodar',
        optionB: 'Teesta',
        optionC: 'Hooghly',
        optionD: 'Subarnarekha',
        correctOption: 'A',
        directAnswerSummary: 'Option (A) — Damodar',
      },
      {
        category: 'Descriptive & Translation',
        subTopic: 'Report Writing',
        questionEn: 'Write a report on a blood donation camp.',
        sampleAnswerTitle: 'Blood Donation Camp Held',
        sampleAnswerBody: 'Kolkata, Nov 15: A voluntary blood donation camp was organized...',
      },
    ],
    'custom-2026-mock',
    '2026 Mock Paper',
    1
  );

  assert.equal(added.length, 2);
  const combined = [...allQuestions, ...added];
  const updatedStats = getPaperTrackingStats(combined, EXAM_PAPERS);
  assert.equal(updatedStats.totalExtractedParentQuestions, allQuestions.length + 2);
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

test('500-question CBT Mock Test Pool has 500 solved questions grouped into 5 sequential 100-question Mock Tests (99 MCQs + 1 Mains each)', () => {
  assert.equal(ALL_RAW_MOCK_500.length, 500);
  assert.equal(INITIAL_MOCK_QUESTIONS.length, 500);

  // Verify sequential question numbering Q1..Q500
  for (let i = 0; i < 500; i++) {
    assert.equal(
      ALL_RAW_MOCK_500[i].qNum,
      i + 1,
      `Expected qNum ${i + 1} at index ${i}`
    );
  }

  // Verify separation from the 524 PYQ archive
  assert.equal(allQuestions.length, 524);

  const mockTests = buildMockTestsFromPool(INITIAL_MOCK_QUESTIONS);
  assert.equal(mockTests.length, 5);

  for (let t = 0; t < 5; t++) {
    const testDef = mockTests[t];
    assert.equal(testDef.testNumber, t + 1);
    assert.equal(testDef.title, `Mock Test ${t + 1}`);
    assert.equal(testDef.questions.length, 100);
    assert.equal(
      testDef.mcqCount,
      99,
      `Mock Test ${t + 1} should have 99 Prelims MCQs`
    );
    assert.equal(
      testDef.mainsCount,
      1,
      `Mock Test ${t + 1} should have 1 Mains Descriptive prompt`
    );

    // Check Q1..Q99 in each Mock Test are MCQs with 4 options and verified correctOption
    for (let qIdx = 0; qIdx < 99; qIdx++) {
      const q = testDef.questions[qIdx];
      assert.ok(q.options, `Mock Test ${t + 1} Q${qIdx + 1} must have options`);
      assert.ok(
        q.correctOption,
        `Mock Test ${t + 1} Q${qIdx + 1} must have correctOption`
      );
      assert.ok(
        q.steps.length >= 1,
        `Mock Test ${t + 1} Q${qIdx + 1} must have step-by-step explanation`
      );
    }

    // Check Q100 in each Mock Test is the Mains Descriptive prompt with solved Model Answer
    const mainsQ = testDef.questions[99];
    assert.equal(mainsQ.category, 'Descriptive & Translation');
    assert.ok(
      mainsQ.descriptiveGuide &&
        mainsQ.descriptiveGuide.sampleAnswerBody.length > 40,
      `Mock Test ${t + 1} Q100 must have a complete Mains Descriptive Model Answer`
    );
  }

  // Verify uploading another 500 questions automatically creates Mock Test 6 through Mock Test 10
  const expanded1000 = [...INITIAL_MOCK_QUESTIONS, ...INITIAL_MOCK_QUESTIONS];
  const tenTests = buildMockTestsFromPool(expanded1000);
  assert.equal(tenTests.length, 10);
  assert.equal(tenTests[5].title, 'Mock Test 6');
  assert.equal(tenTests[9].title, 'Mock Test 10');
});

