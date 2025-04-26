import { useState } from "react";
import { useTrafficStore } from "../utils/trafficSystem";
import "../styles/ControlPanel.css";

const ControlPanel = ({ 
  onToggleOrbitControls, 
  orbitControlsEnabled,
  onMoveToBuilding,
  buildingPositions
}) => {
  const [isStoplightManualMode, setIsStoplightManualMode] = useState(false);
  const [delayTime, setDelayTime] = useState(5);
  const stoplightStates = useTrafficStore(state => state.stoplightStates);
  const manualOverrideStoplight = useTrafficStore(state => state.manualOverrideStoplight);
  const resetStoplightOverride = useTrafficStore(state => state.resetStoplightOverride);

  const handleStoplightManualControl = (id) => {
    if (isStoplightManualMode) {
      manualOverrideStoplight(id, "red", delayTime);
      setTimeout(() => {
        resetStoplightOverride(id);
        setIsStoplightManualMode(false);
      }, delayTime * 1000);
    }
  };

  // If orbit controls are enabled, only show the return button
  if (orbitControlsEnabled) {
    return (
      <div className="orbit-return-button">
        <button onClick={onToggleOrbitControls} className="return-btn">
          Return to Controlled Camera
        </button>
      </div>
    );
  }

  return (
    <div className="control-panel">
      <button onClick={onToggleOrbitControls} className="control-btn">
        {orbitControlsEnabled ? "Disable" : "Enable"} Orbit Controls
      </button>
      
      <div className="section">
        <h3>Camera Navigation</h3>
        {Object.entries(buildingPositions).map(([building, reference]) => (
          <button 
            key={building} 
            className="building-btn"
            onClick={() => onMoveToBuilding(building, reference.position, reference.offset)}
          >
            View {building}
          </button>
        ))}
      </div>

      <div className="section">
        <h3>Stoplight Control</h3>
        <div className="stoplight-controls">
          <div className="control-row">
            <label>Delay (seconds):</label>
            <input 
              type="number" 
              min="1" 
              max="30" 
              value={delayTime} 
              onChange={(e) => setDelayTime(Number(e.target.value))} 
            />
          </div>
          <button 
            className={`control-btn ${isStoplightManualMode ? 'active' : ''}`}
            onClick={() => setIsStoplightManualMode(!isStoplightManualMode)}
          >
            {isStoplightManualMode ? "Manual Mode Active" : "Enable Manual Mode"}
          </button>
          
          {isStoplightManualMode && (
            <div className="stoplight-list">
              <p>Click a stoplight to force red for {delayTime} seconds:</p>
              {Array.from(stoplightStates.entries()).map(([id, data]) => (
                <button 
                  key={id} 
                  className="stoplight-btn"
                  onClick={() => handleStoplightManualControl(id)}
                >
                  Stoplight {id} ({data.state})
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ControlPanel; 