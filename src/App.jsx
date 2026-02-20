import { useState, useEffect } from 'react'
import ClaimSummary from './components/ClaimSummary'
import PatientInfo from './components/PatientInfo'
import BillsTable from './components/BillsTable'
import PDFViewer from './components/PDFViewer'
import AuditIssues from './components/AuditIssues'
import DocumentSegments from './components/DocumentSegments'

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState('summary')

  useEffect(() => {
    fetch('/data.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load data.json');
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-slate-900 text-white">
      <p className="text-lg">Loading...</p>
    </div>
  );

  if (error) return (
    <div className="h-screen flex items-center justify-center bg-slate-900 text-white">
      <p className="text-lg text-red-400">{error}</p>
    </div>
  );

  const tabs = [
    { id: 'summary', label: 'Summary', icon: '📋' },
    { id: 'bills', label: 'Bills', icon: '🧾' },
    { id: 'audit', label: 'Audit', icon: '🔍' },
    { id: 'documents', label: 'Docs', icon: '📄' }
  ];

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      <header className="bg-slate-800 text-white px-6 py-4 flex items-center justify-between shadow-md">
        <div>
          <h1 className="text-xl font-bold">Medical Claim Review</h1>
          <p className="text-xs text-slate-400">
            Claim #{data.claim_id} · {data.edited_data?.patient_summary?.patient_details?.patient_name}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {data.review_notes && (
            <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded">
              {data.review_notes}
            </span>
          )}
          <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {data.audit_analysis?.status}
          </span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 bg-slate-200 border-r border-slate-300">
          <PDFViewer
            pageNumber={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>

        <div className="w-1/2 flex flex-col">
          <div className="flex border-b border-slate-200 bg-white shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 text-sm font-bold transition-all border-b-2 ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 bg-blue-50/30'
                  : 'border-transparent text-slate-500 hover:bg-slate-50'
                  }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-auto p-6 space-y-6">
            {activeTab === 'summary' && (
              <div className="space-y-6">
                <ClaimSummary
                  claimId={data.claim_id}
                  status={data.audit_analysis?.status}
                  claimType={data.claim_type}
                  claimedAmount={data.audit_analysis?.original_claimed_amount}
                  totalBills={data.audit_analysis?.true_total_of_bills}
                  discrepancyReason={data.audit_analysis?.discrepancy_reason}
                />
                <PatientInfo
                  patient={data.edited_data?.patient_summary?.patient_details}
                  hospital={data.edited_data?.patient_summary?.hospitalization_details}
                />
              </div>
            )}

            {activeTab === 'bills' && (
              <BillsTable
                bills={data.edited_data?.nme_analysis?.bills}
                onPageClick={setCurrentPage}
              />
            )}

            {activeTab === 'audit' && (
              <AuditIssues audit={data.audit_analysis} />
            )}

            {activeTab === 'documents' && (
              <DocumentSegments
                segments={data.segments?.aggregated_segments}
                onPageClick={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
