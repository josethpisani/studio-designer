import type { Config } from "tailwindcss";
export default { content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"], theme: { extend: { colors: { ink: "#102a43", paper: "#f4f8fc", mint: "#dbeafe", coral: "#2563eb", lavender: "#e0f2fe" }, boxShadow: { soft: "0 14px 40px rgba(15,70,120,.08)" } } }, plugins: [] } satisfies Config;
