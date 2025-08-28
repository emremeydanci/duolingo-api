import React, { useState, useEffect, useMemo } from 'react';
import { 
  Shield, Zap, Activity, TrendingUp, AlertCircle, Lock, 
  CheckCircle, XCircle, Info, Star, ArrowUpRight, ArrowDownRight,
  DollarSign, Target, Timer, Grid3X3, Link, Sparkles, 
  BarChart3, PieChart, TrendingDown, Brain, Cpu, 
  Settings, Play, Pause, RefreshCw, Save, Download,
  Eye, EyeOff, Bell, Filter, Search, ChevronRight,
  ArrowLeft, Plus, Minus, Copy, Share2, HelpCircle,
  BookOpen, Layers, GitBranch, Shuffle, Server,
  X, ChartBar, Clock
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsChart,
  Pie,
  Cell
} from 'recharts';

// Tabs Component
const Tabs = ({ children, value, onValueChange, className }) => {
  const [activeTab, setActiveTab] = useState(value);
  
  useEffect(() => {
    if (value !== undefined) {
      setActiveTab(value);
    }
  }, [value]);
  
  const handleTabChange = (newValue) => {
    setActiveTab(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };
  
  const tabsChildren = React.Children.toArray(children);
  const tabsList = tabsChildren.find(child => child.type === TabsList);
  const tabsContents = tabsChildren.filter(child => child.type === TabsContent);
  
  return (
    <div className={className}>
      {React.cloneElement(tabsList, { activeTab, setActiveTab: handleTabChange })}
      {tabsContents.map(content => 
        React.cloneElement(content, { activeTab })
      )}
    </div>
  );
};

const TabsList = ({ children, className, activeTab, setActiveTab }) => {
  return (
    <div className={`flex space-x-1 border-b border-gray-700 ${className || ''}`}>
      {React.Children.map(children, child =>
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
};

const TabsTrigger = ({ value, children, activeTab, setActiveTab }) => {
  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 text-sm font-medium transition-colors ${
        activeTab === value
          ? 'text-blue-500 border-b-2 border-blue-500'
          : 'text-gray-400 hover:text-white'
      }`}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ value, children, activeTab, className }) => {
  if (activeTab !== value) return null;
  return <div className={className}>{children}</div>;
};

const TradingStrategies = () => {
  // State Management
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [securityLevel, setSecurityLevel] = useState('high');
  const [darkMode, setDarkMode] = useState(true);
  const [showAdvancedMetrics, setShowAdvancedMetrics] = useState(false);
  const [authRequired, setAuthRequired] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSimulation, setShowSimulation] = useState(false);
  const [showConfiguration, setShowConfiguration] = useState(false);
  const [riskTolerance, setRiskTolerance] = useState('moderate');
  const [configChanged, setConfigChanged] = useState(false);
  const [savedConfigs, setSavedConfigs] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEducationalMode, setIsEducationalMode] = useState(false);
  const [activeEducationalSection, setActiveEducationalSection] = useState('overview');
  const [isBacktestModalOpen, setIsBacktestModalOpen] = useState(false);
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);
  const [copyTargetPortfolio, setCopyTargetPortfolio] = useState('');
  const [copyScaleFactor, setCopyScaleFactor] = useState(1);
  const [backtestResults, setBacktestResults] = useState(null);
  
  // Configuration State
  const [config, setConfig] = useState({
    exchanges: [],
    capital: 10000,
    riskLevel: 0.02,
    stopLoss: 5,
    takeProfit: 10,
    maxPositions: 3,
    leverage: 1,
    timeframe: '15m',
    autoCompound: false,
    gasLimit: 300000,
    slippage: 0.5
  });

  // Theme Configuration
  const currentTheme = darkMode ? {
    bg: '#0f172a',
    cardBg: '#1e293b',
    text: '#f1f5f9',
    textSecondary: '#cbd5e1',
    textTertiary: '#94a3b8',
    border: '#334155',
    success: '#10b981',
    danger: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
    purple: '#8b5cf6'
  } : {
    bg: '#f8fafc',
    cardBg: '#ffffff',
    text: '#1e293b',
    textSecondary: '#475569',
    textTertiary: '#64748b',
    border: '#e2e8f0',
    success: '#059669',
    danger: '#dc2626',
    warning: '#d97706',
    info: '#2563eb',
    purple: '#7c3aed'
  };

  // Strategy Data
  const strategies = [
    // CEX Arbitrage Strategies
    {
      id: 1,
      category: 'arbitrage',
      name: 'Triangular CEX Arbitrage Pro',
      description: 'Multi-exchange triangular arbitrage with ML-based prediction',
      detailedDescription: 'Advanced triangular arbitrage across Binance, OKX, and Bybit with machine learning price prediction and automatic risk management.',
      howItWorks: 'This strategy monitors price discrepancies across three trading pairs simultaneously (e.g., BTC/USDT → ETH/BTC → ETH/USDT). When a profitable triangular opportunity is detected with sufficient margin after fees, the bot executes all three trades in rapid succession. ML algorithms predict price movements 2-3 seconds ahead to improve success rate.',
      icon: <Zap size={20} />,
      color: '#f59e0b',
      apy: '89-156%',
      risk: 'Medium',
      minCapital: 10000,
      winRate: 78,
      isRecommended: true,
      keyFeatures: ['ML Prediction', 'Auto-hedging', 'Multi-exchange', 'Risk management'],
      requiredExchanges: ['Binance', 'OKX', 'Bybit'],
      defaultConfig: { exchanges: ['Binance', 'OKX', 'Bybit'], capital: 10000, leverage: 1, stopLoss: 3 },
      performance: { 
        daily: { min: 89, avg: 122, max: 156 },
        weekly: { min: 623, avg: 854, max: 1092 },
        monthly: { min: 2670, avg: 3660, max: 4680 },
        totalReturn: 24.5,
        sharpeRatio: 1.82,
        maxDrawdown: 8.3
      }
    },
    {
      id: 2,
      category: 'arbitrage',
      name: 'Statistical Arbitrage Bot',
      description: 'Pairs trading using statistical correlation analysis',
      detailedDescription: 'Identifies and trades on mean-reverting price relationships between correlated assets.',
      howItWorks: 'Analyzes historical price correlations between asset pairs (e.g., BTC/ETH). When the price ratio deviates significantly from its historical mean, the strategy goes long on the undervalued asset and short on the overvalued one, profiting when prices revert to their mean relationship. Uses z-score calculations and Kalman filters for signal generation.',
      icon: <BarChart3 size={20} />,
      color: '#22c55e',
      apy: '65-110%',
      risk: 'Low-Medium',
      minCapital: 15000,
      winRate: 72,
      keyFeatures: ['Correlation analysis', 'Mean reversion', 'Hedged positions', 'Z-score signals'],
      requiredExchanges: ['Binance', 'Kraken'],
      defaultConfig: { exchanges: ['Binance', 'Kraken'], capital: 15000, leverage: 2, stopLoss: 4 },
      performance: { 
        daily: { min: 65, avg: 87, max: 110 },
        weekly: { min: 455, avg: 609, max: 770 },
        monthly: { min: 1950, avg: 2610, max: 3300 },
        totalReturn: 18.2,
        sharpeRatio: 1.45,
        maxDrawdown: 12.3
      }
    },
    {
      id: 3,
      category: 'arbitrage',
      name: 'Latency Arbitrage Master',
      description: 'Ultra-fast arbitrage exploiting price feed delays',
      detailedDescription: 'Leverages microsecond execution speed to capture price discrepancies.',
      howItWorks: 'Uses collocated servers near exchange data centers to receive price feeds milliseconds before retail traders. When detecting price updates on one exchange, immediately executes trades on slower exchanges before their prices adjust. Requires professional infrastructure with sub-10ms latency.',
      icon: <Server size={20} />,
      color: '#ef4444',
      apy: '156-380%',
      risk: 'High',
      minCapital: 50000,
      winRate: 81,
      isNew: true,
      keyFeatures: ['Ultra-low latency', 'Colocated servers', 'HFT infrastructure', 'Price feed analysis'],
      requiredExchanges: ['Binance', 'Coinbase', 'Gemini'],
      defaultConfig: { exchanges: ['Binance', 'Coinbase', 'Gemini'], capital: 50000, leverage: 3, stopLoss: 2 },
      performance: { 
        daily: { min: 156, avg: 268, max: 380 },
        weekly: { min: 1092, avg: 1876, max: 2660 },
        monthly: { min: 4680, avg: 8040, max: 11400 },
        totalReturn: 32.5,
        sharpeRatio: 2.1,
        maxDrawdown: 6.5
      }
    },
    // DEX Arbitrage Strategies
    {
      id: 4,
      category: 'dex-arbitrage',
      name: 'Cross-Chain DEX Arbitrage',
      description: 'Automated arbitrage across Ethereum, BSC, and Arbitrum DEXs',
      detailedDescription: 'Sophisticated cross-chain arbitrage utilizing bridges and multiple DEXs with gas optimization.',
      howItWorks: 'Monitors price differences for the same token across different blockchain DEXs. When profitable opportunities arise (after accounting for gas and bridge fees), executes buy on the cheaper DEX, bridges tokens to the target chain, and sells on the expensive DEX. Uses smart contracts for atomic execution.',
      icon: <Link size={20} />,
      color: '#3b82f6',
      apy: '124-287%',
      risk: 'High',
      minCapital: 50000,
      winRate: 71,
      isNew: true,
      keyFeatures: ['Cross-chain', 'Gas optimization', 'MEV protection', 'Bridge integration'],
      requiredExchanges: ['Uniswap', 'PancakeSwap', 'SushiSwap'],
      defaultConfig: { exchanges: ['Uniswap', 'PancakeSwap'], capital: 50000, gasLimit: 500000, slippage: 1 },
      performance: { 
        daily: { min: 124, avg: 205, max: 287 },
        weekly: { min: 868, avg: 1435, max: 2009 },
        monthly: { min: 3720, avg: 6150, max: 8610 },
        totalReturn: 28.7,
        sharpeRatio: 1.95,
        maxDrawdown: 9.2
      }
    },
    {
      id: 5,
      category: 'dex-arbitrage',
      name: 'MEV Sandwich Bot',
      description: 'Front-running large DEX trades for guaranteed profits',
      detailedDescription: 'Advanced MEV strategy that identifies and sandwiches large pending transactions.',
      howItWorks: 'Scans the mempool for large pending DEX trades. When detected, submits two transactions: one buying before the target trade (with higher gas to ensure priority) and one selling after. The large trade moves the price, guaranteeing profit on the sandwich. Requires MEV infrastructure and flashbots integration.',
      icon: <Layers size={20} />,
      color: '#a855f7',
      apy: '180-450%',
      risk: 'Very High',
      minCapital: 100000,
      winRate: 68,
      keyFeatures: ['Mempool scanning', 'Flashbots', 'Gas bidding', 'Sandwich attacks'],
      requiredExchanges: ['Uniswap V3', 'Balancer'],
      defaultConfig: { exchanges: ['Uniswap V3'], capital: 100000, gasLimit: 800000, slippage: 2 },
      performance: { 
        daily: { min: 180, avg: 315, max: 450 },
        weekly: { min: 1260, avg: 2205, max: 3150 },
        monthly: { min: 5400, avg: 9450, max: 13500 },
        totalReturn: 45.0,
        sharpeRatio: 2.5,
        maxDrawdown: 15.3
      }
    },
    {
      id: 6,
      category: 'dex-arbitrage',
      name: 'Liquidation Hunter',
      description: 'Captures DeFi lending protocol liquidation bonuses',
      detailedDescription: 'Monitors lending protocols for underwater positions and executes profitable liquidations.',
      howItWorks: 'Continuously monitors DeFi lending protocols (Aave, Compound, MakerDAO) for positions approaching liquidation threshold. When a position becomes liquidatable, instantly executes the liquidation to claim the liquidation bonus (typically 5-15%). Uses flash loans for capital efficiency.',
      icon: <GitBranch size={20} />,
      color: '#dc2626',
      apy: '95-220%',
      risk: 'Medium-High',
      minCapital: 30000,
      winRate: 74,
      keyFeatures: ['Health monitoring', 'Flash loans', 'Multi-protocol', 'Gas optimization'],
      requiredExchanges: ['Aave', 'Compound', 'MakerDAO'],
      defaultConfig: { exchanges: ['Aave', 'Compound'], capital: 30000, gasLimit: 600000, slippage: 1.5 },
      performance: { 
        daily: { min: 95, avg: 157, max: 220 },
        weekly: { min: 665, avg: 1099, max: 1540 },
        monthly: { min: 2850, avg: 4710, max: 6600 },
        totalReturn: 22.0,
        sharpeRatio: 1.75,
        maxDrawdown: 10.5
      }
    },
    // Flash Loan Strategies
    {
      id: 7,
      category: 'flash-loan',
      name: 'Flash Loan Arbitrage Master',
      description: 'Zero-capital arbitrage using Aave & Compound flash loans',
      detailedDescription: 'Execute profitable trades without initial capital using flash loans from multiple protocols.',
      howItWorks: 'Borrows large amounts (up to $100M+) from flash loan protocols without collateral, executes profitable arbitrage trades across DEXs/CEXs, and repays the loan plus fees in the same transaction. If any step fails, the entire transaction reverts, ensuring zero risk of loss (only gas fees).',
      icon: <Sparkles size={20} />,
      color: '#8b5cf6',
      apy: '215-892%',
      risk: 'Very High',
      minCapital: 0,
      winRate: 62,
      flashLoanEnabled: true,
      keyFeatures: ['Zero capital', 'Multi-protocol', 'Auto-execution', 'Smart routing'],
      requiredExchanges: ['Aave', 'Compound', 'dYdX'],
      defaultConfig: { exchanges: ['Aave', 'Compound'], capital: 0, gasLimit: 1000000, slippage: 0.5 },
      performance: { 
        daily: { min: 215, avg: 553, max: 892 },
        weekly: { min: 1505, avg: 3871, max: 6244 },
        monthly: { min: 6450, avg: 16590, max: 26760 },
        totalReturn: 89.2,
        sharpeRatio: 3.2,
        maxDrawdown: 18.5
      }
    },
    // Market Making Strategies
    {
      id: 8,
      category: 'market-making',
      name: 'Advanced Market Making Bot',
      description: 'Professional market making with dynamic spread adjustment',
      detailedDescription: 'Institutional-grade market making with inventory management and dynamic pricing.',
      howItWorks: 'Places limit orders on both sides of the order book, earning the spread between bid and ask prices. Dynamically adjusts spreads based on volatility, inventory levels, and market conditions. Uses sophisticated inventory management to minimize directional risk while maximizing spread capture.',
      icon: <Activity size={20} />,
      color: '#10b981',
      apy: '45-78%',
      risk: 'Low-Medium',
      minCapital: 25000,
      winRate: 84,
      keyFeatures: ['Inventory management', 'Dynamic spreads', 'Order clustering', 'Risk limits'],
      requiredExchanges: ['Binance', 'FTX', 'Kraken'],
      defaultConfig: { exchanges: ['Binance'], capital: 25000, maxPositions: 5, leverage: 1 },
      performance: { 
        daily: { min: 45, avg: 61, max: 78 },
        weekly: { min: 315, avg: 427, max: 546 },
        monthly: { min: 1350, avg: 1830, max: 2340 },
        totalReturn: 7.8,
        sharpeRatio: 1.35,
        maxDrawdown: 4.2
      }
    },
    {
      id: 9,
      category: 'market-making',
      name: 'Options Market Maker',
      description: 'Automated options market making with delta hedging',
      detailedDescription: 'Provides liquidity in options markets while managing Greeks exposure.',
      howItWorks: 'Quotes bid/ask prices for options contracts using Black-Scholes pricing models. Continuously delta-hedges the portfolio by trading the underlying asset to remain market-neutral. Profits from bid-ask spreads and volatility arbitrage while minimizing directional risk.',
      icon: <PieChart size={20} />,
      color: '#0ea5e9',
      apy: '58-95%',
      risk: 'Medium',
      minCapital: 40000,
      winRate: 79,
      keyFeatures: ['Greeks management', 'Delta hedging', 'Vol arbitrage', 'Black-Scholes'],
      requiredExchanges: ['Deribit', 'Binance Options'],
      defaultConfig: { exchanges: ['Deribit'], capital: 40000, maxPositions: 8, leverage: 2 },
      performance: { 
        daily: { min: 58, avg: 76, max: 95 },
        weekly: { min: 406, avg: 532, max: 665 },
        monthly: { min: 1740, avg: 2280, max: 2850 },
        totalReturn: 9.5,
        sharpeRatio: 1.55,
        maxDrawdown: 5.8
      }
    },
    // Grid Trading Strategies
    {
      id: 10,
      category: 'grid',
      name: 'AI-Powered Grid Trading',
      description: 'Adaptive grid trading with AI-based range prediction',
      detailedDescription: 'Next-generation grid trading using artificial intelligence for optimal grid placement.',
      howItWorks: 'Places a grid of buy and sell orders within a predicted price range. AI models analyze market conditions to dynamically adjust grid parameters (range, spacing, order size). Profits from market volatility as price oscillates through the grid levels, automatically buying low and selling high.',
      icon: <Grid3X3 size={20} />,
      color: '#06b6d4',
      apy: '67-125%',
      risk: 'Medium',
      minCapital: 5000,
      winRate: 76,
      keyFeatures: ['AI optimization', 'Auto-rebalancing', 'Range prediction', 'Volatility adaptation'],
      requiredExchanges: ['Binance Futures', 'Bybit'],
      defaultConfig: { exchanges: ['Binance Futures'], capital: 5000, leverage: 2, maxPositions: 10 },
      performance: { 
        daily: { min: 67, avg: 96, max: 125 },
        weekly: { min: 469, avg: 672, max: 875 },
        monthly: { min: 2010, avg: 2880, max: 3750 },
        totalReturn: 12.5,
        sharpeRatio: 1.65,
        maxDrawdown: 7.3
      }
    },
    // Directional Trading Strategy
    {
      id: 11,
      category: 'directional',
      name: 'Momentum Breakout Scanner',
      description: 'High-frequency momentum trading on breakout patterns',
      detailedDescription: 'Identifies and trades strong momentum breakouts using technical analysis and volume confirmation.',
      howItWorks: 'Scans hundreds of trading pairs for breakout patterns (triangles, channels, flags). When price breaks key resistance with high volume, enters long positions with tight stop losses. Uses trailing stops to capture extended moves while protecting profits. Combines multiple timeframe analysis for higher probability setups.',
      icon: <TrendingUp size={20} />,
      color: '#f97316',
      apy: '85-245%',
      risk: 'Medium-High',
      minCapital: 8000,
      winRate: 65,
      keyFeatures: ['Pattern recognition', 'Volume analysis', 'Multi-timeframe', 'Trailing stops'],
      requiredExchanges: ['Binance Futures', 'Bybit'],
      defaultConfig: { exchanges: ['Binance Futures'], capital: 8000, leverage: 3, stopLoss: 5 },
      performance: { 
        daily: { min: 85, avg: 165, max: 245 },
        weekly: { min: 595, avg: 1155, max: 1715 },
        monthly: { min: 2550, avg: 4950, max: 7350 },
        totalReturn: 24.5,
        sharpeRatio: 1.85,
        maxDrawdown: 11.2
      }
    }
  ];

  // Categories
  const categories = [
    { id: 'all', name: 'Tümü', icon: <Grid3X3 size={14} />, count: strategies.length },
    { id: 'arbitrage', name: 'CEX Arbitraj', icon: <Zap size={14} />, count: 3 },
    { id: 'dex-arbitrage', name: 'DEX Arbitraj', icon: <Link size={14} />, count: 3, badge: 'YENİ' },
    { id: 'flash-loan', name: 'Flash Loan', icon: <Sparkles size={14} />, count: 1, badge: 'HOT' },
    { id: 'market-making', name: 'Market Making', icon: <Activity size={14} />, count: 2 },
    { id: 'grid', name: 'Grid Trading', icon: <Grid3X3 size={14} />, count: 1 },
    { id: 'directional', name: 'Yönelimli', icon: <TrendingUp size={14} />, count: 1 }
  ];

  // Market Metrics
  const marketMetrics = {
    volatility: { value: 67, trend: 'up', change: '+12%' },
    liquidity: { value: 8.9, trend: 'stable', change: '+0.3' },
    opportunities: { value: 243, trend: 'up', change: '+34' },
    correlation: { value: 0.73, trend: 'down', change: '-0.08' },
    spread: { value: '0.12%', trend: 'stable', change: '-0.01%' }
  };

  // Performance Data for Charts
  const performanceData = [
    { date: 'Oca 01', value: 10000 },
    { date: 'Oca 05', value: 10450 },
    { date: 'Oca 10', value: 11200 },
    { date: 'Oca 15', value: 10800 },
    { date: 'Oca 20', value: 11500 },
    { date: 'Oca 25', value: 12450 }
  ];

  // Helper Functions
  const calculateRiskMetrics = (strategy, customConfig = null) => {
    const cfg = customConfig || config;
    const baseRisk = strategy.risk === 'Low' ? 20 : 
                    strategy.risk === 'Low-Medium' ? 30 :
                    strategy.risk === 'Medium' ? 45 : 
                    strategy.risk === 'Medium-High' ? 60 :
                    strategy.risk === 'High' ? 70 : 85;
    
    const leverageMultiplier = 1 + (cfg.leverage - 1) * 0.2;
    const adjustedRisk = Math.min(100, baseRisk * leverageMultiplier);
    
    return {
      overallScore: adjustedRisk,
      var: (cfg.capital * (adjustedRisk / 100) * 0.05).toFixed(0),
      maxDrawdown: `${(adjustedRisk * 0.4).toFixed(1)}%`,
      sharpeRatio: ((100 - adjustedRisk) / 20).toFixed(2),
      sortinoRatio: ((100 - adjustedRisk) / 25).toFixed(2),
      calmarRatio: ((100 - adjustedRisk) / 30).toFixed(2),
      categories: {
        liquidity: Math.min(100, adjustedRisk - 10),
        operational: adjustedRisk,
        regulatory: Math.min(100, adjustedRisk + 5),
        technical: Math.max(0, adjustedRisk - 5)
      }
    };
  };

  const getSimulationData = (strategy, customConfig = null) => {
    const cfg = customConfig || config;
    const avgAPY = parseInt(strategy.apy.split('-')[1]);
    const leverageMultiplier = cfg.leverage || 1;
    
    return {
      bestCase: {
        profit: (cfg.capital * avgAPY * leverageMultiplier * 1.5 / 100 / 12).toFixed(0),
        probability: 25,
        description: 'Optimal market conditions'
      },
      expected: {
        profit: (cfg.capital * avgAPY * leverageMultiplier / 100 / 12).toFixed(0),
        probability: 60,
        description: 'Normal market conditions'
      },
      worstCase: {
        profit: -(cfg.capital * (cfg.stopLoss || 10) / 100).toFixed(0),
        probability: 15,
        description: 'Adverse market conditions'
      },
      fees: {
        exchange: (cfg.capital * 0.001 * 30).toFixed(0),
        gas: strategy.category.includes('dex') ? (cfg.gasLimit * 0.00003 * 30).toFixed(0) : 0,
        slippage: (cfg.capital * (cfg.slippage || 0.5) / 100).toFixed(0)
      }
    };
  };

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'Low': return currentTheme.success;
      case 'Low-Medium': return '#86efac';
      case 'Medium': return currentTheme.warning;
      case 'Medium-High': return '#fb923c';
      case 'High': return '#fb923c';
      case 'Very High': return currentTheme.danger;
      default: return currentTheme.textSecondary;
    }
  };

  // Filter Strategies
  const filteredStrategies = strategies.filter(s => {
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handlers
  const handleStrategySelect = (strategy) => {
    setConfig({
      ...config,
      ...strategy.defaultConfig,
      capital: strategy.minCapital || 10000
    });
    
    if (securityLevel === 'high' && strategy.risk === 'Very High') {
      setAuthRequired(true);
      setTimeout(() => {
        setAuthRequired(false);
        setSelectedStrategy(strategy);
        setShowAdvancedMetrics(true);
      }, 2000);
    } else {
      setSelectedStrategy(strategy);
      setShowAdvancedMetrics(true);
    }
  };

  const handleConfigChange = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
    setConfigChanged(true);
  };

  const saveConfiguration = () => {
    const configName = `${selectedStrategy.name}_${new Date().toISOString().split('T')[0]}_${savedConfigs.length + 1}`;
    setSavedConfigs([...savedConfigs, { name: configName, config: { ...config }, strategy: selectedStrategy.id }]);
    setConfigChanged(false);
    alert(`Configuration saved as: ${configName}`);
  };

  const handleBacktest = (strategy) => {
    setSelectedStrategy(strategy);
    setIsBacktestModalOpen(true);
    // Simulate backtest results
    setTimeout(() => {
      setBacktestResults({
        totalReturn: strategy.performance.totalReturn,
        sharpeRatio: strategy.performance.sharpeRatio,
        maxDrawdown: strategy.performance.maxDrawdown,
        winRate: strategy.winRate,
        equityCurve: performanceData
      });
    }, 1000);
  };

  const handleCopyStrategy = (strategy) => {
    setSelectedStrategy(strategy);
    setIsCopyModalOpen(true);
  };

  // Educational Content
  const renderEducationalContent = () => {
    const styles = {
      section: {
        padding: '20px',
        backgroundColor: '#f9fafb',
        borderRadius: '8px'
      },
      sectionTitle: {
        fontSize: '20px',
        fontWeight: '700',
        marginBottom: '16px',
        color: '#1f2937'
      },
      card: {
        backgroundColor: 'white',
        padding: '16px',
        borderRadius: '8px',
        marginBottom: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      },
      infoCard: {
        backgroundColor: '#dbeafe',
        padding: '12px',
        borderRadius: '6px',
        marginBottom: '16px',
        borderLeft: '4px solid #3b82f6'
      },
      warningCard: {
        backgroundColor: '#fef3c7',
        padding: '12px',
        borderRadius: '6px',
        marginBottom: '16px',
        borderLeft: '4px solid #f59e0b'
      },
      successCard: {
        backgroundColor: '#d1fae5',
        padding: '12px',
        borderRadius: '6px',
        marginBottom: '16px',
        borderLeft: '4px solid #10b981'
      }
    };

    const educationalSections = [
      { id: 'overview', name: 'Genel Bakış' },
      { id: 'selection', name: 'Strateji Seçimi' },
      { id: 'marketmaking', name: 'Market Making' },
      { id: 'arbitrage', name: 'Arbitraj' },
      { id: 'grid', name: 'Grid Trading' },
      { id: 'parameters', name: 'Parametreler' },
      { id: 'optimization', name: 'Optimizasyon' }
    ];

    const educationalContent = {
      overview: (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Trading Stratejileri - Genel Bakış</h2>
          
          <div style={styles.card}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>Strateji Nedir?</h3>
            <p style={{ lineHeight: '1.6', marginBottom: '12px' }}>
              Trading stratejisi, piyasada ne zaman ve nasıl işlem yapacağınızı belirleyen kurallardır. 
              Tıpkı bir yemek tarifi gibi, hangi malzemeleri (parametreler) kullanacağınızı ve 
              hangi adımları (algoritmalar) izleyeceğinizi tanımlar.
            </p>
          </div>

          <div style={styles.infoCard}>
            <strong>💡 İpucu:</strong> Trading stratejileri işlem kararlarınızı otomatikleştirerek 
            duygusal faktörleri azaltır ve tutarlı sonuçlar elde etmenizi sağlar.
          </div>
        </div>
      ),
      selection: (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Strateji Seçimi</h2>
          
          <div style={styles.card}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>Doğru Stratejiyi Nasıl Seçerim?</h3>
            
            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#10b981' }}>
                1. Risk Toleransınız
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, marginLeft: '16px' }}>
                <li>• Düşük Risk: DCA, Grid Trading</li>
                <li>• Orta Risk: Market Making</li>
                <li>• Yüksek Risk: Arbitraj, Leverage Trading</li>
              </ul>
            </div>
          </div>

          <div style={styles.warningCard}>
            <strong>⚠️ Uyarı:</strong> Hiçbir strateji %100 kar garantisi vermez. 
            Her zaman risk yönetimi kurallarına uyun.
          </div>
        </div>
      )
    };

    return (
      <div className="bg-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Eğitim Merkezi</h2>
          <button
            onClick={() => setIsEducationalMode(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex gap-2 flex-wrap mb-6">
          {educationalSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveEducationalSection(section.id)}
              className={`px-4 py-2 rounded transition-colors ${
                activeEducationalSection === section.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {section.name}
            </button>
          ))}
        </div>

        {educationalContent[activeEducationalSection]}
      </div>
    );
  };

  // Render Details Panel
  const renderDetailsPanel = () => {
    if (!selectedStrategy) return null;

    const metrics = calculateRiskMetrics(selectedStrategy, config);
    const simulation = getSimulationData(selectedStrategy, config);

    return (
      <div style={{ backgroundColor: currentTheme.cardBg, borderRadius: '12px', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
            <button
              onClick={() => {
                setSelectedStrategy(null);
                setShowConfiguration(false);
                setConfigChanged(false);
              }}
              style={{
                padding: '8px',
                backgroundColor: currentTheme.bg,
                border: `1px solid ${currentTheme.border}`,
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 8px 0' }}>
                {selectedStrategy.name}
              </h2>
              <p style={{ color: currentTheme.textSecondary, margin: 0 }}>
                {selectedStrategy.detailedDescription}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setShowSimulation(!showSimulation)}
              style={{
                padding: '8px 16px',
                backgroundColor: currentTheme.info,
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Play size={16} />
              Run Simulation
            </button>
            <button
              onClick={() => setShowConfiguration(!showConfiguration)}
              style={{
                padding: '8px 16px',
                backgroundColor: showConfiguration ? currentTheme.warning : currentTheme.success,
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Settings size={16} />
              {showConfiguration ? 'Hide Config' : 'Configure'}
            </button>
            {configChanged && (
              <button
                onClick={saveConfiguration}
                style={{
                  padding: '8px 16px',
                  backgroundColor: currentTheme.purple,
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Save size={16} />
                Save Config
              </button>
            )}
          </div>
        </div>

        {/* Configuration Panel */}
        {showConfiguration && (
          <div style={{ 
            marginBottom: '24px', 
            padding: '20px', 
            backgroundColor: currentTheme.bg, 
            borderRadius: '8px',
            border: `1px solid ${currentTheme.border}`
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
              Strategy Configuration
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', color: currentTheme.textSecondary, display: 'block', marginBottom: '4px' }}>
                  Capital ($)
                </label>
                <input
                  type="number"
                  value={config.capital}
                  onChange={(e) => handleConfigChange('capital', parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '8px',
                    backgroundColor: currentTheme.cardBg,
                    border: `1px solid ${currentTheme.border}`,
                    borderRadius: '4px',
                    color: currentTheme.text
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: currentTheme.textSecondary, display: 'block', marginBottom: '4px' }}>
                  Leverage
                </label>
                <select
                  value={config.leverage}
                  onChange={(e) => handleConfigChange('leverage', parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '8px',
                    backgroundColor: currentTheme.cardBg,
                    border: `1px solid ${currentTheme.border}`,
                    borderRadius: '4px',
                    color: currentTheme.text
                  }}
                >
                  <option value="1">1x</option>
                  <option value="2">2x</option>
                  <option value="3">3x</option>
                  <option value="5">5x</option>
                  <option value="10">10x</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: currentTheme.textSecondary, display: 'block', marginBottom: '4px' }}>
                  Stop Loss (%)
                </label>
                <input
                  type="number"
                  value={config.stopLoss}
                  onChange={(e) => handleConfigChange('stopLoss', parseFloat(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '8px',
                    backgroundColor: currentTheme.cardBg,
                    border: `1px solid ${currentTheme.border}`,
                    borderRadius: '4px',
                    color: currentTheme.text
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Tabs for Details */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
            <TabsTrigger value="performance">Performans</TabsTrigger>
            <TabsTrigger value="risk">Risk Analizi</TabsTrigger>
            <TabsTrigger value="howItWorks">Nasıl Çalışır</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div style={{ backgroundColor: currentTheme.bg, padding: '16px', borderRadius: '8px' }}>
                <div style={{ fontSize: '12px', color: currentTheme.textSecondary, marginBottom: '4px' }}>APY Range</div>
                <div style={{ fontSize: '24px', fontWeight: '600', color: currentTheme.success }}>{selectedStrategy.apy}</div>
              </div>
              <div style={{ backgroundColor: currentTheme.bg, padding: '16px', borderRadius: '8px' }}>
                <div style={{ fontSize: '12px', color: currentTheme.textSecondary, marginBottom: '4px' }}>Win Rate</div>
                <div style={{ fontSize: '24px', fontWeight: '600', color: currentTheme.info }}>{selectedStrategy.winRate}%</div>
              </div>
              <div style={{ backgroundColor: currentTheme.bg, padding: '16px', borderRadius: '8px' }}>
                <div style={{ fontSize: '12px', color: currentTheme.textSecondary, marginBottom: '4px' }}>Min Capital</div>
                <div style={{ fontSize: '24px', fontWeight: '600' }}>${selectedStrategy.minCapital.toLocaleString()}</div>
              </div>
              <div style={{ backgroundColor: currentTheme.bg, padding: '16px', borderRadius: '8px' }}>
                <div style={{ fontSize: '12px', color: currentTheme.textSecondary, marginBottom: '4px' }}>Risk Level</div>
                <div style={{ fontSize: '24px', fontWeight: '600', color: getRiskColor(selectedStrategy.risk) }}>
                  {selectedStrategy.risk}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="mt-4">
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={currentTheme.border} />
                  <XAxis dataKey="date" stroke={currentTheme.textSecondary} />
                  <YAxis stroke={currentTheme.textSecondary} />
                  <Tooltip
                    contentStyle={{ backgroundColor: currentTheme.cardBg, border: `1px solid ${currentTheme.border}` }}
                    labelStyle={{ color: currentTheme.text }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={currentTheme.success}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="risk" className="mt-4">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>Risk Metrics</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', color: currentTheme.textSecondary }}>VaR (95%)</span>
                    <span style={{ fontSize: '12px', fontWeight: '600' }}>${metrics.var}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', color: currentTheme.textSecondary }}>Max Drawdown</span>
                    <span style={{ fontSize: '12px', fontWeight: '600' }}>{metrics.maxDrawdown}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', color: currentTheme.textSecondary }}>Sharpe Ratio</span>
                    <span style={{ fontSize: '12px', fontWeight: '600' }}>{metrics.sharpeRatio}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>Risk Categories</h4>
                {Object.entries(metrics.categories).map(([category, value]) => (
                  <div key={category} style={{ marginBottom: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                      <span style={{ fontSize: '11px', textTransform: 'capitalize' }}>{category}</span>
                      <span style={{ fontSize: '11px', fontWeight: '600' }}>{value}%</span>
                    </div>
                    <div style={{ height: '4px', backgroundColor: currentTheme.border, borderRadius: '2px' }}>
                      <div style={{
                        width: `${value}%`,
                        height: '100%',
                        backgroundColor: value > 70 ? currentTheme.danger : value > 40 ? currentTheme.warning : currentTheme.success,
                        borderRadius: '2px'
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="howItWorks" className="mt-4">
            <div style={{ backgroundColor: currentTheme.bg, padding: '16px', borderRadius: '8px' }}>
              <p style={{ fontSize: '14px', lineHeight: '1.6', color: currentTheme.text }}>
                {selectedStrategy.howItWorks}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  // Backtest Modal
  const renderBacktestModal = () => {
    if (!isBacktestModalOpen || !backtestResults) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Backtest Sonuçları</h2>
            <button
              onClick={() => setIsBacktestModalOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-700 p-4 rounded">
              <span className="text-gray-400 text-sm">Toplam Getiri</span>
              <p className="text-2xl font-bold text-green-500">
                {backtestResults.totalReturn}%
              </p>
            </div>
            <div className="bg-gray-700 p-4 rounded">
              <span className="text-gray-400 text-sm">Sharpe Ratio</span>
              <p className="text-2xl font-bold text-blue-500">
                {backtestResults.sharpeRatio}
              </p>
            </div>
            <div className="bg-gray-700 p-4 rounded">
              <span className="text-gray-400 text-sm">Max Drawdown</span>
              <p className="text-2xl font-bold text-red-500">
                {backtestResults.maxDrawdown}%
              </p>
            </div>
          </div>

          <div className="h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={backtestResults.equityCurve}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                  labelStyle={{ color: '#9CA3AF' }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <button
            onClick={() => setIsBacktestModalOpen(false)}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>
    );
  };

  // Main Render
  if (isEducationalMode) {
    return renderEducationalContent();
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: currentTheme.bg,
      color: currentTheme.text,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: currentTheme.cardBg,
        borderBottom: `1px solid ${currentTheme.border}`,
        padding: '24px 32px',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 8px 0' }}>
                Enterprise Strategy Selection
              </h1>
              <p style={{ color: currentTheme.textSecondary, margin: 0 }}>
                11 Advanced trading strategies with institutional-grade security
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              {/* Security Level Indicator */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                backgroundColor: securityLevel === 'high' ? `${currentTheme.success}20` : `${currentTheme.warning}20`,
                borderRadius: '8px',
                border: `1px solid ${securityLevel === 'high' ? currentTheme.success : currentTheme.warning}`
              }}>
                <Shield size={16} color={securityLevel === 'high' ? currentTheme.success : currentTheme.warning} />
                <span style={{ fontSize: '14px', fontWeight: '600' }}>
                  Security: {securityLevel.toUpperCase()}
                </span>
              </div>

              {/* Educational Mode Button */}
              <button
                onClick={() => setIsEducationalMode(true)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: currentTheme.purple,
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <BookOpen size={16} />
                <span>Eğitim Merkezi</span>
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                style={{
                  padding: '8px',
                  backgroundColor: currentTheme.cardBg,
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {darkMode ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '12px', top: '11px', color: currentTheme.textTertiary }} />
              <input
                type="text"
                placeholder="Search strategies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 40px',
                  backgroundColor: currentTheme.bg,
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: currentTheme.text,
                  outline: 'none'
                }}
              />
            </div>
            
            <select
              value={riskTolerance}
              onChange={(e) => setRiskTolerance(e.target.value)}
              style={{
                padding: '10px 16px',
                backgroundColor: currentTheme.bg,
                border: `1px solid ${currentTheme.border}`,
                borderRadius: '8px',
                fontSize: '14px',
                color: currentTheme.text,
                cursor: 'pointer'
              }}
            >
              <option value="conservative">Conservative</option>
              <option value="moderate">Moderate</option>
              <option value="aggressive">Aggressive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Market Overview */}
      <div style={{ padding: '24px 32px', borderBottom: `1px solid ${currentTheme.border}` }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
            Market Conditions
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            {Object.entries(marketMetrics).map(([key, data]) => (
              <div key={key} style={{
                padding: '12px',
                backgroundColor: currentTheme.cardBg,
                borderRadius: '8px',
                border: `1px solid ${currentTheme.border}`
              }}>
                <div style={{ fontSize: '12px', color: currentTheme.textTertiary, marginBottom: '4px' }}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '20px', fontWeight: '600' }}>{data.value}</span>
                  <span style={{ 
                    fontSize: '12px', 
                    color: data.trend === 'up' ? currentTheme.success : data.trend === 'down' ? currentTheme.danger : currentTheme.warning
                  }}>
                    {data.trend === 'up' ? <ArrowUpRight size={14} /> : data.trend === 'down' ? <ArrowDownRight size={14} /> : '→'}
                    {data.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: 'flex', gap: '24px', padding: '24px 32px', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Categories Sidebar */}
        <div style={{ width: '240px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: currentTheme.textSecondary }}>
            CATEGORIES ({strategies.length} Strategies)
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  backgroundColor: selectedCategory === category.id ? `${currentTheme.info}20` : 'transparent',
                  border: selectedCategory === category.id ? `1px solid ${currentTheme.info}` : '1px solid transparent',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {category.icon}
                  <span style={{ fontSize: '14px', fontWeight: selectedCategory === category.id ? '600' : '400' }}>
                    {category.name}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '12px', color: currentTheme.textTertiary }}>
                    {category.count}
                  </span>
                  {category.badge && (
                    <span style={{
                      padding: '2px 6px',
                      fontSize: '10px',
                      fontWeight: '600',
                      backgroundColor: category.badge === 'HOT' ? currentTheme.danger : currentTheme.info,
                      color: 'white',
                      borderRadius: '4px'
                    }}>
                      {category.badge}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Strategies Grid or Detail View */}
        <div style={{ flex: 1 }}>
          {!selectedStrategy ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
              {filteredStrategies.map(strategy => {
                const riskMetrics = calculateRiskMetrics(strategy);
                
                return (
                  <div
                    key={strategy.id}
                    onClick={() => handleStrategySelect(strategy)}
                    style={{
                      backgroundColor: currentTheme.cardBg,
                      borderRadius: '12px',
                      border: strategy.isRecommended ? `2px solid ${currentTheme.success}` : `1px solid ${currentTheme.border}`,
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = darkMode ? '0 10px 25px -5px rgba(59, 130, 246, 0.3)' : '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {/* Badges */}
                    <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '6px' }}>
                      {strategy.isRecommended && (
                        <div style={{
                          backgroundColor: currentTheme.success,
                          color: 'white',
                          padding: '2px 8px',
                          fontSize: '10px',
                          fontWeight: '600',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '2px'
                        }}>
                          <Star size={10} />
                          RECOMMENDED
                        </div>
                      )}
                      {strategy.isNew && (
                        <div style={{
                          backgroundColor: currentTheme.info,
                          color: 'white',
                          padding: '2px 8px',
                          fontSize: '10px',
                          fontWeight: '600',
                          borderRadius: '4px'
                        }}>
                          NEW
                        </div>
                      )}
                    </div>

                    <div style={{ padding: '20px' }}>
                      {/* Header */}
                      <div style={{ display: 'flex', alignItems: 'start', gap: '12px', marginBottom: '16px' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          backgroundColor: strategy.color + '20',
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {React.cloneElement(strategy.icon, { color: strategy.color })}
                        </div>
                        <div style={{ flex: 1 }}>
                          <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 4px 0' }}>
                            {strategy.name}
                          </h3>
                          <p style={{ fontSize: '12px', color: currentTheme.textSecondary, margin: 0 }}>
                            {strategy.description}
                          </p>
                        </div>
                      </div>

                      {/* Metrics Grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '16px' }}>
                        <div>
                          <div style={{ fontSize: '11px', color: currentTheme.textTertiary, marginBottom: '2px' }}>APY</div>
                          <div style={{ fontSize: '16px', fontWeight: '600', color: currentTheme.success }}>
                            {strategy.apy}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', color: currentTheme.textTertiary, marginBottom: '2px' }}>Win Rate</div>
                          <div style={{ fontSize: '16px', fontWeight: '600', color: currentTheme.info }}>
                            {strategy.winRate}%
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', color: currentTheme.textTertiary, marginBottom: '2px' }}>Min Capital</div>
                          <div style={{ fontSize: '16px', fontWeight: '600' }}>
                            {strategy.minCapital === 0 ? 
                              <span style={{ color: currentTheme.warning }}>Flash Loan</span> :
                              `$${strategy.minCapital.toLocaleString()}`
                            }
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', color: currentTheme.textTertiary, marginBottom: '2px' }}>Risk</div>
                          <div style={{ fontSize: '16px', fontWeight: '600', color: getRiskColor(strategy.risk) }}>
                            {strategy.risk}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBacktest(strategy);
                          }}
                          style={{
                            flex: 1,
                            padding: '6px',
                            backgroundColor: currentTheme.bg,
                            border: `1px solid ${currentTheme.border}`,
                            borderRadius: '6px',
                            fontSize: '12px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px'
                          }}
                        >
                          <ChartBar size={14} />
                          Backtest
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyStrategy(strategy);
                          }}
                          style={{
                            flex: 1,
                            padding: '6px',
                            backgroundColor: currentTheme.bg,
                            border: `1px solid ${currentTheme.border}`,
                            borderRadius: '6px',
                            fontSize: '12px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px'
                          }}
                        >
                          <Copy size={14} />
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            renderDetailsPanel()
          )}
        </div>
      </div>

      {/* Modals */}
      {renderBacktestModal()}

      {/* Copy Strategy Modal */}
      {isCopyModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-white mb-4">Stratejiyi Kopyala</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Hedef Portföy</label>
                <select
                  value={copyTargetPortfolio}
                  onChange={(e) => setCopyTargetPortfolio(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                >
                  <option value="">Seçiniz...</option>
                  <option value="portfolio1">Ana Portföy</option>
                  <option value="portfolio2">Test Portföy</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Ölçek Faktörü</label>
                <input
                  type="number"
                  value={copyScaleFactor}
                  onChange={(e) => setCopyScaleFactor(parseFloat(e.target.value))}
                  min="0.1"
                  max="10"
                  step="0.1"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsCopyModalOpen(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white transition-colors"
              >
                İptal
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white transition-colors">
                Kopyala
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingStrategies;