// Recibo una fecha cargada como string y con el siguiente formato: "Tue, 20 Apr 2021 19:15:00 GMT"
// y la paso a este: 20/04/2021 19:15:00
export default function formatearFecha(fechaString: string) {
    let fechaOriginal = new Date(fechaString);
  
    let fechaFormateada = fechaOriginal.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  
    return fechaFormateada;
  }

  export function formatearFechaConHora(fechaString: string) {
    let fechaOriginal = new Date(fechaString);
  
    let fechaFormateada = fechaOriginal.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'UTC'
    });
  
    return fechaFormateada;
  }