import IconBox from "../assets/icons/icon-box.png";
import IconBoxActive from "../assets/icons/icon-box-active.png";
import IconProduction from "../assets/icons/icon-production.png";
import IconProductionActive from "../assets/icons/icon-production-active.png";
import IconDelivery from "../assets/icons/icon-delivery.png";
import IconDeliveryActive from "../assets/icons/icon-delivery-active.png";
import IconWarehouse from "../assets/icons/icon-warehouse.png";
import IconWarehouseActive from "../assets/icons/icon-warehouse-active.png";
import IconBoxCheck from "../assets/icons/icon-box-check.png";
import IconBoxCheckActive from "../assets/icons/icon-box-check-active.png";
import IconTool from "../assets/icons/icon-tool.png";
import IconToolActive from "../assets/icons/icon-tool-active.png";
import IconStoreCog from "../assets/icons/icon-store-cog.png";
import IconStoreCogActive from "../assets/icons/icon-store-cog-active.png";
import IconChart from "../assets/icons/icon-chart.png";
import IconChartActive from "../assets/icons/icon-chart-active.png";
import IconSecurity from "../assets/icons/icon-security.png";
import IconSecurityActive from "../assets/icons/icon-security-active.png";
import IconGuiCog from "../assets/icons/icon-gui-cog.png";
import IconGuiCogActive from "../assets/icons/icon-gui-cog-active.png";
import IconFolderCog from "../assets/icons/icon-folder-cog.png";
import IconFolderCogActive from "../assets/icons/icon-folder-cog-active.png";
import IconVRI from "../assets/icons/icon-vri.png";
import IconVRIActive from "../assets/icons/icon-vri-active.png";

export const menuItems = [
  {
    key: "NMS",
    icon: IconBox,
    iconActive: IconBoxActive,
    code: "NMS",
    name: "[NMS] New Project Management System",
    subMenu: [
      {
        name: "Sub menu level 1",
        link: "/",
        subMenu: [
          { name: "Sub menu level 2", link: "" },
          { name: "Sub menu level 2", link: "" },
          { name: "Sub menu level 2", link: "" },
        ],
      },
    ],
  },
  {
    key: "PPS",
    icon: IconProduction,
    iconActive: IconProductionActive,
    code: "PPS",
    name: "[PPS] Production Planning & Scheduling Management System",
    subMenu: [
      {
        name: "Sub menu level 1",
        link: "/",
        subMenu: [
          { name: "Sub menu level 2", link: "" },
          { name: "Sub menu level 2", link: "" },
          { name: "Sub menu level 2", link: "" },
        ],
      },
    ],
  },
  {
    key: "LMS",
    icon: IconDelivery,
    iconActive: IconDeliveryActive,
    code: "LMS",
    name: "[LMS] Logistic & Supply Chain Management System",
    subMenu: [
      {
        name: "Sub menu level 1",
        link: "/",
        subMenu: [
          { name: "Sub menu level 2", link: "" },
          { name: "Sub menu level 2", link: "" },
          { name: "Sub menu level 2", link: "" },
        ],
      },
    ],
  },
  {
    key: "IMS",
    icon: IconWarehouse,
    iconActive: IconWarehouseActive,
    code: "IMS",
    name: "[IMS] Inventory & Material Management System",
    subMenu: [
      {
        name: "Sub menu level 1",
        link: "/",
        subMenu: [
          { name: "Sub menu level 2", link: "" },
          { name: "Sub menu level 2", link: "" },
          { name: "Sub menu level 2", link: "" },
        ],
      },
    ],
  },
  {
    key: "QMS",
    icon: IconBoxCheck,
    iconActive: IconBoxCheckActive,
    code: "QMS",
    name: "[QMS] Quality Management System",
    subMenu: [
      {
        name: "Sub menu level 1",
        link: "/",
        subMenu: [
          { name: "Sub menu level 2", link: "" },
          { name: "Sub menu level 2", link: "" },
          { name: "Sub menu level 2", link: "" },
        ],
      },
    ],
  },
  {
    key: "TMS",
    icon: IconTool,
    iconActive: IconToolActive,
    code: "TMS",
    name: "[TMS] Tooling Asset Management System",
    subMenu: [
      {
        name: "Sub menu level 1",
        link: "/",
        subMenu: [
          { name: "Sub menu level 2", link: "" },
          { name: "Sub menu level 2", link: "" },
          { name: "Sub menu level 2", link: "" },
        ],
      },
    ],
  },
  {
    key: "SMS",
    icon: IconStoreCog,
    iconActive: IconStoreCogActive,
    code: "SMS",
    name: "[SMS] Shopfloor Management System",
    subMenu: [
      {
        name: "Sub menu level 1",
        link: "/",
        subMenu: [
          { name: "Sub menu level 2", link: "" },
          { name: "Sub menu level 2", link: "" },
          { name: "Sub menu level 2", link: "" },
        ],
      },
    ],
  },
  {
    key: "DAS",
    icon: IconChart,
    iconActive: IconChartActive,
    code: "DAS",
    name: "[DAS] Data Analytics Management System",
    subMenu: [
      {
        name: "Sub menu level 1",
        link: "/",
        subMenu: [
          { name: "Sub menu level 2", link: "" },
          { name: "Sub menu level 2", link: "" },
          { name: "Sub menu level 2", link: "" },
        ],
      },
    ],
  },
  {
    key: "SC",
    icon: IconSecurity,
    iconActive: IconSecurityActive,
    code: "SC",
    name: "[SC] Security System",
    subMenu: [
      {
        name: "Setup Master Data",
        link: "/",
        subMenu: [
          { name: "Manage Function", link: "/manage-function" },
          { name: "Manage Work Process", link: "/manage-work-process" },
          { name: "Manage User Role", link: "/manage-user-role" },
          { name: "Manage Password Policy", link: "/manage-password-policy" },
          { name: "Report Work Process", link: "/report-work-process" },
        ],
      },
      {
        name: "User Profile Information",
        link: "/",
        subMenu: [
          { name: "User Management", link: "/user-management" },
          { name: "User Data Report", link: "/user-data-report" },
          { name: "Report Audit Trail Log Changes User Profile", link: "/report-audit-trial" },
        ],
      },
      {
        name: "Session Management",
        link: "/",
        subMenu: [
          { name: "License Control", link: "/license-control" },
          { name: "Report System Access Log", link: "/report-access-log" },
        ],
      },
    ],
  },
  {
    key: "MC",
    icon: IconFolderCog,
    iconActive: IconFolderCogActive,
    code: "MC",
    name: "[MC] Master Code System",
    subMenu: [
      {
        name: "Setup General Data",
        link: "",
        subMenu: [],
      },
      {
        name: "Employee Data",
        link: "",
        subMenu: [],
      },
      {
        name: "Setup Approval",
        link: "/",
        subMenu: [
          { name: "Route Approval", link: "" },
          { name: "Workflow", link: "" },
          { name: "Emails Template", link: "" },
        ],
      },
      {
        name: "System Configuration",
        link: "/",
        subMenu: [
          { name: "Configuration", link: "" },
          { name: "Screen Label", link: "" },
          { name: "Run SQL Statement", link: "" },
        ],
      },
    ],
  },
  {
    key: "VRI",
    icon: IconGuiCog,
    iconActive: IconGuiCogActive,
    code: "VRI",
    name: "[VRI] VRI Management",
    subMenu: [
      {
        name: "VRI Management System",
        link: "/",
        subMenu: [
          { name: "Manage System Register No.", link: "" },
          { name: "Manage System Licenses", link: "" },
        ],
      },
    ],
  },
  {
    key: "VRS",
    icon: IconVRI,
    iconActive: IconVRIActive,
    code: "VRS",
    name: "[VRS] VRI System",
    subMenu: [
      {
        name: "Sub menu level 1",
        link: "/",
        subMenu: [
          { name: "Sub menu level 2", link: "" },
          { name: "Sub menu level 2", link: "" },
          { name: "Sub menu level 2", link: "" },
        ],
      },
    ],
  },
];