export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: any;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);