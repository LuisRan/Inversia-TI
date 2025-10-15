export default function AdminPage() {
  return (
    <div className="container mt-5" style={{ color: "#DBDBDB" }}>
      <h1>Panel de Administración - Entorno Real</h1>
      <p>Bienvenido al panel de administración del entorno real.</p>
      <p>Aquí puedes gestionar usuarios, configuraciones y monitorear el sistema.</p>
      
      <div style={{ background: "#333", padding: "20px", marginTop: "20px", borderRadius: "8px" }}>
        <h3>Funcionalidades disponibles:</h3>
        <ul>
          <li>Gestión de usuarios</li>
          <li>Configuración de parámetros de IA</li>
          <li>Monitoreo de transacciones</li>
          <li>Reportes y estadísticas</li>
        </ul>
      </div>
    </div>
  );
}