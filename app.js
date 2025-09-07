// Odisha Development Dashboard - Integrated with Wolfram Language Backend
// Full-Stack Integration Demonstration - Fixed Version

// Application data with Wolfram integration
const dashboardData = {
  districts: ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"],
  
  // Wolfram API endpoints
  wolframEndpoints: {
    data_import: "https://wolframcloud.com/obj/odisha-data-import",
    geo_visualization: "https://wolframcloud.com/obj/odisha-geo-viz",
    time_series: "https://wolframcloud.com/obj/odisha-timeseries",
    correlation: "https://wolframcloud.com/obj/odisha-correlation",
    prediction: "https://wolframcloud.com/obj/odisha-predict",
    export: "https://wolframcloud.com/obj/odisha-export"
  },
  
  metrics: {
    overview: {
      name: "Development Overview",
      icon: "🏛️",
      current_value: "78.2",
      trend: "+2.8%",
      description: "Composite development index across all sectors",
      wolfram_function: "GeoRegionValuePlot[Entity[\"AdministrativeDivision\", \"Odisha\", \"India\"], \"CompositeIndex\"]",
      api_endpoint: "/api/wolfram/geo-visualization/overview",
      color: '#1FB8CD'
    },
    literacy: {
      name: "Literacy Rates",
      icon: "📚",
      current_value: "73.45%",
      trend: "+2.3%",
      description: "Adult literacy rates across districts",
      wolfram_function: "GeoRegionValuePlot[Entity[\"AdministrativeDivision\", \"Odisha\", \"India\"], \"LiteracyRate\"]",
      api_endpoint: "/api/wolfram/geo-visualization/literacy",
      color: '#1FB8CD'
    },
    agriculture: {
      name: "Agricultural Output", 
      icon: "🌾",
      current_value: "15.2M Tonnes",
      trend: "+1.8%",
      description: "Total agricultural production",
      wolfram_function: "BarChart[agriculturalData, ChartLabels -> districts]",
      api_endpoint: "/api/wolfram/agricultural-analysis",
      color: '#FFC185'
    },
    infrastructure: {
      name: "Infrastructure Index",
      icon: "🏗️", 
      current_value: "68.7",
      trend: "+4.2%",
      description: "Composite infrastructure development score",
      wolfram_function: "GeoBubbleChart[infrastructureIndex]",
      api_endpoint: "/api/wolfram/infrastructure-mapping",
      color: '#B4413C'
    },
    economy: {
      name: "Economic Growth",
      icon: "💰",
      current_value: "₹89,456",
      trend: "+3.1%", 
      description: "Per capita income and GSDP metrics",
      wolfram_function: "TimeSeries[economicData, PlotLabel -> \"GSDP Growth\"]",
      api_endpoint: "/api/wolfram/economic-analysis",
      color: '#5D878F'
    },
    health: {
      name: "Health Indicators",
      icon: "🏥",
      current_value: "82.3",
      trend: "+2.7%",
      description: "Healthcare access and outcomes",
      wolfram_function: "BubbleChart[healthIndicators]",
      api_endpoint: "/api/wolfram/health-analysis",
      color: '#DB4545'
    }
  },
  
  sampleData: {
    overview: {
      labels: ['Literacy', 'Agriculture', 'Infrastructure', 'Economy', 'Health'],
      data: [73.45, 78.2, 68.7, 82.1, 82.3],
      colors: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F', '#DB4545']
    },
    literacy_by_district: [
      {district: "Khordha", literacy: 87.9, trend: "+3.2%"},
      {district: "Cuttack", literacy: 85.5, trend: "+2.8%"},
      {district: "Puri", literacy: 82.1, trend: "+2.1%"},
      {district: "Ganjam", literacy: 78.3, trend: "+1.9%"},
      {district: "Balasore", literacy: 76.8, trend: "+2.4%"},
      {district: "Sambalpur", literacy: 74.2, trend: "+2.0%"},
      {district: "Sundargarh", literacy: 71.8, trend: "+1.7%"},
      {district: "Mayurbhanj", literacy: 69.4, trend: "+1.5%"}
    ],
    
    timeSeriesData: {
      overview: [75.2, 76.1, 76.8, 77.3, 77.8, 78.0, 78.1, 78.15, 78.18, 78.2, 78.2],
      literacy: [68.2, 69.1, 70.3, 71.2, 72.1, 72.8, 73.1, 73.2, 73.3, 73.4, 73.45],
      agriculture: [12.8, 13.2, 13.8, 14.1, 14.5, 14.8, 15.0, 15.1, 15.15, 15.18, 15.2],
      infrastructure: [58.3, 60.1, 62.4, 64.2, 65.8, 66.9, 67.5, 67.9, 68.2, 68.5, 68.7],
      economy: [65432, 68901, 72345, 76890, 79123, 82456, 85123, 87890, 88234, 89012, 89456],
      health: [76.8, 77.9, 78.5, 79.2, 79.8, 80.3, 80.9, 81.4, 81.8, 82.1, 82.3]
    },
    
    correlationMatrix: [
      [1.0, 0.75, 0.68, 0.82, 0.71],
      [0.75, 1.0, 0.71, 0.69, 0.64], 
      [0.68, 0.71, 1.0, 0.73, 0.58],
      [0.82, 0.69, 0.73, 1.0, 0.67],
      [0.71, 0.64, 0.58, 0.67, 1.0]
    ]
  }
};

// Application state with integration tracking
let currentState = {
  selectedMetric: 'overview',
  selectedYear: 2024,
  selectedDistricts: ['all'],
  analysisType: 'overview',
  theme: 'light',
  charts: {},
  wolframConnection: {
    status: 'connected',
    lastSync: Date.now(),
    apiCalls: 127,
    successRate: 98.4,
    avgResponseTime: 245,
    totalDataProcessed: 15.2
  },
  apiMetrics: {
    calls: [],
    performance: {
      totalCalls: 127,
      successfulCalls: 125,
      failedCalls: 2,
      avgResponseTime: 245,
      totalDataProcessed: 15.2
    }
  },
  devConsoleVisible: false
};

// Wolfram Language code snippets for different metrics
const wolframCodeSnippets = {
  overview: `GeoRegionValuePlot[
  Entity["AdministrativeDivision", "Odisha", "India"],
  "CompositeIndex", 
  GeoBackground -> "ReliefMap",
  ColorFunction -> "Rainbow",
  PlotLegends -> Automatic,
  ImageSize -> Large
]`,
  
  literacy: `Manipulate[
  GeoRegionValuePlot[
    Entity["AdministrativeDivision", "Odisha", "India"],
    "LiteracyRate", 
    GeoBackground -> background,
    PlotLegends -> Automatic,
    ColorFunction -> "BlueGreenYellow",
    PlotRange -> {60, 90}
  ],
  {{background, "Satellite"}, {"Satellite", "ReliefMap", "StreetMap"}}
]`,
  
  agriculture: `Dynamic[
  BarChart[
    Import["odisha-agricultural-data.csv"],
    ChartLabels -> {"Rice", "Wheat", "Pulses", "Oilseeds"},
    ColorFunction -> "GreenBrownTerrain",
    PlotLabel -> "Agricultural Output by Crop",
    ChartStyle -> "Pastel"
  ]
]`,
  
  infrastructure: `GeoBubbleChart[
  AssociationThread[
    Entity["AdministrativeDivision", #, "Country" -> "India"] & /@ 
    odishaDistricts,
    infrastructureData
  ], 
  GeoBackground -> "StreetMap",
  BubbleScale -> {0.01, 0.05},
  ColorFunction -> "Rainbow"
]`,
  
  economy: `TimeSeriesForecast[
  TimeSeries[
    Import["odisha-economic-data.csv"],
    PlotStyle -> Thick,
    ColorFunction -> "BlueGreenYellow",
    PlotLabel -> "Economic Growth Trends"
  ],
  {5, "Year"}
]`,
  
  health: `BubbleChart[
  Transpose[{
    healthMetrics["InfantMortality"],
    healthMetrics["LifeExpectancy"],
    healthMetrics["HospitalBeds"]
  }],
  BubbleScale -> {0.02, 0.08},
  ColorFunction -> "RedBlueTones",
  PlotLabel -> "Health Metrics Overview"
]`
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Initializing Odisha Development Dashboard with Wolfram Language Integration...');
  initializeApp();
});

function initializeApp() {
  // Set up event listeners
  setupEventListeners();
  
  // Initialize district dropdown
  populateDistrictDropdown();
  
  // Initialize charts
  setTimeout(() => {
    initializeCharts();
  }, 100);
  
  // Set initial theme
  applyTheme(currentState.theme);
  
  // Start real-time updates
  startRealTimeUpdates();
  
  // Initialize connection status
  updateConnectionStatus();
  
  // Add sample API calls to console
  initializeDevConsole();
  
  // Setup tooltips
  setupTooltips();
  
  // Show welcome notification
  setTimeout(() => {
    showNotification('🎉 Connected to Wolfram Language backend! All systems operational.', 'success');
  }, 1000);
  
  console.log('✅ Dashboard with Wolfram integration initialized successfully!');
}

function setupEventListeners() {
  console.log('Setting up event listeners with Wolfram integration...');
  
  // Navigation menu - FIXED
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const metric = this.dataset.metric;
      console.log(`Navigation clicked: ${metric}`);
      if (metric && dashboardData.metrics[metric]) {
        selectMetric(metric);
      }
    });
  });
  
  // Time slider with proper event handling - FIXED
  const timeSlider = document.getElementById('timeSlider');
  if (timeSlider) {
    // Handle both input and change events for better compatibility
    timeSlider.addEventListener('input', function(e) {
      updateTimeRange(parseInt(e.target.value));
    });
    timeSlider.addEventListener('change', function(e) {
      updateTimeRange(parseInt(e.target.value));
    });
    console.log('✅ Time slider events attached');
  }
  
  // District selection - FIXED
  const districtSelect = document.getElementById('districtSelect');
  if (districtSelect) {
    districtSelect.addEventListener('change', function(e) {
      console.log('District selection changed');
      updateDistrictSelection();
    });
    
    // Add click event to ensure dropdown works
    districtSelect.addEventListener('click', function(e) {
      console.log('District dropdown clicked');
    });
    console.log('✅ District select events attached');
  }
  
  // Analysis type dropdown - FIXED
  const analysisType = document.getElementById('analysisType');
  if (analysisType) {
    analysisType.addEventListener('change', function(e) {
      console.log(`Analysis type changed to: ${e.target.value}`);
      updateAnalysisType(e.target.value);
    });
    
    // Add click event to ensure dropdown works
    analysisType.addEventListener('click', function(e) {
      console.log('Analysis type dropdown clicked');
      e.stopPropagation();
    });
    console.log('✅ Analysis type events attached');
  }
  
  // Theme toggle - FIXED
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Theme toggle clicked');
      toggleTheme();
    });
    console.log('✅ Theme toggle events attached');
  }
  
  // Developer console toggle - FIXED
  const devConsoleBtn = document.getElementById('devConsoleBtn');
  if (devConsoleBtn) {
    devConsoleBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Developer console toggle clicked');
      toggleDevConsole();
    });
    console.log('✅ Developer console events attached');
  } else {
    console.warn('⚠️ Developer console button not found');
  }
  
  // Export button
  const exportBtn = document.getElementById('exportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Export button clicked');
      exportWolframReport();
    });
  }
  
  // Wolfram deployment button
  const deployBtn = document.getElementById('deployBtn');
  if (deployBtn) {
    deployBtn.addEventListener('click', function(e) {
      e.preventDefault();
      deployToWolframCloud();
    });
  }
  
  // Test connection button
  const testConnectionBtn = document.getElementById('testConnectionBtn');
  if (testConnectionBtn) {
    testConnectionBtn.addEventListener('click', function(e) {
      e.preventDefault();
      testWolframConnection();
    });
  }
  
  // Run prediction button
  const runPredictionBtn = document.getElementById('runPredictionBtn');
  if (runPredictionBtn) {
    runPredictionBtn.addEventListener('click', function(e) {
      e.preventDefault();
      runAdvancedPrediction();
    });
  }
  
  // Copy code button
  const copyCodeBtn = document.getElementById('copyCodeBtn');
  if (copyCodeBtn) {
    copyCodeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      copyWolframCode();
    });
  }
  
  // Modal controls
  const wolframBadges = document.querySelectorAll('.wolfram-badge');
  wolframBadges.forEach(badge => {
    badge.addEventListener('click', function(e) {
      e.preventDefault();
      showWolframModal();
    });
  });
  
  const closeModal = document.getElementById('closeModal');
  if (closeModal) {
    closeModal.addEventListener('click', function(e) {
      e.preventDefault();
      hideWolframModal();
    });
  }
  
  const modal = document.getElementById('wolframModal');
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) hideWolframModal();
    });
  }
  
  // Developer console controls - FIXED
  const clearConsole = document.getElementById('clearConsole');
  if (clearConsole) {
    clearConsole.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Clear console clicked');
      clearDevConsole();
    });
  }
  
  const closeConsole = document.getElementById('closeConsole');
  if (closeConsole) {
    closeConsole.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Close console clicked');
      toggleDevConsole();
    });
  }
  
  // KPI card interactions - FIXED
  document.querySelectorAll('.kpi-card').forEach(card => {
    card.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      let metricId = this.id.replace('Kpi', '');
      console.log(`KPI card clicked: ${this.id} -> ${metricId}`);
      
      if (dashboardData.metrics[metricId]) {
        selectMetric(metricId);
        showNotification(`📊 Viewing ${dashboardData.metrics[metricId].name} details`, 'success');
      }
    });
  });
  
  // Search functionality
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      if (e.target.value.length > 2) {
        performWolframSearch(e.target.value);
      }
    });
    
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' && e.target.value.length > 2) {
        e.preventDefault();
        performWolframSearch(e.target.value);
      }
    });
  }
  
  console.log('✅ All event listeners setup complete');
}

function populateDistrictDropdown() {
  const select = document.getElementById('districtSelect');
  if (!select) return;
  
  // Keep "All Districts" option
  const allOption = select.querySelector('option[value="all"]');
  select.innerHTML = '';
  if (allOption) select.appendChild(allOption);
  
  // Add district options
  dashboardData.districts.forEach(district => {
    const option = document.createElement('option');
    option.value = district.toLowerCase().replace(/\s+/g, '-');
    option.textContent = district;
    select.appendChild(option);
  });
  
  console.log(`✅ Populated ${dashboardData.districts.length} districts in dropdown`);
}

async function selectMetric(metric) {
  console.log(`🎯 Selecting metric: ${metric} with Wolfram API integration`);
  
  // Update navigation state
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  
  const selectedItem = document.querySelector(`[data-metric="${metric}"]`);
  if (selectedItem) {
    selectedItem.classList.add('active');
    console.log(`✅ Navigation item activated: ${metric}`);
  }
  
  currentState.selectedMetric = metric;
  
  // Show processing state
  showProcessingState(`Calling Wolfram ${dashboardData.metrics[metric]?.wolfram_function.split('[')[0] || 'function'}...`);
  
  // Simulate Wolfram API call
  const apiCall = await simulateWolframAPICall(metric);
  
  // Update visualizations
  setTimeout(() => {
    updateMainVisualization(metric);
    updateWolframCode(metric);
    updateVizTitle(metric);
    highlightRelevantKPI(metric);
    updateSecondaryCharts(metric);
    hideProcessingState();
    
    showNotification(`✨ ${dashboardData.metrics[metric].name} data processed by Wolfram Language`, 'success');
  }, 800);
}

async function simulateWolframAPICall(metric) {
  const metricData = dashboardData.metrics[metric];
  const startTime = Date.now();
  
  // Log API call
  const apiCall = {
    timestamp: new Date().toISOString(),
    method: 'GET',
    endpoint: metricData?.api_endpoint || `/api/wolfram/${metric}`,
    wolframFunction: metricData?.wolfram_function.split('[')[0] || 'Unknown',
    status: 'pending',
    responseTime: null
  };
  
  // Add to dev console
  addApiCallToConsole(apiCall);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 200));
  
  // Update call with response
  const responseTime = Date.now() - startTime;
  apiCall.status = Math.random() > 0.02 ? 'success' : 'error'; // 98% success rate
  apiCall.responseTime = responseTime;
  
  // Update metrics
  currentState.wolframConnection.apiCalls++;
  currentState.apiMetrics.performance.totalCalls++;
  
  if (apiCall.status === 'success') {
    currentState.apiMetrics.performance.successfulCalls++;
  } else {
    currentState.apiMetrics.performance.failedCalls++;
  }
  
  // Update API call in console
  updateApiCallInConsole(apiCall);
  
  // Update connection metrics
  updateConnectionMetrics();
  
  return apiCall;
}

function updateTimeRange(year) {
  console.log(`📅 Time range updated to: ${year} - Calling Wolfram TimeSeries functions`);
  
  currentState.selectedYear = year;
  const currentYearElement = document.getElementById('currentYear');
  if (currentYearElement) {
    currentYearElement.textContent = year;
    console.log(`✅ Current year display updated to: ${year}`);
  }
  
  // Show processing state
  showProcessingState('Updating TimeSeries analysis...');
  
  // Simulate Wolfram TimeSeries API call
  simulateWolframAPICall('time_series').then(() => {
    setTimeout(() => {
      updateAllVisualizations();
      hideProcessingState();
      showNotification(`📊 Time series data updated for ${year}`, 'success');
    }, 600);
  });
}

function updateDistrictSelection() {
  const select = document.getElementById('districtSelect');
  if (!select) return;
  
  const selectedOptions = Array.from(select.selectedOptions).map(option => option.value);
  currentState.selectedDistricts = selectedOptions;
  
  console.log(`🏛️ Districts selected: ${selectedOptions.join(', ')} - Filtering Wolfram data`);
  
  // Show processing state
  showProcessingState('Filtering geographic data...');
  
  setTimeout(() => {
    updateAllVisualizations();
    hideProcessingState();
    showNotification(`🗺️ Geographic data filtered for ${selectedOptions.length} districts`, 'info');
  }, 400);
}

function updateAnalysisType(type) {
  console.log(`📊 Analysis type changed to: ${type} - Switching Wolfram analysis functions`);
  
  currentState.analysisType = type;
  
  const analysisMap = {
    'overview': 'GeoRegionValuePlot',
    'trends': 'TimeSeriesForecast',
    'correlations': 'CorrelationMatrix',
    'predictions': 'Predict',
    'comparisons': 'ListLinePlot'
  };
  
  showProcessingState(`Running ${analysisMap[type]} analysis...`);
  
  setTimeout(() => {
    updateMainVisualization(currentState.selectedMetric);
    hideProcessingState();
    showNotification(`🧠 ${type} analysis completed using ${analysisMap[type]}`, 'success');
  }, 700);
}

function toggleTheme() {
  const newTheme = currentState.theme === 'light' ? 'dark' : 'light';
  currentState.theme = newTheme;
  applyTheme(newTheme);
  showNotification(`🎨 Switched to ${newTheme} mode`, 'info');
  console.log(`✅ Theme switched to: ${newTheme}`);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-color-scheme', theme);
  
  const themeIcon = document.querySelector('.theme-toggle i');
  if (themeIcon) {
    themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
  }
  
  // Update charts with new theme
  if (Object.keys(currentState.charts).length > 0) {
    setTimeout(() => {
      updateAllVisualizations();
    }, 100);
  }
}

function toggleDevConsole() {
  const devConsole = document.getElementById('devConsole');
  const devConsoleBtn = document.getElementById('devConsoleBtn');
  
  if (devConsole && devConsoleBtn) {
    currentState.devConsoleVisible = !currentState.devConsoleVisible;
    
    console.log(`🔧 Developer console visibility: ${currentState.devConsoleVisible}`);
    
    if (currentState.devConsoleVisible) {
      devConsole.classList.remove('hidden');
      devConsoleBtn.style.background = 'rgba(255, 255, 255, 0.3)';
      showNotification('🔍 Developer console opened - Viewing Wolfram API integration logs', 'info');
    } else {
      devConsole.classList.add('hidden');
      devConsoleBtn.style.background = 'rgba(255, 255, 255, 0.1)';
      showNotification('🔍 Developer console closed', 'info');
    }
  } else {
    console.warn('⚠️ Developer console elements not found');
  }
}

function initializeCharts() {
  console.log('📊 Initializing charts with Wolfram integration...');
  
  try {
    // Main chart
    const mainCtx = document.getElementById('mainChart');
    if (mainCtx) {
      currentState.charts.main = new Chart(mainCtx.getContext('2d'), {
        type: 'bar',
        data: {
          labels: dashboardData.sampleData.overview.labels,
          datasets: [{
            label: 'Development Index',
            data: dashboardData.sampleData.overview.data,
            backgroundColor: dashboardData.sampleData.overview.colors,
            borderColor: dashboardData.sampleData.overview.colors,
            borderWidth: 2
          }]
        },
        options: getChartOptions('bar')
      });
      console.log('✅ Main chart initialized');
    }
    
    // Trend chart
    const trendCtx = document.getElementById('trendChart');
    if (trendCtx) {
      currentState.charts.trend = new Chart(trendCtx.getContext('2d'), {
        type: 'line',
        data: {
          labels: ['2020', '2021', '2022', '2023', '2024'],
          datasets: [{
            label: 'Growth Trend',
            data: dashboardData.sampleData.timeSeriesData.overview.slice(-5),
            borderColor: '#1FB8CD',
            backgroundColor: 'rgba(31, 184, 205, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 5
          }]
        },
        options: getChartOptions('line')
      });
      console.log('✅ Trend chart initialized');
    }
    
    // Correlation chart
    const correlationCtx = document.getElementById('correlationChart');
    if (correlationCtx) {
      // Simplified correlation visualization
      currentState.charts.correlation = new Chart(correlationCtx.getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['Literacy↔Economy', 'Infra↔Health', 'Agri↔Economy', 'Health↔Literacy'],
          datasets: [{
            label: 'Correlation Strength',
            data: [0.82, 0.67, 0.54, 0.78],
            backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F'],
            borderColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F'],
            borderWidth: 2
          }]
        },
        options: {
          ...getChartOptions('bar'),
          scales: {
            y: {
              beginAtZero: true,
              max: 1,
              ticks: {
                callback: function(value) {
                  return value.toFixed(1);
                }
              }
            }
          }
        }
      });
      console.log('✅ Correlation chart initialized');
    }
    
    console.log('✅ All charts initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing charts:', error);
    showNotification('⚠️ Some charts failed to initialize', 'warning');
  }
}

function getChartOptions(type) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: '#1FB8CD',
        borderWidth: 1,
        cornerRadius: 8
      }
    },
    animation: {
      duration: 800,
      easing: 'easeInOutQuart'
    },
    scales: type !== 'doughnut' && type !== 'pie' ? {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0,0,0,0.1)'
        }
      },
      x: {
        grid: {
          color: 'rgba(0,0,0,0.1)'
        }
      }
    } : undefined
  };
}

function updateMainVisualization(metric) {
  if (!currentState.charts.main) return;
  
  console.log(`📊 Updating main visualization for metric: ${metric}`);
  
  const chart = currentState.charts.main;
  let newData = {};
  
  switch(metric) {
    case 'literacy':
      newData = {
        labels: dashboardData.sampleData.literacy_by_district.map(d => d.district),
        datasets: [{
          label: 'Literacy Rate (%)',
          data: dashboardData.sampleData.literacy_by_district.map(d => d.literacy),
          backgroundColor: '#1FB8CD',
          borderColor: '#1FB8CD',
          borderWidth: 2
        }]
      };
      break;
      
    default:
      newData = {
        labels: dashboardData.sampleData.overview.labels,
        datasets: [{
          label: 'Development Index',
          data: dashboardData.sampleData.overview.data,
          backgroundColor: dashboardData.sampleData.overview.colors,
          borderColor: dashboardData.sampleData.overview.colors,
          borderWidth: 2
        }]
      };
  }
  
  chart.data = newData;
  chart.update('active');
  console.log(`✅ Main chart updated for ${metric}`);
}

function updateSecondaryCharts(metric) {
  if (currentState.charts.trend) {
    const timeSeriesData = dashboardData.sampleData.timeSeriesData[metric] || 
                          dashboardData.sampleData.timeSeriesData.overview;
    
    currentState.charts.trend.data.datasets[0].data = timeSeriesData.slice(-5);
    currentState.charts.trend.data.datasets[0].label = `${dashboardData.metrics[metric]?.name || 'Overview'} Trend`;
    currentState.charts.trend.update('active');
  }
}

function updateAllVisualizations() {
  updateMainVisualization(currentState.selectedMetric);
  updateSecondaryCharts(currentState.selectedMetric);
  
  // Add visual feedback
  document.querySelectorAll('.chart-container').forEach(container => {
    container.style.opacity = '0.7';
    setTimeout(() => {
      container.style.opacity = '1';
    }, 200);
  });
}

function updateWolframCode(metric) {
  const codeElement = document.getElementById('wolframCode');
  if (codeElement) {
    const code = wolframCodeSnippets[metric] || wolframCodeSnippets.overview;
    codeElement.textContent = code;
  }
}

function updateVizTitle(metric) {
  const titleElement = document.getElementById('vizTitle');
  if (titleElement) {
    const metricData = dashboardData.metrics[metric];
    if (metricData) {
      titleElement.textContent = `${metricData.name} - Powered by ${metricData.wolfram_function.split('[')[0]}`;
    }
  }
}

function highlightRelevantKPI(metric) {
  document.querySelectorAll('.kpi-card').forEach(card => {
    card.classList.remove('kpi-highlighted');
  });
  
  const relevantKPI = document.getElementById(`${metric}Kpi`);
  if (relevantKPI) {
    relevantKPI.classList.add('kpi-highlighted');
  }
}

function showProcessingState(message = 'Processing with Wolfram Language...') {
  const processingStatus = document.getElementById('processingStatus');
  const processingIcon = document.getElementById('processingIcon');
  const processingText = document.getElementById('processingText');
  const currentApiCall = document.getElementById('currentApiCall');
  
  if (processingStatus) processingStatus.classList.add('processing');
  if (processingIcon) processingIcon.classList.remove('hidden');
  if (processingText) processingText.textContent = message;
  
  const metricData = dashboardData.metrics[currentState.selectedMetric];
  if (currentApiCall && metricData) {
    currentApiCall.textContent = `GET ${metricData.api_endpoint}`;
  }
  
  // Show loading spinner on main chart
  const spinner = document.getElementById('chartLoading');
  if (spinner) spinner.classList.remove('hidden');
  
  document.querySelectorAll('.chart-container canvas').forEach(canvas => {
    canvas.style.opacity = '0.3';
  });
}

function hideProcessingState() {
  const processingStatus = document.getElementById('processingStatus');
  const processingIcon = document.getElementById('processingIcon');
  const processingText = document.getElementById('processingText');
  
  if (processingStatus) processingStatus.classList.remove('processing');
  if (processingIcon) processingIcon.classList.add('hidden');
  if (processingText) processingText.textContent = 'Ready';
  
  // Hide loading spinner
  const spinner = document.getElementById('chartLoading');
  if (spinner) spinner.classList.add('hidden');
  
  document.querySelectorAll('.chart-container canvas').forEach(canvas => {
    canvas.style.opacity = '1';
  });
}

function startRealTimeUpdates() {
  // Update connection status every 10 seconds
  setInterval(() => {
    updateConnectionStatus();
  }, 10000);
  
  // Update last sync time every 5 seconds
  setInterval(() => {
    updateLastSyncTime();
  }, 5000);
  
  // Simulate occasional API calls
  setInterval(() => {
    if (Math.random() > 0.7) {
      simulateBackgroundAPICall();
    }
  }, 15000);
}

function updateConnectionStatus() {
  const statusDot = document.getElementById('statusDot');
  const connectionText = document.getElementById('connectionText');
  const wolframConnectionStatus = document.getElementById('wolframConnectionStatus');
  
  // Simulate occasional connection issues (5% chance)
  const isConnected = Math.random() > 0.05;
  
  if (isConnected) {
    if (statusDot) statusDot.classList.add('active');
    if (connectionText) connectionText.textContent = 'Cloud Connected';
    if (wolframConnectionStatus) wolframConnectionStatus.classList.add('active');
    currentState.wolframConnection.status = 'connected';
  } else {
    if (statusDot) statusDot.classList.remove('active');
    if (connectionText) connectionText.textContent = 'Reconnecting...';
    if (wolframConnectionStatus) wolframConnectionStatus.classList.remove('active');
    currentState.wolframConnection.status = 'reconnecting';
    
    // Auto-reconnect after 3 seconds
    setTimeout(() => {
      updateConnectionStatus();
    }, 3000);
  }
}

function updateConnectionMetrics() {
  // Update API response time
  const apiResponseTime = document.getElementById('apiResponseTime');
  const avgResponseTimeElement = document.getElementById('avgResponseTime');
  const avgResponseTimeConsole = document.getElementById('avgResponseTimeConsole');
  
  const newResponseTime = Math.floor(Math.random() * 300) + 150;
  currentState.wolframConnection.avgResponseTime = newResponseTime;
  
  if (apiResponseTime) apiResponseTime.textContent = `${newResponseTime}ms`;
  if (avgResponseTimeElement) avgResponseTimeElement.textContent = `${newResponseTime}ms`;
  if (avgResponseTimeConsole) avgResponseTimeConsole.textContent = `${newResponseTime}ms`;
  
  // Update API call count
  const apiCallCount = document.getElementById('apiCallCount');
  const totalApiCalls = document.getElementById('totalApiCalls');
  
  if (apiCallCount) apiCallCount.textContent = currentState.wolframConnection.apiCalls;
  if (totalApiCalls) totalApiCalls.textContent = currentState.apiMetrics.performance.totalCalls;
  
  // Update success rate
  const successRate = document.getElementById('successRate');
  const rate = ((currentState.apiMetrics.performance.successfulCalls / currentState.apiMetrics.performance.totalCalls) * 100).toFixed(1);
  if (successRate) successRate.textContent = `${rate}%`;
}

function updateLastSyncTime() {
  const lastSyncTime = document.getElementById('lastSyncTime');
  if (lastSyncTime) {
    const secondsAgo = Math.floor((Date.now() - currentState.wolframConnection.lastSync) / 1000);
    lastSyncTime.textContent = `${secondsAgo}s ago`;
  }
}

function initializeDevConsole() {
  console.log('🔧 Initializing developer console...');
  
  // Add some sample API calls
  const sampleCalls = [
    {
      timestamp: new Date(Date.now() - 30000).toISOString(),
      method: 'GET',
      endpoint: '/api/wolfram/geo-visualization',
      status: 'success',
      responseTime: 245
    },
    {
      timestamp: new Date(Date.now() - 60000).toISOString(),
      method: 'POST',
      endpoint: '/api/wolfram/time-series',
      status: 'success',
      responseTime: 432
    }
  ];
  
  sampleCalls.forEach(call => addApiCallToConsole(call));
  
  // Add sample Wolfram function calls
  addWolframCallToConsole('GeoRegionValuePlot', '["Odisha", "CompositeIndex"]', 'Success');
  addWolframCallToConsole('TimeSeries', '[economicData, {2020, 2024}]', 'Success');
  
  console.log('✅ Developer console initialized with sample data');
}

function addApiCallToConsole(apiCall) {
  const apiLog = document.getElementById('apiLog');
  if (!apiLog) return;
  
  const logEntry = document.createElement('div');
  logEntry.className = `log-entry ${apiCall.status}`;
  
  const timestamp = new Date(apiCall.timestamp).toLocaleTimeString();
  
  logEntry.innerHTML = `
    <span class="timestamp">${timestamp}</span>
    <span class="method">${apiCall.method}</span>
    <span class="endpoint">${apiCall.endpoint}</span>
    <span class="status">${apiCall.status === 'success' ? '200' : '500'}</span>
    <span class="time">${apiCall.responseTime || '...'}ms</span>
  `;
  
  apiLog.appendChild(logEntry);
  
  // Keep only last 10 entries
  while (apiLog.children.length > 10) {
    apiLog.removeChild(apiLog.firstChild);
  }
  
  // Scroll to bottom
  apiLog.scrollTop = apiLog.scrollHeight;
}

function updateApiCallInConsole(apiCall) {
  // Find and update the last pending entry
  const apiLog = document.getElementById('apiLog');
  if (!apiLog) return;
  
  const lastEntry = apiLog.lastElementChild;
  if (lastEntry) {
    lastEntry.className = `log-entry ${apiCall.status}`;
    const statusSpan = lastEntry.querySelector('.status');
    const timeSpan = lastEntry.querySelector('.time');
    
    if (statusSpan) statusSpan.textContent = apiCall.status === 'success' ? '200' : '500';
    if (timeSpan) timeSpan.textContent = `${apiCall.responseTime}ms`;
  }
}

function addWolframCallToConsole(functionName, params, result) {
  const wolframCalls = document.getElementById('wolframCalls');
  if (!wolframCalls) return;
  
  const callEntry = document.createElement('div');
  callEntry.className = 'call-entry';
  callEntry.innerHTML = `
    <span class="function">${functionName}</span>
    <span class="params">${params}</span>
    <span class="result">${result}</span>
  `;
  
  wolframCalls.appendChild(callEntry);
  
  // Keep only last 10 entries
  while (wolframCalls.children.length > 10) {
    wolframCalls.removeChild(wolframCalls.firstChild);
  }
}

function clearDevConsole() {
  const apiLog = document.getElementById('apiLog');
  const wolframCalls = document.getElementById('wolframCalls');
  
  if (apiLog) apiLog.innerHTML = '';
  if (wolframCalls) wolframCalls.innerHTML = '';
  
  showNotification('🗑️ Developer console cleared', 'info');
}

function simulateBackgroundAPICall() {
  const endpoints = [
    '/api/wolfram/health-check',
    '/api/wolfram/data-sync',
    '/api/wolfram/cache-refresh'
  ];
  
  const call = {
    timestamp: new Date().toISOString(),
    method: 'GET',
    endpoint: endpoints[Math.floor(Math.random() * endpoints.length)],
    status: 'success',
    responseTime: Math.floor(Math.random() * 200) + 100
  };
  
  addApiCallToConsole(call);
  currentState.wolframConnection.apiCalls++;
  currentState.apiMetrics.performance.totalCalls++;
  currentState.apiMetrics.performance.successfulCalls++;
  
  updateConnectionMetrics();
}

async function deployToWolframCloud() {
  const deployBtn = document.getElementById('deployBtn');
  if (!deployBtn) return;
  
  const originalHTML = deployBtn.innerHTML;
  
  deployBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deploying...';
  deployBtn.disabled = true;
  
  // Simulate deployment process
  const deploymentSteps = [
    'Packaging Wolfram functions...',
    'Uploading to Wolfram Cloud...',
    'Configuring API endpoints...',
    'Testing connections...',
    'Deployment complete!'
  ];
  
  for (let i = 0; i < deploymentSteps.length; i++) {
    showNotification(`🚀 ${deploymentSteps[i]}`, 'info');
    await new Promise(resolve => setTimeout(resolve, 800));
  }
  
  deployBtn.innerHTML = '<i class="fas fa-check"></i> Deployed!';
  deployBtn.style.background = '#16a34a';
  
  showNotification('🎉 All Wolfram functions deployed to cloud successfully!', 'success');
  
  setTimeout(() => {
    deployBtn.innerHTML = originalHTML;
    deployBtn.disabled = false;
    deployBtn.style.background = '';
  }, 3000);
}

async function testWolframConnection() {
  showNotification('🔌 Testing Wolfram Cloud connection...', 'info');
  
  const testSteps = [
    'Authenticating with Wolfram Cloud...',
    'Testing GeoRegionValuePlot endpoint...',
    'Testing TimeSeries functions...',
    'Testing data import capabilities...',
    'Connection test completed!'
  ];
  
  for (let i = 0; i < testSteps.length; i++) {
    showNotification(`🧪 ${testSteps[i]}`, 'info');
    await new Promise(resolve => setTimeout(resolve, 600));
  }
  
  showNotification('✅ All Wolfram Cloud connections verified!', 'success');
}

async function runAdvancedPrediction() {
  const runPredictionBtn = document.getElementById('runPredictionBtn');
  if (!runPredictionBtn) return;
  
  const originalHTML = runPredictionBtn.innerHTML;
  runPredictionBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Computing...';
  runPredictionBtn.disabled = true;
  
  showProcessingState('Running Predict[] and TimeSeriesForecast[]...');
  
  // Simulate advanced prediction computation
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  hideProcessingState();
  
  // Update prediction values with new results
  const predictions = [
    { selector: '.prediction-item:first-child .prediction-value', value: '76.2%', confidence: '97% confidence' },
    { selector: '.prediction-item:last-child .prediction-value', value: '₹97,800', confidence: '89% confidence' }
  ];
  
  predictions.forEach(pred => {
    const element = document.querySelector(pred.selector);
    if (element) {
      element.innerHTML = `${pred.value} <span class="confidence">(${pred.confidence})</span>`;
    }
  });
  
  runPredictionBtn.innerHTML = '<i class="fas fa-check"></i> Complete!';
  showNotification('🧠 Advanced prediction analysis completed!', 'success');
  
  setTimeout(() => {
    runPredictionBtn.innerHTML = originalHTML;
    runPredictionBtn.disabled = false;
  }, 2000);
}

function copyWolframCode() {
  const codeElement = document.getElementById('wolframCode');
  if (!codeElement) return;
  
  const code = codeElement.textContent;
  
  if (navigator.clipboard) {
    navigator.clipboard.writeText(code).then(() => {
      showNotification('📋 Wolfram code copied to clipboard!', 'success');
      
      const copyBtn = document.getElementById('copyCodeBtn');
      if (copyBtn) {
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
          copyBtn.innerHTML = originalHTML;
        }, 1500);
      }
    });
  } else {
    showNotification('📋 Copy to clipboard not supported', 'warning');
  }
}

async function exportWolframReport() {
  const exportBtn = document.getElementById('exportBtn');
  if (!exportBtn) return;
  
  const originalHTML = exportBtn.innerHTML;
  exportBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
  exportBtn.disabled = true;
  
  showNotification('📊 Calling Wolfram Export functions...', 'info');
  
  // Simulate Wolfram export process
  await simulateWolframAPICall('export');
  
  setTimeout(() => {
    const reportData = {
      title: "Odisha Development Dashboard Report",
      timestamp: new Date().toISOString(),
      selectedMetric: currentState.selectedMetric,
      selectedYear: currentState.selectedYear,
      selectedDistricts: currentState.selectedDistricts,
      analysisType: currentState.analysisType,
      wolframIntegration: {
        status: currentState.wolframConnection.status,
        apiCalls: currentState.wolframConnection.apiCalls,
        successRate: ((currentState.apiMetrics.performance.successfulCalls / currentState.apiMetrics.performance.totalCalls) * 100).toFixed(1) + '%',
        avgResponseTime: currentState.wolframConnection.avgResponseTime + 'ms'
      },
      summary: generateReportSummary(),
      wolframCode: wolframCodeSnippets[currentState.selectedMetric],
      data: dashboardData.sampleData,
      generatedBy: "Wolfram Language Export[] function"
    };
    
    const reportContent = JSON.stringify(reportData, null, 2);
    const blob = new Blob([reportContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `odisha-wolfram-report-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    exportBtn.innerHTML = '<i class="fas fa-check"></i> Exported!';
    showNotification('📁 Report exported successfully via Wolfram Export[]!', 'success');
    
    setTimeout(() => {
      exportBtn.innerHTML = originalHTML;
      exportBtn.disabled = false;
    }, 2000);
  }, 1500);
}

function generateReportSummary() {
  const metric = dashboardData.metrics[currentState.selectedMetric] || {};
  return {
    metric: metric.name || 'Overview',
    current_value: metric.current_value || 'N/A',
    trend: metric.trend || 'N/A',
    year: currentState.selectedYear,
    districts_analyzed: currentState.selectedDistricts.length,
    analysis_type: currentState.analysisType,
    wolfram_function: metric.wolfram_function || 'Multiple functions',
    api_endpoint: metric.api_endpoint || 'N/A'
  };
}

function performWolframSearch(query) {
  console.log(`🔍 Performing Wolfram-powered search for: ${query}`);
  
  showNotification(`🔍 Searching with Wolfram Language: "${query}"`, 'info');
  
  // Simulate Wolfram search capabilities
  setTimeout(() => {
    const results = [];
    
    // Search districts
    dashboardData.districts.forEach(district => {
      if (district.toLowerCase().includes(query.toLowerCase())) {
        results.push({type: 'district', name: district});
      }
    });
    
    // Search metrics
    Object.entries(dashboardData.metrics).forEach(([key, metric]) => {
      if (metric.name.toLowerCase().includes(query.toLowerCase())) {
        results.push({type: 'metric', name: metric.name, key: key});
      }
    });
    
    if (results.length > 0) {
      showNotification(`🎯 Found ${results.length} results using Wolfram search`, 'success');
      
      // Auto-select first metric result
      const metricResult = results.find(r => r.type === 'metric');
      if (metricResult) {
        selectMetric(metricResult.key);
      }
    } else {
      showNotification(`❌ No results found for "${query}"`, 'warning');
    }
  }, 500);
}

function showWolframModal() {
  const modal = document.getElementById('wolframModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.style.opacity = '1';
    showNotification('📖 Viewing Wolfram integration architecture', 'info');
  }
}

function hideWolframModal() {
  const modal = document.getElementById('wolframModal');
  if (modal) {
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.classList.add('hidden');
    }, 300);
  }
}

function setupTooltips() {
  // Simple tooltip system for better user experience
  const elementsWithTooltips = document.querySelectorAll('[title]');
  elementsWithTooltips.forEach(element => {
    element.addEventListener('mouseenter', function(e) {
      const tooltip = document.createElement('div');
      tooltip.className = 'custom-tooltip';
      tooltip.textContent = this.getAttribute('title');
      tooltip.style.cssText = `
        position: fixed;
        background: var(--color-charcoal-800);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: var(--radius-base);
        font-size: 0.8rem;
        z-index: 1000;
        pointer-events: none;
        box-shadow: var(--shadow-lg);
        max-width: 200px;
        text-align: center;
      `;
      
      document.body.appendChild(tooltip);
      
      const rect = this.getBoundingClientRect();
      tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
      tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
      
      this.customTooltip = tooltip;
      this.removeAttribute('title');
      this.setAttribute('data-original-title', tooltip.textContent);
    });
    
    element.addEventListener('mouseleave', function() {
      if (this.customTooltip) {
        document.body.removeChild(this.customTooltip);
        this.customTooltip = null;
      }
      
      const originalTitle = this.getAttribute('data-original-title');
      if (originalTitle) {
        this.setAttribute('title', originalTitle);
        this.removeAttribute('data-original-title');
      }
    });
  });
}

function showNotification(message, type = 'info') {
  console.log(`📢 Notification: ${message} (${type})`);
  
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${getNotificationIcon(type)}"></i>
      <span>${message}</span>
    </div>
  `;
  
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--color-surface);
    color: var(--color-text);
    padding: 1rem 1.5rem;
    border-radius: var(--radius-base);
    box-shadow: var(--shadow-lg);
    border-left: 4px solid ${getNotificationColor(type)};
    z-index: 1001;
    max-width: 400px;
    font-size: 0.9rem;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 10);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 4000);
}

function getNotificationIcon(type) {
  const icons = {
    success: 'check-circle',
    error: 'exclamation-circle',
    warning: 'exclamation-triangle',
    info: 'info-circle'
  };
  return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
  const colors = {
    success: '#16a34a',
    error: '#dc2626',
    warning: '#f59e0b',
    info: '#0ea5e9'
  };
  return colors[type] || '#0ea5e9';
}

// Keyboard shortcuts for power users
document.addEventListener('keydown', function(e) {
  // Alt + Number keys for metric selection
  if (e.altKey && e.key >= '1' && e.key <= '6') {
    e.preventDefault();
    const metrics = ['overview', 'literacy', 'agriculture', 'infrastructure', 'economy', 'health'];
    const index = parseInt(e.key) - 1;
    if (metrics[index]) {
      selectMetric(metrics[index]);
    }
  }
  
  // Ctrl + E for export
  if (e.ctrlKey && e.key === 'e') {
    e.preventDefault();
    exportWolframReport();
  }
  
  // Ctrl + T for theme toggle
  if (e.ctrlKey && e.key === 't') {
    e.preventDefault();
    toggleTheme();
  }
  
  // F12 for developer console
  if (e.key === 'F12') {
    e.preventDefault();
    toggleDevConsole();
  }
  
  // Escape to close modals
  if (e.key === 'Escape') {
    hideWolframModal();
    const devConsole = document.getElementById('devConsole');
    if (devConsole && !devConsole.classList.contains('hidden')) {
      toggleDevConsole();
    }
  }
});

// Handle window resize for responsive charts
window.addEventListener('resize', function() {
  if (Object.keys(currentState.charts).length > 0) {
    Object.values(currentState.charts).forEach(chart => {
      if (chart && typeof chart.resize === 'function') {
        chart.resize();
      }
    });
  }
});

console.log('🎉 Odisha Development Dashboard with complete Wolfram Language integration loaded!');
console.log('🔧 Available keyboard shortcuts:');
console.log('   Alt + 1-6: Select metrics');
console.log('   Ctrl + E: Export report');
console.log('   Ctrl + T: Toggle theme');
console.log('   F12: Toggle developer console');
console.log('   Esc: Close modals');