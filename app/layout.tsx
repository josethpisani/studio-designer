import "./globals.css";
import { Sidebar } from "../components/sidebar";
export const dynamic = "force-dynamic";
export const metadata = { title:"Studio Flow", description:"Gestión de actividades para diseñadores" };
export default function RootLayout({children}:{children:React.ReactNode}){ return <html lang="es"><body><div className="min-h-screen lg:flex"><Sidebar/><main className="min-w-0 flex-1">{children}</main></div></body></html> }
