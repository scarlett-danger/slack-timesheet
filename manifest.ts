import { Manifest } from "deno-slack-sdk/mod.ts";
import Timesheet from "./workflows/timesheet.ts";
import ActiveViewRefresher from "./workflows/active_view_refresher.ts";
import ActiveViewRefresherOnce from "./workflows/active_view_refresher_once.ts";

import TimeEntries from "./datastores/time_entries.ts";
import UserSettings from "./datastores/user_settings.ts";
import Countries from "./datastores/countries.ts";
import PublicHolidays from "./datastores/public_holidays.ts";
import AdminUsers from "./datastores/admin_users.ts";
import Projects from "./datastores/projects.ts";
import OrganizationPolicies from "./datastores/organization_policies.ts";
import Lifelogs from "./datastores/lifelogs.ts";
import ActiveViews from "./datastores/active_views.ts";
import * as Sentry from "sentry";

Sentry.init({
  environment: "production",
  dsn: "https://510c0a7e29487742dc2ce984d5653f1e@o4508686258274304.ingest.us.sentry.io/4508686350155776",
  tracesSampleRate: 1.0,
});
export default Manifest({
  name: "slack-timesheet",
  description: "Timesheet, an app designed to manage work hours in Slack",
  icon: "assets/icon.png",
  outgoingDomains: [
    "files.slack.com", // for uploadng files
  ],
  workflows: [
    Timesheet,
    ActiveViewRefresher,
    ActiveViewRefresherOnce,
  ],
  datastores: [
    TimeEntries,
    UserSettings,
    Countries,
    PublicHolidays,
    Projects,
    AdminUsers,
    OrganizationPolicies,
    Lifelogs,
    ActiveViews,
  ],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "datastore:read",
    "datastore:write",
    "users:read",
    "users:read.email",
    "files:write",
  ],
});
