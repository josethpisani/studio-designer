import {cookies} from "next/headers";
export async function isAdmin(){return (await cookies()).get("studio_admin")?.value==="1";}
export async function loginAdmin(user:string,password:string){const validUser=process.env.ADMIN_USER||"admin";const validPassword=process.env.ADMIN_PASSWORD||"";if(user!==validUser||!validPassword||password!==validPassword)return false;(await cookies()).set("studio_admin","1",{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",maxAge:60*60*8,path:"/"});return true;}
export async function logoutAdmin(){(await cookies()).delete("studio_admin");}
