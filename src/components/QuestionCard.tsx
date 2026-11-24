import React, { useState } from 'react';
import {
  Bookmark,
  Check,
  ChevronDown,
  ChevronUp,
  FileText,
  RotateCcw,
  X,
} from 'lucide-react';
import { OptionKey, QuestionItem } from '../types/question';
import { resolveAutoQuestionType } from '../utils/studyLogic';
import { MathBlock } from './MathBlock';

interface QuestionCardProps {
  question: QuestionItem;
  displayIndex?: number;
  showBengali: boolean;
  isExpanded: boolean;
  onToggleExpand: (id: string) => void;
  selectedOption?: OptionKey;
  onSelectOption: (id: string, option: OptionKey) => void;
  onClearOption: (id: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onOpenPdfAtPage: (page: number, pdfUrl?: string, paperTitle?: string) => void;
}

const OPTION_KEYS: OptionKey[] = ['A', 'B', 'C', 'D'];

function renderFormattedQuestionText(text: string): React.ReactNode {
  const lines = text.split('\n');
  return lines.map((line, lineIdx) => {
    const parts = line.split(/(\[[^\]]+\])/g);
    return (
      <p
        key={lineIdx}
        className={lineIdx > 0 ? 'mt-2 font-medium text-slate-900' : ''}
      >
        {parts.map((part, partIdx) => {
          if (part.startsWith('[') && part.endsWith(']')) {
            const inner = part.slice(1, -1);
            return (
              <span
                key={partIdx}
                className="underline decoration-[#1E40AF] decoration-2 underline-offset-4 font-semibold text-slate-900"
              >
                {inner}
              </span>
            );
          }
          return <React.Fragment key={partIdx}>{part}</React.Fragment>;
        })}
      </p>
    );
  });
}

function getCategoryPillConfig(category: QuestionItem['category']): {
  label: string;
  className: string;
} {
  if (category === 'General Knowledge') {
    return {
      label: 'West Bengal GK',
      className: 'bg-[#0D8A6A] text-white',
    };
  }
  if (category === 'Mathematics') {
    return {
      label: 'WBPSC Arithmetic',
      className: 'bg-[#1D64D8] text-white',
    };
  }
  if (category === 'English') {
    return {
      label: 'General English',
      className: 'bg-[#162238] text-white',
    };
  }
  return {
    label: 'Mains Descriptive',
    className: 'bg-[#F5A623] text-slate-950',
  };
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  displayIndex,
  showBengali,
  isExpanded,
  onToggleExpand,
  selectedOption,
  onSelectOption,
  onClearOption,
  isBookmarked,
  onToggleBookmark,
  onOpenPdfAtPage,
}) => {
  const [selectedSubPartId, setSelectedSubPartId] = useState<string>('all');

  const currentQNum = displayIndex ?? question.seriesNumbers.A;
  const currentPdfPage = question.pdfPages.A;
  const autoType = resolveAutoQuestionType(question);
  const isDescriptive =
    autoType === 'descriptive-model-guide' || !question.options;
  const isMath = autoType === 'math-step-by-step';

  const isAttempted = !isDescriptive && selectedOption !== undefined;
  const isCorrect = isAttempted && selectedOption === question.correctOption;

  const activeSubPart =
    question.subParts && selectedSubPartId !== 'all'
      ? question.subParts.find((sp) => sp.partId === selectedSubPartId)
      : undefined;

  const activeGuide = activeSubPart
    ? activeSubPart.descriptiveGuide
    : question.descriptiveGuide;

  const categoryPill = getCategoryPillConfig(question.category);

  const briefExplanationPreview =
    question.steps && question.steps.length > 0
      ? question.steps[0].explanation
      : question.keyFormulaOrConcept || question.directAnswerSummary;

  return (
    <article
      id={`question-card-${question.id}`}
      data-question-num={currentQNum}
      data-testid={`question-card-${question.id}`}
      className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-md transition-all hover:shadow-lg flex flex-col justify-between"
    >
      <div>
        {/* Card Header: "Question #1" + Subject Pill Badge (Matches Image 1) */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <h3 className="text-lg sm:text-xl font-extrabold text-[#0B192C] tracking-tight">
              Question #{currentQNum}
            </h3>
            {question.paperShortTitle && (
              <span className="text-xs font-medium text-slate-400">
                · {question.paperShortTitle}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-3.5 py-1 rounded-full text-xs font-extrabold tracking-tight shadow-2xs ${categoryPill.className}`}
            >
              {categoryPill.label}
            </span>

            <button
              type="button"
              onClick={() => onToggleBookmark(question.id)}
              aria-label={
                isBookmarked
                  ? `Remove bookmark for question ${currentQNum}`
                  : `Bookmark question ${currentQNum}`
              }
              title={isBookmarked ? 'Saved question' : 'Save question'}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-amber-50 border-amber-300 text-amber-600'
                  : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700'
              }`}
            >
              <Bookmark
                className={`w-3.5 h-3.5 ${
                  isBookmarked ? 'fill-amber-500 text-amber-500' : ''
                }`}
              />
            </button>

            <button
              type="button"
              onClick={() =>
                onOpenPdfAtPage(
                  currentPdfPage,
                  question.pdfUrl,
                  question.paperShortTitle
                )
              }
              className="p-1.5 rounded-lg border bg-slate-50 border-slate-200 text-slate-500 hover:text-[#162238] transition-colors cursor-pointer"
              title={`View PDF Page ${currentPdfPage}`}
            >
              <FileText className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Question Prompt (English + Optional Bengali/Vernacular) */}
        <div className="space-y-2 mb-4">
          <div className="text-[15px] sm:text-base font-medium leading-relaxed text-slate-800">
            {renderFormattedQuestionText(question.questionEn)}
          </div>
          {showBengali && question.questionBn && (
            <p className="text-sm leading-relaxed text-slate-600 pt-0.5">
              {question.questionBn}
            </p>
          )}
        </div>

        {/* Full-Width Stacked Pill-Shaped (A) / (B) / (C) / (D) Options (Matches Image 1) */}
        {!isDescriptive && question.options && (
          <div className="space-y-2.5 mb-4">
            {OPTION_KEYS.map((optKey) => {
              const opt = question.options![optKey];
              const isUserSelected = selectedOption === optKey;
              const isOptionCorrect = question.correctOption === optKey;
              const showAnswerState = isAttempted || isExpanded;

              let buttonStyle =
                'border-slate-300 bg-white hover:bg-slate-50 hover:border-slate-400 text-slate-800';

              if (showAnswerState) {
                if (isOptionCorrect) {
                  buttonStyle =
                    'border-[#22A06B] bg-[#D1F2E1] text-slate-900 font-semibold';
                } else if (isUserSelected && !isOptionCorrect) {
                  buttonStyle =
                    'border-rose-500 bg-rose-50/90 text-rose-950 font-semibold';
                }
              }

              return (
                <button
                  key={optKey}
                  type="button"
                  onClick={() => onSelectOption(question.id, optKey)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl border text-left text-sm sm:text-[15px] transition-all cursor-pointer ${buttonStyle}`}
                >
                  <div className="min-w-0">
                    <span className="leading-snug">
                      ({optKey}) {opt.en}
                    </span>
                    {showBengali && opt.bn && opt.bn !== opt.en && (
                      <span className="block text-xs text-slate-600 mt-0.5">
                        {opt.bn}
                      </span>
                    )}
                  </div>

                  {showAnswerState && isOptionCorrect && (
                    <span className="inline-flex items-center gap-1 text-xs font-extrabold text-[#12794E] shrink-0">
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    </span>
                  )}
                  {showAnswerState && isUserSelected && !isOptionCorrect && (
                    <span className="inline-flex items-center gap-1 text-xs font-extrabold text-rose-700 shrink-0">
                      <X className="w-4 h-4 stroke-[2.5]" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Collapsible Explanation Bar at Bottom of Card (Matches Image 1) */}
      <div className="pt-3 border-t border-slate-100">
        <div className="flex items-start justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              if (!isDescriptive && !isAttempted && !isExpanded) {
                return;
              }
              onToggleExpand(question.id);
            }}
            aria-expanded={isExpanded}
            className={`flex-1 flex items-center justify-between gap-3 text-left text-xs sm:text-sm transition-colors ${
              !isDescriptive && !isAttempted && !isExpanded
                ? 'text-slate-500 cursor-default'
                : 'text-slate-700 hover:text-slate-950 cursor-pointer'
            }`}
          >
            <div className="line-clamp-2 leading-relaxed">
              <strong className="font-extrabold text-slate-900">
                {isDescriptive ? 'Model Answer Guide: ' : 'Explanation: '}
              </strong>
              <span>
                {isExpanded || isAttempted
                  ? briefExplanationPreview
                  : isDescriptive
                  ? 'Click to expand structured outline, key themes, and sample response...'
                  : 'Select an option (A, B, C, or D) above to reveal the correct answer and explanation...'}
              </span>
            </div>
            {(isDescriptive || isAttempted || isExpanded) && (
              <span className="p-1 rounded-lg bg-slate-100 text-slate-700 shrink-0">
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </span>
            )}
          </button>

          {isAttempted && (
            <button
              type="button"
              onClick={() => onClearOption(question.id)}
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 font-semibold shrink-0 pt-0.5 cursor-pointer"
              title="Reset your selected option"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* =====================================================================
            EXPANDED SOLUTION PANEL
            ===================================================================== */}
        {isExpanded && (
          <div
            data-testid={`solution-panel-${question.id}`}
            className="mt-3.5 bg-[#F4F6F9] border border-slate-200/90 rounded-xl p-4 divide-y divide-slate-200/80"
          >
            {isDescriptive && activeGuide ? (
              <>
                <div className="space-y-3 pb-3.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-[#162238] block">
                        Structured Model Answer Guide · {activeGuide.formatType}
                        {question.parentQuestionLabel
                          ? ` · ${question.parentQuestionLabel}`
                          : ''}
                      </span>
                      <p className="text-sm font-bold text-slate-900 mt-0.5">
                        {activeSubPart
                          ? activeSubPart.promptEn
                          : question.directAnswerSummary}
                      </p>
                    </div>
                    <div className="text-xs font-mono-tabular text-slate-600 shrink-0">
                      {activeGuide.marks} Marks ·{' '}
                      {activeGuide.wordLimitOrTarget}
                    </div>
                  </div>

                  {question.subParts && question.subParts.length > 1 && (
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-xs font-semibold text-slate-600">
                        Question Parts:
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedSubPartId('all')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          selectedSubPartId === 'all'
                            ? 'bg-[#162238] text-amber-300'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        All Parts
                      </button>
                      {question.subParts.map((sp) => (
                        <button
                          key={sp.partId}
                          type="button"
                          onClick={() => setSelectedSubPartId(sp.partId)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                            selectedSubPartId === sp.partId
                              ? 'bg-[#0D8A6A] text-white'
                              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {sp.partLabel}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* 1. Outline */}
                <div className="py-3">
                  <h4 className="text-xs font-extrabold text-slate-900 mb-2">
                    1. Recommended Outline &amp; Structural Layout
                  </h4>
                  <ol className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                    {activeGuide.outlineStructure.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-baseline gap-2 leading-relaxed"
                      >
                        <span className="font-mono-tabular font-bold text-[#162238] shrink-0">
                          {idx + 1}.
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* 2. Key Themes */}
                <div className="py-3">
                  <h4 className="text-xs font-extrabold text-slate-900 mb-2">
                    2. Key Themes, Arguments &amp; Vocabulary Focus
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                    {activeGuide.keyThemesAndArguments.map((theme, idx) => (
                      <li
                        key={idx}
                        className="flex items-baseline gap-2 leading-relaxed"
                      >
                        <span className="font-mono-tabular font-bold text-emerald-700 shrink-0">
                          •
                        </span>
                        <span>{theme}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Sample Response */}
                <div className="pt-3 space-y-2.5">
                  <h4 className="text-xs font-extrabold text-slate-900">
                    3. Complete High-Scoring Sample Response
                  </h4>
                  <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
                    <h5 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                      {activeGuide.sampleAnswerTitle}
                    </h5>
                    <div className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                      {activeGuide.sampleAnswerBody}
                    </div>
                  </div>

                  {activeGuide.secondarySampleBody && (
                    <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
                      <div className="text-xs font-bold text-[#162238] border-b border-slate-100 pb-1.5">
                        Second Sub-Part / Alternative Model Answer
                      </div>
                      <div className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                        {activeGuide.secondarySampleBody}
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : isMath ? (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block">
                      Verified Mathematical Answer
                    </span>
                    <p className="text-sm font-extrabold text-[#12794E] mt-0.5">
                      {question.directAnswerSummary.startsWith('Option')
                        ? question.directAnswerSummary
                        : `Option ${question.directAnswerSummary}`}
                    </p>
                  </div>
                </div>

                {question.keyFormulaOrConcept && (
                  <div className="py-3">
                    <div className="text-xs font-bold text-slate-700 mb-1">
                      Core Formula &amp; Algebraic Relation
                    </div>
                    <MathBlock
                      latex={question.keyFormulaOrConcept}
                      displayMode={true}
                      className="text-sm text-slate-900"
                    />
                  </div>
                )}

                <div className="pt-3 space-y-2.5">
                  <h4 className="text-xs font-bold text-slate-800">
                    Step-by-Step Mathematical Working
                  </h4>
                  <ol className="divide-y divide-slate-200/60">
                    {question.steps.map((step, idx) => (
                      <li key={idx} className="py-2.5 first:pt-1 last:pb-0">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="font-mono-tabular text-xs font-bold text-[#1D64D8]">
                            Step {idx + 1}.
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-slate-900">
                            {step.title}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {step.explanation}
                        </p>
                        {step.formulaLatex && (
                          <div className="mt-2 py-1 px-3 bg-white border border-slate-200/70 rounded-lg">
                            <MathBlock
                              latex={step.formulaLatex}
                              displayMode={true}
                              className="text-slate-900 text-sm"
                            />
                          </div>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              </>
            ) : (
              <>
                <div className="pb-2.5">
                  <span className="text-xs font-semibold text-slate-500 block">
                    Verified Correct Answer
                  </span>
                  <p className="text-sm font-extrabold text-[#12794E] mt-0.5">
                    {question.directAnswerSummary.startsWith('Option')
                      ? question.directAnswerSummary
                      : `Option ${question.directAnswerSummary}`}
                  </p>
                </div>

                {question.keyFormulaOrConcept && (
                  <div className="py-2.5">
                    <div className="text-xs font-bold text-slate-700 mb-0.5">
                      Key Fact / Grammar Rule
                    </div>
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                      {question.keyFormulaOrConcept}
                    </p>
                  </div>
                )}

                {question.steps.length > 0 && (
                  <div className="pt-2.5 space-y-1.5">
                    {question.steps.map((step, idx) => (
                      <div
                        key={idx}
                        className="text-xs sm:text-sm text-slate-700 leading-relaxed"
                      >
                        <span className="font-bold text-slate-900">
                          {step.title}:{' '}
                        </span>
                        <span>{step.explanation}</span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </article>
  );
};
