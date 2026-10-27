/**
 * Plain HTML comparison table. Tables are among the formats AI overviews and
 * featured snippets lift most readily, so the content is written to stand alone.
 */
const rows: [string, string, string][] = [
  ["Made from", "Curd from whole A2 milk", "Cream separated by machine"],
  ["Milk per litre of ghee", "About 28 to 30 litres", "About 12 to 15 litres"],
  ["Cows", "Purebred Gir and Sahiwal", "Often crossbred, mixed herds"],
  ["Cooking", "Small iron kadhais on a wood fire", "Large steam-heated vats"],
  ["Texture and aroma", "Grainy, nutty, caramel", "Smooth, mild"],
  ["Testing", "Independent lab report for every batch", "Varies by brand"],
];

export function CompareTable() {
  return (
    <div className="frame-peetal overflow-x-auto rounded-2xl bg-paper">
      <table className="table-ghee min-w-[36rem]">
        <caption className="sr-only">Farm Dip bilona ghee compared with typical cream-method ghee</caption>
        <thead>
          <tr>
            <th scope="col" className="w-1/4">
              <span className="sr-only">Attribute</span>
            </th>
            <th scope="col" className="bg-chandan">
              Farm Dip bilona ghee
            </th>
            <th scope="col">Typical cream ghee</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, ours, theirs]) => (
            <tr key={label}>
              <th scope="row">{label}</th>
              <td className="bg-chandan font-medium">{ours}</td>
              <td className="text-maroon-700">{theirs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
