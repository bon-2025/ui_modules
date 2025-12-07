import Dashboard from "../pages/Dashboard";
import Records from "../pages/Records";
import Archive from "../pages/Archive";
import AnalyticsYearly from "../pages/analytics/Yearly";
import AnalyticsMonthly from "../pages/analytics/Monthly";
import AnalyticsDaily from "../pages/analytics/Daily";
import EmployeeRecords from "../pages/employee/EmployeeRecords";
import EmployeeRegister from "../pages/employee/EmployeeRegister";
import ActivityLog from "../pages/settings/ActivityLog";
import BackupDatabase from "../pages/settings/BackupDatabase";

// NPM module
import { DeathFormWizard } from "registers-module";

export const routeConfig = {
  "/dashboard": <Dashboard />,
  "/records": <Records />,
  "/archive": <Archive />,
  "/register": <DeathFormWizard />,

  "/analytics/yearly": <AnalyticsYearly />,
  "/analytics/monthly": <AnalyticsMonthly />,
  "/analytics/daily": <AnalyticsDaily />,

  "/employee/records": <EmployeeRecords />,
  "/employee/register": <EmployeeRegister />,

  "/settings/activity-log": <ActivityLog />,
  "/settings/backup-database": <BackupDatabase />,
};
