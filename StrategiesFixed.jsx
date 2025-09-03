import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  TrendingUp, TrendingDown, Activity, BarChart3, DollarSign,
  Settings, Save, Upload, Download, AlertTriangle, CheckCircle,
  Info, ChevronDown, ChevronRight, Play, Pause, RefreshCw,
  Lock, Unlock, Shield, Zap, Target, Eye, EyeOff, Copy,
  FileText, Database, Cloud, Server, Globe, Link, Cpu,
  Timer, Calendar, Award, Hash, Percent, Calculator,
  Bell, Layers, Grid, Compass, Crosshair, Package,
  ArrowUpDown, ArrowLeftRight, GitBranch, Shuffle,
  PieChart, LineChart, CandlestickChart, AlertCircle,
  Wallet, CreditCard, Building, Navigation, Anchor,
  BookOpen, GraduationCap, Users, MessageSquare, HelpCircle,
  X, Plus, Minus, Edit, Trash, MoreVertical, Search, Filter,
  Rocket
} from 'lucide-react';

import DeploymentModal from './DeploymentModal';

// ==================== CONSTANTS ====================
const REFRESH_INTERVAL = 5000;
const MAX_SAVED_STRATEGIES = 20;
const SIMULATION_SPEED = 100;

const RISK_LEVELS = {
  LOW: { color: '#10b981', label: 'Low Risk', maxDrawdown: 5 },
  MEDIUM: { color: '#f59e0b', label: 'Medium Risk', maxDrawdown: 15 },
  HIGH: { color: '#ef4444', label: 'High Risk', maxDrawdown: 30 },
  EXTREME: { color: '#dc2626', label: 'Extreme Risk', maxDrawdown: 50 }
};

const MARKET_CONDITIONS = {
  BULLISH: { icon: TrendingUp, color: '#10b981', description: 'Strong upward trend' },
  BEARISH: { icon: TrendingDown, color: '#ef4444', description: 'Strong downward trend' },
  NEUTRAL: { icon: ArrowLeftRight, color: '#6b7280', description: 'Sideways movement' },
  VOLATILE: { icon: Activity, color: '#f59e0b', description: 'High volatility' }
};

// This would be a separate file in production - keeping here for demo
const TRADING_STRATEGIES = {
  'cex-dex-arbitrage': {
    id: 'cex-dex-arbitrage',
    name: 'CEX/DEX Arbitrage',
    category: 'Arbitrage',
    subcategory: 'cex-dex',
    riskLevel: 'MEDIUM',
    expectedReturn: '5-15%',
    timeHorizon: 'Minutes',
    capitalRequired: '$10,000+',
    complexity: 'Advanced',
    winRate: 78,
    sharpeRatio: 2.1,
    maxDrawdown: 8,
    description: 'Exploits price differences between centralized and decentralized exchanges',
    detailedDescription: `
      CEX/DEX Arbitrage strategy identifies and exploits price discrepancies between centralized exchanges (CEX) 
      like Binance, Coinbase and decentralized exchanges (DEX) like Uniswap, SushiSwap.
    `,
    technicalDetails: {
      algorithm: 'Price Differential Detection with Smart Routing',
      indicators: ['Price Feeds', 'Volume Analysis', 'Liquidity Depth', 'Gas Oracle'],
      executionSpeed: '< 100ms',
      dataRequirements: 'Real-time price feeds from 5+ exchanges',
      backtestPeriod: '6 months minimum',
      updateFrequency: 'Tick-by-tick',
      riskManagement: 'Dynamic position sizing based on confidence score'
    },
    requirements: [
      'API access to multiple exchanges',
      'Low-latency infrastructure (<50ms)',
      'Smart contract integration capability',
      'Gas optimization system',
      'Minimum $10,000 capital'
    ],
    optimalConditions: [
      'High market volatility (>2% hourly)',
      'Liquidity imbalances between venues',
      'Network congestion variations',
      'New token listings or events'
    ],
    defaultConfig: {
      exchanges: ['Binance', 'Uniswap', 'Coinbase', 'SushiSwap'],
      parameters: {
        minProfitThreshold: 0.5,
        maxSlippage: 0.3,
        gasLimit: 500000,
        executionDelay: 100,
        volumeLimit: 50000,
        priceUpdateInterval: 1000,
        confidenceThreshold: 0.8,
        maxPositionSize: 0.2,
        emergencyStop: true
      }
    },
    performanceMetrics: {
      daily: { return: 0.8, trades: 45, winRate: 76, volume: 450000 },
      weekly: { return: 5.2, trades: 312, winRate: 78, volume: 3150000 },
      monthly: { return: 18.5, trades: 1420, winRate: 77, volume: 14200000 },
      bestDay: { date: '2024-03-15', return: 3.2, trades: 67 },
      worstDay: { date: '2024-02-28', return: -1.1, trades: 23 }
    },
    risks: [
      'Smart contract vulnerabilities',
      'Exchange API downtime',
      'Gas price spikes',
      'Liquidity provider withdrawal',
      'Regulatory changes'
    ]
  },
  'flash-loan-arbitrage': {
    id: 'flash-loan-arbitrage',
    name: 'Flash Loan Arbitrage',
    category: 'Arbitrage',
    subcategory: 'defi',
    isPremium: true,
    riskLevel: 'LOW',
    expectedReturn: '10-30%',
    timeHorizon: 'Seconds',
    capitalRequired: 'Gas fees only',
    complexity: 'Expert',
    winRate: 92,
    sharpeRatio: 3.5,
    maxDrawdown: 2,
    description: 'Capital-free arbitrage using flash loans for instant profitable trades',
    detailedDescription: `
      Flash Loan Arbitrage leverages DeFi's unique capability to borrow large amounts of capital within a single 
      transaction block.
    `,
    technicalDetails: {
      algorithm: 'Atomic Transaction Chaining with Multi-Path Optimization',
      indicators: ['Mempool Analysis', 'DEX Reserves', 'Price Oracles', 'Gas Prices'],
      executionSpeed: '< 50ms',
      dataRequirements: 'Direct node access, mempool visibility',
      backtestPeriod: '3 months with block-level data',
      updateFrequency: 'Every block',
      riskManagement: 'Transaction simulation before execution'
    },
    requirements: [
      'Smart contract development expertise',
      'Direct Ethereum node access',
      'MEV protection strategies',
      'Transaction simulation capability',
      'Gas optimization knowledge'
    ],
    optimalConditions: [
      'Large price discrepancies (>1%)',
      'Low network congestion',
      'Multiple protocol integrations available',
      'Liquidation events occurring'
    ],
    defaultConfig: {
      exchanges: ['Aave', 'dYdX', 'Uniswap', 'SushiSwap', 'Balancer'],
      parameters: {
        minProfitUSD: 100,
        maxGasPrice: 150,
        flashLoanProvider: 'Aave',
        routerOptimization: true,
        simulateFirst: true,
        maxRoutes: 5,
        priorityFee: 2,
        blockDeadline: 2,
        failoverEnabled: true
      }
    },
    performanceMetrics: {
      daily: { return: 2.1, trades: 8, winRate: 92, volume: 2000000 },
      weekly: { return: 14.7, trades: 56, winRate: 91, volume: 14000000 },
      monthly: { return: 58.8, trades: 240, winRate: 92, volume: 60000000 },
      bestDay: { date: '2024-03-20', return: 8.5, trades: 3 },
      worstDay: { date: '2024-03-01', return: -0.2, trades: 5 }
    },
    risks: [
      'Smart contract bugs',
      'MEV sandwich attacks',
      'Gas price volatility',
      'Protocol changes',
      'Flashloan provider issues'
    ]
  }
  // Add more strategies as needed...
};

export default function StrategiesFixed() {
  // Theme state
  const [isDark, setIsDark] = useState(true);
  
  // Core state
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [marketData, setMarketData] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [savedConfigs, setSavedConfigs] = useState([]);
  
  // UI state
  const [activeView, setActiveView] = useState('dashboard');
  const [showConfiguration, setShowConfiguration] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showStrategyModal, setShowStrategyModal] = useState(false);
  const [showFlashLoanConfig, setShowFlashLoanConfig] = useState(false);
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [configName, setConfigName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('return');
  const [notifications, setNotifications] = useState([]);
  const [currentRiskScore, setCurrentRiskScore] = useState(0);
  const [expandedMenus, setExpandedMenus] = useState({ strategies: true });
  
  // Market Analysis State
  const [marketCondition, setMarketCondition] = useState('NEUTRAL');
  const [volatility, setVolatility] = useState(0.45);
  const [opportunities, setOpportunities] = useState([]);
  const [liquidityScore, setLiquidityScore] = useState(75);
  const [spreadData, setSpreadData] = useState({ avg: 0.05, min: 0.01, max: 0.15 });
  const [correlations, setCorrelations] = useState({});
  
  // Configuration State
  const [strategyConfig, setStrategyConfig] = useState({});
  const [apiConfig, setApiConfig] = useState({});
  const [riskParams, setRiskParams] = useState({
    maxDrawdown: 15,
    stopLoss: 5,
    takeProfit: 15,
    positionSize: 0.1,
    leverage: 1
  });
  
  // Flash Loan Config State
  const [flashLoanConfig, setFlashLoanConfig] = useState({
    provider: 'Aave',
    minProfit: 100,
    maxGas: 150,
    routes: 5,
    protocols: ['Aave', 'dYdX', 'Uniswap', 'SushiSwap', 'Balancer'],
    simulation: true,
    priorityFee: 2,
    slippage: 0.5
  });
  
  // Performance State
  const [performanceMetrics, setPerformanceMetrics] = useState({
    totalReturn: 0,
    dailyReturn: 0,
    weeklyReturn: 0,
    monthlyReturn: 0,
    totalTrades: 0,
    winningTrades: 0,
    losingTrades: 0,
    avgWin: 0,
    avgLoss: 0,
    sharpeRatio: 0,
    maxDrawdown: 0,
    currentStreak: 0,
    bestStreak: 0,
    worstStreak: 0
  });
  const [tradeHistory, setTradeHistory] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState(10000);
  
  // Simulation State
  const [simulationResults, setSimulationResults] = useState(null);
  const [backtestData, setBacktestData] = useState([]);
  const [simulationProgress, setSimulationProgress] = useState(0);
  
  // Refs
  const wsRef = useRef(null);
  const intervalRef = useRef(null);
  const simulationRef = useRef(null);
  const chartRef = useRef(null);
  const logRef = useRef([]);
  const alertQueueRef = useRef([]);
  
  // Tab configuration
  const [activeTab, setActiveTab] = useState('arbitrage-strategies');
  
  // Theme configuration
  const theme = {
    dark: {
      bg: '#0f172a',
      bgSecondary: '#1e293b',
      bgTertiary: '#1a1a2e',
      text: '#ffffff',
      textSecondary: '#a0a0b8',
      textTertiary: '#707088',
      border: '#2a2a45',
      borderLight: '#333350',
      accent: '#10b981',
      danger: '#ef4444',
      warning: '#f59e0b',
      success: '#10b981',
      info: '#3b82f6',
      hover: '#1e1e35',
      activeTab: '#10b981',
      buttonBg: '#1e293b',
      buttonHover: '#1e1e35',
      inputBg: '#1e293b',
      modalBg: 'rgba(15, 15, 35, 0.95)',
      cardBg: '#1e293b',
      successBg: '#064e3b',
      successText: '#10b981',
      warningBg: '#451a03',
      warningText: '#fbbf24',
      dangerBg: '#450a0a',
      dangerText: '#f87171'
    },
    light: {
      bg: '#ffffff',
      bgSecondary: '#f8f9fa',
      bgTertiary: '#e9ecef',
      text: '#212529',
      textSecondary: '#6c757d',
      textTertiary: '#adb5bd',
      border: '#dee2e6',
      borderLight: '#e9ecef',
      accent: '#0d6efd',
      danger: '#dc3545',
      warning: '#ffc107',
      success: '#198754',
      info: '#0dcaf0',
      hover: '#f8f9fa',
      activeTab: '#0d6efd',
      buttonBg: '#e9ecef',
      buttonHover: '#dee2e6',
      inputBg: '#ffffff',
      modalBg: 'rgba(255, 255, 255, 0.95)',
      cardBg: '#ffffff',
      successBg: '#d1e7dd',
      successText: '#0f5132',
      warningBg: '#fff3cd',
      warningText: '#664d03',
      dangerBg: '#f8d7da',
      dangerText: '#842029'
    }
  };
  
  const currentTheme = isDark ? theme.dark : theme.light;
  
  // Sidebar navigation structure
  const sidebarStructure = [
    {
      id: 'strategies',
      label: 'Strategies',
      icon: Layers,
      expandable: true,
      subItems: [
        {
          id: 'arbitrage-strategies',
          label: 'Arbitrage Strategies',
          icon: Shuffle,
          badge: '2'
        },
        {
          id: 'trading-strategies',
          label: 'Trading Strategies',
          icon: TrendingUp,
          badge: '0'
        },
        {
          id: 'investment-strategies',
          label: 'Investment',
          icon: Wallet,
          badge: '0'
        }
      ]
    },
    {
      id: 'market',
      label: 'Market Analysis',
      icon: BarChart3,
      expandable: false
    },
    {
      id: 'performance',
      label: 'Performance',
      icon: TrendingUp,
      expandable: false
    },
    {
      id: 'risk',
      label: 'Risk Analysis',
      icon: Shield,
      expandable: false
    },
    {
      id: 'simulation',
      label: 'Simulation',
      icon: Timer,
      expandable: false
    },
    {
      id: 'configuration',
      label: 'Configuration',
      icon: Settings,
      expandable: false
    },
    {
      id: 'saved',
      label: 'Saved Configs',
      icon: Save,
      expandable: false
    }
  ];
  
  // Utility functions
  const generateId = () => `strategy_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  const formatPercent = (value) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };
  
  const calculateRiskScore = (strategy, config) => {
    let score = 0;
    if (strategy.riskLevel === 'HIGH' || strategy.riskLevel === 'EXTREME') score += 30;
    if (strategy.riskLevel === 'MEDIUM') score += 15;
    if (config.parameters?.leverage > 2) score += 20;
    if (!config.parameters?.emergencyStop) score += 25;
    if (config.parameters?.maxPositionSize > 0.3) score += 20;
    if (strategy.complexity === 'Expert') score += 10;
    return Math.max(0, Math.min(100, score));
  };
  
  const showNotification = (message, type = 'info', duration = 5000) => {
    const notification = {
      id: generateId(),
      message,
      type,
      timestamp: new Date().toISOString(),
      duration
    };
    
    setNotifications(prev => [...prev, notification]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, duration);
  };
  
  const performMarketAnalysis = useCallback(() => {
    setMarketCondition(['BULLISH', 'BEARISH', 'NEUTRAL', 'VOLATILE'][Math.floor(Math.random() * 4)]);
    setVolatility(Math.random() * 0.8 + 0.2);
    setLiquidityScore(Math.floor(Math.random() * 30) + 70);
    setSpreadData({
      avg: Math.random() * 0.1 + 0.01,
      min: Math.random() * 0.05,
      max: Math.random() * 0.2 + 0.1
    });
    
    const newOpportunities = Object.values(TRADING_STRATEGIES)
      .filter(() => Math.random() > 0.6)
      .slice(0, 5);
    setOpportunities(newOpportunities);
    
    // Generate mock trade history
    const mockTrades = Array(20).fill(null).map((_, i) => ({
      id: generateId(),
      timestamp: new Date(Date.now() - i * 3600000).toISOString(),
      strategy: Object.keys(TRADING_STRATEGIES)[Math.floor(Math.random() * Object.keys(TRADING_STRATEGIES).length)],
      side: Math.random() > 0.5 ? 'BUY' : 'SELL',
      amount: Math.floor(Math.random() * 10000) + 1000,
      price: Math.floor(Math.random() * 50000) + 10000,
      profit: (Math.random() - 0.4) * 1000,
      status: 'COMPLETED'
    }));
    setTradeHistory(mockTrades);
    
    // Update performance metrics
    const totalProfit = mockTrades.reduce((sum, trade) => sum + trade.profit, 0);
    const winningTrades = mockTrades.filter(t => t.profit > 0);
    const losingTrades = mockTrades.filter(t => t.profit < 0);
    
    setPerformanceMetrics({
      totalReturn: (totalProfit / 10000) * 100,
      dailyReturn: (Math.random() - 0.3) * 5,
      weeklyReturn: (Math.random() - 0.2) * 15,
      monthlyReturn: (Math.random() - 0.1) * 30,
      totalTrades: mockTrades.length,
      winningTrades: winningTrades.length,
      losingTrades: losingTrades.length,
      avgWin: winningTrades.length ? winningTrades.reduce((sum, t) => sum + t.profit, 0) / winningTrades.length : 0,
      avgLoss: losingTrades.length ? Math.abs(losingTrades.reduce((sum, t) => sum + t.profit, 0) / losingTrades.length) : 0,
      sharpeRatio: 1.5 + Math.random(),
      maxDrawdown: Math.random() * 20 + 5,
      currentStreak: Math.floor(Math.random() * 10) - 5,
      bestStreak: Math.floor(Math.random() * 15),
      worstStreak: -Math.floor(Math.random() * 10)
    });
    
    // Update portfolio value
    setPortfolioValue(prev => prev + totalProfit);
  }, []);
  
  const handleStrategySelect = (strategyId) => {
    const strategy = TRADING_STRATEGIES[strategyId];
    setSelectedStrategy(strategy);
    setStrategyConfig(strategy.defaultConfig);
    setShowConfiguration(false);
    
    if (strategy.id === 'flash-loan-arbitrage') {
      setShowFlashLoanConfig(true);
    } else {
      setShowStrategyModal(true);
    }
    
    const riskScore = calculateRiskScore(strategy, strategy.defaultConfig);
    setCurrentRiskScore(riskScore);
    setRiskParams({
      ...riskParams,
      riskScore,
      overallRisk: riskScore > 70 ? 'HIGH' : riskScore > 40 ? 'MEDIUM' : 'LOW'
    });
    
    showNotification(`Strategy ${strategy.name} selected`, 'info');
  };
  
  const recalculateRisk = () => {
    if (selectedStrategy && strategyConfig) {
      const riskScore = calculateRiskScore(selectedStrategy, strategyConfig);
      setCurrentRiskScore(riskScore);
      setRiskParams({
        ...riskParams,
        riskScore,
        overallRisk: riskScore > 70 ? 'HIGH' : riskScore > 40 ? 'MEDIUM' : 'LOW'
      });
      showNotification('Risk analysis updated', 'success');
    }
  };
  
  const handleSimulationToggle = () => {
    setIsSimulating(!isSimulating);
    
    if (!isSimulating && selectedStrategy) {
      setSimulationProgress(0);
      simulationRef.current = setInterval(() => {
        setSimulationProgress(prev => {
          if (prev >= 100) {
            clearInterval(simulationRef.current);
            setIsSimulating(false);
            
            const results = {
              totalReturn: Math.random() * 30 - 5,
              winRate: selectedStrategy.winRate + (Math.random() * 10 - 5),
              totalTrades: Math.floor(Math.random() * 500) + 100,
              sharpeRatio: selectedStrategy.sharpeRatio + (Math.random() * 0.5 - 0.25),
              maxDrawdown: selectedStrategy.maxDrawdown + (Math.random() * 5 - 2.5)
            };
            
            setSimulationResults(results);
            showNotification('Simulation completed', 'success');
            return 100;
          }
          return prev + 2;
        });
      }, SIMULATION_SPEED);
    } else {
      if (simulationRef.current) {
        clearInterval(simulationRef.current);
        simulationRef.current = null;
      }
    }
  };
  
  const handleSaveConfiguration = () => {
    if (!configName.trim() || !selectedStrategy) {
      showNotification('Please enter a configuration name', 'warning');
      return;
    }
    
    const newConfig = {
      id: generateId(),
      name: configName,
      strategyId: selectedStrategy.id,
      strategyName: selectedStrategy.name,
      config: strategyConfig,
      riskParams: riskParams,
      createdAt: new Date().toISOString(),
      performance: performanceMetrics
    };
    
    setSavedConfigs(prev => {
      const updated = [...prev, newConfig];
      if (updated.length > MAX_SAVED_STRATEGIES) {
        updated.shift();
      }
      return updated;
    });
    
    setShowSaveDialog(false);
    setConfigName('');
    showNotification('Configuration saved successfully', 'success');
  };
  
  const handleLoadConfiguration = (config) => {
    const strategy = TRADING_STRATEGIES[config.strategyId];
    if (strategy) {
      setSelectedStrategy(strategy);
      setStrategyConfig(config.config);
      setRiskParams(config.riskParams);
      showNotification(`Configuration "${config.name}" loaded`, 'success');
      setActiveTab('arbitrage-strategies');
    }
  };
  
  const handleDeleteConfiguration = (configId) => {
    setSavedConfigs(prev => prev.filter(c => c.id !== configId));
    showNotification('Configuration deleted', 'info');
  };
  
  const toggleMenu = (menuId) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };
  
  // Filter strategies by category
  const getStrategiesByTab = (tabId) => {
    switch (tabId) {
      case 'arbitrage-strategies':
        return Object.values(TRADING_STRATEGIES).filter(s => s.category === 'Arbitrage');
      case 'trading-strategies':
        return Object.values(TRADING_STRATEGIES).filter(s => s.category === 'Trading');
      case 'investment-strategies':
        return Object.values(TRADING_STRATEGIES).filter(s => s.category === 'Investment');
      default:
        return [];
    }
  };
  
  useEffect(() => {
    performMarketAnalysis();
    
    // Set up refresh interval
    intervalRef.current = setInterval(performMarketAnalysis, REFRESH_INTERVAL);
    
    // Load saved configurations from localStorage
    const saved = localStorage.getItem('tradingConfigurations');
    if (saved) {
      try {
        setSavedConfigs(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved configurations');
      }
    }
    
    return () => {
      if (wsRef.current) wsRef.current.close();
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (simulationRef.current) clearInterval(simulationRef.current);
    };
  }, [performMarketAnalysis]);
  
  // Save configurations to localStorage when they change
  useEffect(() => {
    if (savedConfigs.length > 0) {
      localStorage.setItem('tradingConfigurations', JSON.stringify(savedConfigs));
    }
  }, [savedConfigs]);
  
  // Main render - Continued in next part due to length...
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: currentTheme.bg,
      color: currentTheme.text,
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Notifications */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        {notifications.map(notif => (
          <div
            key={notif.id}
            style={{
              padding: '12px 16px',
              backgroundColor: notif.type === 'success' ? currentTheme.successBg :
                notif.type === 'error' ? currentTheme.dangerBg :
                  notif.type === 'warning' ? currentTheme.warningBg :
                    currentTheme.bgSecondary,
              color: notif.type === 'success' ? currentTheme.successText :
                notif.type === 'error' ? currentTheme.dangerText :
                  notif.type === 'warning' ? currentTheme.warningText :
                    currentTheme.text,
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              animation: 'slideIn 0.3s ease-out'
            }}>
            {notif.message}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', height: '100vh' }}>
        {/* Sidebar */}
        <div style={{
          width: '250px',
          backgroundColor: currentTheme.bgSecondary,
          borderRight: `1px solid ${currentTheme.border}`,
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Logo/Header */}
          <div style={{
            padding: '24px',
            borderBottom: `1px solid ${currentTheme.border}`
          }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: '700',
              color: currentTheme.text,
              marginBottom: '4px'
            }}>
              Trading Strategies
            </h2>
            <p style={{
              fontSize: '12px',
              color: currentTheme.textSecondary
            }}>
              Enterprise System v3.0
            </p>
          </div>

          {/* Navigation Items */}
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
            {sidebarStructure.map(item => {
              const Icon = item.icon;
              const isExpanded = expandedMenus[item.id];

              return (
                <div key={item.id}>
                  <button
                    onClick={() => {
                      if (item.expandable) {
                        toggleMenu(item.id);
                      } else {
                        setActiveTab(item.id);
                      }
                    }}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      marginBottom: '4px',
                      backgroundColor: (!item.expandable && activeTab === item.id) ? currentTheme.hover : 'transparent',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      color: (!item.expandable && activeTab === item.id) ? currentTheme.accent : currentTheme.textSecondary,
                      fontSize: '14px',
                      fontWeight: (!item.expandable && activeTab === item.id) ? '600' : '400',
                      transition: 'all 0.2s ease',
                      textAlign: 'left'
                    }}
                  >
                    {item.expandable && (
                      isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                    )}
                    <Icon size={18} />
                    {item.label}
                  </button>

                  {item.expandable && isExpanded && item.subItems && (
                    <div style={{ marginLeft: '20px', marginBottom: '8px' }}>
                      {item.subItems.map(subItem => {
                        const SubIcon = subItem.icon;
                        return (
                          <button
                            key={subItem.id}
                            onClick={() => setActiveTab(subItem.id)}
                            style={{
                              width: '100%',
                              padding: '10px 16px',
                              marginBottom: '2px',
                              backgroundColor: activeTab === subItem.id ? currentTheme.hover : 'transparent',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              color: activeTab === subItem.id ? currentTheme.accent : currentTheme.textSecondary,
                              fontSize: '13px',
                              fontWeight: activeTab === subItem.id ? '600' : '400',
                              transition: 'all 0.2s ease',
                              textAlign: 'left'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <SubIcon size={16} />
                              {subItem.label}
                            </div>
                            {subItem.badge && (
                              <span style={{
                                padding: '2px 6px',
                                backgroundColor: currentTheme.accent + '20',
                                color: currentTheme.accent,
                                borderRadius: '10px',
                                fontSize: '10px',
                                fontWeight: '600'
                              }}>
                                {subItem.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Deploy Button at bottom of sidebar */}
          <div style={{ padding: '16px' }}>
            <button
              onClick={() => {
                if (selectedStrategy && strategyConfig) {
                  setShowDeployModal(true);
                } else {
                  showNotification('Please select and configure a strategy first', 'warning');
                }
              }}
              style={{
                width: '100%',
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Rocket size={16} />
              Deploy Strategy
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          backgroundColor: currentTheme.bg
        }}>
          {/* Strategy Tabs Content */}
          {['arbitrage-strategies', 'trading-strategies', 'investment-strategies'].includes(activeTab) && (
            <div style={{ padding: '32px' }}>
              <div style={{ marginBottom: '32px' }}>
                <h1 style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: currentTheme.text
                }}>
                  {activeTab === 'arbitrage-strategies' ? 'Arbitrage Strategies' :
                    activeTab === 'trading-strategies' ? 'Trading Strategies' :
                      'Investment Strategies'}
                </h1>
              </div>

              {/* Strategy Cards Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
                gap: '20px'
              }}>
                {getStrategiesByTab(activeTab).map(strategy => (
                  <div
                    key={strategy.id}
                    onClick={() => handleStrategySelect(strategy.id)}
                    style={{
                      padding: '20px',
                      backgroundColor: currentTheme.cardBg,
                      borderRadius: '12px',
                      border: `2px solid ${selectedStrategy?.id === strategy.id ? currentTheme.accent : currentTheme.border}`,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      boxShadow: selectedStrategy?.id === strategy.id ? `0 0 20px ${currentTheme.accent}40` : 'none'
                    }}
                  >
                    {/* Premium Badge for Flash Loan */}
                    {strategy.isPremium && (
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        padding: '4px 8px',
                        backgroundColor: '#fbbf24',
                        color: '#000',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <Zap size={12} />
                        PREMIUM
                      </div>
                    )}

                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: currentTheme.text,
                      marginBottom: '8px',
                      marginTop: strategy.isPremium ? '24px' : '0'
                    }}>
                      {strategy.name}
                    </h3>

                    <p style={{
                      fontSize: '14px',
                      color: currentTheme.textSecondary,
                      marginBottom: '16px',
                      lineHeight: '1.5'
                    }}>
                      {strategy.description}
                    </p>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '12px',
                      paddingTop: '16px',
                      borderTop: `1px solid ${currentTheme.border}`
                    }}>
                      <div>
                        <span style={{ fontSize: '12px', color: currentTheme.textTertiary }}>Expected Return</span>
                        <div style={{ fontSize: '16px', fontWeight: '600', color: currentTheme.success }}>
                          {strategy.expectedReturn}
                        </div>
                      </div>
                      <div>
                        <span style={{ fontSize: '12px', color: currentTheme.textTertiary }}>Win Rate</span>
                        <div style={{ fontSize: '16px', fontWeight: '600', color: currentTheme.info }}>
                          {strategy.winRate}%
                        </div>
                      </div>
                      <div>
                        <span style={{ fontSize: '12px', color: currentTheme.textTertiary }}>Risk Level</span>
                        <div style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          color: RISK_LEVELS[strategy.riskLevel].color
                        }}>
                          {strategy.riskLevel}
                        </div>
                      </div>
                      <div>
                        <span style={{ fontSize: '12px', color: currentTheme.textTertiary }}>Capital Required</span>
                        <div style={{ fontSize: '16px', fontWeight: '600', color: currentTheme.text }}>
                          {strategy.capitalRequired}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other tabs - placeholder content for now */}
          {!['arbitrage-strategies', 'trading-strategies', 'investment-strategies'].includes(activeTab) && (
            <div style={{ padding: '32px' }}>
              <h1 style={{ fontSize: '28px', fontWeight: '700', color: currentTheme.text, marginBottom: '32px' }}>
                {sidebarStructure.find(item => item.id === activeTab)?.label || activeTab}
              </h1>
              <div style={{
                padding: '60px',
                backgroundColor: currentTheme.cardBg,
                borderRadius: '12px',
                border: `1px solid ${currentTheme.border}`,
                textAlign: 'center'
              }}>
                <p style={{ fontSize: '16px', color: currentTheme.textSecondary }}>
                  Content for {activeTab} will be displayed here
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Deployment Modal */}
      <DeploymentModal
        isOpen={showDeployModal}
        onClose={() => setShowDeployModal(false)}
        strategy={selectedStrategy}
        configuration={strategyConfig}
        riskParams={riskParams}
        currentTheme={currentTheme}
      />

      {/* CSS Animations */}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}