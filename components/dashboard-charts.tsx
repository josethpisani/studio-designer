"use client";
import {useMemo,useState} from "react";

const rhythmStates=[
  {key:"created",label:"Creados",color:"#93c5fd",className:"bg-blue-300"},
  {key:"in_progress",label:"En proceso",color:"#3b82f6",className:"bg-blue-500"},
  {key:"completed",label:"Finalizados",color:"#1e40af",className:"bg-blue-800"},
];

function MonthCircle({month}:{month:any}){
  const values=rhythmStates.map(state=>Number(month[state.key]||0));
  const total=values.reduce((sum,value)=>sum+value,0);
  let start=0;
  const stops=total?values.map((value,index)=>{const end=start+value/total*360;const stop=`${rhythmStates[index].color} ${start}deg ${end}deg`;start=end;return stop}).join(","):"#e2e8f0 0deg 360deg";
  return <div className="flex flex-col items-center gap-4"><div className="grid h-40 w-40 place-items-center rounded-full shadow-sm" style={{background:`conic-gradient(${stops})`}}><div className="grid h-28 w-28 place-items-center rounded-full bg-white text-center"><b className="text-3xl">{total}</b><span className="text-xs text-slate-400">trabajos</span></div></div><span className="text-base font-black uppercase text-slate-500">{new Date(`${month.month}-01T12:00:00`).toLocaleDateString("es-CO",{month:"long",year:"numeric"})}</span></div>;
}

function monthRange(monthly:any[]){
  const start=new Date("2026-09-01T12:00:00");
  const latest=monthly.length?new Date(`${monthly[monthly.length-1].month}-01T12:00:00`):start;
  const now=new Date();
  const end=new Date(Math.max(latest.getTime(),new Date(now.getFullYear(),now.getMonth(),1).getTime()));
  const options:{value:string,label:string}[]=[];
  for(const date=new Date(start);date<=end;date.setMonth(date.getMonth()+1)){
    const value=`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}`;
    options.push({value,label:date.toLocaleDateString("es-CO",{month:"long",year:"numeric"})});
  }
  return options;
}

export function DashboardCharts({monthly,activities,byClient}:{monthly:any[],activities:any,byClient:any[]}){
  const options=useMemo(()=>monthRange(monthly),[monthly]);
  const [selectedMonth,setSelectedMonth]=useState(options[options.length-1]?.value||"2026-09");
  const selectedData=monthly.find(month=>month.month===selectedMonth)||{month:selectedMonth,created:0,in_progress:0,completed:0};
  const total=Number(Object.values(activities).reduce((a:any,b:any)=>a+Number(b),0)||1);
  const states=[{key:"completed",label:"Finalizados",color:"#34d399"},{key:"in_progress",label:"En proceso",color:"#60a5fa"},{key:"review",label:"En revisión",color:"#a78bfa"},{key:"pending",label:"Pendientes",color:"#fbbf24"},{key:"cancelled",label:"Cancelados",color:"#94a3b8"}];
  let start=0;
  const stops=states.map(s=>{const end=start+Number(activities[s.key]||0)/total*360;const item=`${s.color} ${start}deg ${end}deg`;start=end;return item}).join(",");
  return <section className="mt-8 grid gap-6 xl:grid-cols-[1.35fr_.65fr]">
    <div className="card p-6"><div className="flex flex-wrap items-start justify-between gap-4"><div><h2 className="text-xl font-black">Ritmo de trabajo</h2><p className="mt-1 text-sm text-slate-500">Creados, en proceso y finalizados por mes</p></div><label className="flex shrink-0 items-center gap-2 whitespace-nowrap text-sm font-bold text-slate-600">Mes y año<select className="field min-w-[170px] py-2 text-sm" value={selectedMonth} onChange={event=>setSelectedMonth(event.target.value)}>{options.map(option=><option value={option.value} key={option.value}>{option.label}</option>)}</select></label></div><div className="mt-8"><MonthCircle month={selectedData}/></div><div className="mt-8 grid gap-3 sm:grid-cols-3">{rhythmStates.map(state=><div className={`${state.className} rounded-2xl p-4 text-center text-white`} key={state.key}><p className="text-sm font-bold">{state.label}</p><p className="mt-1 text-3xl font-black">{Number(selectedData[state.key]||0)}</p></div>)}</div></div>
    <div className="card p-6"><h2 className="text-xl font-black">Estado actual</h2><p className="mt-1 text-sm text-slate-500">Distribución de tus trabajos</p><div className="mt-6 flex flex-col items-center gap-6"><div className="grid h-40 w-40 shrink-0 place-items-center rounded-full" style={{background:`conic-gradient(${stops})`}}><div className="grid h-24 w-24 place-items-center rounded-full bg-white text-center"><b className="text-3xl">{total===1&&Object.values(activities).length===0?0:total}</b><span className="text-xs text-slate-400">trabajos</span></div></div><div className="grid w-full gap-3 sm:grid-cols-2">{states.map(s=><div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2 text-sm" key={s.key}><span className="flex items-center gap-2"><i className="h-3 w-3 rounded-full" style={{background:s.color}}/>{s.label}</span><b className="text-lg">{activities[s.key]||0}</b></div>)}</div></div></div>
    <div className="card p-6 xl:col-span-2"><h2 className="font-bold">Trabajos por cliente</h2><div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{byClient.map((c:any,i:number)=><div key={c.name}><div className="mb-1 flex justify-between text-xs"><span className="truncate">{c.name}</span><b>{c.count}</b></div><div className="h-2 rounded-full bg-slate-100"><div className={`h-2 rounded-full ${["bg-blue-300","bg-blue-400","bg-blue-500","bg-blue-600","bg-blue-800"][i]}`} style={{width:`${Math.min(100,Number(c.count)/(Number(byClient[0]?.count)||1)*100)}%`}}/></div></div>)}</div></div>
  </section>;
}
