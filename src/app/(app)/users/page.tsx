"use client";

import {
  MoreHorizontal,
  PlusCircle,
  File,
  Mail,
  ShieldCheck,
  CircleOff,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "@/hooks/use-translation";

const users = [
  { 
    id: "1", 
    name: "Admin User", 
    email: "admin@example.com", 
    role: "admin", 
    status: "active",
    avatar: "https://i.pravatar.cc/150?u=admin@example.com" 
  },
  { 
    id: "2", 
    name: "Staff User", 
    email: "staff@example.com", 
    role: "staff", 
    status: "active",
    avatar: "https://i.pravatar.cc/150?u=staff@example.com"
  },
   { 
    id: "3", 
    name: "Jane Doe", 
    email: "jane.doe@example.com", 
    role: "staff", 
    status: "inactive",
    avatar: "https://i.pravatar.cc/150?u=jane.doe@example.com"
  },
  { 
    id: "4", 
    name: "John Smith", 
    email: "john.smith@example.com", 
    role: "staff", 
    status: "active",
    avatar: "https://i.pravatar.cc/150?u=john.smith@example.com"
  },
];

export default function UsersPage() {
  const { t } = useTranslation();
  return (
     <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{t('users.title')}</h1>
            <p className="text-muted-foreground">
              {t('users.description')}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                {t('common.export')}
              </span>
            </Button>
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                {t('users.addUser')}
              </span>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {users.map((user) => (
              <Card key={user.id}>
                <CardHeader>
                    <div className="flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <CardTitle className="text-lg">{user.name}</CardTitle>
                                <CardDescription className="flex items-center gap-2 text-xs">
                                    <Mail className="h-3 w-3" />
                                    {user.email}
                                </CardDescription>
                            </div>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">{t('common.toggleMenu')}</span>
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{t('common.actions')}</DropdownMenuLabel>
                            <DropdownMenuItem>{t('common.edit')}</DropdownMenuItem>
                            <DropdownMenuItem>{t('users.changeRole')}</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600 dark:text-red-500">{t('common.delete')}</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardHeader>
                <CardContent className="grid gap-2">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                        <Badge variant={user.role === 'admin' ? 'default' : 'outline'}>
                            {t(`users.roles.${user.role}` as any)}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                        {user.status === 'active' ? <div className="h-4 w-4 rounded-full bg-green-500" /> : <CircleOff className="h-4 w-4 text-muted-foreground" />}
                        <span className="capitalize text-sm">{t(`users.status.${user.status}` as any)}</span>
                    </div>
                </CardContent>
              </Card>
            ))}
      </div>
      <div className="text-xs text-muted-foreground text-center">
        {t('users.showing', { start: 1, end: users.length, total: users.length })}
      </div>
    </div>
  );
}
