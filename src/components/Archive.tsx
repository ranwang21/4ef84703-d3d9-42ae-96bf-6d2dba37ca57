import React, { useCallback } from "react";
import { Call } from "../types";
import CallItem from "./CallItem";
import { FixedSizeList as List } from "react-window";
import "./components.css";

interface ArchiveProps {
  calls: Call[];
  onArchiveToggle: (id: string, isArchived: boolean) => void;
  onCallSelect: (id: string) => void;
  onUnarchiveAll: () => void;
}

const Archive: React.FC<ArchiveProps> = ({
  calls,
  onArchiveToggle,
  onCallSelect,
  onUnarchiveAll,
}) => {
  const archivedCalls = calls.filter((call) => call.is_archived);

  const Row = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const call = archivedCalls[index];
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
    [archivedCalls, onArchiveToggle, onCallSelect]
  );

  return (
    <div className="archive">
      {archivedCalls.length > 0 && (
        <button className="button archive-all-button" onClick={onUnarchiveAll}>
          Unarchive all calls
        </button>
      )}

      {archivedCalls.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-archive"></i>
          <p>No archived calls</p>
        </div>
      ) : (
        <List
          height={450}
          width="100%"
          itemCount={archivedCalls.length}
          itemSize={80}
        >
          {Row}
        </List>
      )}
    </div>
  );
};

export default Archive;
