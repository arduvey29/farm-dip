/**
 * Buffalo ghee compared with cow ghee, as a plain HTML table. Tables are among the formats AI
 * overviews and featured snippets lift most readily, so the content is written to stand alone.
 * General dairy facts only; nothing here is a claim about a competitor.
 */
const rows: [string, string, string][] = [
  ["Colour", "Creamy white", "Golden yellow"],
  ["Why the colour", "Buffalo milk has almost no beta-carotene", "Cow milk carries beta-carotene from fodder"],
  ["Fat in the milk", "About 6 to 8%", "About 3.5 to 4.5%"],
  ["Texture", "Thick and creamy, sets firm when cool", "Softer, often grainy"],
  ["Taste", "Rich and sweet", "Lighter and nutty"],
  ["Best for", "Halwa, ladoo, mithai, parathas, puris and frying", "Everyday tadka, dal and rice"],
];

export function CompareTable() {
  return (
    <div className="overflow-x-auto rounded-[1.5rem] bg-milk p-1.5 shadow-[0_1px_0_var(--color-line),0_24px_50px_-34px_rgb(35_27_30/0.4)]">
      <table className="table-ghee">
        <caption className="sr-only">Buffalo ghee compared with cow ghee</caption>
        <thead>
          <tr>
            <th scope="col" className="w-[24%]">
              <span className="sr-only">Attribute</span>
            </th>
            <th scope="col" className="rounded-t-xl bg-ghee-100">
              Buffalo ghee
            </th>
            <th scope="col">Cow ghee</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, buffalo, cow], i) => (
            <tr key={label}>
              <th scope="row">{label}</th>
              <td className={`bg-ghee-100 font-medium ${i === rows.length - 1 ? "rounded-b-xl" : ""}`}>{buffalo}</td>
              <td className="text-ink-700">{cow}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
