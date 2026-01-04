

const PointsInput = ({ value, disabled, onChange, className }) => {
  return (
    <input
      type="number"
      value={value ?? ''}
      disabled={disabled}
      onChange={e =>
        onChange(e.target.value === "" ? 0 : Number(e.target.value))
      }
      className={`w-full text-center bg-slate-800/50 border border-slate-700 hover:border-amber-500/50 focus:outline-none focus:border-amber-500 animate text-slate-200 px-3 py-2 rounded-md focus:bg-slate-800 overflow-clip no-arrows ${className}`}
      maxLength={3}
    />
  );
};

export default PointsInput;