import { useState } from "react";

import api from "./services/api";

import LoanForm from "./components/LoanForm";
import AmortizationTable from "./components/AmortizationTable";

export default function App() {

  const [schedule, setSchedule] = useState([]);
  const [simulationId, setSimulationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totals = schedule.reduce(
    (acc, row) => ({
      payment: acc.payment + row.payment,
      interest: acc.interest + row.interest,
      principal: acc.principal + row.principal
    }),
    {
      payment: 0,
      interest: 0,
      principal: 0
    }
  );

  const formatCurrency = (value) => (
    new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN"
    }).format(value)
  );

  const calculate = async (data) => {

    try {

      setLoading(true);
      setError("");

      const response = await api.post(
        "/simulate",
        data
      );

      setSchedule(
        response.data.schedule
      );

      setSimulationId(
        response.data.simulation_id
      );

    } catch (err) {

      setError(
        "Error al calcular simulación"
      );

    } finally {

      setLoading(false);

    }
  };

  const clearResults = () => {
    setSchedule([]);
    setSimulationId(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">

      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">

        <header className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              CreditSim
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-950 sm:text-4xl">
              Simulador de crédito
            </h1>

          </div>

          {simulationId && (
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm">
              <span className="text-slate-500">Simulación</span>
              <span className="ml-2 font-semibold text-slate-950">#{simulationId}</span>
            </div>
          )}

        </header>

        <section className="grid gap-6 lg:grid-cols-[360px_1fr]">

          <LoanForm
            loading={loading}
            onCalculate={calculate}
            clearTable={clearResults}
          />

          <div className="flex min-h-[420px] flex-col gap-4">

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            {schedule.length > 0 && (
              <div className="grid gap-3 sm:grid-cols-3">

                <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-500">Total pagado</p>
                  <p className="mt-1 text-xl font-bold text-slate-950">
                    {formatCurrency(totals.payment)}
                  </p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-500">Interés total</p>
                  <p className="mt-1 text-xl font-bold text-amber-700">
                    {formatCurrency(totals.interest)}
                  </p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-500">Capital</p>
                  <p className="mt-1 text-xl font-bold text-emerald-700">
                    {formatCurrency(totals.principal)}
                  </p>
                </div>

              </div>
            )}

            <AmortizationTable
              loading={loading}
              schedule={schedule}
              formatCurrency={formatCurrency}
            />

          </div>

        </section>

      </main>

    </div>
  );
}
