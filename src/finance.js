import Papa from 'papaparse';
export const categories = ['Salary', 'Freelance', 'Investments', 'Food & dining', 'Shopping', 'Transport', 'Housing', 'Entertainment', 'Health', 'Other'];
export const money = value => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(value);
export function validateTransaction(row) {
  if (!row.name || !String(row.name).trim()) throw new Error('A transaction name is required.');
  if (!['income','expense'].includes(row.type)) throw new Error('Type must be income or expense.');
  if (!Number.isFinite(Number(row.amount)) || Number(row.amount) <= 0 || Number(row.amount) > 1e10) throw new Error('Amount must be greater than zero and at most 10 billion.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(row.date || '') || new Date(row.date).toISOString().slice(0,10) !== row.date) throw new Error('Use a valid date in YYYY-MM-DD format.');
  if (!categories.includes(row.category)) throw new Error('Choose a supported category.');
  return {name:String(row.name).trim().slice(0,120), type:row.type, amount:Number(row.amount), date:row.date, category:row.category, note:String(row.note || '').slice(0,500)};
}
export function parseCSV(text) {
  const result = Papa.parse(text, {header:true, skipEmptyLines:'greedy', transformHeader:h=>h.trim().toLowerCase().replace(/^\uFEFF/,'')});
  if (result.errors.length) throw new Error('Invalid CSV: ' + result.errors[0].message);
  if (!result.data.length) throw new Error('The CSV has no transactions.');
  if (result.data.length > 500) throw new Error('Import up to 500 transactions at a time.');
  return result.data.map((row,i)=> {try {return validateTransaction(row);} catch(e) {throw new Error(`Row ${i+2}: ${e.message}`);}});
}
export const exportCSV = rows => Papa.unparse(rows.map(({name,type,amount,date,category,note})=>({name,type,amount,date,category,note})), {escapeFormulae:true});
export function seedTransactions() {
  const current = `${new Date().getFullYear()}-${String(new Date().getMonth()+1).padStart(2,'0')}`;
  return [['Monthly salary','income',65000,'Salary',1],['Apartment rent','expense',18000,'Housing',2],['Weekend groceries','expense',2450,'Food & dining',3],['Website project','income',12500,'Freelance',5],['Coffee & catch-up','expense',480,'Food & dining',6],['New headphones','expense',3999,'Shopping',8],['Metro recharge','expense',800,'Transport',10],['Movie night','expense',650,'Entertainment',12]].map(([name,type,amount,category,day],i)=>({id:`sample-${i}`,name,type,amount,category,date:`${current}-${String(day).padStart(2,'0')}`,note:''}));
}
