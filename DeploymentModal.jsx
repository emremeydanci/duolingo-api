import React, { useState, useEffect } from 'react';
import {
  Rocket, Server, Link, X, CheckCircle, AlertTriangle, RefreshCw
} from 'lucide-react';

const DeploymentModal = ({
  isOpen,
  onClose,
  strategy,
  configuration,
  riskParams,
  currentTheme
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedExchanges, setSelectedExchanges] = useState([]);
  const [deploymentName, setDeploymentName] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStatus, setDeployStatus] = useState([]);

  const DEPLOYMENT_STEPS = [
    { id: 1, name: 'Review', icon: Server },
    { id: 2, name: 'Exchanges', icon: Link },
    { id: 3, name: 'Checks', icon: CheckCircle },
    { id: 4, name: 'Deploy', icon: Rocket }
  ];

  const EXCHANGES = [
    { id: 'binance', name: 'Binance', type: 'CEX' },
    { id: 'coinbase', name: 'Coinbase', type: 'CEX' },
    { id: 'kraken', name: 'Kraken', type: 'CEX' },
    { id: 'uniswap', name: 'Uniswap V3', type: 'DEX' }
  ];

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setDeploymentName(`${strategy?.name || 'Strategy'} - ${new Date().toLocaleDateString()}`);
      setSelectedExchanges([]);
      setIsDeploying(false);
      setDeployStatus([]);
    }
  }, [isOpen, strategy]);

  const handleExchangeToggle = (exchangeId) => {
    setSelectedExchanges(prev =>
      prev.includes(exchangeId)
        ? prev.filter(id => id !== exchangeId)
        : [...prev, exchangeId]
    );
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1: return deploymentName.trim() !== '';
      case 2: return selectedExchanges.length > 0;
      case 3: return true;
      case 4: return true;
      default: return false;
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      } else {
        handleDeploy();
      }
    }
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    setDeployStatus([]);

    const steps = [
      'Validating configuration...',
      'Connecting to exchanges...',
      'Initializing bot engine...',
      'Loading strategy...',
      'Starting trading bot...'
    ];

    for (let i = 0; i < steps.length; i++) {
      setDeployStatus(prev => [...prev, { text: steps[i], status: 'pending' }]);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setDeployStatus(prev =>
        prev.map((item, idx) =>
          idx === i ? { ...item, status: 'completed' } : item
        )
      );
    }

    setIsDeploying(false);
    setTimeout(() => {
      alert('Bot deployed successfully!');
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: currentTheme.bgSecondary || '#1e293b',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        border: `1px solid ${currentTheme.border || '#334155'}`
      }}>
        {/* Header */}
        <div style={{
          padding: '20px',
          borderBottom: `1px solid ${currentTheme.border || '#334155'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            margin: 0,
            color: currentTheme.text || '#e2e8f0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Rocket size={24} style={{ color: currentTheme.accent || '#3b82f6' }} />
            Deploy Trading Bot
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: currentTheme.textSecondary || '#94a3b8',
              padding: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress Steps */}
        <div style={{
          padding: '16px 20px',
          borderBottom: `1px solid ${currentTheme.border || '#334155'}`,
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          {DEPLOYMENT_STEPS.map((step) => {
            const StepIcon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <div key={step.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: isActive ? (currentTheme.accent || '#3b82f6') :
                    isCompleted ? (currentTheme.success || '#10b981') :
                      (currentTheme.border || '#334155'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {isCompleted ? (
                    <CheckCircle size={14} style={{ color: 'white' }} />
                  ) : (
                    <StepIcon size={14} style={{ color: 'white' }} />
                  )}
                </div>
                <span style={{
                  fontSize: '12px',
                  fontWeight: isActive ? '600' : '400',
                  color: isActive ? currentTheme.text : currentTheme.textSecondary
                }}>
                  {step.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Content */}
        <div style={{
          padding: '20px',
          flex: 1,
          overflowY: 'auto'
        }}>
          {/* Step 1: Review */}
          {currentStep === 1 && (
            <div>
              <h3 style={{ fontSize: '18px', marginBottom: '20px', color: currentTheme.text }}>
                Review Configuration
              </h3>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  color: currentTheme.textSecondary
                }}>
                  Deployment Name
                </label>
                <input
                  type="text"
                  value={deploymentName}
                  onChange={(e) => setDeploymentName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: currentTheme.bg || '#0f172a',
                    border: `1px solid ${currentTheme.border}`,
                    borderRadius: '6px',
                    color: currentTheme.text,
                    fontSize: '14px'
                  }}
                />
              </div>

              <div style={{
                backgroundColor: currentTheme.bg || '#0f172a',
                padding: '16px',
                borderRadius: '8px',
                border: `1px solid ${currentTheme.border}`
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: currentTheme.textSecondary, marginBottom: '4px' }}>
                      Strategy
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: currentTheme.text }}>
                      {strategy?.name || 'Not Selected'}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: currentTheme.textSecondary, marginBottom: '4px' }}>
                      Risk Level
                    </div>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: strategy?.riskLevel === 'LOW' ? currentTheme.success : currentTheme.warning
                    }}>
                      {strategy?.riskLevel || 'MEDIUM'}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: currentTheme.textSecondary, marginBottom: '4px' }}>
                      Trading Pair
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: currentTheme.text }}>
                      {configuration?.tradingPair || 'BTC/USDT'}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: currentTheme.textSecondary, marginBottom: '4px' }}>
                      Stop Loss / Take Profit
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: currentTheme.text }}>
                      {riskParams?.stopLoss || 5}% / {riskParams?.takeProfit || 15}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Select Exchanges */}
          {currentStep === 2 && (
            <div>
              <h3 style={{ fontSize: '18px', marginBottom: '20px', color: currentTheme.text }}>
                Select Exchanges
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {EXCHANGES.map(exchange => {
                  const isSelected = selectedExchanges.includes(exchange.id);

                  return (
                    <div
                      key={exchange.id}
                      onClick={() => handleExchangeToggle(exchange.id)}
                      style={{
                        padding: '16px',
                        backgroundColor: isSelected ? 'rgba(16, 185, 129, 0.1)' : currentTheme.bg,
                        border: `1px solid ${isSelected ? currentTheme.success : currentTheme.border}`,
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        textAlign: 'center'
                      }}
                    >
                      <Server size={28} style={{
                        color: isSelected ? currentTheme.success : currentTheme.textSecondary,
                        marginBottom: '8px'
                      }} />
                      <div style={{ fontSize: '14px', fontWeight: '600', color: currentTheme.text }}>
                        {exchange.name}
                      </div>
                      <div style={{ fontSize: '12px', color: currentTheme.textSecondary }}>
                        {exchange.type}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Final Checks */}
          {currentStep === 3 && (
            <div>
              <h3 style={{ fontSize: '18px', marginBottom: '20px', color: currentTheme.text }}>
                Final Checks
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { label: 'Strategy Configuration', status: true },
                  { label: 'Risk Parameters', status: true },
                  { label: 'Exchange Connections', status: selectedExchanges.length > 0 },
                  { label: 'API Keys Valid', status: selectedExchanges.length > 0 },
                  { label: 'Sufficient Balance', status: true }
                ].map((check, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px',
                    backgroundColor: currentTheme.bg,
                    borderRadius: '6px',
                    border: `1px solid ${currentTheme.border}`
                  }}>
                    {check.status ? (
                      <CheckCircle size={20} style={{ color: currentTheme.success, marginRight: '12px' }} />
                    ) : (
                      <AlertTriangle size={20} style={{ color: currentTheme.warning, marginRight: '12px' }} />
                    )}
                    <span style={{ fontSize: '14px', color: currentTheme.text }}>
                      {check.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Deploy */}
          {currentStep === 4 && (
            <div>
              <h3 style={{ fontSize: '18px', marginBottom: '20px', color: currentTheme.text }}>
                {isDeploying ? 'Deploying Bot...' : 'Ready to Deploy'}
              </h3>

              {!isDeploying && deployStatus.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <Rocket size={48} style={{ color: currentTheme.info || '#3b82f6', marginBottom: '16px' }} />
                  <div style={{ fontSize: '16px', color: currentTheme.text, marginBottom: '8px' }}>
                    Everything is ready!
                  </div>
                  <div style={{ fontSize: '14px', color: currentTheme.textSecondary }}>
                    Click "Deploy Now" to start your trading bot
                  </div>
                </div>
              )}

              {deployStatus.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {deployStatus.map((status, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px',
                      backgroundColor: currentTheme.bg,
                      borderRadius: '6px',
                      border: `1px solid ${currentTheme.border}`
                    }}>
                      {status.status === 'completed' ? (
                        <CheckCircle size={20} style={{ color: currentTheme.success, marginRight: '12px' }} />
                      ) : (
                        <RefreshCw size={20} style={{
                          color: currentTheme.info,
                          marginRight: '12px',
                          animation: 'spin 1s linear infinite'
                        }} />
                      )}
                      <span style={{ fontSize: '14px', color: currentTheme.text }}>
                        {status.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '20px',
          borderTop: `1px solid ${currentTheme.border}`,
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1 || isDeploying}
            style={{
              padding: '10px 20px',
              backgroundColor: currentTheme.bg,
              color: currentTheme.text,
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: currentStep === 1 || isDeploying ? 'not-allowed' : 'pointer',
              opacity: currentStep === 1 || isDeploying ? 0.5 : 1
            }}
          >
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!validateStep() || (currentStep === 4 && deployStatus.length === 5)}
            style={{
              padding: '10px 20px',
              backgroundColor: currentStep === 4 && !isDeploying ? currentTheme.success : currentTheme.accent,
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: !validateStep() || (currentStep === 4 && deployStatus.length === 5) ? 'not-allowed' : 'pointer',
              opacity: !validateStep() || (currentStep === 4 && deployStatus.length === 5) ? 0.5 : 1,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {currentStep === 4 ? (
              <>
                <Rocket size={16} />
                {isDeploying ? 'Deploying...' : 'Deploy Now'}
              </>
            ) : (
              'Next'
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default DeploymentModal;