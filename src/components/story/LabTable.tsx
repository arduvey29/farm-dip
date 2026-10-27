import { labParameters } from "@/data/lab";

export function LabTable({ limit, tone = "light" }: { limit?: number; tone?: "light" | "dark" }) {
  const rows = limit ? labParameters.slice(0, limit) : labParameters;
  const dark = tone === "dark";
  return (
    <div className={`overflow-x-auto rounded-3xl ${dark ? "bg-maroon-950/40" : "frame-peetal bg-paper"}`}>
      <table className={`table-ghee min-w-[34rem] ${dark ? "[&_td]:border-maroon-800 [&_th]:border-maroon-800 [&_thead_th]:border-haldi-400" : ""}`}>
        <caption className="sr-only">Sample batch lab results against FSSAI limits</caption>
        <thead>
          <tr>
            <th scope="col">Test</th>
            <th scope="col">FSSAI limit</th>
            <th scope="col">Our batch</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.name}>
              <th scope="row">
                {p.name}
                <span className={`mt-0.5 block text-sm font-normal ${dark ? "text-maroon-200" : "text-maroon-700"}`}>{p.what}</span>
              </th>
              <td className="whitespace-nowrap">{p.limit}</td>
              <td className={`font-semibold whitespace-nowrap ${dark ? "text-haldi-300" : "text-mehndi"}`}>{p.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
