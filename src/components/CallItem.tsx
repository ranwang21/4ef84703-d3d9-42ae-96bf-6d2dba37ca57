import React from "react";
import { Call } from "../types";
import "./components.css";

interface CallItemProps {
  call: Call;
  onArchiveToggle: (id: string, isArchived: boolean) => void;
  onCallSelect: (id: string) => void;
}

const CallItem: React.FC<CallItemProps> = ({
  call,
  onArchiveToggle,
  onCallSelect,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getCallIcon = () => {
    if (call.call_type === "missed") {
      return "fas fa-phone-slash";
    } else if (call.call_type === "answered") {
      return "fas fa-phone";
    } else {
      return "fas fa-voicemail";
    }
  };

  const handleArchiveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onArchiveToggle(call.id, !call.is_archived);
  };

  return (
    <div className="call-item" onClick={() => onCallSelect(call.id)}>
      <div className={`call-icon ${call.direction} ${call.call_type}`}>
        <i className={getCallIcon()}></i>
      </div>
      <div className="call-info">
        <div className="call-number">{call.from}</div>
        <div className="call-details">
          <span className="call-time">{formatDate(call.created_at)}</span>
          <span className="call-via">via {call.via}</span>
          <span className="call-duration">{formatDuration(call.duration)}</span>
        </div>
      </div>
      <div className="call-actions">
        <button className="archive-button" onClick={handleArchiveClick}>
          <i
            className={call.is_archived ? "fas fa-box-open" : "fas fa-archive"}
          ></i>
        </button>
      </div>
    </div>
  );
};

export default CallItem;
