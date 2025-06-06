import { Project } from '../models/Project';

export const dummyProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform Redesign',
    description: 'Complete overhaul of the existing e-commerce platform with modern UI/UX design, improved performance, and mobile responsiveness. Includes new checkout flow, product search, and user dashboard.',
    startDate: '2025-01-15',
    status: 'in progress',
    createdAt: '2025-01-10T10:00:00Z'
  },
  {
    id: '2', 
    name: 'Mobile App Development',
    description: 'Native iOS and Android application for customer engagement. Features include push notifications, offline mode, social sharing, and integration with existing web platform.',
    startDate: '2025-02-01',
    status: 'planning',
    createdAt: '2025-01-25T14:30:00Z'
  },
  {
    id: '3',
    name: 'Data Analytics Dashboard',
    description: 'Real-time analytics dashboard for business intelligence. Includes customizable charts, automated reporting, data export features, and role-based access control.',
    startDate: '2024-11-01',
    status: 'completed',
    createdAt: '2024-10-15T09:15:00Z'
  },
  {
    id: '4',
    name: 'API Integration Project',
    description: 'Integration with third-party services including payment processors, shipping providers, and inventory management systems. Focus on reliability and error handling.',
    startDate: '2025-03-15',
    status: 'planning',
    createdAt: '2025-02-01T16:45:00Z'
  },
  {
    id: '5',
    name: 'Security Audit & Improvements',
    description: 'Comprehensive security review of all systems, implementation of new authentication methods, data encryption upgrades, and compliance with latest security standards.',
    startDate: '2024-12-01',
    status: 'completed',
    createdAt: '2024-11-20T11:20:00Z'
  }
];