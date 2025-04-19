import { Html } from '@react-three/drei';

function LoadingScreen() {
  return (
    <Html center>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        background: '#120023',
        color: '#ff00ff',
        fontFamily: 'monospace',
        fontSize: '24px',
      }}>
        <div style={{
          width: '200px',
          height: '4px',
          background: '#333',
          marginBottom: '20px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '50%',
            background: '#ff00ff',
            animation: 'loading 1s infinite',
          }} />
        </div>
        <div>LOADING CITY...</div>
        <style>{`
          @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
        `}</style>
      </div>
    </Html>
  );
}

export default LoadingScreen; 