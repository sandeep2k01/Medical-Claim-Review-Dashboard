function ClaimSummary({ claimId, status, claimType, claimedAmount, totalBills, discrepancyReason }) {
    const discrepancy = Math.abs((totalBills || 0) - (claimedAmount || 0));
    const hasDiscrepancy = discrepancy > 0;

    return (
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Claim Summary</h2>

            <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Claim ID</p>
                    <p className="text-xl font-mono font-bold text-slate-800 tracking-tight">{claimId || '—'}</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Status</p>
                    <span className="inline-block bg-amber-500 text-white text-xs font-black px-3 py-1 rounded-full">
                        {status || 'PENDING'}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 hover:border-blue-200 transition-colors">
                    <p className="text-xs text-slate-500 font-medium mb-1">Claimed Amount</p>
                    <p className="text-2xl font-bold text-blue-600">${(claimedAmount || 0).toLocaleString()}</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 hover:border-emerald-200 transition-colors">
                    <p className="text-xs text-slate-500 font-medium mb-1">Actual Bills Total</p>
                    <p className="text-2xl font-bold text-emerald-600">${(totalBills || 0).toLocaleString()}</p>
                </div>
            </div>

            {hasDiscrepancy && (
                <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-red-600 font-bold uppercase tracking-wide">⚠ Discrepancy Found</p>
                        <p className="text-lg font-bold text-red-700">${discrepancy.toLocaleString()}</p>
                    </div>
                    {discrepancyReason && (
                        <p className="text-xs text-red-700 leading-relaxed">{discrepancyReason}</p>
                    )}
                </div>
            )}

            <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="font-bold">Claim Type:</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-semibold">{claimType || '—'}</span>
            </div>
        </div>
    );
}

export default ClaimSummary;
