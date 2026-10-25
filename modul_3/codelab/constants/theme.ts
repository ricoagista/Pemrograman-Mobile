// Design tokens from DESIGN.md (WattVision dark theme)
export const colors = {
  background: "#121212", // Background Primario
  surface: "#1E1E1E", // Surface de Tarjetas
  border: "#2C2C2E", // Border sutil
  primary: "#00E5FF", // Acento Primario (Cian/Neón)
  alert: "#FF453A", // Acento de Alerta (Rojo)
  secondary: "#32D74B", // Acento Secundario (Verde Lima)
  textPrimary: "#FFFFFF", // Texto Principal
  textSecondary: "#98989D", // Texto Secundario (Gris)
};

export const radius = {
  md: 16, // border-radius: 16px para Cards
};

export const spacing = {
  md: 16, // Padding interno de 20px (sekitar md + ekstra)
  lg: 24,
};

export const typography = {
  title: { fontSize: 24, fontWeight: "700" as const }, // Títulos: 24px Semi Bold
  body: { fontSize: 14, fontWeight: "400" as const }, // Cuerpo: 14px Regular
  kpi: { fontSize: 32, fontWeight: "800" as const }, // Métricas KPIs: 32px Bold mono
};