import {isAdmin} from "../../lib/auth"; import {redirect} from "next/navigation";
export default async function ConfigLayout({children}:{children:React.ReactNode}){if(!(await isAdmin()))redirect("/login");return children;}
