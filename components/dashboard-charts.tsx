const months=["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
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
  return <div className="flex min-w-[96px] flex-1 flex-col items-center gap-2"><div className="grid h-20 w-20 place-items-center rounded-full" style={{background:`conic-gradient(${stops})`}}><div className="grid h-12 w-12 place-items-center rounded-full bg-white text-center"><b className="text-lg">{total}</b></div></div><span className="text-[10px] font-bold uppercase text-slate-400">{months[Number(month.month.slice(5))-1]}</span><div className="flex gap-1 text-[10px] font-bold">{rhythmStates.map((state,index)=><span className={`${state.className} rounded-full px-1.5 py-0.5 text-white`} title={`${state.label}: ${values[index]}`} key={state.key}>{values[index]}</span>)}</div></div>;
}

export function DashboardCharts({monthly,activities,byClient}:{monthly:any[],activities:any,byClient:any[]}){
  const total=Number(Object.values(activities).reduce((a:any,b:any)=>a+Number(b),0)||1);
  const states=[{key:"completed",label:"Finalizados",color:"#34d399"},{key:"in_progress",label:"En proceso",color:"#60a5fa"},{key:"review",label:"En revisión",color:"#a78bfa"},{key:"pending",label:"Pendientes",color:"#fbbf24"},{key:"cancelled",label:"Cancelados",color:"#94a3b8"}];
  let start=0;
  const stops=states.map(s=>{const end=start+Number(activities[s.key]||0)/total*360;const item=`${s.color} ${start}deg ${end}deg`;start=end;return item}).join(",");
  return <section className="mt-8 grid gap-6 xl:grid-cols-[1.35fr_.65fr]">
    <div className="card p-6"><div className="flex items-start justify-between"><div><h2 className="font-bold">Ritmo de trabajo</h2><p className="mt-1 text-xs text-slate-500">Gráfico circular por mes</p></div><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">Datos en vivo</span></div><div className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-6">{monthly.length?monthly.map(m=><MonthCircle month={m} key={m.month}/>):<p className="m-auto text-sm text-slate-400">Aún no hay datos mensuales.</p>}</div><div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-semibold text-slate-500">{rhythmStates.map(state=><span className="flex items-center gap-1.5" key={state.key}><i className={`h-2.5 w-2.5 rounded-full ${state.className}`}/>{state.label}</span>)}</div></div>
    <div className="card p-6"><h2 className="font-bold">Estado actual</h2><p className="mt-1 text-xs text-slate-500">Distribución de tus trabajos</p><div className="mt-5 flex items-center gap-5"><div className="grid h-32 w-32 shrink-0 place-items-center rounded-full" style={{background:`conic-gradient(${stops})`}}><div className="grid h-20 w-20 place-items-center rounded-full bg-white text-center"><b className="text-2xl">{total===1&&Object.values(activities).length===0?0:total}</b><span className="text-[9px] text-slate-400">trabajos</span></div></div><div className="space-y-2">{states.map(s=><div className="flex items-center gap-2 text-xs" key={s.key}><i className="h-2.5 w-2.5 rounded-full" style={{background:s.color}}/>{s.label}<b className="ml-2">{activities[s.key]||0}</b></div>)}</div></div></div>
    <div className="card p-6 xl:col-span-2"><h2 className="font-bold">Trabajos por cliente</h2><div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{byClient.map((c:any,i:number)=><div key={c.name}><div className="mb-1 flex justify-between text-xs"><span className="truncate">{c.name}</span><b>{c.count}</b></div><div className="h-2 rounded-full bg-slate-100"><div className={`h-2 rounded-full ${["bg-blue-300","bg-blue-400","bg-blue-500","bg-blue-600","bg-blue-800"][i]}`} style={{width:`${Math.min(100,Number(c.count)/(Number(byClient[0]?.count)||1)*100)}%`}}/></div></div>)}</div></div>
  </section>;
}
