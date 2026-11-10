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
import { BookletSeries, OptionKey, QuestionItem } from '../types/question';
import { resolveAutoQuestionType } from '../utils/studyLogic';
import { MathBlock } from './MathBlock';

interface QuestionCardProps {
  question: QuestionItem;
  activeSeries: BookletSeries;
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
      <p key={lineIdx} className={lineIdx > 0 ? 'mt-2 font-medium text-slate-900' : ''}>
        {parts.map((part, partIdx) => {
          if (part.startsWith('[') && part.endsWith(']')) {
            const inner = part.slice(1, -1);
            return (
              <span
                key={partIdx}
                className="underline decoration-sky-600 decoration-2 underline-offset-4 font-semibold text-slate-900"
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

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  activeSeries,
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

  const currentQNum = question.seriesNumbers[activeSeries];
  const currentPdfPage = question.pdfPages[activeSeries];
  const autoType = resolveAutoQuestionType(question);
  const isDescriptive = autoType === 'descriptive-model-guide' || !question.options;
  const isMath = autoType === 'math-step-by-step';

  const isAttempted = !isDescriptive && selectedOption !== undefined;
  const isCorrect = isAttempted && selectedOption === question.correctOption;

  const autoTypeLabel = isDescriptive
    ? 'Auto-Detected: Descriptive Model Guide'
    : isMath
    ? 'Auto-Detected: Step-by-Step Math'
    : 'Auto-Detected: Concise Objective / GK & Grammar';

  const expandButtonLabel = isDescriptive
    ? isExpanded
      ? 'Hide Model Answer Guide'
      : 'Show Model Answer Guide'
    : isMath
    ? isExpanded
      ? 'Hide Step-by-Step Answer'
      : 'Show Step-by-Step Answer'
    : isExpanded
    ? 'Hide Concise Answer'
    : 'Show Step-by-Step Answer';

  const activeSubPart =
    question.subParts && selectedSubPartId !== 'all'
      ? question.subParts.find((sp) => sp.partId === selectedSubPartId)
      : undefined;

  const activeGuide = activeSubPart ? activeSubPart.descriptiveGuide : question.descriptiveGuide;

  return (
    <article
      id={`question-card-${question.id}`}
      data-question-num={currentQNum}
      data-testid={`question-card-${question.id}`}
      className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 transition-colors hover:border-slate-300"
    >
      {/* Top Unboxed Metadata Row (Zero-Pill Discipline) */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100 text-xs text-slate-500">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-mono-tabular font-semibold text-slate-900 text-sm">
            Q.{String(currentQNum).padStart(2, '0')}
          </span>
          {question.parentQuestionLabel && (
            <>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-slate-800">{question.parentQuestionLabel}</span>
            </>
          )}
          {question.paperShortTitle && (
            <>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-sky-800">{question.paperShortTitle}</span>
            </>
          )}
          <span aria-hidden="true">·</span>
          <span className="font-medium text-slate-700">{question.category}</span>
          <span aria-hidden="true">·</span>
          <span>{question.subTopic}</span>
          <span aria-hidden="true" className="hidden md:inline">
            ·
          </span>
          <span className="hidden md:inline text-slate-500">{autoTypeLabel}</span>
        </div>

        <div className="flex items-center gap-3">
          {isAttempted && (
            <button
              type="button"
              onClick={() => onClearOption(question.id)}
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              title="Reset your selected option for this question"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
          <button
            type="button"
            onClick={() =>
              onOpenPdfAtPage(currentPdfPage, question.pdfUrl, question.paperShortTitle)
            }
            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-sky-700 transition-colors cursor-pointer"
            title={`View original scan on PDF Page ${currentPdfPage}`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="font-mono-tabular">PDF p.{currentPdfPage}</span>
          </button>
          <button
            type="button"
            onClick={() => onToggleBookmark(question.id)}
            aria-label={
              isBookmarked
                ? `Remove bookmark for question ${currentQNum}`
                : `Bookmark question ${currentQNum}`
            }
            className={`inline-flex items-center gap-1 text-xs transition-colors cursor-pointer ${
              isBookmarked ? 'text-amber-600 font-medium' : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            <Bookmark
              className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`}
            />
            <span>{isBookmarked ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Question Prompt (English + Optional Bengali/Vernacular) */}
      <div className="space-y-2.5 mb-5">
        <div className="text-base sm:text-[17px] leading-relaxed text-slate-900">
          {renderFormattedQuestionText(question.questionEn)}
        </div>
        {showBengali && question.questionBn && (
          <p className="text-[15px] leading-relaxed text-slate-600 pt-1">
            {question.questionBn}
          </p>
        )}
      </div>

      {/* Interactive Multiple Choice Options Grid (Only for Objective Questions) */}
      {!isDescriptive && question.options && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
          {OPTION_KEYS.map((optKey) => {
            const opt = question.options![optKey];
            const isUserSelected = selectedOption === optKey;
            const isOptionCorrect = question.correctOption === optKey;
            const showAnswerState = isAttempted || isExpanded;

            let buttonStyle =
              'border-slate-200 bg-slate-50/60 hover:bg-slate-100/80 hover:border-slate-300 text-slate-800';
            let badgeStyle = 'bg-white border-slate-300 text-slate-700';

            if (showAnswerState) {
              if (isOptionCorrect) {
                buttonStyle = 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-medium';
                badgeStyle = 'bg-emerald-600 border-emerald-600 text-white';
              } else if (isUserSelected && !isOptionCorrect) {
                buttonStyle = 'border-rose-500 bg-rose-50/70 text-rose-950';
                badgeStyle = 'bg-rose-600 border-rose-600 text-white';
              }
            }

            return (
              <button
                key={optKey}
                type="button"
                onClick={() => onSelectOption(question.id, optKey)}
                className={`group flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-lg border text-left text-sm transition-all cursor-pointer ${buttonStyle}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`w-6 h-6 rounded flex items-center justify-center text-xs font-mono-tabular font-semibold border shrink-0 transition-colors ${badgeStyle}`}
                  >
                    {optKey}
                  </span>
                  <div className="min-w-0">
                    <span className="block text-sm leading-snug">{opt.en}</span>
                    {showBengali && opt.bn && opt.bn !== opt.en && (
                      <span className="block text-xs text-slate-500 mt-0.5">{opt.bn}</span>
                    )}
                  </div>
                </div>

                {showAnswerState && isOptionCorrect && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 shrink-0">
                    <Check className="w-4 h-4" />
                    <span>Correct</span>
                  </span>
                )}
                {showAnswerState && isUserSelected && !isOptionCorrect && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 shrink-0">
                    <X className="w-4 h-4" />
                    <span>Your Choice</span>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Action Bar: Attempt/Format Info + Dropdown Trigger Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
        <div className="text-xs text-slate-600">
          {isDescriptive && question.descriptiveGuide ? (
            <span className="text-slate-600">
              <strong className="font-semibold text-slate-800">
                {question.descriptiveGuide.formatType}
              </strong>{' '}
              · {question.descriptiveGuide.marks} Marks · Target:{' '}
              {question.descriptiveGuide.wordLimitOrTarget}
              {question.subParts && question.subParts.length > 1 && (
                <>
                  {' '}
                  ·{' '}
                  <span className="font-medium text-sky-800">
                    {question.subParts.length} Sub-Parts Nested Under Parent Q.{currentQNum}
                  </span>
                </>
              )}
            </span>
          ) : isAttempted ? (
            isCorrect ? (
              <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700">
                <Check className="w-4 h-4" />
                <span>Correct Answer (+1.00 mark)</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 font-medium text-rose-700">
                <X className="w-4 h-4" />
                <span>
                  Incorrect (–0.25 mark) · Correct Option is ({question.correctOption})
                </span>
              </span>
            )
          ) : (
            <span className="text-slate-500">
              {isMath
                ? 'Select an option or click to reveal meticulous step-by-step equations.'
                : 'Select an option to test yourself or reveal the direct, verified answer.'}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => onToggleExpand(question.id)}
          aria-expanded={isExpanded}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            isExpanded
              ? 'bg-slate-900 text-white hover:bg-slate-800'
              : 'bg-sky-600 text-white hover:bg-sky-700'
          }`}
        >
          <span>{expandButtonLabel}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* =====================================================================
          EXPANDABLE DROPDOWN SECTION (AUTO-SORTED INTO 3 DISTINCT LAYOUTS)
          ===================================================================== */}
      {isExpanded && (
        <div
          data-testid={`solution-panel-${question.id}`}
          className="mt-4 bg-slate-50/80 border border-slate-200/90 rounded-lg p-4 sm:p-5 divide-y divide-slate-200/80"
        >
          {/* -----------------------------------------------------------------
              LAYOUT 3: LONG-FORM DESCRIPTIVE / TRANSLATION / ESSAY / SUMMARY
              Structured "Model Answer Guide" (Outline + Themes + Sample Essay)
              ----------------------------------------------------------------- */}
          {isDescriptive && activeGuide ? (
            <>
              {/* Header Overview + Optional Sub-Part Switcher (1a / 1b) */}
              <div className="space-y-3 pb-3.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-medium text-sky-800 block">
                      Structured Model Answer Guide · {activeGuide.formatType}
                      {question.parentQuestionLabel ? ` · ${question.parentQuestionLabel}` : ''}
                    </span>
                    <p className="text-sm sm:text-base font-semibold text-slate-900 mt-0.5">
                      {activeSubPart ? activeSubPart.promptEn : question.directAnswerSummary}
                    </p>
                  </div>
                  <div className="text-xs font-mono-tabular text-slate-500 shrink-0">
                    {activeGuide.marks} Marks · {activeGuide.wordLimitOrTarget}
                  </div>
                </div>

                {/* Sub-Part Switcher when Parent Question has multiple sub-parts (e.g. 1a, 1b) */}
                {question.subParts && question.subParts.length > 1 && (
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-xs font-medium text-slate-600">
                      Sub-Parts under Parent Q.{currentQNum}:
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedSubPartId('all')}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                        selectedSubPartId === 'all'
                          ? 'bg-slate-900 text-white'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      All Sub-Parts Combined ({question.subParts.length})
                    </button>
                    {question.subParts.map((sp) => (
                      <button
                        key={sp.partId}
                        type="button"
                        onClick={() => setSelectedSubPartId(sp.partId)}
                        className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                          selectedSubPartId === sp.partId
                            ? 'bg-sky-600 text-white'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {sp.partLabel}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 1. Outline / Structure Layout */}
              <div className="py-3.5">
                <h4 className="text-xs font-semibold text-slate-800 mb-2">
                  1. Recommended Outline &amp; Structural Layout
                </h4>
                <ol className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                  {activeGuide.outlineStructure.map((item, idx) => (
                    <li key={idx} className="flex items-baseline gap-2 leading-relaxed">
                      <span className="font-mono-tabular font-semibold text-sky-700 shrink-0">
                        {idx + 1}.
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* 2. Key Themes & Arguments to Focus On */}
              <div className="py-3.5">
                <h4 className="text-xs font-semibold text-slate-800 mb-2">
                  2. Key Themes, Arguments &amp; Vocabulary Focus
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                  {activeGuide.keyThemesAndArguments.map((theme, idx) => (
                    <li key={idx} className="flex items-baseline gap-2 leading-relaxed">
                      <span className="font-mono-tabular font-semibold text-emerald-700 shrink-0">
                        •
                      </span>
                      <span>{theme}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 3. Complete High-Scoring Sample Essay / Report / Summary / Translation */}
              <div className="pt-3.5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-slate-800">
                    3. Complete High-Scoring Sample Response
                  </h4>
                  {question.keyFormulaOrConcept && (
                    <span className="text-[11px] font-mono-tabular text-slate-500">
                      {question.keyFormulaOrConcept}
                    </span>
                  )}
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 space-y-3">
                  <h5 className="text-sm sm:text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                    {activeGuide.sampleAnswerTitle}
                  </h5>
                  <div className="space-y-2.5 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                    {activeGuide.sampleAnswerBody}
                  </div>
                </div>

                {activeGuide.secondarySampleBody && (
                  <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 space-y-2">
                    <div className="text-xs font-semibold text-sky-800 border-b border-slate-100 pb-1.5">
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
            /* -----------------------------------------------------------------
               LAYOUT 1: MATHEMATICS QUESTIONS (Auto-Detected)
               Meticulous Step-by-Step Mathematical Working & Equations
               ----------------------------------------------------------------- */
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5">
                <div>
                  <span className="text-xs font-medium text-slate-500 block">
                    Verified Mathematical Answer
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-emerald-800 mt-0.5">
                    {question.directAnswerSummary.startsWith('Option')
                      ? question.directAnswerSummary
                      : `Option ${question.directAnswerSummary}`}
                  </p>
                </div>
                <div className="text-xs font-mono-tabular text-slate-500">
                  Booklet Series {activeSeries} · Q.{currentQNum}
                </div>
              </div>

              {question.keyFormulaOrConcept && (
                <div className="py-3.5">
                  <div className="text-xs font-semibold text-slate-700 mb-1">
                    Core Formula &amp; Algebraic Relation
                  </div>
                  <MathBlock
                    latex={question.keyFormulaOrConcept}
                    displayMode={true}
                    className="text-sm text-slate-900"
                  />
                </div>
              )}

              <div className="pt-3.5 space-y-3">
                <h4 className="text-xs font-semibold text-slate-700">
                  Meticulous Step-by-Step Mathematical Working
                </h4>
                <ol className="divide-y divide-slate-200/60">
                  {question.steps.map((step, idx) => (
                    <li key={idx} className="py-3 first:pt-1 last:pb-0">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-mono-tabular text-xs font-semibold text-sky-700">
                          Step {idx + 1}.
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-900">
                          {step.title}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {step.explanation}
                      </p>
                      {step.formulaLatex && (
                        <div className="mt-2 py-1 px-3 bg-white border border-slate-200/70 rounded-md">
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
            /* -----------------------------------------------------------------
               LAYOUT 2: OBJECTIVE, SHORT-ANSWER, GK & GRAMMAR (Auto-Detected)
               Direct, Highly Accurate, and Concise Answer
               ----------------------------------------------------------------- */
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5">
                <div>
                  <span className="text-xs font-medium text-slate-500 block">
                    Direct &amp; Concise Verified Answer
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-emerald-800 mt-0.5">
                    {question.directAnswerSummary.startsWith('Option')
                      ? question.directAnswerSummary
                      : `Option ${question.directAnswerSummary}`}
                  </p>
                </div>
                <div className="text-xs font-mono-tabular text-slate-500">
                  {question.category} · Q.{currentQNum}
                </div>
              </div>

              {question.keyFormulaOrConcept && (
                <div className="py-3">
                  <div className="text-xs font-semibold text-slate-700 mb-0.5">
                    Key Fact / Grammar Rule
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                    {question.keyFormulaOrConcept}
                  </p>
                </div>
              )}

              {question.steps.length > 0 && (
                <div className="pt-3 space-y-2">
                  {question.steps.map((step, idx) => (
                    <div key={idx} className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <span className="font-semibold text-slate-900">{step.title}: </span>
                      <span>{step.explanation}</span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </article>
  );
};
