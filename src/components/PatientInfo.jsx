function PatientInfo({ patient, hospital }) {
    if (!patient || !hospital) return null;

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
        });
    };

    return (
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-5 pb-2 border-b border-slate-100">Patient Details</h2>

            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <InfoItem label="Full Name" value={patient.patient_name} />
                <InfoItem label="Age / DOB" value={`${patient.patient_age} yrs / ${formatDate(patient.patient_dob)}`} />
                <InfoItem label="Policy Number" value={patient.patient_policy_no} isMono />
                <InfoItem label="Mobile" value={patient.patient_mobile} />
                <InfoItem label="Email" value={patient.patient_email} isFullWidth />

                <div className="col-span-2 pt-2">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Hospitalization</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <InfoItem label="Admission Date" value={formatDate(hospital.doa)} />
                        <InfoItem label="Discharge Date" value={formatDate(hospital.dod)} />
                        <div className="col-span-2">
                            <InfoItem label="Primary Diagnosis" value={hospital.provisional_final_diagnosis} />
                        </div>
                        <InfoItem label="Treating Doctor" value={hospital.treating_doctor_name} />
                        <InfoItem label="Treatment Type" value={hospital.nature_of_treatment} />
                    </div>
                </div>
            </div>
        </div>
    )
}

function InfoItem({ label, value, isMono, isFullWidth }) {
    return (
        <div className={isFullWidth ? "col-span-2" : ""}>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">{label}</p>
            <p className={`text-sm font-semibold text-slate-700 ${isMono ? 'font-mono text-blue-600' : ''}`}>
                {value || '—'}
            </p>
        </div>
    )
}

export default PatientInfo;
