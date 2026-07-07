export default function AmortizationTable({
  loading,
  schedule,
  formatCurrency
}) {
  if (loading) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm">
        <p className="text-sm font-medium text-slate-500">
          Calculando...
        </p>
      </div>
    );
  }

  if (!schedule?.length) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white px-6 text-center">
        <p className="text-sm font-medium text-slate-500">
          Ingresa los datos y calcula una simulación.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-200 px-4 py-3">
        <h2 className="text-lg font-semibold text-slate-950">
          Tabla de amortización
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-sm">

          <thead>
            <tr className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">

              <th className="px-4 py-3 font-semibold">
                Mes
              </th>

              <th className="px-4 py-3 text-right font-semibold">
                Pago
              </th>

              <th className="px-4 py-3 text-right font-semibold">
                Capital
              </th>

              <th className="px-4 py-3 text-right font-semibold">
                Interés
              </th>

              <th className="px-4 py-3 text-right font-semibold">
                Saldo
              </th>

            </tr>
          </thead>

          <tbody>

            {schedule.map((row) => (

              <tr key={row.month}>

                <td className="border-t border-slate-100 px-4 py-3 font-medium text-slate-700">
                  {row.month}
                </td>

                <td className="border-t border-slate-100 px-4 py-3 text-right font-medium text-slate-950">
                  {formatCurrency(row.payment)}
                </td>

                <td className="border-t border-slate-100 px-4 py-3 text-right text-emerald-700">
                  {formatCurrency(row.principal)}
                </td>

                <td className="border-t border-slate-100 px-4 py-3 text-right text-amber-700">
                  {formatCurrency(row.interest)}
                </td>

                <td className="border-t border-slate-100 px-4 py-3 text-right text-slate-700">
                  {formatCurrency(row.balance)}
                </td>

              </tr>

            ))}

          </tbody>

        </table>
      </div>
    </div>
  );
}
