import { useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewer({ pageNumber, onPageChange }) {
    const [numPages, setNumPages] = useState(null);
    const [scale, setScale] = useState(1.0);

    const onDocumentLoadSuccess = useCallback(({ numPages }) => {
        setNumPages(numPages);
    }, []);

    const goToPage = (page) => {
        if (page >= 1 && page <= (numPages || 1)) {
            onPageChange(page);
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-100">
            {/* Simple Toolbar */}
            <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-slate-200">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => goToPage(pageNumber - 1)}
                        disabled={pageNumber <= 1}
                        className="p-1 px-3 bg-slate-100 hover:bg-slate-200 rounded text-slate-600 disabled:opacity-30 cursor-pointer"
                    >
                        Prev
                    </button>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                        Page {pageNumber} of {numPages || '...'}
                    </span>
                    <button
                        onClick={() => goToPage(pageNumber + 1)}
                        disabled={pageNumber >= (numPages || 1)}
                        className="p-1 px-3 bg-slate-100 hover:bg-slate-200 rounded text-slate-600 disabled:opacity-30 cursor-pointer"
                    >
                        Next
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <button onClick={() => setScale(s => Math.max(0.5, s - 0.1))} className="w-8 h-8 rounded border border-slate-200 hover:bg-slate-50 text-slate-500 font-bold">-</button>
                    <span className="text-xs font-mono text-slate-400 w-12 text-center">{Math.round(scale * 100)}%</span>
                    <button onClick={() => setScale(s => Math.min(2.0, s + 0.1))} className="w-8 h-8 rounded border border-slate-200 hover:bg-slate-50 text-slate-500 font-bold">+</button>
                </div>
            </div>

            {/* Document Content */}
            <div className="flex-1 overflow-auto p-10 flex justify-center">
                <Document
                    file="/final.pdf"
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={<p className="text-slate-400 text-sm mt-20">Loading...</p>}
                    error={<p className="text-red-400 text-sm mt-20">Couldn't load the PDF. Make sure final.pdf is in the public folder.</p>}
                >
                    <Page
                        pageNumber={pageNumber}
                        scale={scale}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                    />
                </Document>
            </div>
        </div>
    );
}
