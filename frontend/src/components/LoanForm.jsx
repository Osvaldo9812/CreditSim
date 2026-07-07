import { useState, useEffect } from "react";

export default function LoanForm({
  loading,
  onCalculate,
  clearTable
}) {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [months, setMonths] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("creditsim");

    if (saved) {
      const data = JSON.parse(saved);

      setAmount(data.amount || "");
      setRate(data.rate || "");
      setMonths(data.months || "");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "creditsim",
      JSON.stringify({
        amount,
        rate,
        months
      })
    );
  }, [amount, rate, months]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    clearTable();
  };

  const submit = (e) => {
    e.preventDefault();

    onCalculate({
      amount: Number(amount),
      annual_rate: Number(rate),
      months: Number(months)
    });
  };

  return (
    <form
      onSubmit={submit}
      className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
    >

      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Datos del crédito
        </h2>
      </div>

      <div className="space-y-4">

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Monto
          </label>

          <input
            type="number"
            min="1"
            step="0.01"
            value={amount}
            onChange={handleAmountChange}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            placeholder="10000"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Tasa anual
          </label>

          <div className="relative">
            <input
              type="number"
              min="0"
              step="0.01"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 pr-10 text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              placeholder="12"
              required
            />
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm font-medium text-slate-500">
              %
            </span>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Plazo
          </label>

          <div className="relative">
            <input
              type="number"
              min="1"
              step="1"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 pr-16 text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              placeholder="12"
              required
            />
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm font-medium text-slate-500">
              meses
            </span>
          </div>
        </div>

      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-5 w-full rounded-lg bg-emerald-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-300 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {loading ? "Calculando..." : "Calcular"}
      </button>
    </form>
  );
}
