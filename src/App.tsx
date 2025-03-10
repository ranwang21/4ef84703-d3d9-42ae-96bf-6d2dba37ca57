import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ActivityFeed from "./components/ActivityFeed";
import Archive from "./components/Archive";
import ActivityDetail from "./components/ActivityDetail";
import { Call, TabType } from "./types";
import { fetchActivities, updateActivityArchiveStatus } from "./api/activities";

const App: React.FC = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("activity");
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear any existing timeout when component unmounts
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const loadCalls = async () => {
      try {
        setLoading(true);
        const data = await fetchActivities();
        setCalls(data);
        setError(null);
      } catch (err) {
        setError("Failed to load calls");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCalls();
  }, []);

  const handleArchiveToggle = async (id: string, isArchived: boolean) => {
    try {
      await updateActivityArchiveStatus(id, isArchived);
      setCalls((prevCalls) =>
        prevCalls.map((call) =>
          call.id === id ? { ...call, is_archived: isArchived } : call
        )
      );
    } catch (err) {
      console.error("Error updating archive status:", err);
    }
  };

  const handleArchiveAll = async () => {
    const activeCalls = calls.filter((call) => !call.is_archived);
    if (activeCalls.length === 0) return;

    try {
      setIsTransitioning(true);
      const archivePromises = activeCalls.map((call) =>
        updateActivityArchiveStatus(call.id, true)
      );

      await Promise.all(archivePromises);

      setCalls((prevCalls) =>
        prevCalls.map((call) =>
          !call.is_archived ? { ...call, is_archived: true } : call
        )
      );
    } catch (err) {
      console.error("Error archiving all calls:", err);
    } finally {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
      transitionTimeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }
  };

  const handleUnarchiveAll = async () => {
    const archivedCalls = calls.filter((call) => call.is_archived);
    if (archivedCalls.length === 0) return;

    try {
      setIsTransitioning(true);
      const unarchivePromises = archivedCalls.map((call) =>
        updateActivityArchiveStatus(call.id, false)
      );

      await Promise.all(unarchivePromises);

      setCalls((prevCalls) =>
        prevCalls.map((call) =>
          call.is_archived ? { ...call, is_archived: false } : call
        )
      );
    } catch (err) {
      console.error("Error unarchiving all calls:", err);
    } finally {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
      transitionTimeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }
  };

  const handleCallSelect = (id: string) => {
    if (id === selectedCallId) return;

    setIsTransitioning(true);
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    transitionTimeoutRef.current = setTimeout(() => {
      setSelectedCallId(id);
      setIsTransitioning(false);
    }, 300);
  };

  const handleBack = () => {
    setIsTransitioning(true);
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    transitionTimeoutRef.current = setTimeout(() => {
      setSelectedCallId(null);
      setIsTransitioning(false);
    }, 300);
  };

  const handleTabChange = (tab: TabType) => {
    if (tab !== activeTab) {
      setIsTransitioning(true);
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
      transitionTimeoutRef.current = setTimeout(() => {
        setActiveTab(tab);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const renderContent = () => {
    if (loading) {
      return <div className="loading">Loading calls...</div>;
    }

    if (error) {
      return <div className="error">{error}</div>;
    }

    if (isTransitioning) {
      return <div className="loading">Loading...</div>;
    }

    if (selectedCallId) {
      return (
        <ActivityDetail
          callId={selectedCallId}
          onBack={handleBack}
          onArchiveToggle={handleArchiveToggle}
        />
      );
    }

    return (
      <>
        <div className="tab-container">
          <div
            className={`tab ${activeTab === "activity" ? "active" : ""}`}
            onClick={() => handleTabChange("activity")}
          >
            Activity
          </div>
          <div
            className={`tab ${activeTab === "archived" ? "active" : ""}`}
            onClick={() => handleTabChange("archived")}
          >
            Archived
          </div>
        </div>

        {activeTab === "activity" ? (
          <ActivityFeed
            calls={calls}
            onArchiveToggle={handleArchiveToggle}
            onCallSelect={handleCallSelect}
            onArchiveAll={handleArchiveAll}
          />
        ) : (
          <Archive
            calls={calls}
            onArchiveToggle={handleArchiveToggle}
            onCallSelect={handleCallSelect}
            onUnarchiveAll={handleUnarchiveAll}
          />
        )}
      </>
    );
  };

  return (
    <div className="app-container">
      <Header />
      <div className="content">{renderContent()}</div>
      <Footer />
    </div>
  );
};

export default App;
