// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Animate stats on load
    animateStats();
    
    // Initialize charts
    initializeCharts();
    
    // Initialize project charts
    initializeProjectCharts();
    
    // Animate skill bars
    animateSkillBars();
    
    // Set default section
    showSection('overview');
});

// Toggle menu
function toggleMenu() {
    const menu = document.getElementById('sideMenu');
    menu.classList.toggle('active');
}

// Show section
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Close menu on mobile
    const menu = document.getElementById('sideMenu');
    menu.classList.remove('active');
    
    // Re-animate elements in the new section
    if (sectionId === 'overview') {
        animateStats();
    } else if (sectionId === 'skills') {
        animateSkillBars();
    } else if (sectionId === 'analytics') {
        updateCharts();
    }
}

// Animate stat cards
function animateCard(card) {
    card.classList.add('animated');
    setTimeout(() => {
        card.classList.remove('animated');
    }, 500);
}

// Animate stats counting
function animateStats() {
    const statValues = document.querySelectorAll('.stat-value');
    
    statValues.forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                if (target < 10) {
                    stat.textContent = current.toFixed(1);
                } else {
                    stat.textContent = Math.floor(current);
                }
                requestAnimationFrame(updateCounter);
            } else {
                if (target < 10) {
                    stat.textContent = target.toFixed(1);
                } else {
                    stat.textContent = Math.floor(target);
                }
            }
        };
        
        updateCounter();
    });
}

// Initialize charts
let salesChart, segmentChart, regionChart;

function initializeCharts() {
    // Sales Chart with realistic e-commerce data
    const salesCtx = document.getElementById('salesChart');
    if (salesCtx) {
        salesChart = new Chart(salesCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Sales Revenue',
                    data: [128500, 135200, 142800, 138600, 155400, 168900],
                    borderColor: '#ff9ff3',
                    backgroundColor: 'rgba(255, 159, 243, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 3
                }, {
                    label: 'Previous Year',
                    data: [115000, 118500, 124000, 126800, 132500, 145000],
                    borderColor: '#feca57',
                    backgroundColor: 'rgba(254, 202, 87, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2,
                    borderDash: [5, 5]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#5a4a6a'
                        }
                    }
                },
                scales: {
                    y: {
                        grid: {
                            color: 'rgba(255, 182, 193, 0.1)'
                        },
                        ticks: {
                            color: '#9a8aa8',
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 182, 193, 0.1)'
                        },
                        ticks: {
                            color: '#888'
                        }
                    }
                }
            }
        });
    }
    
    // Customer Segmentation Chart with realistic distribution
    const segmentCtx = document.getElementById('segmentChart');
    if (segmentCtx) {
        segmentChart = new Chart(segmentCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Loyal Customers (2+ years)', 'Active Buyers (6-24 months)', 'New Customers (<6 months)', 'One-time Buyers', 'At Risk (Inactive 3+ months)'],
                datasets: [{
                    data: [18, 32, 28, 15, 7],
                    backgroundColor: [
                        '#ff9ff3',
                        '#feca57',
                        '#98d8c8',
                        '#ffb6c1',
                        '#dda0dd'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#ffffff',
                            padding: 20
                        }
                    }
                }
            }
        });
    }
    
    // Regional Performance Chart
    const regionCtx = document.getElementById('regionChart');
    if (regionCtx) {
        regionChart = new Chart(regionCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['North', 'South', 'East', 'West', 'Central'],
                datasets: [{
                    label: 'Revenue',
                    data: [125000, 98000, 115000, 102000, 87000],
                    backgroundColor: 'rgba(255, 159, 243, 0.8)',
                    borderColor: '#ff9ff3',
                    borderWidth: 1
                }, {
                    label: 'Target',
                    data: [120000, 100000, 110000, 100000, 90000],
                    backgroundColor: 'rgba(254, 202, 87, 0.8)',
                    borderColor: '#feca57',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#5a4a6a'
                        }
                    }
                },
                scales: {
                    y: {
                        grid: {
                            color: 'rgba(255, 182, 193, 0.1)'
                        },
                        ticks: {
                            color: '#9a8aa8',
                            callback: function(value) {
                                return '$' + (value/1000) + 'K';
                            }
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 182, 193, 0.1)'
                        },
                        ticks: {
                            color: '#888'
                        }
                    }
                }
            }
        });
    }
}

// Update charts based on filters
function updateCharts() {
    const categoryFilter = document.getElementById('categoryFilter');
    const periodFilter = document.getElementById('periodFilter');
    
    if (!categoryFilter || !periodFilter) return;
    
    const category = categoryFilter.value;
    const period = periodFilter.value;
    
    // Realistic sales data variations
    let currentYearData, previousYearData, labels;
    
    if (period === 'month') {
        labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        if (category === 'electronics') {
            currentYearData = [42800, 38500, 51200, 47900];
            previousYearData = [38200, 35100, 46800, 42500];
        } else if (category === 'fashion') {
            currentYearData = [35600, 41200, 38900, 44300];
            previousYearData = [32400, 37800, 35200, 39800];
        } else {
            currentYearData = [39200, 45800, 42100, 48500];
            previousYearData = [36800, 41500, 38900, 43200];
        }
    } else if (period === 'quarter') {
        labels = ['Q1', 'Q2', 'Q3', 'Q4'];
        if (category === 'electronics') {
            currentYearData = [385600, 412800, 456200, 478900];
            previousYearData = [342100, 378500, 401200, 425600];
        } else if (category === 'fashion') {
            currentYearData = [298500, 356200, 389600, 412800];
            previousYearData = [268900, 321500, 347800, 378200];
        } else {
            currentYearData = [406300, 436800, 468900, 496200];
            previousYearData = [375800, 398500, 426300, 451200];
        }
    } else {
        labels = ['2019', '2020', '2021', '2022', '2023', '2024'];
        currentYearData = [1580000, 1485000, 1920000, 2180000, 2450000, 2680000];
        previousYearData = [1420000, 1350000, 1680000, 1950000, 2180000, 2350000];
    }
    
    if (salesChart) {
        salesChart.data.labels = labels;
        salesChart.data.datasets[0].data = currentYearData;
        salesChart.data.datasets[1].data = previousYearData;
        salesChart.update();
    }
    
    // Update customer segmentation based on category
    if (segmentChart) {
        let segmentData;
        if (category === 'electronics') {
            segmentData = [22, 35, 25, 12, 6]; // Electronics customers tend to be more loyal
        } else if (category === 'fashion') {
            segmentData = [15, 28, 32, 18, 7]; // Fashion has more new customers
        } else {
            segmentData = [18, 32, 28, 15, 7]; // Overall distribution
        }
        
        segmentChart.data.datasets[0].data = segmentData;
        segmentChart.update();
    }
}

// Animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target.getAttribute('data-skill');
                entry.target.style.width = skillLevel + '%';
            }
        });
    });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Expand project card
function expandProject(card) {
    const projectsSection = document.querySelector('.projects-section');
    const backButton = document.querySelector('.back-to-projects');
    const allCards = document.querySelectorAll('.project-card');
    
    // Remove active class from all cards
    allCards.forEach(c => c.classList.remove('active'));
    
    // Add active class to clicked card
    card.classList.add('active');
    
    // Add expanded class to projects section
    projectsSection.classList.add('expanded');
    
    // Show back button
    backButton.classList.add('show');
    
    // Scroll to top of the project
    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Back to projects function
function backToProjects() {
    const projectsSection = document.querySelector('.projects-section');
    const backButton = document.querySelector('.back-to-projects');
    const allCards = document.querySelectorAll('.project-card');
    
    // Remove active class from all cards
    allCards.forEach(c => c.classList.remove('active'));
    
    // Remove expanded class from projects section
    projectsSection.classList.remove('expanded');
    
    // Hide back button
    backButton.classList.remove('show');
    
    // Scroll to projects section
    projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Initialize project charts
let projectCharts = {};

function initializeProjectCharts() {
    // COVID-19 Project Charts
    initCovidCharts();
    
    // Diabetes Project Charts
    initDiabetesCharts();
    
    // Excel Analytics Charts
    initExcelCharts();
}

function initCovidCharts() {
    // COVID Country Chart
    const covidCountryCtx = document.getElementById('covidCountryChart');
    if (covidCountryCtx) {
        projectCharts.covidCountry = new Chart(covidCountryCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Saudi Arabia', 'UAE', 'Qatar', 'Kuwait', 'Bahrain', 'Oman'],
                datasets: [{
                    label: 'Total Cases',
                    data: [157612, 41499, 89452, 42788, 27414, 49262],
                    backgroundColor: 'rgba(255, 159, 243, 0.8)',
                    borderColor: '#ff9ff3',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#5a4a6a' } }
                },
                scales: {
                    y: { 
                        ticks: { color: '#9a8aa8' },
                        grid: { color: 'rgba(255, 182, 193, 0.1)' }
                    },
                    x: { 
                        ticks: { color: '#888' },
                        grid: { color: 'rgba(255, 182, 193, 0.1)' }
                    }
                }
            }
        });
    }

    // COVID Recovery Chart
    const covidRecoveryCtx = document.getElementById('covidRecoveryChart');
    if (covidRecoveryCtx) {
        projectCharts.covidRecovery = new Chart(covidRecoveryCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                datasets: [{
                    label: 'Recovery Rate %',
                    data: [45, 52, 61, 67, 72, 78],
                    borderColor: '#ff6b9d',
                    backgroundColor: 'rgba(255, 107, 157, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#5a4a6a' } }
                },
                scales: {
                    y: { 
                        ticks: { color: '#9a8aa8' },
                        grid: { color: 'rgba(255, 182, 193, 0.1)' }
                    },
                    x: { 
                        ticks: { color: '#888' },
                        grid: { color: 'rgba(255, 182, 193, 0.1)' }
                    }
                }
            }
        });
    }

    // COVID Monthly Chart
    const covidMonthlyCtx = document.getElementById('covidMonthlyChart');
    if (covidMonthlyCtx) {
        projectCharts.covidMonthly = new Chart(covidMonthlyCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                datasets: [{
                    data: [8, 12, 18, 22, 25, 15],
                    backgroundColor: [
                        '#ff9ff3', '#feca57', '#98d8c8', 
                        '#ffb6c1', '#dda0dd', '#87ceeb'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { 
                        position: 'bottom',
                        labels: { color: '#5a4a6a', padding: 10 }
                    }
                }
            }
        });
    }

    // COVID Distribution Chart
    const covidDistributionCtx = document.getElementById('covidDistributionChart');
    if (covidDistributionCtx) {
        projectCharts.covidDistribution = new Chart(covidDistributionCtx.getContext('2d'), {
            type: 'pie',
            data: {
                labels: ['Recovered', 'Active', 'Deaths'],
                datasets: [{
                    data: [70.1, 27.4, 2.5],
                    backgroundColor: ['#98d8c8', '#feca57', '#ff9ff3'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { 
                        position: 'bottom',
                        labels: { color: '#5a4a6a', padding: 15 }
                    }
                }
            }
        });
    }
}

function initDiabetesCharts() {
    // Diabetes Age Chart
    const diabetesAgeCtx = document.getElementById('diabetesAgeChart');
    if (diabetesAgeCtx) {
        projectCharts.diabetesAge = new Chart(diabetesAgeCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['18-30', '31-45', '46-60', '61-75', '75+'],
                datasets: [{
                    label: 'Diabetes Cases',
                    data: [15, 35, 68, 45, 12],
                    backgroundColor: 'rgba(255, 159, 243, 0.8)',
                    borderColor: '#ff9ff3',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#5a4a6a' } }
                },
                scales: {
                    y: { 
                        ticks: { color: '#9a8aa8' },
                        grid: { color: 'rgba(255, 182, 193, 0.1)' }
                    },
                    x: { 
                        ticks: { color: '#888' },
                        grid: { color: 'rgba(255, 182, 193, 0.1)' }
                    }
                }
            }
        });
    }

    // Diabetes BMI Chart
    const diabetesBMICtx = document.getElementById('diabetesBMIChart');
    if (diabetesBMICtx) {
        projectCharts.diabetesBMI = new Chart(diabetesBMICtx.getContext('2d'), {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'BMI vs Glucose',
                    data: [
                        {x: 25, y: 90}, {x: 28, y: 110}, {x: 32, y: 140},
                        {x: 24, y: 85}, {x: 30, y: 125}, {x: 35, y: 165},
                        {x: 27, y: 105}, {x: 33, y: 150}, {x: 26, y: 95}
                    ],
                    backgroundColor: 'rgba(255, 159, 243, 0.8)',
                    borderColor: '#ff9ff3',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#5a4a6a' } }
                },
                scales: {
                    y: { 
                        title: { display: true, text: 'Glucose Level', color: '#9a8aa8' },
                        ticks: { color: '#9a8aa8' },
                        grid: { color: 'rgba(255, 182, 193, 0.1)' }
                    },
                    x: { 
                        title: { display: true, text: 'BMI', color: '#9a8aa8' },
                        ticks: { color: '#888' },
                        grid: { color: 'rgba(255, 182, 193, 0.1)' }
                    }
                }
            }
        });
    }

    // Diabetes Risk Chart
    const diabetesRiskCtx = document.getElementById('diabetesRiskChart');
    if (diabetesRiskCtx) {
        projectCharts.diabetesRisk = new Chart(diabetesRiskCtx.getContext('2d'), {
            type: 'radar',
            data: {
                labels: ['Age', 'BMI', 'Family History', 'Physical Activity', 'Diet', 'Blood Pressure'],
                datasets: [{
                    label: 'Risk Factors',
                    data: [75, 85, 60, 40, 70, 65],
                    borderColor: '#ff6b9d',
                    backgroundColor: 'rgba(255, 107, 157, 0.2)',
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#5a4a6a' } }
                },
                scales: {
                    r: {
                        ticks: { color: '#9a8aa8' },
                        grid: { color: 'rgba(255, 182, 193, 0.3)' },
                        pointLabels: { color: '#888' }
                    }
                }
            }
        });
    }

    // Diabetes Gender Chart
    const diabetesGenderCtx = document.getElementById('diabetesGenderChart');
    if (diabetesGenderCtx) {
        projectCharts.diabetesGender = new Chart(diabetesGenderCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Male', 'Female'],
                datasets: [{
                    data: [52, 48],
                    backgroundColor: ['#ff9ff3', '#feca57'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { 
                        position: 'bottom',
                        labels: { color: '#5a4a6a', padding: 20 }
                    }
                }
            }
        });
    }
}

function initExcelCharts() {
    // Excel Revenue Chart
    const excelRevenueCtx = document.getElementById('excelRevenueChart');
    if (excelRevenueCtx) {
        projectCharts.excelRevenue = new Chart(excelRevenueCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: [{
                    label: '2024 Revenue',
                    data: [485000, 523000, 567000, 612000],
                    borderColor: '#ff6b9d',
                    backgroundColor: 'rgba(255, 107, 157, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 3
                }, {
                    label: '2023 Revenue',
                    data: [420000, 445000, 478000, 502000],
                    borderColor: '#feca57',
                    backgroundColor: 'rgba(254, 202, 87, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2,
                    borderDash: [5, 5]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#5a4a6a' } }
                },
                scales: {
                    y: { 
                        ticks: { 
                            color: '#9a8aa8',
                            callback: function(value) {
                                return '$' + (value/1000) + 'K';
                            }
                        },
                        grid: { color: 'rgba(255, 182, 193, 0.1)' }
                    },
                    x: { 
                        ticks: { color: '#888' },
                        grid: { color: 'rgba(255, 182, 193, 0.1)' }
                    }
                }
            }
        });
    }

    // Excel Category Chart
    const excelCategoryCtx = document.getElementById('excelCategoryChart');
    if (excelCategoryCtx) {
        projectCharts.excelCategory = new Chart(excelCategoryCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Electronics', 'Fashion', 'Home', 'Sports', 'Books'],
                datasets: [{
                    label: 'Sales Volume',
                    data: [285000, 195000, 156000, 142000, 89000],
                    backgroundColor: 'rgba(255, 159, 243, 0.8)',
                    borderColor: '#ff9ff3',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#5a4a6a' } }
                },
                scales: {
                    y: { 
                        ticks: { 
                            color: '#9a8aa8',
                            callback: function(value) {
                                return '$' + (value/1000) + 'K';
                            }
                        },
                        grid: { color: 'rgba(255, 182, 193, 0.1)' }
                    },
                    x: { 
                        ticks: { color: '#888' },
                        grid: { color: 'rgba(255, 182, 193, 0.1)' }
                    }
                }
            }
        });
    }

    // Excel Customer Chart
    const excelCustomerCtx = document.getElementById('excelCustomerChart');
    if (excelCustomerCtx) {
        projectCharts.excelCustomer = new Chart(excelCustomerCtx.getContext('2d'), {
            type: 'pie',
            data: {
                labels: ['Premium (20%)', 'Regular (45%)', 'New (25%)', 'Inactive (10%)'],
                datasets: [{
                    data: [67, 28, 15, 5],
                    backgroundColor: ['#ff9ff3', '#feca57', '#98d8c8', '#ffb6c1'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { 
                        position: 'bottom',
                        labels: { color: '#5a4a6a', padding: 8 }
                    }
                }
            }
        });
    }

    // Excel Metrics Chart
    const excelMetricsCtx = document.getElementById('excelMetricsChart');
    if (excelMetricsCtx) {
        projectCharts.excelMetrics = new Chart(excelMetricsCtx.getContext('2d'), {
            type: 'radar',
            data: {
                labels: ['Automation', 'Accuracy', 'Speed', 'User Adoption', 'Cost Savings', 'ROI'],
                datasets: [{
                    label: 'Performance Metrics',
                    data: [95, 98, 85, 78, 82, 89],
                    borderColor: '#ff6b9d',
                    backgroundColor: 'rgba(255, 107, 157, 0.2)',
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#5a4a6a' } }
                },
                scales: {
                    r: {
                        ticks: { color: '#9a8aa8' },
                        grid: { color: 'rgba(255, 182, 193, 0.3)' },
                        pointLabels: { color: '#888' }
                    }
                }
            }
        });
    }
}


// Real-time clock update (optional feature)
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    const clockElement = document.getElementById('clock');
    if (clockElement) {
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

// Update clock every second
setInterval(updateClock, 1000);

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to toggle menu
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleMenu();
    }
    
    // Number keys to switch sections
    if (e.key >= '1' && e.key <= '5' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const sections = ['overview', 'analytics', 'projects', 'skills', 'cv'];
        const index = parseInt(e.key) - 1;
        if (sections[index]) {
            showSection(sections[index]);
        }
    }
});

// Add hover effects to cards
document.querySelectorAll('.stat-card, .project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Export functionality for reports
function exportReport(format) {
    // Simulate export functionality
    alert(`Exporting report in ${format} format...`);
    
    // In a real application, this would generate and download the report
    setTimeout(() => {
        alert('Report exported successfully!');
    }, 1500);
}

// Add notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#00ff64' : type === 'error' ? '#ff6464' : '#4a9eff'};
        color: white;
        border-radius: 10px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
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
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize tooltips
function initTooltips() {
    const elements = document.querySelectorAll('[data-tooltip]');
    
    elements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 5px;
                font-size: 0.9rem;
                z-index: 1000;
                pointer-events: none;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            this.tooltipElement = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.tooltipElement) {
                document.body.removeChild(this.tooltipElement);
                this.tooltipElement = null;
            }
        });
    });
}

// Initialize tooltips on load
initTooltips();

// CV Preview toggle function
function toggleCVPreview() {
    const preview = document.getElementById('cvPreview');
    const btnText = document.getElementById('previewBtnText');
    
    if (preview.style.display === 'none' || preview.style.display === '') {
        preview.style.display = 'block';
        btnText.textContent = 'Hide Preview';
        preview.style.animation = 'fadeIn 0.5s ease';
    } else {
        preview.style.display = 'none';
        btnText.textContent = 'View Preview';
    }
}

console.log('Dashboard initialized successfully for Asmaa Hussein');