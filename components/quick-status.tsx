"use client";
import {updateActivityStatus} from "../app/actions";

export function QuickStatus({id}:{id:number}){
  return <div className="flex flex-wrap gap-2" onClick={event=>event.stopPropagation()}><form action={updateActivityStatus.bind(null,id,"in_progress")}><button className="rounded-lg bg-blue-100 px-2.5 py-1.5 text-[11px] font-bold text-blue-700 hover:bg-blue-200">En proceso</button></form><form action={updateActivityStatus.bind(null,id,"review")}><button className="rounded-lg bg-violet-100 px-2.5 py-1.5 text-[11px] font-bold text-violet-700 hover:bg-violet-200">En revisión</button></form><form action={updateActivityStatus.bind(null,id,"completed")}><button className="rounded-lg bg-emerald-100 px-2.5 py-1.5 text-[11px] font-bold text-emerald-700 hover:bg-emerald-200">Finalizado</button></form></div>;
}
