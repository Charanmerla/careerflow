import React, { useState } from "react";
import { Bell, Menu, Search, User, LogOut, BadgePercent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PremiumModal from "./PremiumModal";

const TopBar = () => {
  const { toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);

  return (
    <div className="h-[60px] bg-white border-b border-gray-200 sticky top-0 z-10 flex items-center justify-between px-2 sm:px-4 shadow-sm w-full">
      {/* Left side - Toggle and Search */}
      <div className="flex items-center gap-1 sm:gap-2 flex-1 max-w-[calc(100%-80px)] sm:max-w-none">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="h-8 w-8 rounded-full text-gray-500 md:mr-2 flex-shrink-0"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>

        <div className="relative w-full md:w-[320px]">
          <div className="absolute inset-y-0 left-0 flex items-center pl-2 sm:pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-50 border border-gray-200 pl-8 sm:pl-10 pr-2 sm:pr-4 py-1.5 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Right side - Premium button and Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Premium button - only visible on desktop */}
        {!isMobile && (
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-full flex items-center gap-1.5 px-2 sm:px-3 py-1 h-8 hover:scale-105 transition-transform"
            onClick={() => setIsPremiumModalOpen(true)}
          >
            <BadgePercent className="h-4 w-4" />
            <span>Upgrade to Premium</span>
          </Button>
        )}

        {/* Profile dropdown menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700"
            >
              <User className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-1">
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-600 hover:text-red-700">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Premium modal */}
      <PremiumModal
        isOpen={isPremiumModalOpen}
        onClose={() => setIsPremiumModalOpen(false)}
      />
    </div>
  );
};

export default TopBar;
