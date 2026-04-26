import DashboardHeader from "@/components/dashboard/DashboardHeader";
import OverviewHeader from "@/components/dashboard/OverviewHeader";
import SidebarRail from "@/components/dashboard/SidebarRail";
import StatTiles from "@/components/dashboard/StatTiles";
import ActivitySection from "@/components/dashboard/ActivitySection";
import DownloadInstallSection from "@/components/dashboard/DownloadInstallSection";
import TestingSection from "@/components/dashboard/TestingSection";
import HelpSection from "@/components/dashboard/HelpSection";
import ConnectExtension from "@/components/ConnectExtension";
import FlaggedReviewSection from "@/components/dashboard/FlaggedReviewSection";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <DashboardHeader />

      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid lg:grid-cols-[280px_minmax(0,1fr)] gap-8">
          <SidebarRail />

          <main className="space-y-10 min-w-0">
            <OverviewHeader />
            <StatTiles />

            <div id="review">
              <FlaggedReviewSection />
            </div>

            <ActivitySection />

            <div
              id="extension"
              className="grid md:grid-cols-2 gap-4"
            >
              <ConnectExtension />
              <TestingSection />
            </div>

            <DownloadInstallSection />

            <HelpSection />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
