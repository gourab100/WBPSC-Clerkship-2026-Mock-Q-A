import React from 'react';
import { X, FileText } from 'lucide-react';
import { EXAM_METADATA, EXAM_PAPERS } from '../data/questions';

interface PdfReferenceModalProps {
  isOpen: boolean;
  initialPage: number;
  pdfUrl?: string;
  paperTitle?: string;
  onClose: () => void;
  onChangePdfUrl?: (pdfUrl: string, title: string) => void;
}

export const PdfReferenceModal: React.FC<PdfReferenceModalProps> = ({
  isOpen,
  initialPage,
  pdfUrl,
  paperTitle,
  onClose,
  onChangePdfUrl,
}) => {
  if (!isOpen) return null;

  const targetPdfUrl = pdfUrl || EXAM_METADATA.pdfUrl;
  const matchedPaper = EXAM_PAPERS.find((p) => p.pdfUrl === targetPdfUrl);
  const displayTitle = paperTitle || matchedPaper?.shortLabel || 'Original Question Paper PDF';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Original Question Paper PDF Viewer"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-3 sm:p-6"
    >
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-6xl h-[88vh] flex flex-col overflow-hidden shadow-xl">
        {/* Modal Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b border-slate-200 bg-slate-50">
          <div className="flex flex-wrap items-center gap-2.5">
            <FileText className="w-4 h-4 text-sky-700 shrink-0" />
            <h2 className="text-sm font-semibold text-slate-900">
              {displayTitle} · Page {initialPage}
              {matchedPaper ? ` of ${matchedPaper.totalPages}` : ''}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {onChangePdfUrl && (
              <select
                aria-label="Switch PDF Document"
                value={targetPdfUrl}
                onChange={(e) => {
                  const found = EXAM_PAPERS.find((p) => p.pdfUrl === e.target.value);
                  if (found) {
                    onChangePdfUrl(found.pdfUrl, found.shortLabel);
                  }
                }}
                className="px-2.5 py-1 rounded text-xs bg-white border border-slate-200 text-slate-800 focus:outline-none focus:border-sky-600"
              >
                {EXAM_PAPERS.map((p) => (
                  <option key={p.id} value={p.pdfUrl}>
                    {p.shortLabel} ({p.totalPages} pp.)
                  </option>
                ))}
              </select>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close PDF Viewer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Close</span>
            </button>
          </div>
        </div>

        {/* Embedded PDF Viewer */}
        <div className="flex-1 bg-slate-100">
          <iframe
            key={`${targetPdfUrl}-${initialPage}`}
            src={`${targetPdfUrl}#page=${initialPage}`}
            title={`${displayTitle} Page ${initialPage}`}
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
};
