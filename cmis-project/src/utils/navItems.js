export const navItems = {
  admin: [
    { name: 'Dashboard', link: '/dashboard' },
    { name: 'Records', link: '/records' },
    { name: 'Archive', link: '/archive' },
    { name: 'Register', link: '/register' },
    { 
      name: 'Analytics', 
      link: '/analytics',
      dropdown: [
        { name: 'Yearly', link: '/analytics/yearly' },
        { name: 'Monthly', link: '/analytics/monthly' },
        { name: 'Daily', link: '/analytics/daily' }
      ]
    },
    {
      name: 'Employee Control',
      dropdown: [
        { name: 'Employee Records', link: '/employee/records' },
        { name: 'Register Employee', link: '/employee/register' }
      ]
    },
    {
      name: 'Settings',
      dropdown: [
        { name: 'Activity Log', link: '/Settings/activity-log' },
        { name: 'Backup Database', link: '/Settings/backup-database' }
      ]
    },

  ],

  staff: [
    { name: 'Dashboard', link: '/dashboard' },
    { name: 'Analytics', link: '/analytics' },
    { name: 'Activity Log', link: '/analytics/activity-log' },
    { name: 'Email', link: '/email' },
  ],
  visitor: [
    { name: 'Home', link: '/' },
    { name: 'Search Records', link: '/search' },
    { name: 'Contact', link: '/contact' },
    { name: 'Register', link: '/register' },
  ],
};
