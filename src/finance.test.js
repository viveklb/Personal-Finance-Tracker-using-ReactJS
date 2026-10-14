import {validateTransaction,parseCSV,exportCSV} from './finance';
const row={name:'Groceries',type:'expense',amount:123.45,date:'2026-10-14',category:'Food & dining',note:'with, commas and "quotes"'};
test('CSV round-trip preserves values, commas and quotes',()=>{expect(parseCSV(exportCSV([row]))).toEqual([row]);});
test('invalid amounts, types and calendar dates are rejected',()=>{for(const value of [0,-1,'oops',Infinity])expect(()=>validateTransaction({...row,amount:value})).toThrow();expect(()=>validateTransaction({...row,type:'other'})).toThrow();expect(()=>validateTransaction({...row,date:'2026-02-30'})).toThrow();});
test('CSV validation reports the row before importing',()=>{expect(()=>parseCSV('name,type,amount,date,category\nBad,expense,-5,2026-10-14,Other')).toThrow('Row 2');});
test('exports protect against spreadsheet formulas',()=>{expect(exportCSV([{...row,name:'=1+1'}])).toContain("'=1+1");});
