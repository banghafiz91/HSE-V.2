import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  'options: string[]',
  'options: (string | { label: string, disabled: boolean })[]'
);

content = content.replace(
  '{options.map(o => <option key={o} value={o}>{o}</option>)}',
  `{options.map((op, i) => {
      const isObj = typeof op !== 'string';
      const label = isObj ? (op as any).label : op;
      const val = isObj ? (op as any).label.replace(' 🔒', '') : op;
      const disabled = isObj ? (op as any).disabled : false;
      return <option key={i} value={val} disabled={disabled} className={disabled ? "text-stone-400" : ""}>{label as string}</option>;
    })}`
);

fs.writeFileSync('src/App.tsx', content);
