
"use client";
import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons";
import {
  Home,
  Package,
  Users,
  Truck,
  Settings,
  BarChart3,
  ShoppingCart,
  LifeBuoy,
  User,
  Languages
} from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

const navItems = [
  { href: "/dashboard", icon: Home, label: "dashboard", tooltip: "Dashboard" },
  { href: "/inventory", icon: Package, label: "inventory", tooltip: "Inventory" },
  { href: "/suppliers", icon: Truck, label: "suppliers", tooltip: "Suppliers" },
  { href: "/users", icon: Users, label: "users", tooltip: "Users" },
  { href: "/reports", icon: BarChart3, label: "reports", tooltip: "Reports" },
  { href: "/store", icon: ShoppingCart, label: "store", tooltip: "Store" },
];

export function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { t, setLanguage, language } = useTranslation();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo className="size-7 text-primary" />
            <span className="text-lg font-semibold">Stockpile</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
                  tooltip={t(`sidebar.${item.tooltip}` as any)}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{t(`sidebar.${item.label}` as any)}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith("/settings")}
                tooltip={t("sidebar.settings")}
              >
                <Link href="/settings">
                  <Settings />
                  <span>{t("sidebar.settings")}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith("/profile")}
                tooltip={t("sidebar.profile")}
              >
                <Link href="/profile">
                  <User />
                  <span>{t("sidebar.profile")}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={t("sidebar.help")}>
                <Link href="#">
                  <LifeBuoy />
                  <span>{t("sidebar.help")}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="flex-1">
              {/* Breadcrumbs or page title can go here */}
            </div>
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                  >
                    <Languages className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuLabel>{t('languageSwitcher.title')}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={language} onValueChange={setLanguage}>
                    <DropdownMenuRadioItem value="en">
                      {t('languageSwitcher.en')}
                    </DropdownMenuRadioItem>
                     <DropdownMenuRadioItem value="es">
                      {t('languageSwitcher.es')}
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="" alt="@user" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>{t('userMenu.myAccount')}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">{t('userMenu.profile')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>{t('userMenu.billing')}</DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">{t('userMenu.settings')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/login">{t('userMenu.logout')}</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 sm:p-6">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    );
  }
