import { Suspense, lazy, ElementType } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to="/dashboard/profile" replace />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/profile" replace />, index: true },
        { path: 'profile', element: <Profile /> },
        { path: 'tasks', element: <Tasks /> },
        { path: 'calendar', element: <Calendar /> },
        {
          path: 'organization',
          children: [
            {
              element: <Navigate to="/dashboard/organization/other-organization" replace />,
              index: true,
            },
            { path: 'other-organization', element: <OrganizationOther /> },
            { path: 'my-organization', element: <OrganizationOwn /> },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// Dashboard
const Profile = Loadable(lazy(() => import('../pages/Profile')));
const Tasks = Loadable(lazy(() => import('../pages/Tasks')));
const Calendar = Loadable(lazy(() => import('../pages/Calendar')));
const OrganizationOther = Loadable(lazy(() => import('../pages/OrganizationOther')));
const OrganizationOwn = Loadable(lazy(() => import('../pages/OrganizationOwn')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
