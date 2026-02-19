function DocumentSegments({ segments, onPageClick }) {
    if (!segments) return null;

    const segmentEntries = Object.entries(segments);

    return (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <h2 className="text-lg font-bold text-slate-800">Document Mapping</h2>
            </div>

            <div className="p-4 grid gap-3">
                {segmentEntries.map(([type, data]) => {
                    const pages = data.page_ranges?.flatMap(r => {
                        const range = [];
                        for (let i = r.start; i <= r.end; i++) range.push(i);
                        return range;
                    }) || [];

                    return (
                        <div key={type} className="flex items-center justify-between p-3 rounded-lg border border-slate-50 hover:border-blue-100 hover:bg-blue-50/30 transition-all group">
                            <span className="text-sm font-bold text-slate-700 capitalize">
                                {type.replace(/_/g, ' ')}
                            </span>

                            <div className="flex gap-1">
                                {pages.map(page => (
                                    <button
                                        key={page}
                                        onClick={() => onPageClick(page)}
                                        className="w-8 h-8 rounded bg-white border border-slate-200 text-xs font-bold text-slate-500 hover:bg-blue-600 hover:text-white hover:border-blue-700 transition-all"
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default DocumentSegments;
