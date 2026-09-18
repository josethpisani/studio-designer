"use client";

export function DeleteButton({action,label="Eliminar"}:{action:(formData:FormData)=>void,label?:string}){
  return <form action={action} onSubmit={event=>{if(!window.confirm(`¿Seguro que deseas eliminar ${label.toLowerCase()}? Esta acción no se puede deshacer.`)) event.preventDefault();}}><button type="submit" className="btn border border-red-200 bg-red-50 text-red-700 hover:bg-red-100">{label}</button></form>;
}
