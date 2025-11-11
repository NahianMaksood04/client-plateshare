const EmptyState = ({ title = "Nothing to show", subtitle = "" }) => (
  <div className="text-center py-16 opacity-80">
    <h3 className="text-2xl font-semibold">{title}</h3>
    {subtitle && <p className="text-base mt-2">{subtitle}</p>}
  </div>
);

export default EmptyState;
