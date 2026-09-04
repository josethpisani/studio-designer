export type Status = "pending" | "in_progress" | "review" | "completed" | "cancelled";
export type Priority = "low" | "normal" | "high" | "urgent";
export const statusLabels: Record<Status,string> = { pending:"Pendiente", in_progress:"En proceso", review:"En revisión", completed:"Finalizada", cancelled:"Cancelada" };
export const priorityLabels: Record<Priority,string> = { low:"Baja", normal:"Normal", high:"Alta", urgent:"Urgente" };
