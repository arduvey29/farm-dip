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
    <div className="frame-peetal overflow-x-auto rounded-2xl bg-malai">
      <table className="table-ghee min-w-[36rem]">
        <caption className="sr-only">Buffalo ghee compared with cow ghee</caption>
        <thead>
          <tr>
            <th scope="col" className="w-1/4">
              <span className="sr-only">Attribute</span>
            </th>
            <th scope="col" className="bg-chandan">
              Buffalo ghee
            </th>
            <th scope="col">Cow ghee</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, buffalo, cow]) => (
            <tr key={label}>
              <th scope="row">{label}</th>
              <td className="bg-chandan font-medium">{buffalo}</td>
              <td className="text-kattha-700">{cow}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
