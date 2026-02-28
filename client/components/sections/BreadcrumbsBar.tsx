import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

export function BreadcrumbsBar(props: {
  items: Array<{ label: string; to?: string }>;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-6">
      <Breadcrumb>
        <BreadcrumbList>
          {props.items.map((item, idx) => {
            const isLast = idx === props.items.length - 1;
            return (
              <div key={`${item.label}-${idx}`} className="inline-flex">
                <BreadcrumbItem>
                  {isLast || !item.to ? (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={item.to}>{item.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast ? <BreadcrumbSeparator /> : null}
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
