import React, { useEffect, useState, useCallback } from "react";
import { Call } from "../types";
import {
  fetchActivityById,
  updateActivityArchiveStatus,
} from "../api/activities";
import "./components.css";

interface ActivityDetailProps {
  callId: string;
  onBack: () => void;
  onArchiveToggle: (id: string, isArchived: boolean) => void;
}

const ActivityDetail: React.FC<ActivityDetailProps> = ({
  callId,
  onBack,
  onArchiveToggle,
}) => {
  const [call, setCall] = useState<Call | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCall = async () => {
      try {
        setLoading(true);
        const data = await fetchActivityById(callId);
        if (isMounted) {
          setCall(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load call details");
          console.error(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCall();

    return () => {
      isMounted = false;
    };
  }, [callId]);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
  }, []);

  const formatDuration = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} min ${remainingSeconds} sec`;
  }, []);

  const getCallIcon = useCallback(() => {
    if (!call) return "fas fa-phone";

    if (call.call_type === "missed") {
      return "fas fa-phone-slash";
    } else if (call.call_type === "answered") {
      return "fas fa-phone";
    } else {
      return "fas fa-voicemail";
    }
  }, [call]);

  const handleArchiveToggle = useCallback(() => {
    if (call) {
      onArchiveToggle(call.id, !call.is_archived);
      setCall({
        ...call,
        is_archived: !call.is_archived,
      });
    }
  }, [call, onArchiveToggle]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error || !call) {
    return <div className="error">{error || "Call not found"}</div>;
  }

  return (
    <div className="activity-detail">
      <button className="back-button" onClick={onBack}>
        <i className="fas fa-arrow-left"></i> Back
      </button>

      <div className="detail-card">
        <div className="detail-header">
          <div className={`detail-icon ${call.direction} ${call.call_type}`}>
            <i className={getCallIcon()}></i>
          </div>
          <div className="detail-title">
            {call.direction === "inbound" ? "Incoming call" : "Outgoing call"}{" "}
            from {call.from}
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-label">From:</div>
          <div className="detail-value">{call.from}</div>
        </div>

        <div className="detail-item">
          <div className="detail-label">To:</div>
          <div className="detail-value">{call.to}</div>
        </div>

        <div className="detail-item">
          <div className="detail-label">Via:</div>
          <div className="detail-value">{call.via}</div>
        </div>

        <div className="detail-item">
          <div className="detail-label">Duration:</div>
          <div className="detail-value">{formatDuration(call.duration)}</div>
        </div>

        <div className="detail-item">
          <div className="detail-label">Call Type:</div>
          <div className="detail-value">{call.call_type}</div>
        </div>

        <div className="detail-item">
          <div className="detail-label">Time:</div>
          <div className="detail-value">{formatDate(call.created_at)}</div>
        </div>

        <div className="detail-actions">
          <button className="button" onClick={handleArchiveToggle}>
            {call.is_archived ? "Unarchive" : "Archive"} Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail;
