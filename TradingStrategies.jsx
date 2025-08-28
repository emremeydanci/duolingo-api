import React, { useState, useEffect, useMemo } from 'react';
import {
  Shield, Zap, Activity, TrendingUp, AlertCircle, Lock,
  CheckCircle, XCircle, Info, Star, ArrowUpRight, ArrowDownRight,
  DollarSign, Target, Timer, Grid3X3, Link, Sparkles,
  BarChart3, PieChart, TrendingDown, Brain, Cpu,
  Settings, Play, Pause, RefreshCw, Save, Download,
  Eye, EyeOff, Bell, Filter, Search, ChevronRight,
  ArrowLeft, Plus, Minus, Copy, Share2, HelpCircle,
  BookOpen, Layers, GitBranch, Shuffle, Server, X
} from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell
} from 'recharts';

// Tabs Components
const Tabs = ({ children, defaultValue, className = '' }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  
  const childrenArray = React.Children.toArray(children);
  const tabsList = childrenArray.find(child => child.type?.displayName === 'TabsList');
  const tabsContents = childrenArray.filter(child => child.type?.displayName === 'TabsContent');

  return (
    <div className={className}>
      {React.cloneElement(tabsList, { activeTab, setActiveTab })}
      {tabsContents.map((content, index) =>
        React.cloneElement(content, { key: index, activeTab })
      )}
    </div>
  );
};

const TabsList = ({ children, className = '', activeTab, setActiveTab }) => {
  TabsList.displayName = 'TabsList';
  
  return (
    <div className={`flex space-x-1 border-b border-gray-700 ${className}`}>
      {React.Children.map(children, child =>
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
};

const TabsTrigger = ({ value, children, activeTab, setActiveTab }) => {
  TabsTrigger.displayName = 'TabsTrigger';
  
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

const TabsContent = ({ value, children, activeTab }) => {
  TabsContent.displayName = 'TabsContent';
  
  if (activeTab !== value) return null;
  return <div>{children}</div>;
};

const TradingStrategies = () => {
  // State Management
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('performance');
  const [isBacktestModalOpen, setIsBacktestModalOpen] = useState(false);
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);
  const [copyTargetPortfolio, setCopyTargetPortfolio] = useState('');
  const [copyScaleFactor, setCopyScaleFactor] = useState(1);
  const [isEducationalMode, setIsEducationalMode] = useState(false);
  const [activeEducationalSection, setActiveEducationalSection] = useState('overview');
  const [darkMode, setDarkMode] = useState(true);
  const [securityLevel, setSecurityLevel] = useState('high');

  // Theme Configuration
  const theme = darkMode ? {
    bg: 'bg-gray-900',
    cardBg: 'bg-gray-800',
    text: 'text-white',
    textSecondary: 'text-gray-400',
    textTertiary: 'text-gray-500',
    border: 'border-gray-700',
    success: 'text-green-500',
    danger: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500',
    purple: 'text-purple-500'
  } : {
    bg: 'bg-gray-100',
    cardBg: 'bg-white',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600',
    textTertiary: 'text-gray-500',
    border: 'border-gray-300',
    success: 'text-green-600',
    danger: 'text-red-600',
    warning: 'text-yellow-600',
    info: 'text-blue-600',
    purple: 'text-purple-600'
  };

  // Sample Strategy Data
  const strategies = [
    {
      id: 1,
      name: 'Triangular CEX Arbitrage Pro',
      category: 'arbitrage',
      description: 'Multi-exchange triangular arbitrage with ML-based prediction',
      detailedDescription: 'Advanced triangular arbitrage across Binance, OKX, and Bybit with machine learning price prediction and automatic risk management.',
      icon: <Zap size={20} />,
      color: '#f59e0b',
      apy: '89-156%',
      risk: 'Medium',
      minCapital: 10000,
      winRate: 78,
      isRecommended: true,
      keyFeatures: ['ML Prediction', 'Auto-hedging', 'Multi-exchange', 'Risk management'],
      requiredExchanges: ['Binance', 'OKX', 'Bybit'],
      active: true,
      exchange: 'Multi',
      pair: 'BTC/USDT',
      capital: 10000,
      dailyVolume: 45000,
      riskLevel: 'medium',
      performance: 24.5,
      totalTrades: 142,
      profitFactor: 1.8,
      maxDrawdown: 12.3,
      sharpeRatio: 1.45,
      type: 'arbitrage',
      status: 'active',
      parameters: {
        rsiPeriod: 14,
        rsiOverbought: 70,
        rsiOversold: 30,
        macdFast: 12,
        macdSlow: 26,
        macdSignal: 9,
        stopLoss: 2,
        takeProfit: 4,
        positionSize: 0.1
      },
      recentTrades: [
        { date: '2024-01-15 14:30', side: 'buy', price: 42150, amount: 0.1, pnl: 125 },
        { date: '2024-01-15 16:45', side: 'sell', price: 42450, amount: 0.1, pnl: 30 },
        { date: '2024-01-15 18:20', side: 'buy', price: 42300, amount: 0.1, pnl: -45 }
      ]
    },
    {
      id: 2,
      name: 'Statistical Arbitrage Bot',
      category: 'arbitrage',
      description: 'Pairs trading using statistical correlation analysis',
      detailedDescription: 'Identifies and trades on mean-reverting price relationships between correlated assets.',
      icon: <BarChart3 size={20} />,
      color: '#22c55e',
      apy: '65-110%',
      risk: 'Low-Medium',
      minCapital: 15000,
      winRate: 72,
      keyFeatures: ['Correlation analysis', 'Mean reversion', 'Hedged positions', 'Z-score signals'],
      requiredExchanges: ['Binance', 'Kraken'],
      active: true,
      exchange: 'Binance',
      pair: 'ETH/USDT',
      capital: 8000,
      dailyVolume: 32000,
      riskLevel: 'low',
      performance: 18.2,
      totalTrades: 98,
      profitFactor: 1.6,
      maxDrawdown: 8.5,
      sharpeRatio: 1.82,
      type: 'mean-reversion',
      status: 'active',
      parameters: {
        bbPeriod: 20,
        bbStdDev: 2,
        rsiPeriod: 14,
        stopLoss: 1.5,
        takeProfit: 3,
        positionSize: 0.15
      }
    },
    {
      id: 3,
      name: 'AI-Powered Grid Trading',
      category: 'grid',
      description: 'Adaptive grid trading with AI-based range prediction',
      detailedDescription: 'Next-generation grid trading using artificial intelligence for optimal grid placement.',
      icon: <Grid3X3 size={20} />,
      color: '#06b6d4',
      apy: '67-125%',
      risk: 'Medium',
      minCapital: 5000,
      winRate: 76,
      keyFeatures: ['AI optimization', 'Auto-rebalancing', 'Range prediction', 'Volatility adaptation'],
      requiredExchanges: ['Binance Futures', 'Bybit'],
      active: false,
      exchange: 'Multiple',
      pair: 'Multiple',
      capital: 20000,
      dailyVolume: 95000,
      riskLevel: 'low',
      performance: 12.8,
      totalTrades: 312,
      profitFactor: 2.1,
      maxDrawdown: 4.2,
      sharpeRatio: 2.34,
      type: 'grid',
      status: 'paused'
    }
  ];

  // Performance Data for Charts
  const performanceData = [
    { date: 'Oca 01', value: 10000 },
    { date: 'Oca 05', value: 10450 },
    { date: 'Oca 10', value: 11200 },
    { date: 'Oca 15', value: 10800 },
    { date: 'Oca 20', value: 11500 },
    { date: 'Oca 25', value: 12450 }
  ];

  // Market Metrics
  const marketMetrics = {
    volatility: { value: 67, trend: 'up', change: '+12%' },
    liquidity: { value: 8.9, trend: 'stable', change: '+0.3' },
    opportunities: { value: 243, trend: 'up', change: '+34' },
    correlation: { value: 0.73, trend: 'down', change: '-0.08' },
    spread: { value: '0.12%', trend: 'stable', change: '-0.01%' }
  };

  // Categories
  const categories = [
    { id: 'all', name: 'Tümü', icon: <Grid3X3 size={14} />, count: strategies.length },
    { id: 'arbitrage', name: 'CEX Arbitraj', icon: <Zap size={14} />, count: 2 },
    { id: 'dex-arbitrage', name: 'DEX Arbitraj', icon: <Link size={14} />, count: 0, badge: 'YENİ' },
    { id: 'grid', name: 'Grid Trading', icon: <Grid3X3 size={14} />, count: 1 },
    { id: 'market-making', name: 'Market Making', icon: <Activity size={14} />, count: 0 }
  ];

  // Filter Strategies
  const filteredStrategies = useMemo(() => {
    return strategies.filter(strategy => {
      const matchesSearch = strategy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        strategy.pair.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || strategy.type === filterType;
      const matchesStatus = filterStatus === 'all' ||
        (filterStatus === 'active' && strategy.active) ||
        (filterStatus === 'paused' && !strategy.active);

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchTerm, filterType, filterStatus]);

  // Sort Strategies
  const sortedStrategies = useMemo(() => {
    return [...filteredStrategies].sort((a, b) => {
      switch (sortBy) {
        case 'performance':
          return b.performance - a.performance;
        case 'winRate':
          return b.winRate - a.winRate;
        case 'trades':
          return b.totalTrades - a.totalTrades;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [filteredStrategies, sortBy]);

  // Get selected strategy data
  const selectedStrategyData = selectedStrategy 
    ? strategies.find(s => s.id === selectedStrategy)
    : null;

  // Handlers
  const handleStrategyToggle = (strategyId) => {
    console.log('Toggling strategy:', strategyId);
  };

  const handleBacktest = (strategy) => {
    setSelectedStrategy(strategy.id);
    setIsBacktestModalOpen(true);
  };

  const handleCopyStrategy = (strategy) => {
    setSelectedStrategy(strategy.id);
    setIsCopyModalOpen(true);
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return 'text-green-500';
      case 'Low-Medium': return 'text-green-400';
      case 'Medium': return 'text-yellow-500';
      case 'Medium-High': return 'text-orange-500';
      case 'High': return 'text-red-500';
      case 'Very High': return 'text-red-600';
      default: return 'text-gray-500';
    }
  };

  // Educational Content Rendering
  const renderEducationalContent = () => {
    const educationalSections = [
      { id: 'overview', name: 'Genel Bakış' },
      { id: 'selection', name: 'Strateji Seçimi' },
      { id: 'arbitrage', name: 'Arbitraj' },
      { id: 'grid', name: 'Grid Trading' },
      { id: 'parameters', name: 'Parametreler' }
    ];

    const educationalContent = {
      overview: (
        <div className="p-6 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Trading Stratejileri - Genel Bakış</h2>
          
          <div className="bg-white p-4 rounded-lg mb-4">
            <h3 className="text-lg font-semibold mb-3">Strateji Nedir?</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              Trading stratejisi, piyasada ne zaman ve nasıl işlem yapacağınızı belirleyen kurallardır.
              Tıpkı bir yemek tarifi gibi, hangi malzemeleri (parametreler) kullanacağınızı ve
              hangi adımları (algoritmalar) izleyeceğinizi tanımlar.
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
            <p className="text-blue-800">
              <strong>💡 İpucu:</strong> Trading stratejileri işlem kararlarınızı otomatikleştirerek
              duygusal faktörleri azaltır ve tutarlı sonuçlar elde etmenizi sağlar.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Strateji Türleri</h3>
            <ul className="space-y-2">
              <li><strong>• Arbitraj:</strong> Fiyat farklılıklarından yararlanma</li>
              <li><strong>• Grid Trading:</strong> Belirli aralıklarla alım-satım emirleri yerleştirme</li>
              <li><strong>• Market Making:</strong> Alış-satış fiyatları arasında spread oluşturarak kar elde etme</li>
              <li><strong>• DCA:</strong> Düzenli aralıklarla sabit miktarda alım yapma</li>
            </ul>
          </div>
        </div>
      ),
      // Diğer eğitim içerikleri buraya eklenebilir
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

        {educationalContent[activeEducationalSection] || educationalContent.overview}
      </div>
    );
  };

  // Details Panel Rendering
  const renderDetailsPanel = () => {
    if (!selectedStrategyData) return null;

    return (
      <div className={`${theme.cardBg} rounded-lg p-6 mt-6`}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className={`text-2xl font-bold ${theme.text} mb-2`}>{selectedStrategyData.name}</h2>
            <p className={theme.textSecondary}>{selectedStrategyData.description}</p>
          </div>
          <button
            onClick={() => setSelectedStrategy(null)}
            className={`${theme.textSecondary} hover:${theme.text}`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
            <TabsTrigger value="parameters">Parametreler</TabsTrigger>
            <TabsTrigger value="performance">Performans</TabsTrigger>
            <TabsTrigger value="trades">İşlemler</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-700 p-4 rounded">
                <div className="text-gray-400 text-sm mb-1">Win Rate</div>
                <div className="text-2xl font-bold text-white">{selectedStrategyData.winRate}%</div>
              </div>
              <div className="bg-gray-700 p-4 rounded">
                <div className="text-gray-400 text-sm mb-1">Profit Factor</div>
                <div className="text-2xl font-bold text-white">{selectedStrategyData.profitFactor}</div>
              </div>
              <div className="bg-gray-700 p-4 rounded">
                <div className="text-gray-400 text-sm mb-1">Max Drawdown</div>
                <div className="text-2xl font-bold text-red-500">{selectedStrategyData.maxDrawdown}%</div>
              </div>
              <div className="bg-gray-700 p-4 rounded">
                <div className="text-gray-400 text-sm mb-1">Sharpe Ratio</div>
                <div className="text-2xl font-bold text-white">{selectedStrategyData.sharpeRatio}</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="parameters" className="mt-4">
            <div className="bg-gray-700 rounded p-4">
              {selectedStrategyData.parameters && Object.entries(selectedStrategyData.parameters).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-600 last:border-0">
                  <span className="text-gray-400">{key}</span>
                  <span className="text-white font-medium">
                    {typeof value === 'object' ? JSON.stringify(value) : value}
                  </span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="performance" className="mt-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
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
          </TabsContent>

          <TabsContent value="trades" className="mt-4">
            <div className="space-y-2">
              {selectedStrategyData.recentTrades?.map((trade, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-700 rounded">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs rounded ${
                      trade.side === 'buy' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                    }`}>
                      {trade.side.toUpperCase()}
                    </span>
                    <span className="text-gray-300">{trade.date}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-white">${trade.price}</span>
                    <span className={`font-medium ${trade.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {trade.pnl >= 0 ? '+' : ''}{trade.pnl}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  // Backtest Modal
  const renderBacktestModal = () => {
    if (!isBacktestModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Backtest Sonuçları</h2>
            <button
              onClick={() => setIsBacktestModalOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-700 p-4 rounded">
              <div className="text-gray-400 text-sm mb-1">Toplam Getiri</div>
              <div className="text-2xl font-bold text-green-500">+24.5%</div>
            </div>
            <div className="bg-gray-700 p-4 rounded">
              <div className="text-gray-400 text-sm mb-1">Sharpe Ratio</div>
              <div className="text-2xl font-bold text-white">1.82</div>
            </div>
            <div className="bg-gray-700 p-4 rounded">
              <div className="text-gray-400 text-sm mb-1">Max Drawdown</div>
              <div className="text-2xl font-bold text-red-500">-8.3%</div>
            </div>
            <div className="bg-gray-700 p-4 rounded">
              <div className="text-gray-400 text-sm mb-1">Win Rate</div>
              <div className="text-2xl font-bold text-white">67%</div>
            </div>
          </div>

          <div className="h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                  labelStyle={{ color: '#9CA3AF' }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsBacktestModalOpen(false)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white transition-colors"
            >
              Kapat
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white transition-colors">
              Detaylı Rapor
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Main Render
  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} p-6`}>
      {isEducationalMode ? (
        renderEducationalContent()
      ) : (
        <>
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-3xl font-bold">Trading Stratejileri</h1>
              <div className="flex gap-4">
                <button
                  onClick={() => setIsEducationalMode(true)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white flex items-center space-x-2 transition-colors"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Eğitim Merkezi</span>
                </button>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white flex items-center space-x-2 transition-colors"
                >
                  {darkMode ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <p className={theme.textSecondary}>Stratejilerinizi yönetin ve optimize edin</p>
          </div>

          {/* Market Overview */}
          <div className={`${theme.cardBg} rounded-lg p-6 mb-6`}>
            <h2 className="text-lg font-semibold mb-4">Market Koşulları</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(marketMetrics).map(([key, data]) => (
                <div key={key} className="text-center">
                  <div className={`${theme.textTertiary} text-sm mb-1 capitalize`}>{key}</div>
                  <div className="text-xl font-bold">{data.value}</div>
                  <div className={`text-sm ${
                    data.trend === 'up' ? theme.success : 
                    data.trend === 'down' ? theme.danger : theme.warning
                  }`}>
                    {data.change}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Filters and Actions */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Strateji ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 ${theme.cardBg} ${theme.border} border rounded-lg focus:outline-none focus:border-blue-500`}
                />
              </div>
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className={`px-4 py-2 ${theme.cardBg} ${theme.border} border rounded-lg focus:outline-none focus:border-blue-500`}
            >
              <option value="all">Tüm Tipler</option>
              <option value="arbitrage">Arbitrage</option>
              <option value="mean-reversion">Mean Reversion</option>
              <option value="grid">Grid Trading</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`px-4 py-2 ${theme.cardBg} ${theme.border} border rounded-lg focus:outline-none focus:border-blue-500`}
            >
              <option value="all">Tüm Durumlar</option>
              <option value="active">Aktif</option>
              <option value="paused">Duraklatıldı</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-4 py-2 ${theme.cardBg} ${theme.border} border rounded-lg focus:outline-none focus:border-blue-500`}
            >
              <option value="performance">Performans</option>
              <option value="winRate">Win Rate</option>
              <option value="trades">İşlem Sayısı</option>
              <option value="name">İsim</option>
            </select>

            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white flex items-center space-x-2 transition-colors">
              <Settings className="w-5 h-5" />
              <span>Yeni Strateji</span>
            </button>
          </div>

          {/* Strategy Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {sortedStrategies.map((strategy) => {
              const isSelected = selectedStrategy === strategy.id;

              return (
                <div
                  key={strategy.id}
                  onClick={() => setSelectedStrategy(strategy.id)}
                  className={`${theme.cardBg} rounded-lg p-6 cursor-pointer transition-all ${
                    isSelected ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className={`text-lg font-semibold ${theme.text} mb-1`}>{strategy.name}</h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded ${
                          strategy.active
                            ? 'bg-green-500/20 text-green-500'
                            : 'bg-yellow-500/20 text-yellow-500'
                        }`}>
                          {strategy.active ? 'Aktif' : 'Duraklatıldı'}
                        </span>
                        <span className={`${theme.textSecondary} text-sm`}>{strategy.exchange}</span>
                      </div>
                    </div>
                    <div className={`text-2xl font-bold ${
                      strategy.performance >= 0 ? theme.success : theme.danger
                    }`}>
                      {strategy.performance >= 0 ? '+' : ''}{strategy.performance}%
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <div className={`${theme.textTertiary} text-xs mb-1`}>Win Rate</div>
                      <div className={`${theme.text} font-medium`}>{strategy.winRate}%</div>
                    </div>
                    <div>
                      <div className={`${theme.textTertiary} text-xs mb-1`}>İşlemler</div>
                      <div className={`${theme.text} font-medium`}>{strategy.totalTrades}</div>
                    </div>
                    <div>
                      <div className={`${theme.textTertiary} text-xs mb-1`}>Max DD</div>
                      <div className={`${theme.danger} font-medium`}>-{strategy.maxDrawdown}%</div>
                    </div>
                    <div>
                      <div className={`${theme.textTertiary} text-xs mb-1`}>Sharpe</div>
                      <div className={`${theme.text} font-medium`}>{strategy.sharpeRatio}</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className={`${theme.textSecondary} text-sm`}>{strategy.pair}</span>
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStrategyToggle(strategy.id);
                        }}
                        className={`px-3 py-1 rounded text-sm transition-colors ${
                          strategy.active
                            ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30'
                            : 'bg-green-500/20 text-green-500 hover:bg-green-500/30'
                        }`}
                      >
                        {strategy.active ? 'Durdur' : 'Başlat'}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyStrategy(strategy);
                        }}
                        className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBacktest(strategy);
                        }}
                        className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
                      >
                        <BarChart3 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Details Panel */}
          {selectedStrategyData && renderDetailsPanel()}

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
        </>
      )}
    </div>
  );
};

export default TradingStrategies;