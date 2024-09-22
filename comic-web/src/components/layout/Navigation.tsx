import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { cn } from "~/lib/utils";

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent focus:bg-accent",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";

const List = ({ children }: { children: React.ReactNode }) => {
  return (
    <ul className={cn("grid grid-cols-3 gap-1 bg-background p-2 md:w-[400px] lg:w-[500px]")}>
      {children}
    </ul>
  );
};

const Navigation = () => {
  return (
    <NavigationMenu className="basis-4/12">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Thể loại</NavigationMenuTrigger>
          <NavigationMenuContent>
            <List>
              <ListItem href="/genres" title="Introduction" />
              <ListItem href="/genres" title="Installation" />
              <ListItem href="/genres" title="Typography" />
              <ListItem href="/genres" title="Typography" />
              <ListItem href="/genres" title="Typography" />
              <ListItem href="/genres" title="Typography" />
              <ListItem href="/genres" title="Typography" />
              <ListItem href="/genres" title="Typography" />
              <ListItem href="/genres" title="Typography" />
              <ListItem href="/genres" title="Typography" />
              <ListItem href="/genres" title="Typography" />
              <ListItem href="/genres" title="Typography" />
              <ListItem href="/genres" title="Typography" />
              <ListItem href="/genres" title="Typography" />
              <ListItem href="/genres" title="Typography" />
              <ListItem href="/genres" title="Typography" />
              <ListItem href="/genres" title="Typography" />
              <ListItem href="/genres" title="Typography" />
              <ListItem href="/genres" title="Typography" />
              <ListItem href="/genres" title="Typography" />
              <ListItem href="/genres" title="Typography" />
              <ListItem href="/genres" title="Typography" />
              <ListItem href="/genres" title="Typography" />
              <ListItem href="/genres" title="Typography" />
              <ListItem href="/genres" title="Typography" />
              <ListItem href="/genres" title="Typography" />
            </List>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Xếp hạng</NavigationMenuTrigger>
          <NavigationMenuContent>
            <List>
              <ListItem href="/top-day" title="Top ngày" />
              <ListItem href="/top-week" title="Top tuần" />
              <ListItem href="/top-month" title="Top tháng" />
            </List>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
            Mới cập nhật
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;
