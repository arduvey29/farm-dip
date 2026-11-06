/**
 * Plain HTML comparison table. Tables are among the formats AI overviews and
 * featured snippets lift most readily, so the content is written to stand alone.
 */
const rows: [string, string, string][] = [
  ["Made from", "Whole pure buffalo milk curd", "Cream separated by machine"],
  ["Milk per litre of ghee", "About 12 to 14 litres", "Industrial cream blends"],
  ["Milk source", "Pure buffalo milk from healthy herds", "Often mixed or processed milk"],
  ["Cooking", "Small iron kadhais on a slow wood fire", "Large steam-heated industrial vats"],
  ["Texture and aroma", "Danedar (grainy), nutty, rich aroma", "Smooth, mild or artificial"],
  ["Testing", "Independent lab report for every batch", "Varies by brand"],
];

export function CompareTable() {
  return (
    <div className="frame-peetal overflow-x-auto rounded-2xl bg-paper">
      <table className="table-ghee min-w-[36rem]">
        <caption className="sr-only">Farm Dip Pure Desi Buffalo Ghee compared with typical cream-method ghee</caption>
        <thead>
          <tr>
            <th scope="col" className="w-1/4">
              <span className="sr-only">Attribute</span>
            </th>
            <th scope="col" className="bg-chandan">
              Farm Dip Pure Desi Ghee
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
