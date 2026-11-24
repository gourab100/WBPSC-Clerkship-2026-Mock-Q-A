import React, { useState } from 'react';
import {
  Check,
  CheckCircle2,
  Copy,
  Hourglass,
  KeyRound,
  Lock,
  QrCode,
  ShieldCheck,
} from 'lucide-react';

export const ADMIN_EMAIL = 'gourab.saheb100@gmail.com';

export interface UpiPaymentSettings {
  upiId: string;
  payeeName: string;
  qrCodeDataUrl: string;
}

export interface UtrSubmissionRecord {
  email: string;
  name: string;
  utrNumber: string;
  submittedAt: string;
  status: 'pending_verification' | 'approved';
}

/* Official multi-color Google G Logo SVG */
export const GoogleGLogo: React.FC<{ className?: string }> = ({
  className = 'w-4 h-4',
}) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
  >
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.54-5.17 3.54-8.97z"
    />
    <path
      fill="#34A853"
      d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96h-4.01v3.14C3.505 21.3 7.565 24 12.255 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.535 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62h-4.01C.555 8.56 0 10.72 0 12s.555 3.44 1.525 5.38l4.01-3.14z"
    />
    <path
      fill="#EA4335"
      d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0 7.565 0 3.505 2.7 1.525 6.62l4.01 3.14c.95-2.85 3.6-4.96 6.72-4.96z"
    />
  </svg>
);

/* ============================================================================
   1. BOTTOM OF DEMO / LANDING PAGE — LOCKED GATEWAY BAR (Matches Image 1)
   ============================================================================ */
interface CourseOfferCardProps {
  totalQuestions: number;
  totalPrelimQuestions: number;
  totalMainsQuestions: number;
  totalPapers: number;
  onClickUnlockCta: () => void;
  onClickPreviousYearPapers?: () => void;
  onClickSequentialMockTests?: () => void;
}

export const CourseOfferCard: React.FC<CourseOfferCardProps> = ({
  onClickUnlockCta,
  onClickPreviousYearPapers,
  onClickSequentialMockTests,
}) => {
  return (
    <section
      data-testid="course-offer-card"
      className="bg-white/95 border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-md"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Left Locked Gateway Card 1: Previous Year Papers */}
        <button
          type="button"
          data-testid="gateway-pyq-card"
          onClick={onClickPreviousYearPapers || onClickUnlockCta}
          className="lg:col-span-3 text-left p-4 rounded-xl bg-[#E8ECF2] hover:bg-[#DFE5EE] border border-slate-200/80 transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-2 text-slate-500 mb-1.5">
            <Lock className="w-4 h-4 text-slate-500 group-hover:text-slate-800 transition-colors" />
          </div>
          <div className="text-sm sm:text-base font-bold text-slate-900">
            Previous Year Papers
          </div>
        </button>

        {/* Middle Locked Gateway Card 2: Sequential Mock Tests */}
        <button
          type="button"
          data-testid="gateway-mock-card"
          onClick={onClickSequentialMockTests || onClickUnlockCta}
          className="lg:col-span-3 text-left p-4 rounded-xl bg-[#E8ECF2] hover:bg-[#DFE5EE] border border-slate-200/80 transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-2 text-slate-500 mb-1.5">
            <Lock className="w-4 h-4 text-slate-500 group-hover:text-slate-800 transition-colors" />
          </div>
          <div className="text-sm sm:text-base font-bold text-slate-900">
            Sequential Mock Tests
          </div>
        </button>

        {/* Right Prominent Warm Gold Unlock CTA Button (Matches Image 1) */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-2">
          <button
            type="button"
            data-testid="course-offer-cta-btn"
            onClick={onClickUnlockCta}
            className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#F5A623] hover:bg-[#E09112] text-slate-950 text-sm sm:text-base font-extrabold shadow-md transition-all cursor-pointer"
          >
            <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-2xs shrink-0">
              <GoogleGLogo className="w-4 h-4" />
            </span>
            <span>Sign In with Google to Unlock All for ₹100</span>
            <Lock className="w-4 h-4 text-amber-950 shrink-0" />
          </button>
          <p className="text-xs font-medium text-slate-600 text-center">
            Includes Lifetime Access to All Prelims &amp; Mains Questions
          </p>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   2. STEP 1 OF STRICT FLOW — SPLIT-SCREEN LOGIN & UNLOCK PAGE (Matches Image 2)
   ============================================================================ */
interface StudentSignInScreenProps {
  totalQuestions: number;
  onSignInSuccess: (email: string, name: string) => void;
  onReturnToFreePreview: () => void;
  onOpenAdminModal: () => void;
}

export const StudentSignInScreen: React.FC<StudentSignInScreenProps> = ({
  onSignInSuccess,
  onReturnToFreePreview,
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [showCustomEmailField, setShowCustomEmailField] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleContinueWithGoogle = () => {
    setErrorMsg('');
    const trimmedEmail = emailInput.trim() || 'aspirant.wbpsc@gmail.com';
    const resolvedName =
      nameInput.trim() ||
      (trimmedEmail === ADMIN_EMAIL ? 'Gourab Saheb (Admin)' : 'WBPSC Aspirant');
    onSignInSuccess(trimmedEmail, resolvedName);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const trimmedEmail = emailInput.trim();
    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      setErrorMsg('Please enter a valid Google email address.');
      return;
    }
    const resolvedName = nameInput.trim() || trimmedEmail.split('@')[0];
    onSignInSuccess(trimmedEmail, resolvedName);
  };

  return (
    <section
      data-testid="signin-screen"
      className="rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 grid grid-cols-1 lg:grid-cols-12 min-h-[560px]"
    >
      {/* LEFT PANEL: Soft Off-White Canvas with Centered Crisp White Login Card (Matches Image 2) */}
      <div className="lg:col-span-6 bg-[#EBEEF3] p-6 sm:p-10 flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-3xl p-7 sm:p-9 shadow-lg border border-slate-100 space-y-6">
          {/* Emblem + Brand Lockup */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-extrabold text-xs shrink-0">
              🏛️
            </div>
            <div>
              <div className="text-sm sm:text-base font-extrabold text-[#0B192C] tracking-tight">
                WBPSC Clerkship 2026
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-600 flex items-center gap-1.5">
                <span>Prep Portal</span>
                <span aria-label="India Flag">🇮🇳</span>
              </div>
            </div>
          </div>

          {/* Welcome Headline */}
          <div className="space-y-2.5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B192C] leading-tight tracking-tight">
              Welcome,
              <br />
              WBPSC Aspirant
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Sign in to save your Mock Test scores and unlock full access.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-medium text-rose-800">
              {errorMsg}
            </div>
          )}

          {/* Primary Pill-Shaped "Continue with Google" Button (Matches Image 2) */}
          <div className="space-y-3 pt-1">
            <button
              type="button"
              data-testid="signin-google-btn"
              onClick={handleContinueWithGoogle}
              className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 border-2 border-[#0B192C] text-[#0B192C] text-sm sm:text-base font-extrabold shadow-xs transition-all cursor-pointer"
            >
              <GoogleGLogo className="w-5 h-5" />
              <span>Continue with Google</span>
            </button>

            {/* Optional Google Email Override for custom email / admin email sign-in */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowCustomEmailField((prev) => !prev)}
                className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 underline cursor-pointer"
              >
                {showCustomEmailField
                  ? 'Hide specific Google account email input'
                  : 'Use a specific Google account email address'}
              </button>
            </div>

            {showCustomEmailField && (
              <form
                onSubmit={handleCustomSubmit}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5"
              >
                <input
                  type="text"
                  data-testid="signin-name-input"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Your Name (optional)"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#0B192C]"
                />
                <input
                  type="email"
                  data-testid="signin-email-input"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter Google Email (e.g. yourname@gmail.com)"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#0B192C]"
                />
                <button
                  type="submit"
                  data-testid="signin-submit-btn"
                  className="w-full py-2 px-4 rounded-xl bg-[#0B192C] text-white text-xs font-bold hover:bg-[#162844] transition-colors cursor-pointer"
                >
                  Sign In with This Google Email →
                </button>
              </form>
            )}
          </div>

          {/* Permanent Link Reassurance Note */}
          <div className="flex items-start justify-center gap-2 text-center text-xs text-slate-500 leading-relaxed pt-1">
            <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span>
              One-time ₹100 access links permanently to your Google account.
              Never pay twice.
            </span>
          </div>
        </div>

        {/* Bottom Trust Footer under White Card (Matches Image 2) */}
        <div className="mt-5 flex items-center justify-between w-full max-w-md px-2 text-xs text-slate-600 font-semibold">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span>Encrypted</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
              <span>Verified</span>
            </span>
          </div>

          <button
            type="button"
            onClick={onReturnToFreePreview}
            className="text-xs font-bold text-[#0B192C] hover:underline cursor-pointer"
          >
            ← Back to Free Demo
          </button>
        </div>
      </div>

      {/* RIGHT PANEL: Royal Navy Showcase Card (Matches Image 2) */}
      <div className="lg:col-span-6 bg-gradient-to-br from-[#0F1B2E] via-[#13223A] to-[#0B1526] text-white p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden">
        <div className="space-y-6 relative z-10">
          {/* Top Amber Pill Badge: Limited Seat Access (Shown only on Login/Payment Screen per Image 2) */}
          <div
            data-testid="limited-seat-badge"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5A623] text-slate-950 text-xs sm:text-sm font-extrabold shadow-md"
          >
            <Hourglass className="w-4 h-4 text-amber-950 shrink-0" />
            <span>
              Limited Seat Access: Seats Remaining out of 10,000
            </span>
          </div>

          {/* Headline with Warm Gold Highlight */}
          <h3 className="text-2xl sm:text-4xl font-extrabold leading-tight tracking-tight">
            Unlock <span className="text-[#F5A623]">Complete</span> Exam
            <br />
            Access for <span className="text-[#F5A623]">₹100 (Lifetime)</span>
          </h3>

          {/* Two-Column Feature List + Blurred QR Preview Card (Matches Image 2) */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center pt-2">
            {/* 3-Item Emerald Checkmark List */}
            <ul className="sm:col-span-7 space-y-4 text-sm sm:text-base font-medium text-slate-100">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <span className="leading-snug">
                  Previous Years Prelims &amp; Mains Questions
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <span className="leading-snug">
                  Full Sequential Mock Test (1,000+ New Questions)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <span className="leading-snug">
                  ‘My Test’ Saved Scorecards &amp; Full Answer Review
                </span>
              </li>
            </ul>

            {/* Blurred QR Preview Card with Padlock Overlay (Matches Image 2) */}
            <div className="sm:col-span-5 flex justify-center">
              <div className="w-48 rounded-2xl bg-[#1A263D] border border-amber-400/40 p-3.5 shadow-xl text-center space-y-3">
                <div className="text-[10px] font-bold text-slate-200">
                  Scan &amp; Pay ₹100 After{' '}
                  <span className="text-[#F5A623]">Google Sign-In</span>
                </div>

                <div className="relative w-36 h-36 mx-auto bg-white rounded-xl p-2.5 flex items-center justify-center overflow-hidden">
                  {/* Blurred QR Matrix */}
                  <svg
                    viewBox="0 0 120 120"
                    className="w-full h-full text-slate-900 blur-[2px] opacity-75"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <rect x="8" y="8" width="32" height="32" rx="3" />
                    <rect x="13" y="13" width="22" height="22" fill="white" />
                    <rect x="18" y="18" width="12" height="12" />
                    <rect x="80" y="8" width="32" height="32" rx="3" />
                    <rect x="85" y="13" width="22" height="22" fill="white" />
                    <rect x="90" y="18" width="12" height="12" />
                    <rect x="8" y="80" width="32" height="32" rx="3" />
                    <rect x="13" y="85" width="22" height="22" fill="white" />
                    <rect x="18" y="90" width="12" height="12" />
                    <rect x="48" y="12" width="10" height="10" />
                    <rect x="64" y="24" width="10" height="14" />
                    <rect x="44" y="48" width="30" height="30" />
                    <rect x="82" y="54" width="14" height="12" />
                    <rect x="52" y="86" width="16" height="18" />
                    <rect x="80" y="84" width="24" height="22" />
                  </svg>

                  {/* Center Golden Lock Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/35 p-2">
                    <div className="w-10 h-10 rounded-xl bg-[#F5A623] text-slate-950 flex items-center justify-center shadow-md mb-1">
                      <Lock className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <span className="text-[10px] font-extrabold text-white bg-slate-950/85 px-2 py-0.5 rounded leading-tight">
                      Scan &amp; Pay ₹100
                      <br />
                      After Google Sign-In
                    </span>
                  </div>
                </div>

                {/* GPay / PhonePe / Paytm Circles */}
                <div className="flex items-center justify-center gap-2 pt-0.5">
                  <span className="px-2 py-0.5 rounded-full bg-white text-slate-900 text-[10px] font-extrabold">
                    GPay
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-purple-700 text-white text-[10px] font-extrabold">
                    पे
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white text-sky-700 text-[10px] font-extrabold">
                    paytm
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Social Proof Line */}
        <div className="mt-8 pt-4 border-t border-amber-400/20 text-center text-xs sm:text-sm text-slate-200 relative z-10">
          Over <strong className="text-[#F5A623] font-extrabold">5,000+</strong>{' '}
          aspirants preparing right now.
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   3. STEP 2 OF STRICT FLOW — SPLIT-SCREEN ₹100 GOOGLE PAY QR & 12-DIGIT UTR PAGE
   ============================================================================ */
interface UpiQrPaymentScreenProps {
  totalQuestions: number;
  userEmail: string;
  userName: string;
  upiSettings: UpiPaymentSettings;
  existingSubmission?: UtrSubmissionRecord | null;
  onSubmitUtrVerification: (utrNumber: string) => void;
  onReturnToFreePreview: () => void;
  onOpenAdminModal: () => void;
}

export const UpiQrPaymentScreen: React.FC<UpiQrPaymentScreenProps> = ({
  userEmail,
  userName,
  upiSettings,
  existingSubmission,
  onSubmitUtrVerification,
  onReturnToFreePreview,
}) => {
  const [utrInput, setUtrInput] = useState(existingSubmission?.utrNumber || '');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedRecord, setSubmittedRecord] =
    useState<UtrSubmissionRecord | null>(existingSubmission || null);

  const handleCopyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(upiSettings.upiId);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2000);
    } catch {
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2000);
    }
  };

  const handleUtrSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const digitsOnly = utrInput.replace(/\s+/g, '');
    if (!/^\d{12}$/.test(digitsOnly)) {
      setErrorMsg(
        'Please enter a valid 12-digit numeric UPI Transaction / UTR ID (e.g. 432189765432).'
      );
      return;
    }

    onSubmitUtrVerification(digitsOnly);
    setSubmittedRecord({
      email: userEmail,
      name: userName,
      utrNumber: digitsOnly,
      submittedAt: new Date().toLocaleString(),
      status: 'pending_verification',
    });
  };

  return (
    <section
      data-testid="qr-payment-screen"
      className="rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 grid grid-cols-1 lg:grid-cols-12 min-h-[560px]"
    >
      {/* LEFT PANEL: Soft Off-White Canvas with Crisp White UTR Verification Card */}
      <div className="lg:col-span-6 bg-[#EBEEF3] p-6 sm:p-10 flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-100 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Google Account Linked
                </div>
                <div className="text-sm font-extrabold text-[#0B192C] truncate max-w-[210px]">
                  {userEmail}
                </div>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#0B192C] text-[#F5A623] font-extrabold text-sm">
              ₹100
            </span>
          </div>

          <div className="space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B192C] tracking-tight">
              Verify Your ₹100 Google Pay / UPI Payment
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              1. Scan the QR code on the right with{' '}
              <strong className="text-slate-900">
                Google Pay, PhonePe, or Paytm
              </strong>{' '}
              and pay <strong className="text-slate-900">₹100</strong>.
              <br />
              2. Enter your{' '}
              <strong className="text-slate-900">
                12-digit UPI Transaction / UTR ID
              </strong>{' '}
              below to activate lifetime access.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-medium text-rose-800">
              {errorMsg}
            </div>
          )}

          {submittedRecord && (
            <div
              data-testid="payment-confirmation-msg"
              className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-1.5"
            >
              <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-emerald-950">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  Payment received! Your account will be unlocked shortly after
                  verification
                </span>
              </div>
              <div className="text-xs text-emerald-900 font-mono-tabular space-y-0.5 pt-1">
                <div>Google Email: {submittedRecord.email}</div>
                <div>12-Digit UTR: {submittedRecord.utrNumber}</div>
              </div>
            </div>
          )}

          <form onSubmit={handleUtrSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="utr-number-input"
                className="block text-xs font-bold text-slate-800 mb-1.5"
              >
                12-Digit UPI Transaction ID (UTR)
              </label>
              <input
                id="utr-number-input"
                type="text"
                inputMode="numeric"
                maxLength={12}
                data-testid="utr-input"
                value={utrInput}
                onChange={(e) =>
                  setUtrInput(e.target.value.replace(/[^\d]/g, ''))
                }
                placeholder="Enter 12-digit UTR (e.g. 432189765432)"
                className="w-full px-4 py-3 text-sm font-mono-tabular bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-[#0B192C]"
              />
              <span className="block text-[11px] text-slate-500 mt-1">
                Digits entered: {utrInput.length} / 12
              </span>
            </div>

            <button
              type="submit"
              data-testid="submit-utr-btn"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#F5A623] hover:bg-[#E09112] text-slate-950 text-sm font-extrabold shadow-md transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit Payment for Verification</span>
            </button>
          </form>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <button
              type="button"
              onClick={onReturnToFreePreview}
              className="font-bold text-[#0B192C] hover:underline cursor-pointer"
            >
              ← Back to Free Demo
            </button>
            <span className="inline-flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Permanent Google Link</span>
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Royal Navy Active Scannable ₹100 Google Pay / UPI QR Showcase */}
      <div className="lg:col-span-6 bg-gradient-to-br from-[#0F1B2E] via-[#13223A] to-[#0B1526] text-white p-6 sm:p-10 flex flex-col justify-between">
        <div className="space-y-5">
          {/* Top Amber Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5A623] text-slate-950 text-xs sm:text-sm font-extrabold shadow-md">
            <Hourglass className="w-4 h-4 text-amber-950 shrink-0" />
            <span>Limited Seat Access: Seats Remaining out of 10,000</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
            Scan &amp; Pay <span className="text-[#F5A623]">₹100</span> via
            Google Pay / UPI
          </h3>

          {/* Scannable QR Card + Merchant UPI Copy Box */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center pt-1">
            <div className="sm:col-span-6 flex flex-col items-center">
              <div
                data-testid="upi-qr-box"
                className="w-52 h-52 bg-white rounded-2xl p-3 flex flex-col items-center justify-center shadow-2xl border-2 border-[#F5A623]"
              >
                {upiSettings.qrCodeDataUrl ? (
                  <img
                    src={upiSettings.qrCodeDataUrl}
                    alt="WBPSC Clerkship ₹100 UPI QR Code"
                    className="w-full h-full object-contain rounded"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center border border-dashed border-slate-300 rounded-xl p-2 space-y-1">
                    <svg
                      viewBox="0 0 120 120"
                      className="w-36 h-36 text-slate-900"
                      fill="currentColor"
                      aria-label="UPI QR Code Matrix"
                    >
                      <rect x="8" y="8" width="32" height="32" rx="3" />
                      <rect x="13" y="13" width="22" height="22" fill="white" />
                      <rect x="18" y="18" width="12" height="12" />
                      <rect x="80" y="8" width="32" height="32" rx="3" />
                      <rect x="85" y="13" width="22" height="22" fill="white" />
                      <rect x="90" y="18" width="12" height="12" />
                      <rect x="8" y="80" width="32" height="32" rx="3" />
                      <rect x="13" y="85" width="22" height="22" fill="white" />
                      <rect x="18" y="90" width="12" height="12" />
                      <rect x="48" y="12" width="8" height="8" />
                      <rect x="62" y="12" width="8" height="8" />
                      <rect x="48" y="26" width="8" height="14" />
                      <rect x="64" y="28" width="8" height="8" />
                      <rect x="12" y="48" width="14" height="8" />
                      <rect x="32" y="48" width="8" height="16" />
                      <rect x="48" y="48" width="24" height="24" rx="4" />
                      <text
                        x="60"
                        y="64"
                        textAnchor="middle"
                        fill="white"
                        fontSize="11"
                        fontWeight="bold"
                      >
                        ₹100
                      </text>
                      <rect x="80" y="48" width="10" height="8" />
                      <rect x="98" y="48" width="14" height="8" />
                      <rect x="82" y="64" width="14" height="8" />
                      <rect x="48" y="82" width="12" height="8" />
                      <rect x="66" y="82" width="8" height="16" />
                      <rect x="82" y="82" width="14" height="14" />
                      <rect x="102" y="82" width="10" height="28" />
                      <rect x="48" y="98" width="12" height="12" />
                      <rect x="80" y="102" width="16" height="10" />
                    </svg>
                    <span className="text-[10px] font-bold text-slate-600">
                      Scan to Pay ₹100 · {upiSettings.payeeName}
                    </span>
                  </div>
                )}
              </div>

              {/* Supported UPI App Badges */}
              <div className="flex items-center justify-center gap-2 mt-3">
                <span className="px-2.5 py-1 rounded-full bg-white text-slate-900 text-xs font-extrabold">
                  GPay
                </span>
                <span className="px-2.5 py-1 rounded-full bg-purple-700 text-white text-xs font-extrabold">
                  PhonePe
                </span>
                <span className="px-2.5 py-1 rounded-full bg-sky-500 text-white text-xs font-extrabold">
                  Paytm
                </span>
              </div>
            </div>

            {/* Right Sub-Column: Merchant UPI ID & 3-Item Checkmark Benefits */}
            <div className="sm:col-span-6 space-y-4">
              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 space-y-2">
                <div className="text-xs text-slate-300">
                  Merchant Payee:{' '}
                  <strong className="text-white">{upiSettings.payeeName}</strong>
                </div>
                <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-[#0B1526] border border-slate-700">
                  <span
                    data-testid="merchant-upi-id"
                    className="text-xs font-mono-tabular font-bold text-amber-300 truncate"
                  >
                    {upiSettings.upiId}
                  </span>
                  <button
                    type="button"
                    data-testid="copy-upi-id-btn"
                    onClick={handleCopyUpiId}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F5A623] text-slate-950 text-xs font-extrabold hover:bg-[#E09112] transition-colors cursor-pointer shrink-0"
                  >
                    {copiedUpi ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-slate-200">
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span>Previous Years Prelims &amp; Mains Questions</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span>Full Sequential Mock Test (1,000+ New Questions)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span>‘My Test’ Saved Scorecards &amp; Full Answer Review</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-amber-400/20 text-center text-xs text-slate-300">
          One-time ₹100 lifetime unlock permanently tied to{' '}
          <strong className="text-[#F5A623]">{userEmail}</strong>
        </div>
      </div>
    </section>
  );
};
