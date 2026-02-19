import { useState } from 'react';

function BillsTable({ bills, onPageClick }) {
    const [expandedBill, setExpandedBill] = useState(0);

    if (!bills) return null;

    return (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <h2 className="text-lg font-bold text-slate-800">Invoices & Bills</h2>
            </div>

            <div className="divide-y divide-slate-100">
                {bills.map((billEntry, index) => {
                    const bill = billEntry.bill;
                    const items = billEntry.items || [];
                    const nmeCount = items.filter((i) => i.is_nme).length;
                    const isExpanded = expandedBill === index;

                    return (
                        <div key={bill.bill_id} className="transition-colors hover:bg-slate-50/30">
                            {/* Bill Header */}
                            <button
                                onClick={() => setExpandedBill(isExpanded ? -1 : index)}
                                className="w-full flex items-center justify-between px-6 py-4 text-left"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                                        {index + 1}
                                    </span>
                                    <div>
                                        <p className="font-bold text-slate-800">#{bill.invoice_number}</p>
                                        <p className="text-xs text-slate-400">
                                            {bill.bill_date} · PG {bill.page_number}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-slate-900">${bill.net_amount.toLocaleString()}</p>
                                        {nmeCount > 0 && <span className="text-[10px] text-red-500 font-bold">{nmeCount} NME Items</span>}
                                    </div>
                                    <span className={`text-slate-300 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                                </div>
                            </button>

                            {/* Bill Items Table */}
                            {isExpanded && (
                                <div className="px-6 pb-6 pt-2 bg-slate-50/50">
                                    <div className="bg-white rounded border border-slate-200 overflow-hidden">
                                        <table className="w-full text-xs text-left">
                                            <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200">
                                                <tr>
                                                    <th className="px-4 py-3">Item</th>
                                                    <th className="px-4 py-3">Category</th>
                                                    <th className="px-4 py-3 text-right">Amount</th>
                                                    <th className="px-4 py-3 text-center">NME</th>
                                                    <th className="px-4 py-3">Reason</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                {items.map((item, idx) => (
                                                    <tr key={idx} className={item.is_nme ? 'bg-red-50' : 'hover:bg-slate-50'}>
                                                        <td className="px-4 py-3 font-medium text-slate-700">{item.item_name}</td>
                                                        <td className="px-4 py-3 text-slate-400 text-[10px]">{item.category || '—'}</td>
                                                        <td className="px-4 py-3 text-right font-bold text-slate-900">${item.final_amount}</td>
                                                        <td className="px-4 py-3 text-center">
                                                            {item.is_nme
                                                                ? <span className="text-red-600 font-black">✕</span>
                                                                : <span className="text-emerald-500 font-black">✓</span>
                                                            }
                                                        </td>
                                                        <td className="px-4 py-3 text-slate-500 max-w-[200px] whitespace-normal italic">
                                                            {item.deduction_reason || '—'}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="mt-4 text-right">
                                        <button
                                            onClick={() => onPageClick(bill.page_number)}
                                            className="text-xs font-bold text-blue-500 hover:underline"
                                        >
                                            View page {bill.page_number} in PDF →
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default BillsTable;
