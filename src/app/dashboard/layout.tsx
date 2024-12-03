import NavbarPerfil from "../components/NavBarPerfil";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <NavbarPerfil />
      <main className="">{children}</main> {/* Adiciona um espaçamento para evitar sobreposição */}
    </div>
  );
}
