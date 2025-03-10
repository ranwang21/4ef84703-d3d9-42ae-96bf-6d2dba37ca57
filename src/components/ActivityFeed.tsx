import React, { useCallback } from "react";
import { Call } from "../types";
import CallItem from "./CallItem";
import { FixedSizeList as List } from "react-window";
import "./components.css";

interface ActivityFeedProps {
  calls: Call[];
  onArchiveToggle: (id: string, isArchived: boolean) => void;
  onCallSelect: (id: string) => void;
  onArchiveAll: () => void;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({
  calls,
  onArchiveToggle,
  onCallSelect,
  onArchiveAll,
}) => {
  const activeCalls = calls.filter((call) => !call.is_archived);

  const Row = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const call = activeCalls[index];
      return (
        <div style={style}>
          <CallItem
            key={call.id}
            call={call}
            onArchiveToggle={onArchiveToggle}
            onCallSelect={onCallSelect}
          />
        </div>
      );
    },
    [activeCalls, onArchiveToggle, onCallSelect]
  );

  return (
    <div className="activity-feed">
      {activeCalls.length > 0 && (
        <button className="button archive-all-button" onClick={onArchiveAll}>
          Archive all calls
        </button>
      )}

      {activeCalls.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-phone-slash"></i>
          <p>No calls to display</p>
        </div>
      ) : (
        <List
          height={450}
          width="100%"
          itemCount={activeCalls.length}
          itemSize={80}
        >
          {Row}
        </List>
      )}
    </div>
  );
};

export default ActivityFeed;
