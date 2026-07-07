export default function SubmitButton({ label }) {
  return (
    <button
      type="submit"
      className="w-full bg-[#3B3B98] text-white p-2.5 rounded-lg text-sm font-bold uppercase tracking-wider"
    >
      {label}
    </button>
  );
}
