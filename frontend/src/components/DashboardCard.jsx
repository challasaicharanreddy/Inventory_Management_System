const DashboardCard = ({ title, value, children, className = "" }) => {
    return (
        <div className={`rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 ${className}`}>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">{title}</p>
            <p className="mt-4 text-4xl font-semibold text-slate-900">{value}</p>
            {children && <div className="mt-4 text-sm text-slate-500">{children}</div>}
        </div>
    );
};

export default DashboardCard;
