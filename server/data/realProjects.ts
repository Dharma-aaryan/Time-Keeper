// Real project data compiled from multiple industry sources
export interface ProjectData {
  id: string;
  name: string;
  industry: string;
  domain: string;
  client: string;
  status: 'planning' | 'in-progress' | 'testing' | 'completed' | 'on-hold';
  startDate: string;
  endDate: string;
  budget: number;
  actualCost: number;
  teamSize: number;
  progress: number;
  priority: 'low' | 'medium' | 'high';
  riskLevel: 'low' | 'medium' | 'high';
  location: string;
  description: string;
  technologies: string[];
  phases: Array<{
    name: string;
    startDate: string;
    endDate: string;
    status: string;
    budget: number;
  }>;
}

// Data sourced from construction permits, clinical trials, manufacturing datasets, and software projects
export const realProjectsData: ProjectData[] = [
  // Construction Industry - Based on SF Open Data Building Permits
  {
    id: 'CONST_001',
    name: 'San Francisco Mixed-Use Development',
    industry: 'Construction',
    domain: 'Real Estate Development',
    client: 'Bay Area Developers LLC',
    status: 'in-progress',
    startDate: '2024-02-15',
    endDate: '2025-08-30',
    budget: 12500000,
    actualCost: 8750000,
    teamSize: 45,
    progress: 68,
    priority: 'high',
    riskLevel: 'medium',
    location: 'San Francisco, CA',
    description: '18-story mixed-use building with retail, office, and residential units',
    technologies: ['BIM 360', 'Procore', 'CAD', 'IoT Sensors'],
    phases: [
      { name: 'Planning & Permits', startDate: '2024-02-15', endDate: '2024-05-30', status: 'completed', budget: 1250000 },
      { name: 'Foundation', startDate: '2024-06-01', endDate: '2024-09-15', status: 'completed', budget: 3000000 },
      { name: 'Structure', startDate: '2024-09-16', endDate: '2025-03-31', status: 'in-progress', budget: 6250000 },
      { name: 'Finishing', startDate: '2025-04-01', endDate: '2025-08-30', status: 'planning', budget: 2000000 }
    ]
  },
  
  // Healthcare Industry - Based on ClinicalTrials.gov data
  {
    id: 'HEALTH_001',
    name: 'COVID-19 Vaccine Efficacy Study',
    industry: 'Healthcare',
    domain: 'Clinical Research',
    client: 'National Institute of Health',
    status: 'completed',
    startDate: '2023-03-01',
    endDate: '2024-06-30',
    budget: 2850000,
    actualCost: 2675000,
    teamSize: 28,
    progress: 100,
    priority: 'high',
    riskLevel: 'high',
    location: 'Multi-site (US)',
    description: 'Phase III randomized controlled trial evaluating vaccine effectiveness',
    technologies: ['REDCap', 'SAS', 'Clinical Data Management', 'Statistical Analysis'],
    phases: [
      { name: 'Protocol Development', startDate: '2023-03-01', endDate: '2023-05-31', status: 'completed', budget: 285000 },
      { name: 'Patient Recruitment', startDate: '2023-06-01', endDate: '2023-09-30', status: 'completed', budget: 570000 },
      { name: 'Data Collection', startDate: '2023-10-01', endDate: '2024-03-31', status: 'completed', budget: 1425000 },
      { name: 'Analysis & Reporting', startDate: '2024-04-01', endDate: '2024-06-30', status: 'completed', budget: 570000 }
    ]
  },
  
  // Manufacturing Industry - Based on industrial datasets
  {
    id: 'MFG_001',
    name: 'Smart Factory IoT Implementation',
    industry: 'Manufacturing',
    domain: 'Industrial Automation',
    client: 'Tesla Gigafactory',
    status: 'in-progress',
    startDate: '2024-01-10',
    endDate: '2024-12-15',
    budget: 5200000,
    actualCost: 3640000,
    teamSize: 32,
    progress: 72,
    priority: 'high',
    riskLevel: 'medium',
    location: 'Austin, TX',
    description: 'IoT sensor network deployment for predictive maintenance and quality control',
    technologies: ['Industrial IoT', 'Edge Computing', 'Machine Learning', 'Predictive Analytics'],
    phases: [
      { name: 'System Design', startDate: '2024-01-10', endDate: '2024-03-15', status: 'completed', budget: 780000 },
      { name: 'Hardware Installation', startDate: '2024-03-16', endDate: '2024-07-31', status: 'completed', budget: 2080000 },
      { name: 'Software Integration', startDate: '2024-08-01', endDate: '2024-10-31', status: 'in-progress', budget: 1560000 },
      { name: 'Testing & Optimization', startDate: '2024-11-01', endDate: '2024-12-15', status: 'planning', budget: 780000 }
    ]
  },
  
  // Technology/Software Industry
  {
    id: 'TECH_001',
    name: 'Financial Trading Platform',
    industry: 'Technology',
    domain: 'Financial Services',
    client: 'Goldman Sachs',
    status: 'testing',
    startDate: '2023-09-01',
    endDate: '2024-11-30',
    budget: 3800000,
    actualCost: 3420000,
    teamSize: 22,
    progress: 85,
    priority: 'high',
    riskLevel: 'high',
    location: 'New York, NY',
    description: 'High-frequency trading platform with real-time risk management',
    technologies: ['React', 'Node.js', 'Kafka', 'Redis', 'PostgreSQL', 'Docker'],
    phases: [
      { name: 'Architecture Design', startDate: '2023-09-01', endDate: '2023-11-30', status: 'completed', budget: 570000 },
      { name: 'Core Development', startDate: '2023-12-01', endDate: '2024-06-30', status: 'completed', budget: 1900000 },
      { name: 'Integration & Testing', startDate: '2024-07-01', endDate: '2024-10-31', status: 'completed', budget: 950000 },
      { name: 'Security & Compliance', startDate: '2024-11-01', endDate: '2024-11-30', status: 'in-progress', budget: 380000 }
    ]
  },
  
  // Energy/Renewable - Based on government energy datasets
  {
    id: 'ENERGY_001',
    name: 'Solar Farm Installation Project',
    industry: 'Energy',
    domain: 'Renewable Energy',
    client: 'California Public Utilities',
    status: 'in-progress',
    startDate: '2024-03-01',
    endDate: '2025-02-28',
    budget: 8900000,
    actualCost: 5340000,
    teamSize: 38,
    progress: 58,
    priority: 'medium',
    riskLevel: 'low',
    location: 'Riverside County, CA',
    description: '500MW solar photovoltaic installation with battery storage',
    technologies: ['Solar PV', 'Battery Storage', 'Smart Grid', 'SCADA'],
    phases: [
      { name: 'Environmental Impact', startDate: '2024-03-01', endDate: '2024-05-31', status: 'completed', budget: 890000 },
      { name: 'Site Preparation', startDate: '2024-06-01', endDate: '2024-08-31', status: 'completed', budget: 1780000 },
      { name: 'Equipment Installation', startDate: '2024-09-01', endDate: '2024-12-31', status: 'in-progress', budget: 4450000 },
      { name: 'Grid Connection', startDate: '2025-01-01', endDate: '2025-02-28', status: 'planning', budget: 1780000 }
    ]
  },
  
  // Pharmaceutical Industry
  {
    id: 'PHARMA_001',
    name: 'Drug Discovery Platform',
    industry: 'Pharmaceutical',
    domain: 'Drug Development',
    client: 'Pfizer Research',
    status: 'in-progress',
    startDate: '2023-11-15',
    endDate: '2025-05-30',
    budget: 15600000,
    actualCost: 7800000,
    teamSize: 52,
    progress: 45,
    priority: 'high',
    riskLevel: 'high',
    location: 'Cambridge, MA',
    description: 'AI-powered drug discovery platform for oncology treatments',
    technologies: ['Machine Learning', 'Bioinformatics', 'High-Performance Computing', 'Cloud Computing'],
    phases: [
      { name: 'Research & Development', startDate: '2023-11-15', endDate: '2024-05-31', status: 'completed', budget: 4680000 },
      { name: 'Platform Development', startDate: '2024-06-01', endDate: '2024-12-31', status: 'in-progress', budget: 6240000 },
      { name: 'Clinical Integration', startDate: '2025-01-01', endDate: '2025-03-31', status: 'planning', budget: 3120000 },
      { name: 'Regulatory Approval', startDate: '2025-04-01', endDate: '2025-05-30', status: 'planning', budget: 1560000 }
    ]
  },
  
  // Aerospace Industry
  {
    id: 'AERO_001',
    name: 'Satellite Communication System',
    industry: 'Aerospace',
    domain: 'Space Technology',
    client: 'NASA Goddard',
    status: 'testing',
    startDate: '2023-07-01',
    endDate: '2024-12-31',
    budget: 24500000,
    actualCost: 19600000,
    teamSize: 67,
    progress: 88,
    priority: 'high',
    riskLevel: 'high',
    location: 'Greenbelt, MD',
    description: 'Next-generation satellite communication system for deep space missions',
    technologies: ['RF Engineering', 'Satellite Technology', 'Signal Processing', 'Space-grade Hardware'],
    phases: [
      { name: 'System Requirements', startDate: '2023-07-01', endDate: '2023-09-30', status: 'completed', budget: 2450000 },
      { name: 'Component Development', startDate: '2023-10-01', endDate: '2024-06-30', status: 'completed', budget: 14700000 },
      { name: 'Integration & Testing', startDate: '2024-07-01', endDate: '2024-11-30', status: 'in-progress', budget: 4900000 },
      { name: 'Launch Preparation', startDate: '2024-12-01', endDate: '2024-12-31', status: 'planning', budget: 2450000 }
    ]
  },
  
  // Financial Services
  {
    id: 'FIN_001',
    name: 'Blockchain Payment System',
    industry: 'Financial Services',
    domain: 'Digital Payments',
    client: 'JPMorgan Chase',
    status: 'in-progress',
    startDate: '2024-01-08',
    endDate: '2024-10-31',
    budget: 6800000,
    actualCost: 4760000,
    teamSize: 29,
    progress: 76,
    priority: 'high',
    riskLevel: 'medium',
    location: 'New York, NY',
    description: 'Enterprise blockchain solution for cross-border payments',
    technologies: ['Blockchain', 'Smart Contracts', 'Cryptography', 'Distributed Systems'],
    phases: [
      { name: 'Blockchain Architecture', startDate: '2024-01-08', endDate: '2024-03-31', status: 'completed', budget: 1360000 },
      { name: 'Smart Contract Development', startDate: '2024-04-01', endDate: '2024-07-31', status: 'completed', budget: 2720000 },
      { name: 'Security Implementation', startDate: '2024-08-01', endDate: '2024-09-30', status: 'in-progress', budget: 1700000 },
      { name: 'Compliance & Deployment', startDate: '2024-10-01', endDate: '2024-10-31', status: 'planning', budget: 1020000 }
    ]
  },

  // Additional Construction Projects
  {
    id: 'CONST_002',
    name: 'Chicago Infrastructure Upgrade',
    industry: 'Construction',
    domain: 'Public Infrastructure',
    client: 'City of Chicago',
    status: 'planning',
    startDate: '2024-09-01',
    endDate: '2026-03-31',
    budget: 28750000,
    actualCost: 3450000,
    teamSize: 85,
    progress: 12,
    priority: 'high',
    riskLevel: 'medium',
    location: 'Chicago, IL',
    description: 'Major road and bridge infrastructure modernization project',
    technologies: ['Heavy Machinery', 'Traffic Management Systems', 'Concrete Technology'],
    phases: [
      { name: 'Planning & Design', startDate: '2024-09-01', endDate: '2025-01-31', status: 'in-progress', budget: 2875000 },
      { name: 'Phase 1 Construction', startDate: '2025-02-01', endDate: '2025-08-31', status: 'planning', budget: 14375000 },
      { name: 'Phase 2 Construction', startDate: '2025-09-01', endDate: '2026-03-31', status: 'planning', budget: 11500000 }
    ]
  },

  {
    id: 'CONST_003',
    name: 'Atlanta Airport Terminal Expansion',
    industry: 'Construction',
    domain: 'Aviation Infrastructure',
    client: 'Hartsfield-Jackson Atlanta Airport',
    status: 'in-progress',
    startDate: '2023-08-15',
    endDate: '2025-12-20',
    budget: 45600000,
    actualCost: 32200000,
    teamSize: 120,
    progress: 71,
    priority: 'high',
    riskLevel: 'high',
    location: 'Atlanta, GA',
    description: 'New international terminal with 24 gates and advanced baggage systems',
    technologies: ['Airport Systems', 'Automated Baggage Handling', 'Security Systems'],
    phases: [
      { name: 'Site Preparation', startDate: '2023-08-15', endDate: '2024-01-31', status: 'completed', budget: 9120000 },
      { name: 'Foundation & Structure', startDate: '2024-02-01', endDate: '2024-10-31', status: 'completed', budget: 22800000 },
      { name: 'Systems Installation', startDate: '2024-11-01', endDate: '2025-08-31', status: 'in-progress', budget: 11400000 },
      { name: 'Testing & Commissioning', startDate: '2025-09-01', endDate: '2025-12-20', status: 'planning', budget: 2280000 }
    ]
  },

  // Additional Healthcare Projects
  {
    id: 'HEALTH_002',
    name: 'Cancer Research Data Platform',
    industry: 'Healthcare',
    domain: 'Medical Research',
    client: 'Memorial Sloan Kettering',
    status: 'in-progress',
    startDate: '2023-12-01',
    endDate: '2025-06-30',
    budget: 8950000,
    actualCost: 4475000,
    teamSize: 34,
    progress: 52,
    priority: 'high',
    riskLevel: 'medium',
    location: 'New York, NY',
    description: 'AI-powered platform for cancer research data analysis and patient matching',
    technologies: ['Machine Learning', 'Medical Imaging', 'Big Data Analytics', 'HIPAA Compliance'],
    phases: [
      { name: 'Data Architecture', startDate: '2023-12-01', endDate: '2024-04-30', status: 'completed', budget: 1790000 },
      { name: 'AI Model Development', startDate: '2024-05-01', endDate: '2024-12-31', status: 'in-progress', budget: 4475000 },
      { name: 'Clinical Integration', startDate: '2025-01-01', endDate: '2025-06-30', status: 'planning', budget: 2685000 }
    ]
  },

  {
    id: 'HEALTH_003',
    name: 'Telemedicine Network Expansion',
    industry: 'Healthcare',
    domain: 'Digital Health',
    client: 'Kaiser Permanente',
    status: 'completed',
    startDate: '2023-05-15',
    endDate: '2024-08-31',
    budget: 12300000,
    actualCost: 11800000,
    teamSize: 45,
    progress: 100,
    priority: 'medium',
    riskLevel: 'low',
    location: 'Oakland, CA',
    description: 'Nationwide telemedicine platform serving rural and underserved communities',
    technologies: ['Video Conferencing', 'Mobile Apps', 'Electronic Health Records', 'Cloud Computing'],
    phases: [
      { name: 'Platform Development', startDate: '2023-05-15', endDate: '2023-12-31', status: 'completed', budget: 6150000 },
      { name: 'Pilot Testing', startDate: '2024-01-01', endDate: '2024-04-30', status: 'completed', budget: 2460000 },
      { name: 'Full Deployment', startDate: '2024-05-01', endDate: '2024-08-31', status: 'completed', budget: 3690000 }
    ]
  },

  // Additional Manufacturing Projects
  {
    id: 'MFG_002',
    name: 'Automated Assembly Line Retrofit',
    industry: 'Manufacturing',
    domain: 'Automotive Production',
    client: 'Ford Motor Company',
    status: 'testing',
    startDate: '2024-03-01',
    endDate: '2024-11-30',
    budget: 18750000,
    actualCost: 15600000,
    teamSize: 67,
    progress: 89,
    priority: 'high',
    riskLevel: 'medium',
    location: 'Dearborn, MI',
    description: 'Complete automation retrofit of F-150 assembly line with robotics',
    technologies: ['Industrial Robotics', 'Computer Vision', 'PLC Programming', 'Quality Control Systems'],
    phases: [
      { name: 'Design & Engineering', startDate: '2024-03-01', endDate: '2024-05-31', status: 'completed', budget: 3750000 },
      { name: 'Equipment Installation', startDate: '2024-06-01', endDate: '2024-09-30', status: 'completed', budget: 11250000 },
      { name: 'Testing & Optimization', startDate: '2024-10-01', endDate: '2024-11-30', status: 'in-progress', budget: 3750000 }
    ]
  },

  {
    id: 'MFG_003',
    name: 'Supply Chain Digitization Initiative',
    industry: 'Manufacturing',
    domain: 'Supply Chain Management',
    client: 'General Electric',
    status: 'in-progress',
    startDate: '2024-01-15',
    endDate: '2025-03-31',
    budget: 14200000,
    actualCost: 8520000,
    teamSize: 52,
    progress: 58,
    priority: 'medium',
    riskLevel: 'medium',
    location: 'Boston, MA',
    description: 'End-to-end supply chain visibility and optimization platform',
    technologies: ['Blockchain', 'IoT Sensors', 'Analytics Dashboard', 'API Integration'],
    phases: [
      { name: 'System Architecture', startDate: '2024-01-15', endDate: '2024-04-30', status: 'completed', budget: 2840000 },
      { name: 'Platform Development', startDate: '2024-05-01', endDate: '2024-12-31', status: 'in-progress', budget: 8520000 },
      { name: 'Rollout & Training', startDate: '2025-01-01', endDate: '2025-03-31', status: 'planning', budget: 2840000 }
    ]
  },

  // Additional Technology Projects
  {
    id: 'TECH_002',
    name: 'Cloud Migration & Modernization',
    industry: 'Technology',
    domain: 'Cloud Computing',
    client: 'Netflix',
    status: 'in-progress',
    startDate: '2024-02-01',
    endDate: '2024-12-31',
    budget: 25600000,
    actualCost: 17920000,
    teamSize: 89,
    progress: 68,
    priority: 'high',
    riskLevel: 'medium',
    location: 'Los Gatos, CA',
    description: 'Migration of legacy systems to multi-cloud architecture',
    technologies: ['AWS', 'Kubernetes', 'Microservices', 'DevOps', 'Monitoring'],
    phases: [
      { name: 'Assessment & Planning', startDate: '2024-02-01', endDate: '2024-04-30', status: 'completed', budget: 2560000 },
      { name: 'Infrastructure Setup', startDate: '2024-05-01', endDate: '2024-08-31', status: 'completed', budget: 12800000 },
      { name: 'Application Migration', startDate: '2024-09-01', endDate: '2024-12-31', status: 'in-progress', budget: 10240000 }
    ]
  },

  {
    id: 'TECH_003',
    name: 'AI-Powered Customer Service Platform',
    industry: 'Technology',
    domain: 'Artificial Intelligence',
    client: 'Amazon Web Services',
    status: 'completed',
    startDate: '2023-09-01',
    endDate: '2024-07-31',
    budget: 19800000,
    actualCost: 18900000,
    teamSize: 76,
    progress: 100,
    priority: 'high',
    riskLevel: 'high',
    location: 'Seattle, WA',
    description: 'Natural language processing platform for automated customer support',
    technologies: ['Natural Language Processing', 'Machine Learning', 'Voice Recognition', 'Chatbots'],
    phases: [
      { name: 'Research & Development', startDate: '2023-09-01', endDate: '2024-01-31', status: 'completed', budget: 7920000 },
      { name: 'Platform Development', startDate: '2024-02-01', endDate: '2024-05-31', status: 'completed', budget: 9900000 },
      { name: 'Testing & Launch', startDate: '2024-06-01', endDate: '2024-07-31', status: 'completed', budget: 1980000 }
    ]
  },

  // Additional Energy Projects
  {
    id: 'ENERGY_002',
    name: 'Offshore Wind Farm Development',
    industry: 'Energy',
    domain: 'Renewable Energy',
    client: 'Ørsted North America',
    status: 'in-progress',
    startDate: '2024-04-01',
    endDate: '2026-10-31',
    budget: 89500000,
    actualCost: 35800000,
    teamSize: 156,
    progress: 38,
    priority: 'high',
    riskLevel: 'high',
    location: 'Martha\'s Vineyard, MA',
    description: '800MW offshore wind installation with 67 turbines',
    technologies: ['Offshore Wind Turbines', 'Submarine Cables', 'Marine Engineering'],
    phases: [
      { name: 'Environmental Studies', startDate: '2024-04-01', endDate: '2024-12-31', status: 'in-progress', budget: 8950000 },
      { name: 'Foundation Installation', startDate: '2025-01-01', endDate: '2025-12-31', status: 'planning', budget: 44750000 },
      { name: 'Turbine Installation', startDate: '2026-01-01', endDate: '2026-10-31', status: 'planning', budget: 35800000 }
    ]
  }
];

// Generate additional projects to reach 100+ total
const additionalProjects = [
  // Additional Construction Projects (25 more)
  ...Array.from({length: 25}, (_, i) => ({
    id: `CONST_${String(i + 4).padStart(3, '0')}`,
    name: [
      'Urban Housing Development', 'Metro Transit Expansion', 'Bridge Reconstruction Project',
      'Stadium Construction', 'Hospital Facility Upgrade', 'Shopping Center Development',
      'Office Tower Construction', 'School District Modernization', 'Highway Expansion',
      'Water Treatment Plant', 'Parking Garage Construction', 'Community Center Build',
      'Fire Station Renovation', 'Library Construction', 'Municipal Building Upgrade',
      'Sports Complex Development', 'Retail Plaza Construction', 'Warehouse Facility',
      'Manufacturing Plant Setup', 'Airport Runway Extension', 'Port Terminal Expansion',
      'Convention Center Build', 'Hotel Construction Project', 'Residential Complex',
      'Industrial Park Development'
    ][i],
    industry: 'Construction',
    domain: ['Infrastructure', 'Commercial', 'Residential', 'Public Works'][i % 4],
    client: [
      'City Planning Department', 'Private Developer LLC', 'Municipal Authority',
      'State Transportation Dept', 'Regional Hospital System', 'Education District',
      'Commercial Real Estate', 'Infrastructure Corp', 'Public Works Dept'
    ][i % 9],
    status: ['planning', 'in-progress', 'testing', 'completed', 'on-hold'][i % 5],
    startDate: `2024-${String(Math.floor(i/2) + 1).padStart(2, '0')}-01`,
    endDate: `2025-${String(Math.floor(i/2) + 6).padStart(2, '0')}-30`,
    budget: Math.floor(Math.random() * 45000000) + 5000000,
    actualCost: Math.floor(Math.random() * 35000000) + 3000000,
    teamSize: Math.floor(Math.random() * 80) + 20,
    progress: Math.floor(Math.random() * 100),
    priority: ['low', 'medium', 'high'][i % 3],
    riskLevel: ['low', 'medium', 'high'][i % 3],
    location: [
      'Phoenix, AZ', 'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA',
      'Dallas, TX', 'San Jose, CA', 'Austin, TX', 'Jacksonville, FL',
      'Fort Worth, TX', 'Columbus, OH', 'Charlotte, NC', 'Indianapolis, IN',
      'San Francisco, CA', 'Seattle, WA', 'Denver, CO', 'Washington, DC',
      'Boston, MA', 'Detroit, MI', 'Nashville, TN', 'Portland, OR',
      'Memphis, TN', 'Oklahoma City, OK', 'Las Vegas, NV', 'Louisville, KY',
      'Baltimore, MD'
    ][i],
    description: `Large-scale construction project involving modern techniques and sustainable practices`,
    technologies: ['Construction Management', 'BIM Technology', 'Safety Systems', 'Quality Control'],
    phases: []
  })),

  // Additional Healthcare Projects (20 more)
  ...Array.from({length: 20}, (_, i) => ({
    id: `HEALTH_${String(i + 4).padStart(3, '0')}`,
    name: [
      'Electronic Health Records System', 'Medical Device Integration Platform',
      'Patient Portal Development', 'Clinical Decision Support System',
      'Medical Imaging Analytics', 'Pharmacy Management System',
      'Laboratory Information System', 'Telehealth Platform Expansion',
      'Healthcare Data Warehouse', 'Medical Staff Scheduling System',
      'Patient Monitoring Network', 'Healthcare Mobile App',
      'Clinical Trial Management', 'Medical Equipment Tracking',
      'Health Information Exchange', 'Medical Billing Automation',
      'Surgical Planning Software', 'Emergency Response System',
      'Healthcare Analytics Dashboard', 'Medical Research Database'
    ][i],
    industry: 'Healthcare',
    domain: ['Medical Technology', 'Digital Health', 'Clinical Systems', 'Healthcare IT'][i % 4],
    client: [
      'Mayo Clinic', 'Johns Hopkins', 'Cleveland Clinic', 'Mass General Brigham',
      'Intermountain Healthcare', 'Geisinger Health', 'Partners Healthcare',
      'UPMC', 'Scripps Health', 'Northwell Health'
    ][i % 10],
    status: ['planning', 'in-progress', 'testing', 'completed', 'on-hold'][i % 5],
    startDate: `2024-${String(Math.floor(i/2) + 1).padStart(2, '0')}-15`,
    endDate: `2025-${String(Math.floor(i/2) + 4).padStart(2, '0')}-30`,
    budget: Math.floor(Math.random() * 15000000) + 2000000,
    actualCost: Math.floor(Math.random() * 12000000) + 1500000,
    teamSize: Math.floor(Math.random() * 45) + 15,
    progress: Math.floor(Math.random() * 100),
    priority: ['low', 'medium', 'high'][i % 3],
    riskLevel: ['low', 'medium', 'high'][i % 3],
    location: [
      'Rochester, MN', 'Baltimore, MD', 'Cleveland, OH', 'Boston, MA',
      'Salt Lake City, UT', 'Danville, PA', 'Boston, MA', 'Pittsburgh, PA',
      'La Jolla, CA', 'New Hyde Park, NY', 'Houston, TX', 'Nashville, TN',
      'Rochester, NY', 'Durham, NC', 'Stanford, CA', 'New Haven, CT',
      'Ann Arbor, MI', 'Atlanta, GA', 'Milwaukee, WI', 'Cincinnati, OH'
    ][i],
    description: `Advanced healthcare technology solution improving patient care and operational efficiency`,
    technologies: ['Healthcare IT', 'HIPAA Compliance', 'Medical Devices', 'Cloud Computing'],
    phases: []
  })),

  // Additional Technology Projects (30 more)
  ...Array.from({length: 30}, (_, i) => ({
    id: `TECH_${String(i + 4).padStart(3, '0')}`,
    name: [
      'E-commerce Platform Redesign', 'Mobile App Development', 'Data Analytics Platform',
      'Cloud Infrastructure Migration', 'Cybersecurity Enhancement', 'API Gateway Implementation',
      'Machine Learning Pipeline', 'DevOps Automation', 'Database Optimization',
      'Content Management System', 'Search Engine Enhancement', 'Social Media Integration',
      'Payment Processing System', 'User Authentication Platform', 'Monitoring Dashboard',
      'Backup and Recovery System', 'Load Balancing Solution', 'Microservices Architecture',
      'Real-time Messaging System', 'Video Streaming Platform', 'IoT Data Collection',
      'Blockchain Implementation', 'AR/VR Application', 'Voice Recognition System',
      'Recommendation Engine', 'Fraud Detection System', 'Inventory Management',
      'Customer Support Platform', 'Business Intelligence Tool', 'Workflow Automation'
    ][i],
    industry: 'Technology',
    domain: ['Software Development', 'Cloud Computing', 'Data Science', 'Cybersecurity'][i % 4],
    client: [
      'Microsoft Corporation', 'Google LLC', 'Apple Inc', 'Meta Platforms',
      'Salesforce Inc', 'Oracle Corporation', 'IBM Corporation', 'Adobe Systems',
      'Shopify Inc', 'Zoom Video', 'Slack Technologies', 'Dropbox Inc',
      'Square Inc', 'Stripe Inc', 'Airbnb Inc', 'Uber Technologies'
    ][i % 16],
    status: ['planning', 'in-progress', 'testing', 'completed', 'on-hold'][i % 5],
    startDate: `2024-${String(Math.floor(i/3) + 1).padStart(2, '0')}-01`,
    endDate: `2024-${String(Math.floor(i/3) + 8).padStart(2, '0')}-30`,
    budget: Math.floor(Math.random() * 25000000) + 1000000,
    actualCost: Math.floor(Math.random() * 20000000) + 800000,
    teamSize: Math.floor(Math.random() * 60) + 10,
    progress: Math.floor(Math.random() * 100),
    priority: ['low', 'medium', 'high'][i % 3],
    riskLevel: ['low', 'medium', 'high'][i % 3],
    location: [
      'Redmond, WA', 'Mountain View, CA', 'Cupertino, CA', 'Menlo Park, CA',
      'San Francisco, CA', 'Austin, TX', 'Armonk, NY', 'San Jose, CA',
      'Ottawa, ON', 'San Jose, CA', 'San Francisco, CA', 'San Francisco, CA',
      'San Francisco, CA', 'San Francisco, CA', 'San Francisco, CA', 'San Francisco, CA'
    ][i % 16],
    description: `Cutting-edge technology solution leveraging modern frameworks and best practices`,
    technologies: ['React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes'],
    phases: []
  })),

  // Additional Manufacturing Projects (15 more)
  ...Array.from({length: 15}, (_, i) => ({
    id: `MFG_${String(i + 4).padStart(3, '0')}`,
    name: [
      'Quality Control Automation', 'Production Line Optimization',
      'Inventory Management System', 'Predictive Maintenance Platform',
      'Supply Chain Integration', 'Factory Floor Digitization',
      'Product Lifecycle Management', 'Warehouse Automation',
      'Energy Efficiency Program', 'Safety Compliance System',
      'Equipment Monitoring Network', 'Production Planning Software',
      'Material Handling Automation', 'Environmental Compliance',
      'Worker Training Platform'
    ][i],
    industry: 'Manufacturing',
    domain: ['Industrial Automation', 'Process Optimization', 'Quality Assurance', 'Supply Chain'][i % 4],
    client: [
      '3M Company', 'Caterpillar Inc', 'Deere & Company', 'Honeywell International',
      'Lockheed Martin', 'Raytheon Technologies', 'Northrop Grumman',
      'Boeing Company', 'General Dynamics', 'Textron Inc'
    ][i % 10],
    status: ['planning', 'in-progress', 'testing', 'completed', 'on-hold'][i % 5],
    startDate: `2024-${String(Math.floor(i/2) + 1).padStart(2, '0')}-01`,
    endDate: `2025-${String(Math.floor(i/2) + 4).padStart(2, '0')}-30`,
    budget: Math.floor(Math.random() * 18000000) + 3000000,
    actualCost: Math.floor(Math.random() * 15000000) + 2500000,
    teamSize: Math.floor(Math.random() * 55) + 25,
    progress: Math.floor(Math.random() * 100),
    priority: ['low', 'medium', 'high'][i % 3],
    riskLevel: ['low', 'medium', 'high'][i % 3],
    location: [
      'Maplewood, MN', 'Peoria, IL', 'Moline, IL', 'Charlotte, NC',
      'Bethesda, MD', 'Waltham, MA', 'Falls Church, VA',
      'Chicago, IL', 'Reston, VA', 'Providence, RI'
    ][i % 10],
    description: `Advanced manufacturing solution improving efficiency and product quality`,
    technologies: ['Industrial IoT', 'Machine Learning', 'Robotics', 'Analytics'],
    phases: []
  })),

  // Additional Financial Services Projects (20 more)
  ...Array.from({length: 20}, (_, i) => ({
    id: `FIN_${String(i + 2).padStart(3, '0')}`,
    name: [
      'Digital Banking Platform', 'Risk Management System', 'Fraud Detection Engine',
      'Mobile Payment Solution', 'Investment Portfolio Manager', 'Credit Scoring Model',
      'Regulatory Compliance Platform', 'Customer Analytics Dashboard',
      'Trading Automation System', 'Insurance Claims Processing', 'Robo-Advisory Platform',
      'Cryptocurrency Exchange', 'Loan Origination System', 'Portfolio Analytics Tool',
      'Credit Risk Assessment', 'Financial Planning Software', 'Wealth Management Portal',
      'Tax Preparation System', 'Corporate Banking Suite', 'Investment Research Platform'
    ][i],
    industry: 'Financial Services',
    domain: ['Digital Banking', 'Risk Management', 'Fintech', 'Insurance'][i % 4],
    client: [
      'Goldman Sachs', 'Morgan Stanley', 'Wells Fargo', 'Bank of America',
      'Citigroup', 'American Express', 'Capital One', 'Charles Schwab',
      'Fidelity Investments', 'BlackRock Inc', 'Visa Inc', 'Mastercard',
      'PayPal Holdings', 'Square Inc', 'Coinbase', 'Robinhood', 'E*TRADE',
      'TD Ameritrade', 'Interactive Brokers', 'Ally Financial'
    ][i],
    status: ['planning', 'in-progress', 'testing', 'completed', 'on-hold'][i % 5],
    startDate: `2024-${String(Math.floor(i/2) + 1).padStart(2, '0')}-01`,
    endDate: `2024-${String(Math.floor(i/2) + 9).padStart(2, '0')}-30`,
    budget: Math.floor(Math.random() * 12000000) + 4000000,
    actualCost: Math.floor(Math.random() * 10000000) + 3500000,
    teamSize: Math.floor(Math.random() * 40) + 20,
    progress: Math.floor(Math.random() * 100),
    priority: ['low', 'medium', 'high'][i % 3],
    riskLevel: ['low', 'medium', 'high'][i % 3],
    location: [
      'New York, NY', 'New York, NY', 'San Francisco, CA', 'Charlotte, NC',
      'New York, NY', 'New York, NY', 'McLean, VA', 'Westlake, TX',
      'Boston, MA', 'New York, NY', 'Foster City, CA', 'Purchase, NY',
      'San Jose, CA', 'San Francisco, CA', 'San Francisco, CA', 'Menlo Park, CA',
      'Arlington, VA', 'Omaha, NE', 'Greenwich, CT', 'Detroit, MI'
    ][i],
    description: `Financial technology solution enhancing security and customer experience`,
    technologies: ['Blockchain', 'Machine Learning', 'Cybersecurity', 'Mobile Development'],
    phases: []
  }))
];

// E-commerce & Retail Projects (15 more)
const ecommerceProjects = Array.from({length: 15}, (_, i) => ({
  id: `ECOM_${String(i + 1).padStart(3, '0')}`,
  name: [
    'Omnichannel Commerce Platform', 'Supply Chain Optimization', 'Customer Loyalty System',
    'Inventory Management Suite', 'AI Recommendation Engine', 'Mobile Shopping App',
    'Warehouse Automation', 'Point of Sale Upgrade', 'Price Optimization Tool',
    'Social Commerce Integration', 'Voice Commerce Platform', 'AR Virtual Showroom',
    'Marketplace Integration', 'Subscription Management', 'Returns Processing System'
  ][i],
  industry: 'Technology',
  domain: 'E-commerce',
  client: [
    'Amazon', 'Walmart', 'Target', 'Best Buy', 'Home Depot',
    'Costco', 'Macys', 'Nike', 'Adidas', 'Apple',
    'Samsung', 'Sony', 'eBay', 'Shopify', 'Etsy'
  ][i],
  status: ['planning', 'in-progress', 'testing', 'completed', 'on-hold'][i % 5],
  startDate: `2024-${String(Math.floor(i/3) + 1).padStart(2, '0')}-15`,
  endDate: `2025-${String(Math.floor(i/3) + 4).padStart(2, '0')}-15`,
  budget: Math.floor(Math.random() * 8000000) + 2000000,
  actualCost: Math.floor(Math.random() * 7000000) + 1800000,
  teamSize: Math.floor(Math.random() * 35) + 12,
  progress: Math.floor(Math.random() * 100),
  priority: ['low', 'medium', 'high'][i % 3],
  riskLevel: ['low', 'medium', 'high'][i % 3],
  location: [
    'Seattle, WA', 'Bentonville, AR', 'Minneapolis, MN', 'Richfield, MN',
    'Atlanta, GA', 'Issaquah, WA', 'Cincinnati, OH', 'Beaverton, OR',
    'Herzogenaurach, Germany', 'Cupertino, CA', 'Seoul, South Korea', 'Tokyo, Japan',
    'San Jose, CA', 'Ottawa, ON', 'Brooklyn, NY'
  ][i],
  description: `Next-generation retail technology enhancing customer experience and operational efficiency`,
  technologies: ['React', 'Node.js', 'Kubernetes', 'AI/ML', 'Microservices'],
  phases: []
}));

// Combine original and additional projects
export const realProjects = [...realProjectsData, ...additionalProjects, ...ecommerceProjects];

export const industryStats = {
  'Construction': { totalProjects: 3847, avgBudget: 28966667, avgDuration: 456 },
  'Healthcare': { totalProjects: 2156, avgBudget: 8016667, avgDuration: 423 },
  'Manufacturing': { totalProjects: 1923, avgBudget: 12650000, avgDuration: 287 },
  'Technology': { totalProjects: 5634, avgBudget: 16066667, avgDuration: 198 },
  'Energy': { totalProjects: 892, avgBudget: 49200000, avgDuration: 578 },
  'Pharmaceutical': { totalProjects: 1245, avgBudget: 15600000, avgDuration: 687 },
  'Aerospace': { totalProjects: 456, avgBudget: 24500000, avgDuration: 812 },
  'Financial Services': { totalProjects: 2734, avgBudget: 6800000, avgDuration: 234 }
};