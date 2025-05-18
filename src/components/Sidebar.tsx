import {
  ChevronDown,
  Home,
  FileText,
  Briefcase,
  FileSpreadsheet,
  Linkedin,
  Mail,
  Users,
  Upload,
  Crown,
  ExternalLink,
  LightbulbIcon,
  Bug,
  BadgePercent,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Sidebar as UISidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import PremiumModal from "./PremiumModal";

const Sidebar = () => {
  const isMobile = useIsMobile();
  const { state: sidebarState } = useSidebar();
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);

  return (
    <UISidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="border-b border-gray-200">
        <div
          className={`h-[60px] flex items-center${
            sidebarState === "expanded" ? " px-4" : ""
          }`}
        >
          <div className="flex items-center gap-2 truncate">
            <div className="h-7 w-7 mx-auto flex-shrink-0 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
              C
            </div>
            {sidebarState === "expanded" && (
              <div className="font-semibold text-lg truncate">
                Careerflow.ai
              </div>
            )}
          </div>
        </div>
      </SidebarHeader>

      {/* Navigation links */}
      <SidebarContent className="py-4 overflow-auto scrollbar-improved">
        <NavItem
          icon={<Home size={18} />}
          label="Home"
          link="/"
          sidebarState={sidebarState}
        />
        <NavItem
          icon={<FileText size={18} />}
          label="Resume Builder"
          link="/resume-builder"
          sidebarState={sidebarState}
        />
        <NavItem
          icon={<Briefcase size={18} />}
          label="Job Tracker"
          link="/job-tracker"
          sidebarState={sidebarState}
        />

        <NavItem
          icon={<FileSpreadsheet size={18} />}
          label="Application Materials"
          hasChildren
          children={[
            {
              label: "My Documents",
              icon: <FileText size={18} />,
              link: "/documents",
            },
            {
              label: "Cover Letters",
              icon: <Mail size={18} />,
              link: "/cover-letter",
            },
          ]}
          sidebarState={sidebarState}
        />

        <NavItem
          icon={<Users size={18} />}
          label="Networking"
          hasChildren
          link="/networking"
          sidebarState={sidebarState}
        />
        <NavItem
          icon={<Upload size={18} />}
          label="AI Toolbox"
          hasChildren
          link="/ai-toolbox"
          sidebarState={sidebarState}
        />
      </SidebarContent>

      {/* Bottom items */}
      <SidebarFooter className="py-4 border-t border-gray-200">
        {/* Premium button for mobile */}
        {isMobile && (
          <div className="px-4 mb-3">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-full flex items-center gap-1.5 px-3 py-1 h-8 w-full justify-center"
              onClick={() => setIsPremiumModalOpen(true)}
            >
              <BadgePercent className="h-4 w-4" />
              <span>Upgrade to Premium</span>
            </Button>
          </div>
        )}

        <NavItem
          icon={<LightbulbIcon size={18} />}
          label="Suggest a Feature"
          link="/suggest-feature"
          sidebarState={sidebarState}
        />
        <NavItem
          icon={<Bug size={18} />}
          label="Report a bug"
          link="/report-bug"
          sidebarState={sidebarState}
        />

        {/* Premium Modal */}
        <PremiumModal
          isOpen={isPremiumModalOpen}
          onClose={() => setIsPremiumModalOpen(false)}
        />
      </SidebarFooter>
    </UISidebar>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  hasChildren?: boolean;
  link?: string;
  children?: { label: string; icon: React.ReactNode; link?: string }[];
  sidebarState: "expanded" | "collapsed";
}

const NavItem = ({
  icon,
  label,
  active,
  hasChildren,
  link,
  children,
  sidebarState,
}: NavItemProps) => {
  const { toggleSidebar } = useSidebar();
  // Check if current path matches this item's path or any of its children's paths
  const path = window.location.pathname;
  const isActive = link === path;
  const hasActiveChild = children?.some((child) => child.link === path);

  const [isExpanded, setIsExpanded] = useState(
    label === "Application Materials" || hasActiveChild
  );

  // Collapse submenu when sidebar is collapsed
  useEffect(() => {
    if (sidebarState === "collapsed") {
      setIsExpanded(false);
    }
  }, [sidebarState]);

  const handleToggleExpand = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  const handleNavItemClick = (e: React.MouseEvent) => {
    // If sidebar is collapsed, expand it on any NavItem click
    if (sidebarState === "collapsed") {
      toggleSidebar();
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    // Otherwise, handle submenu toggle if needed
    handleToggleExpand(e);
  };

  const content = (
    <>
      <span className="text-gray-500 flex-shrink-0 flex items-center justify-center">
        {icon}
      </span>
      {sidebarState === "expanded" && (
        <span className="flex-1 truncate">{label}</span>
      )}
      {hasChildren && sidebarState === "expanded" && (
        <ChevronDown
          size={16}
          className={`flex-shrink-0 ${
            isExpanded ? "transform rotate-180" : ""
          }`}
        />
      )}
    </>
  );

  return (
    <>
      <div
        className={`flex items-center px-4 py-2 cursor-pointer gap-3 ${
          isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
        }`}
        onClick={handleNavItemClick}
      >
        {link && !hasChildren ? (
          <Link to={link} className="flex items-center gap-3 w-full truncate">
            {content}
          </Link>
        ) : (
          content
        )}
      </div>

      {/* Render child menu items only if sidebar and submenu are expanded */}
      {sidebarState === "expanded" && isExpanded && children && (
        <div className="pl-10">
          {children.map((child, index) => {
            const isChildActive = child.link === path;

            const childContent = (
              <>
                <span className="text-gray-500 flex-shrink-0 flex items-center justify-center">
                  {child.icon}
                </span>
                <span className="truncate">{child.label}</span>
              </>
            );

            return (
              <div
                key={index}
                className={`flex items-center py-2 cursor-pointer gap-3 text-sm hover:bg-gray-100 ${
                  isChildActive ? "bg-blue-50 text-blue-600" : ""
                }`}
              >
                {child.link ? (
                  <Link
                    to={child.link}
                    className="flex items-center gap-3 truncate w-full"
                  >
                    {childContent}
                  </Link>
                ) : (
                  childContent
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Sidebar;
