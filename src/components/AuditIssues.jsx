function AuditIssues({ audit }) {
    if (!audit) return null;

    const legibility = audit.medical_legibility || {};
    const violations = audit.policy_violations || [];
    const icdCodes = audit.icd_codes || [];

    return (
        <div className="space-y-6">


            <div className="grid grid-cols-3 gap-3">
                <CountCard label="Bills Reviewed" value={audit.bills_analyzed} />
                <CountCard label="Legibility Issues" value={audit.medical_legibility_issues} warn />
                <CountCard label="Policy Violations" value={audit.policy_violations_count} warn />
            </div>


            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
                <h2 className="text-base font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">
                    Medical Legibility Check
                </h2>

                <div className="flex gap-4 mb-5">
                    <StatusBox label="Prescription Match" isValid={legibility.prescription_bill_match} />
                    <StatusBox label="Diagnosis Consistency" isValid={legibility.diagnosis_treatment_consistent} />
                </div>

                {legibility.summary && (
                    <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-600 border border-slate-100 italic leading-relaxed">
                        "{legibility.summary}"
                    </div>
                )}
            </div>


            {violations.length > 0 && (
                <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
                    <h2 className="text-base font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">
                        Policy Violations
                    </h2>

                    <div className="space-y-3">
                        {violations.map((v, i) => (
                            <div key={i} className="bg-red-50 border border-red-100 rounded-lg p-4 flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-bold text-red-900 mb-1">{v.item_name}</p>
                                    <p className="text-xs text-red-700 font-medium mb-1 uppercase">{v.violation_details || v.violation_type}</p>
                                    {v.reason && <p className="text-xs text-slate-500 leading-relaxed italic">"{v.reason}"</p>}
                                </div>
                                <p className="text-lg font-bold text-red-600 ml-4 shrink-0">
                                    -${(v.amount_impacted || v.amount || 0).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>

                    {audit.policy_remarks && (
                        <p className="mt-4 text-[11px] text-slate-400 italic">Note: {audit.policy_remarks}</p>
                    )}
                </div>
            )}


            {icdCodes.length > 0 && (
                <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
                    <h2 className="text-base font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">
                        Diagnostic Codes (ICD-10)
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {icdCodes.map((icd, i) => (
                            <div
                                key={i}
                                className={`px-3 py-2 rounded-lg border flex flex-col ${icd.type === 'primary'
                                    ? 'bg-blue-600 border-blue-700 text-white'
                                    : 'bg-white border-slate-200 text-slate-700'
                                    }`}
                            >
                                <span className="text-xs font-mono font-bold">{icd.code}</span>
                                <span className={`text-[10px] font-semibold mt-1 ${icd.type === 'primary' ? 'text-blue-100' : 'text-slate-400'}`}>
                                    {icd.description}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function CountCard({ label, value, warn }) {
    return (
        <div className={`rounded-lg border p-4 text-center ${warn && value > 0 ? 'bg-red-50 border-red-100' : 'bg-slate-50 border-slate-100'}`}>
            <p className={`text-2xl font-bold ${warn && value > 0 ? 'text-red-600' : 'text-slate-700'}`}>{value ?? '—'}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{label}</p>
        </div>
    );
}

function StatusBox({ label, isValid }) {
    return (
        <div className={`flex-1 flex items-center justify-between p-3 rounded border ${isValid
            ? 'bg-emerald-50 border-emerald-100 text-emerald-700'
            : 'bg-red-50 border-red-100 text-red-700'
            }`}>
            <span className="text-xs font-bold uppercase tracking-wide">{label}</span>
            <span className="text-base font-bold">{isValid ? '✓' : '✕'}</span>
        </div>
    );
}

export default AuditIssues;
