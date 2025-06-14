'use client';

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const chartTextColor = 'rgba(229, 231, 235, 0.8)'; // text-gray-200 with opacity

// --- Chart Data & Options ---

// Donut Chart: Workforce Composition
const workforceData = {
  labels: ['Non-German Forced Laborers', 'German Workers'],
  datasets: [
    {
      data: [90, 10],
      backgroundColor: ['#3b82f6', '#4b5563'], // Blue, Gray
      borderColor: '#1f2937', // bg-gray-800
      borderWidth: 4,
    },
  ],
};
const workforceOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '70%',
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: '#111827', // bg-gray-900
      titleColor: '#e5e7eb', // text-gray-200
      bodyColor: '#d1d5db', // text-gray-300
    },
  },
};

// Bar Chart: The Human Cost
const humanCostData = {
  labels: ['Total Daily Workforce', 'Estimated Deaths'],
  datasets: [
    {
      label: 'Count',
      data: [8000, 1600],
      backgroundColor: ['#4b5563', '#b91c1c'], // Gray, Muted Red
      borderRadius: 4,
    },
  ],
};
const humanCostOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
      ticks: {
        color: chartTextColor,
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: chartTextColor,
      },
    },
  },
};

// Horizontal Bar Chart: Site Usage Timeline
const timelineData = {
  labels: ['Nazi Construction', 'Military Depot', 'Memorial Site'],
  datasets: [
    {
      label: 'Approx. Years',
      data: [2, 50, 9], // Updated to 9 for 2015-2024
      backgroundColor: ['#6b7280', '#1d4ed8', '#3b82f6'], // Gray, Dark Blue, Blue
      borderRadius: 4,
    },
  ],
};
const timelineOptions = {
  indexAxis: 'y' as const,
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
      ticks: {
        color: chartTextColor,
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        color: chartTextColor,
      },
    },
  },
};

// --- Main Dashboard Component ---

export default function BunkerValentinDashboard() {
  return (
    <div className="bg-gray-900 p-6 rounded-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: At a Glance */}
        <div className="bg-gray-800 p-6 rounded-xl flex flex-col justify-center">
          <h3 className="text-lg font-semibold text-gray-100 mb-4">
            At a Glance
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400">Submarines Completed</p>
              <p className="text-5xl font-bold text-white">0</p>
            </div>
            <div>
              <p className="text-sm text-red-400">Estimated Lives Lost</p>
              <p className="text-5xl font-bold text-red-500">~1,600</p>
            </div>
          </div>
        </div>

        {/* Card 2: Workforce Composition */}
        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-100 mb-4">
            Workforce Composition
          </h3>
          <div className="h-64 relative">
            <Doughnut data={workforceData} options={workforceOptions} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-3xl font-bold text-blue-400">90%</p>
              <p className="text-sm text-gray-400 text-center max-w-24">
                Forced Laborers
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: The Human Cost */}
        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-100 mb-4">
            The Human Cost
          </h3>
          <div className="h-64">
            <Bar data={humanCostData} options={humanCostOptions} />
          </div>
        </div>

        {/* Card 4: Site Usage Timeline */}
        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-100 mb-4">
            Site Usage Timeline (Approx. Years)
          </h3>
          <div className="h-64">
            <Bar data={timelineData} options={timelineOptions} />
          </div>
        </div>
      </div>
    </div>
  );
} 