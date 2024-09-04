import React from 'react';
// auth
export const Login = React.lazy(() => import('../pages/auth/Login'));
export const Register = React.lazy(() => import('../pages/auth/Register'));
export const Confirm = React.lazy(() => import('../pages/auth/Confirm'));
export const ForgetPassword = React.lazy(() => import('../pages/auth/ForgetPassword'));
export const LockScreen = React.lazy(() => import('../pages/auth/LockScreen'));
export const Logout = React.lazy(() => import('../pages/auth/Logout'));

// dashboards
export const DashBoard1 = React.lazy(() => import('../pages/dashboards/DashBoard1/'));
export const LoanDashBoard = React.lazy(() => import('../view/dashboard'));

// master
export const Employee = React.lazy(() => import('../view/employee'));
export const Department = React.lazy(() => import('../view/department'));
export const ApplicantType = React.lazy(() => import('../view/applicant-type'));
export const Category = React.lazy(() => import('../view/category'));
export const SubCategory = React.lazy(() => import('../view/sub-category'));
export const Applicant = React.lazy(() => import('../view/applicants'));
export const State = React.lazy(() => import('../view/state'));
export const District = React.lazy(() => import('../view/district'));
export const Country = React.lazy(() => import('../view/country'));
export const Designation = React.lazy(() => import('../view/designation'));
export const ExpensiveType = React.lazy(() => import('../view/expensive-type'));
export const IncomeType = React.lazy(() => import('../view/income-type'));
export const AddressType = React.lazy(() => import('../view/address-type'));
export const ProofType = React.lazy(() => import('../view/proof-type'));
export const BankAccount = React.lazy(() => import('../view/bank-account'));
export const IncomeEntry = React.lazy(() => import('../view/income-entry'));
export const ExpenseEntry = React.lazy(() => import('../view/expense-entry'));
export const LoanList = React.lazy(() => import('../view/loan-list'));
export const Role = React.lazy(() => import('../view/role'));
export const LoanChargesType = React.lazy(() => import('../view/loan-charges-type'));
export const LoanPDF = React.lazy(() => import('../utils/loanPdf'));

// Loan
export const AddLoan=React.lazy(()=> import('../view/addLoan/newAddLoan'));

// apps
export const CalendarApp = React.lazy(() => import('../pages/apps/Calendar'));
export const ChatApp = React.lazy(() => import('../pages/apps/Chat'));
export const Inbox = React.lazy(() => import('../pages/apps/Email/Inbox'));
export const Kanban = React.lazy(() => import('../pages/apps/Tasks/Board'));
export const TaskDetail = React.lazy(() => import('../pages/apps/Tasks/Detail'));
export const Projects = React.lazy(() => import('../pages/apps/Projects'));
export const List = React.lazy(() => import('../pages/apps/Contacts/List'));
export const Profile = React.lazy(() => import('../pages/apps/Contacts/Profile'));

// extra pages
export const Starter = React.lazy(() => import('../pages/other/Starter'));
export const Pricing = React.lazy(() => import('../pages/other/Pricing'));
export const Timeline = React.lazy(() => import('../pages/other/Timeline'));
export const Invoice = React.lazy(() => import('../pages/other/Invoice'));
export const FAQ = React.lazy(() => import('../pages/other/FAQ'));
export const Gallery = React.lazy(() => import('../pages/other/Gallery'));
export const Error404 = React.lazy(() => import('../pages/other/Error404'));
export const Error500 = React.lazy(() => import('../pages/other/Error500'));
export const Maintenance = React.lazy(() => import('../pages/other/Maintenance'));
export const ComingSoon = React.lazy(() => import('../pages/other/ComingSoon'));

// base ui
export const Buttons = React.lazy(() => import('../pages/uikit/Buttons'));
export const Cards = React.lazy(() => import('../pages/uikit/Cards'));
export const Avatars = React.lazy(() => import('../pages/uikit/Avatars'));
export const TabsAccordions = React.lazy(() => import('../pages/uikit/TabsAccordions'));
export const Notifications = React.lazy(() => import('../pages/uikit/Notifications'));
export const Modals = React.lazy(() => import('../pages/uikit/Modals'));
export const Progress = React.lazy(() => import('../pages/uikit/Progress'));
export const Offcanvases = React.lazy(() => import('../pages/uikit/Offcanvases'));
export const Placeholders = React.lazy(() => import('../pages/uikit/Placeholders'));
export const Spinners = React.lazy(() => import('../pages/uikit/Spinners'));
export const Images = React.lazy(() => import('../pages/uikit/Images'));
export const Carousel = React.lazy(() => import('../pages/uikit/Carousel'));
export const EmbedVedio = React.lazy(() => import('../pages/uikit/EmbedVideo'));
export const Dropdowns = React.lazy(() => import('../pages/uikit/Dropdowns'));
export const PopoversAndTooltips = React.lazy(() => import('../pages/uikit/PopoversAndTooltips'));
export const GeneralUI = React.lazy(() => import('../pages/uikit/GeneralUI'));
export const Typography = React.lazy(() => import('../pages/uikit/Typography'));
export const Grid = React.lazy(() => import('../pages/uikit/Grid'));

// widgets
export const Widgets = React.lazy(() => import('../pages/uikit/Widgets'));

// extended ui
export const RangeSliders = React.lazy(() => import('../pages/uikit/RangeSlider'));
export const NestableList = React.lazy(() => import('../pages/uikit/NestableList'));
export const SweetAlerts = React.lazy(() => import('../pages/uikit/SweetAlerts'));
export const Tourpage = React.lazy(() => import('../pages/uikit/TourPage'));
export const TreeViewExample = React.lazy(() => import('../pages/uikit/TreeView'));

// icons
export const FeatherIcons = React.lazy(() => import('../pages/icons/FeatherIcons'));
export const MDIIcons = React.lazy(() => import('../pages/icons/MDIIcons'));
export const Dripicons = React.lazy(() => import('../pages/icons/DripiIcons'));
export const FontAwesomeIcons = React.lazy(() => import('../pages/icons/FontAwesomeIcons'));
export const ThemifyIcons = React.lazy(() => import('../pages/icons/ThemifyIcons'));

// forms
export const GeneralElements = React.lazy(() => import('../pages/forms/Basic'));
export const FormAdvanced = React.lazy(() => import('../pages/forms/Advanced'));
export const Validation = React.lazy(() => import('../pages/forms/Validation'));
export const FormWizard = React.lazy(() => import('../pages/forms/Wizard'));
export const FileUpload = React.lazy(() => import('../pages/forms/FileUpload'));
export const Editors = React.lazy(() => import('../pages/forms/Editors'));

// tables
export const BasicTable = React.lazy(() => import('../pages/tables/BasicTable'));
export const AdvancedTable = React.lazy(() => import('../pages/tables/AdvancedTable'));

// charts
export const ApexChart = React.lazy(() => import('../pages/chart/ApexChart'));
export const ChartJs = React.lazy(() => import('../pages/chart/ChartJs'));

// maps
export const GoogleMaps = React.lazy(() => import('../pages/maps/GoogleMaps'));
export const VectorMaps = React.lazy(() => import('../pages/maps/VectorMaps'));

// lamding
export const Landing = React.lazy(() => import('../pages/Landing'));
