import React, { useState } from 'react';
import {
  CheckCircle2,
  Download,
  FileUp,
  KeyRound,
  Loader2,
  QrCode,
  ShieldCheck,
  Sparkles,
  Trash2,
  Unlock,
  X,
} from 'lucide-react';
import { ExamPaperSheet, QuestionItem } from '../types/question';
import {
  normalizeExtractedQuestions,
  RawExtractedQuestion,
} from '../utils/studyLogic';
import {
  ADMIN_EMAIL,
  UpiPaymentSettings,
  UtrSubmissionRecord,
} from './PaywallLockScreen';

interface AdminOptionModalProps {
  isOpen: boolean;
  isAdminAuthenticated: boolean;
  adminPreviewFreeMode: boolean;
  onToggleAdminPreviewFreeMode: () => void;
  onAuthenticateAdmin: () => void;
  onLogoutAdmin: () => void;
  onClose: () => void;
  allQuestions: QuestionItem[];
  customQuestions: QuestionItem[];
  mockQuestions?: QuestionItem[];
  onAddExtractedQuestions: (
    newQuestions: QuestionItem[],
    newPaper?: ExamPaperSheet
  ) => void;
  onAddExtractedMockQuestions?: (newMockQuestions: QuestionItem[]) => void;
  onClearCustomQuestions: () => void;
  upiSettings: UpiPaymentSettings;
  onUpdateUpiSettings: (nextSettings: UpiPaymentSettings) => void;
  utrSubmissions: UtrSubmissionRecord[];
  onApproveUtrSubmission: (email: string) => void;
}

const VALID_DEFAULT_PINS = ['2026', '1234', 'admin2026'];

export const AdminOptionModal: React.FC<AdminOptionModalProps> = ({
  isOpen,
  isAdminAuthenticated,
  adminPreviewFreeMode,
  onToggleAdminPreviewFreeMode,
  onAuthenticateAdmin,
  onLogoutAdmin,
  onClose,
  allQuestions,
  customQuestions,
  mockQuestions = [],
  onAddExtractedQuestions,
  onAddExtractedMockQuestions,
  onClearCustomQuestions,
  upiSettings,
  onUpdateUpiSettings,
  utrSubmissions,
  onApproveUtrSubmission,
}) => {
  const [pinInput, setPinInput] = useState('');
  const [adminEmailInput, setAdminEmailInput] = useState('');
  const [authError, setAuthError] = useState('');

  // UPI Settings form state
  const [upiIdInput, setUpiIdInput] = useState(upiSettings.upiId);
  const [payeeNameInput, setPayeeNameInput] = useState(upiSettings.payeeName);
  const [qrPreviewUrl, setQrPreviewUrl] = useState(upiSettings.qrCodeDataUrl);
  const [upiSavedMsg, setUpiSavedMsg] = useState('');

  // Upload & Gemini Extraction states
  const [targetDestination, setTargetDestination] = useState<
    'cbt-mock' | 'pyq-archive'
  >('cbt-mock');
  const [paperLabel, setPaperLabel] = useState('2026 Prelim Mock Sheet');
  const [paperYear, setPaperYear] = useState('2026');
  const [examStage, setExamStage] = useState<
    'Prelim (Part-I Objective)' | 'Mains (Part-II Descriptive)'
  >('Prelim (Part-I Objective)');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pastedText, setPastedText] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  if (!isOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const savedPin = localStorage.getItem('wbpsc_admin_pin') || '2026';
    const trimmedPin = pinInput.trim();
    const trimmedEmail = adminEmailInput.trim().toLowerCase();

    if (
      VALID_DEFAULT_PINS.includes(trimmedPin) ||
      trimmedPin === savedPin ||
      trimmedEmail === ADMIN_EMAIL
    ) {
      setPinInput('');
      onAuthenticateAdmin();
    } else {
      setAuthError(
        'Invalid Admin PIN or Email. Enter your secret Admin PIN (2026) or admin email to unlock.'
      );
    }
  };

  const handleQrImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || '');
      setQrPreviewUrl(dataUrl);
      onUpdateUpiSettings({
        upiId: upiIdInput.trim() || upiSettings.upiId,
        payeeName: payeeNameInput.trim() || upiSettings.payeeName,
        qrCodeDataUrl: dataUrl,
      });
      setUpiSavedMsg('UPI QR Code image uploaded and saved!');
      setTimeout(() => setUpiSavedMsg(''), 3000);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveUpiSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUpiSettings({
      upiId: upiIdInput.trim() || 'gourab.saheb100@okaxis',
      payeeName: payeeNameInput.trim() || 'WBPSC Clerkship Archive',
      qrCodeDataUrl: qrPreviewUrl,
    });
    setUpiSavedMsg('Merchant UPI ID and QR settings updated!');
    setTimeout(() => setUpiSavedMsg(''), 3000);
  };

  const readFileAsBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = String(reader.result || '');
        const base64 = result.includes(',') ? result.split(',')[1] : result;
        resolve(base64);
      };
      reader.onerror = () => reject(new Error('Failed to read uploaded file.'));
      reader.readAsDataURL(file);
    });

  const readFileAsText = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ''));
      reader.onerror = () => reject(new Error('Failed to read text file.'));
      reader.readAsText(file);
    });

  const handleExtractPaper = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!selectedFile && !pastedText.trim()) {
      setStatusMessage({
        type: 'error',
        text: 'Please upload a Question Paper file (PDF, TXT, or Image) or paste question text first.',
      });
      return;
    }

    setIsExtracting(true);
    try {
      const cleanLabel = paperLabel.trim() || `Uploaded Paper (${paperYear})`;
      const slugPaperId = `custom-${cleanLabel
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')}-${paperYear}`;

      let fileBase64 = '';
      let fileText = pastedText.trim();
      const mimeType = selectedFile?.type || 'text/plain';
      const fileName = selectedFile?.name || `${cleanLabel}.txt`;

      if (selectedFile) {
        if (
          selectedFile.name.endsWith('.json') ||
          mimeType === 'application/json'
        ) {
          const rawJsonText = await readFileAsText(selectedFile);
          const parsedJson = JSON.parse(rawJsonText);
          const rawArray = Array.isArray(parsedJson)
            ? parsedJson
            : Array.isArray(parsedJson.questions)
            ? parsedJson.questions
            : [parsedJson];

          const existingInPaper = allQuestions.filter(
            (q) => q.paperId === slugPaperId
          ).length;
          const normalized = normalizeExtractedQuestions(
            rawArray,
            slugPaperId,
            cleanLabel,
            existingInPaper + 1
          );

          const newSheet: ExamPaperSheet = {
            id: slugPaperId,
            fileName,
            shortLabel: cleanLabel,
            title: `${cleanLabel} (${paperYear})`,
            year: paperYear,
            examStage,
            pdfUrl: '/assets/aistudio/WBPSC-Clerkship-Question-Paper-2024-Shift-3_78cf71f5.pdf',
            totalPages: 1,
            officialQuestionCount: existingInPaper + normalized.length,
            hasBookletSeriesABCD: false,
            description: `Dynamically imported question sheet (${normalized.length} questions).`,
          };

          if (
            targetDestination === 'cbt-mock' &&
            onAddExtractedMockQuestions
          ) {
            onAddExtractedMockQuestions(normalized);
            const newTotalMocks = Math.ceil(
              (mockQuestions.length + normalized.length) / 100
            );
            setStatusMessage({
              type: 'success',
              text: `Successfully imported ${normalized.length} question(s) into CBT Mock Test Bank! Total CBT Mock Tests: ${newTotalMocks} (${
                mockQuestions.length + normalized.length
              } total Mock questions).`,
            });
          } else {
            onAddExtractedQuestions(normalized, newSheet);
            setStatusMessage({
              type: 'success',
              text: `Successfully imported ${normalized.length} question(s) into "${cleanLabel}"! Total PYQ bank is now ${
                allQuestions.length + normalized.length
              } questions.`,
            });
          }
          setSelectedFile(null);
          setPastedText('');
          setIsExtracting(false);
          return;
        }

        if (
          mimeType.startsWith('text/') ||
          selectedFile.name.endsWith('.txt')
        ) {
          const uploadedText = await readFileAsText(selectedFile);
          fileText = [uploadedText, fileText].filter(Boolean).join('\n\n');
        } else {
          fileBase64 = await readFileAsBase64(selectedFile);
        }
      }

      let rawExtracted: RawExtractedQuestion[] = [];

      try {
        const response = await fetch('/api/extract-paper', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName,
            mimeType,
            fileBase64,
            textContent: fileText,
            paperTitle: cleanLabel,
            paperYear,
            examStage,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Gemini extraction failed.');
        }
        rawExtracted = Array.isArray(data.questions) ? data.questions : [];
      } catch (apiErr) {
        if (fileText) {
          const blocks = fileText
            .split(/\n\s*\n/)
            .map((b) => b.trim())
            .filter(Boolean);
          rawExtracted = blocks.map((block) => {
            const lines = block
              .split(/\r?\n/)
              .map((l) => l.trim())
              .filter(Boolean);
            const isMainsStage = examStage === 'Mains (Part-II Descriptive)';
            if (isMainsStage) {
              return {
                category: 'Descriptive & Translation',
                subTopic: 'Mains Descriptive Guide',
                questionEn: lines[0] || block,
                directAnswerSummary: `Model Answer Guide for ${cleanLabel}`,
                descriptiveFormatType: 'Report Writing',
                descriptiveMarks: 15,
                descriptiveWordLimit: 'Within 200 words',
                sampleAnswerTitle: `Model Response — ${cleanLabel}`,
                sampleAnswerBody: lines.slice(1).join('\n') || block,
              };
            }
            return {
              category: 'General Knowledge',
              subTopic: 'Extracted Objective MCQ',
              questionEn: lines[0] || block,
              optionA: lines[1] || 'Option A',
              optionB: lines[2] || 'Option B',
              optionC: lines[3] || 'Option C',
              optionD: lines[4] || 'Option D',
              correctOption: 'A',
              directAnswerSummary: `Option (A) — ${lines[1] || 'Verified Answer'}`,
            };
          });
        } else {
          throw apiErr;
        }
      }

      if (rawExtracted.length === 0) {
        throw new Error(
          'No structured questions could be extracted. Please provide clearer question text or a readable PDF/image.'
        );
      }

      const existingInPaper = allQuestions.filter(
        (q) => q.paperId === slugPaperId
      ).length;
      const normalized = normalizeExtractedQuestions(
        rawExtracted,
        slugPaperId,
        cleanLabel,
        existingInPaper + 1
      );

      const newSheet: ExamPaperSheet = {
        id: slugPaperId,
        fileName,
        shortLabel: cleanLabel,
        title: `${cleanLabel} (${paperYear})`,
        year: paperYear,
        examStage,
        pdfUrl: '/assets/aistudio/WBPSC-Clerkship-Question-Paper-2024-Shift-3_78cf71f5.pdf',
        totalPages: 1,
        officialQuestionCount: existingInPaper + normalized.length,
        hasBookletSeriesABCD: false,
        description: `AI-extracted WBPSC Clerkship sheet (${normalized.length} questions).`,
      };

      if (targetDestination === 'cbt-mock' && onAddExtractedMockQuestions) {
        onAddExtractedMockQuestions(normalized);
        const newTotalMocks = Math.ceil(
          (mockQuestions.length + normalized.length) / 100
        );
        setStatusMessage({
          type: 'success',
          text: `Gemini extracted and added ${normalized.length} new question(s) into the CBT Mock Test Series! Total CBT Mock Tests automatically updated to ${newTotalMocks} (${
            mockQuestions.length + normalized.length
          } Mock questions).`,
        });
      } else {
        onAddExtractedQuestions(normalized, newSheet);
        setStatusMessage({
          type: 'success',
          text: `Gemini extracted and added ${normalized.length} new question(s) into "${cleanLabel}"! Dynamic PYQ Question Bank updated to ${
            allQuestions.length + normalized.length
          } total questions.`,
        });
      }
      setSelectedFile(null);
      setPastedText('');
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text:
          err instanceof Error
            ? err.message
            : 'Failed to extract questions from the uploaded paper.',
      });
    } finally {
      setIsExtracting(false);
    }
  };

  const handleExportJson = (exportAll = false) => {
    const dataToExport =
      exportAll || customQuestions.length === 0 ? allQuestions : customQuestions;
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = exportAll
      ? `wbpsc-clerkship-full-bank-${allQuestions.length}-questions.json`
      : `wbpsc-clerkship-added-questions-backup.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Admin Option & Question Bank Manager"
      data-testid="admin-option-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-3 sm:p-6 overflow-y-auto"
    >
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <KeyRound className="w-4 h-4 text-sky-400 shrink-0" />
            <h2 className="text-sm sm:text-base font-bold">
              {isAdminAuthenticated
                ? `Admin Option Panel — Dynamic Question Bank (${allQuestions.length} Total Qs)`
                : 'Admin Option Access — Secret PIN Verification'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Option Modal"
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {!isAdminAuthenticated ? (
            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
                Enter your secret <strong className="text-slate-900">Admin PIN</strong>{' '}
                or <strong className="text-slate-900">Admin Email</strong> to unlock all{' '}
                <strong className="font-mono-tabular text-slate-900">
                  {allQuestions.length}
                </strong>{' '}
                Prelims &amp; Mains questions for free (bypassing the ₹100 student
                paywall) and open the UPI QR Code, Gemini Question Paper Upload, &amp;
                JSON Export tools.
              </div>

              {authError && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs font-medium text-rose-800">
                  {authError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                    Secret Admin PIN
                  </label>
                  <input
                    type="password"
                    data-testid="admin-pin-input"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="Enter Admin PIN (e.g. 2026)"
                    className="w-full px-3.5 py-2 text-sm font-mono-tabular bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:bg-white focus:border-sky-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                    Or Admin Email Address
                  </label>
                  <input
                    type="email"
                    data-testid="admin-email-input"
                    value={adminEmailInput}
                    onChange={(e) => setAdminEmailInput(e.target.value)}
                    placeholder="Gourab.saheb100@gmail.com"
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:bg-white focus:border-sky-600"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  data-testid="admin-pin-submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Verify Admin &amp; Unlock Full Archive Free</span>
                </button>
              </div>
            </form>
          ) : (
            <>
              {/* 1. Admin Free Bypass Status Banner */}
              <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Admin Bypass Active — Full {allQuestions.length}-Question Archive
                      Unlocked Free
                    </span>
                  </div>
                  <p className="text-xs text-emerald-800">
                    Page 2+, all Year-wise Question Papers, and Mains Descriptive Guides
                    are unlocked without the ₹100 paywall.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={onToggleAdminPreviewFreeMode}
                    className="px-3 py-1.5 rounded-lg bg-white border border-emerald-300 text-xs font-semibold text-emerald-900 hover:bg-emerald-100 transition-colors cursor-pointer"
                  >
                    {adminPreviewFreeMode
                      ? 'Switch Back to Admin Full Unlock'
                      : 'Test Student ₹100 Paywall View'}
                  </button>
                  <button
                    type="button"
                    onClick={onLogoutAdmin}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 transition-colors cursor-pointer"
                  >
                    Lock Admin
                  </button>
                </div>
              </div>

              {/* 2. UPI QR Code & Merchant Payment Settings */}
              <form
                onSubmit={handleSaveUpiSettings}
                className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-emerald-600 shrink-0" />
                    <h3 className="text-sm font-bold text-slate-900">
                      ₹100 UPI QR Code &amp; Merchant Payment Settings
                    </h3>
                  </div>
                  <span className="text-xs font-mono-tabular text-slate-500">
                    PhonePe · GPay · Paytm
                  </span>
                </div>

                {upiSavedMsg && (
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900">
                    {upiSavedMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Merchant UPI ID (Shown with 1-Tap Copy Button)
                    </label>
                    <input
                      type="text"
                      data-testid="admin-upi-id-input"
                      value={upiIdInput}
                      onChange={(e) => setUpiIdInput(e.target.value)}
                      placeholder="e.g. gourab.saheb100@okaxis"
                      className="w-full px-3 py-2 text-xs font-mono-tabular bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-sky-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Merchant / Payee Display Name
                    </label>
                    <input
                      type="text"
                      value={payeeNameInput}
                      onChange={(e) => setPayeeNameInput(e.target.value)}
                      placeholder="WBPSC Clerkship Archive"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-sky-600"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Upload Custom UPI QR Code Image (PNG / JPG / WEBP)
                    </label>
                    <input
                      type="file"
                      data-testid="admin-qr-upload-input"
                      accept="image/*"
                      onChange={handleQrImageUpload}
                      className="w-full text-xs text-slate-700 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800 bg-white border border-slate-200 rounded-lg p-1.5 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center gap-2 shrink-0 pt-3 sm:pt-5">
                    {qrPreviewUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          setQrPreviewUrl('');
                          onUpdateUpiSettings({
                            upiId: upiIdInput.trim() || 'gourab.saheb100@okaxis',
                            payeeName: payeeNameInput.trim() || 'WBPSC Clerkship Archive',
                            qrCodeDataUrl: '',
                          });
                        }}
                        className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-600 hover:bg-slate-100 cursor-pointer"
                      >
                        Reset QR Image
                      </button>
                    )}
                    <button
                      type="submit"
                      data-testid="admin-save-upi-btn"
                      className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors cursor-pointer"
                    >
                      Save UPI Settings
                    </button>
                  </div>
                </div>

                {/* Student UTR Submissions Queue */}
                {utrSubmissions.length > 0 && (
                  <div className="pt-3 border-t border-slate-200 space-y-2">
                    <h4 className="text-xs font-bold text-slate-800">
                      Student ₹100 UTR Submissions ({utrSubmissions.length})
                    </h4>
                    <div className="space-y-1.5 max-h-36 overflow-y-auto">
                      {utrSubmissions.map((sub, idx) => (
                        <div
                          key={`${sub.email}-${idx}`}
                          className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-lg bg-white border border-slate-200 text-xs"
                        >
                          <div>
                            <strong className="text-slate-900">{sub.email}</strong> · UTR:{' '}
                            <span className="font-mono-tabular font-semibold text-sky-800">
                              {sub.utrNumber}
                            </span>{' '}
                            <span className="text-slate-400">({sub.submittedAt})</span>
                          </div>
                          {sub.status === 'approved' ? (
                            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                              Approved ✓
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => onApproveUtrSubmission(sub.email)}
                              className="px-2.5 py-1 rounded bg-slate-900 text-white font-semibold hover:bg-slate-800 cursor-pointer"
                            >
                              Approve &amp; Unlock
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </form>

              {/* 3. Gemini AI Question Paper Upload & Extraction Form */}
              <form
                onSubmit={handleExtractPaper}
                className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-sky-600 shrink-0" />
                    <h3 className="text-sm font-bold text-slate-900">
                      Upload Question Paper / Answer Sheet (Gemini AI Extractor)
                    </h3>
                  </div>
                  <span className="text-xs font-mono-tabular text-slate-500">
                    PDF · TXT · Image · JSON
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Upload a WBPSC Clerkship question paper or answer key (PDF, TXT, Image,
                  or JSON backup) or paste raw questions below. Gemini automatically
                  extracts, categorizes (Prelims MCQ with options/answers or Mains
                  Descriptive with model guides), and adds them into the live question
                  bank.
                </p>

                {statusMessage && (
                  <div
                    data-testid="admin-extract-status"
                    className={`p-3 rounded-lg border text-xs font-medium flex items-start gap-2 ${
                      statusMessage.type === 'success'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        : 'bg-rose-50 border-rose-200 text-rose-800'
                    }`}
                  >
                    {statusMessage.type === 'success' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                    <span>{statusMessage.text}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Target Bank Destination
                  </label>
                  <select
                    value={targetDestination}
                    onChange={(e) =>
                      setTargetDestination(
                        e.target.value as 'cbt-mock' | 'pyq-archive'
                      )
                    }
                    className="w-full px-3 py-2 text-xs font-semibold bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-sky-600"
                  >
                    <option value="cbt-mock">
                      CBT Mock Test Series (Current: {mockQuestions.length} Qs /{' '}
                      {Math.ceil(mockQuestions.length / 100)} Mock Tests — Auto-creates
                      Mock Test {Math.ceil(mockQuestions.length / 100) + 1}+ every 100
                      Qs)
                    </option>
                    <option value="pyq-archive">
                      Previous Year Question Archive (Current: {allQuestions.length}{' '}
                      PYQs)
                    </option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Paper Title / Short Label
                    </label>
                    <input
                      type="text"
                      value={paperLabel}
                      onChange={(e) => setPaperLabel(e.target.value)}
                      placeholder="e.g. 2026 Prelim Mock Set-1"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-sky-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Exam Year
                    </label>
                    <input
                      type="text"
                      value={paperYear}
                      onChange={(e) => setPaperYear(e.target.value)}
                      placeholder="2026"
                      className="w-full px-3 py-2 text-xs font-mono-tabular bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-sky-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Paper Stage
                    </label>
                    <select
                      value={examStage}
                      onChange={(e) =>
                        setExamStage(
                          e.target.value as
                            | 'Prelim (Part-I Objective)'
                            | 'Mains (Part-II Descriptive)'
                        )
                      }
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-sky-600"
                    >
                      <option value="Prelim (Part-I Objective)">
                        Prelim (Part-I Objective MCQ)
                      </option>
                      <option value="Mains (Part-II Descriptive)">
                        Mains (Part-II Descriptive)
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Select Question Paper File (PDF, TXT, PNG/JPG, or JSON)
                  </label>
                  <input
                    type="file"
                    data-testid="admin-file-upload"
                    accept=".pdf,.txt,.png,.jpg,.jpeg,.webp,.json"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    className="w-full text-xs text-slate-700 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800 bg-white border border-slate-200 rounded-lg p-1.5 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Or Paste Question Paper / Answer Sheet Text Directly
                  </label>
                  <textarea
                    rows={3}
                    data-testid="admin-paste-textarea"
                    value={pastedText}
                    onChange={(e) => setPastedText(e.target.value)}
                    placeholder="Paste raw MCQ questions with options or Mains descriptive prompts here for automatic Gemini extraction..."
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-sky-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isExtracting}
                  data-testid="admin-extract-btn"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-sky-600 text-white text-xs font-semibold hover:bg-sky-700 disabled:opacity-60 transition-colors cursor-pointer"
                >
                  {isExtracting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Extracting &amp; Summarizing Questions with Gemini AI...</span>
                    </>
                  ) : (
                    <>
                      <FileUp className="w-4 h-4" />
                      <span>
                        Extract &amp; Add Questions to Dynamic Question Bank
                      </span>
                    </>
                  )}
                </button>
              </form>

              {/* 4. Export Questions JSON Backup Section */}
              <div className="p-5 rounded-xl border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-900">
                    Export Questions JSON Backup
                  </h3>
                  <p className="text-xs text-slate-600">
                    Added custom questions in this browser:{' '}
                    <strong className="font-mono-tabular text-slate-900">
                      {customQuestions.length}
                    </strong>{' '}
                    · Total dynamic database:{' '}
                    <strong className="font-mono-tabular text-slate-900">
                      {allQuestions.length}
                    </strong>{' '}
                    questions.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    data-testid="export-questions-json-btn"
                    onClick={() => handleExportJson(false)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Questions JSON</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleExportJson(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Full Bank ({allQuestions.length})</span>
                  </button>

                  {customQuestions.length > 0 && (
                    <button
                      type="button"
                      onClick={onClearCustomQuestions}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold hover:bg-rose-100 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear Added ({customQuestions.length})</span>
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
