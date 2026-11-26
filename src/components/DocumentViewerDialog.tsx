import { useEffect, useRef } from "react";
import { FileDown, X } from "lucide-react";

export interface DocumentPreviewTarget {
  title: string;
  subtitle: string;
  url: string;
  downloadName: string;
}

interface DocumentViewerDialogProps {
  document: DocumentPreviewTarget | null;
  onClose: () => void;
}

export function DocumentViewerDialog({ document, onClose }: DocumentViewerDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (document) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [document]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdropClick}
      aria-labelledby="document-dialog-title"
      className="portfolio-dialog"
      style={{ width: "min(94vw, 960px)" }}
    >
      {document && (
        <div className="p-5 sm:p-7 flex flex-col gap-4 h-[min(86dvh,780px)]">
          <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-4">
            <div>
              <h3
                id="document-dialog-title"
                className="text-[19px] sm:text-[22px] font-bold text-[#f4f1ea]"
              >
                {document.title}
              </h3>
              <p className="text-[13px] text-[#b4b0a8] mt-0.5">{document.subtitle}</p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <a
                href={document.url}
                download={document.downloadName}
                className="tactile-btn inline-flex items-center gap-1.5 min-h-[38px] px-4 rounded-full bg-[#dfd0a6] text-[#17171a] text-[12.5px] font-semibold hover:bg-[#eae0c2]"
              >
                <FileDown size={15} aria-hidden="true" />
                <span>Download PDF</span>
              </a>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close document preview"
                className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 text-[#f4f1ea] hover:bg-[#dfd0a6]/20 hover:border-[#dfd0a6] flex items-center justify-center cursor-pointer"
              >
                <X size={18} strokeWidth={1.75} />
              </button>
            </div>
          </div>

          <div className="flex-1 min-h-0 rounded-2xl overflow-hidden border border-white/[0.08] bg-[#19191c]">
            <iframe
              src={document.url}
              title={document.title}
              className="w-full h-full border-0"
            />
          </div>
        </div>
      )}
    </dialog>
  );
}
