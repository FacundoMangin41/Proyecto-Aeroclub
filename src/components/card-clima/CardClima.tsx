import React, { useEffect } from 'react';

const CardClima: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://metar-taf.com/es/embed-js/AR-0253?layout=landscape&qnh=hPa&rh=rh&target=hy09LacU';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';

    const container = document.getElementById('metartaf-container');
    if (container) {
      container.appendChild(script);
    }

    return () => {
      if (container) {
        container.removeChild(script);
      }
    };
  }, []);

  return (
    <div id="metartaf-container">
    <a
      href="https://metar-taf.com/es/AR-0253"
      target="_blank"
      id="metartaf-hy09LacU"
      style={{
        fontSize: '18px',
        fontWeight: 500,
        color: '#000',
        backgroundColor: 'white',
        width: '350px',
        height: '300px',
        display: 'block',
        padding: '1rem',
        borderRadius: '10px',
      }}
    >
      METAR Lincoln Airport
    </a>
  </div>
  
  );
};

export { CardClima };
