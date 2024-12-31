import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/Components/ui/breadcrumb';
import { Home } from 'lucide-react';
import React from 'react';

interface IManagementHeader {
  title: string;
  desc: string;
  actionComponent?: React.ReactNode;
}

const ManagementHeader = ({
  title,
  desc,
  actionComponent,
}: IManagementHeader) => {
  const generateBreadcrumbItems = () => {
    const path = window.location.pathname;
    const segments = path.split('/').filter(Boolean);

    return segments.map(segment => ({
      label: segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      href: '/' + segments.slice(0, segments.indexOf(segment) + 1).join('/'),
    }));
  };

  const breadcrumbItems = generateBreadcrumbItems();

  return (
    <div className="space-y-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <Home className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>

          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={item.href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {index === breadcrumbItems.length - 1 ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-end justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">{title}</h1>
          <p>{desc}</p>
        </div>
        {actionComponent}
      </div>
    </div>
  );
};

export default ManagementHeader;
