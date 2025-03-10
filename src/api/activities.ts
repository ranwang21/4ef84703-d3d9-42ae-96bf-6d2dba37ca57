import { Call } from "../types";

const BASE_URL = "https://aircall-api.onrender.com";

export const fetchActivities = async (): Promise<Call[]> => {
  try {
    const response = await fetch(`${BASE_URL}/activities`);
    if (!response.ok) {
      throw new Error("Failed to fetch activities");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching activities:", error);
    throw error;
  }
};

export const fetchActivityById = async (id: string): Promise<Call> => {
  try {
    const response = await fetch(`${BASE_URL}/activities/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch activity with id ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching activity with id ${id}:`, error);
    throw error;
  }
};

export const updateActivityArchiveStatus = async (
  id: string,
  isArchived: boolean
): Promise<Call> => {
  try {
    console.log("called patch");
    const response = await fetch(`${BASE_URL}/activities/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_archived: isArchived }),
    });
    if (!response.ok) {
      throw new Error(
        `Failed to update archive status for activity with id ${id}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error(
      `Error updating archive status for activity with id ${id}:`,
      error
    );
    throw error;
  }
};

export const resetActivities = async (): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/reset`, {
      method: "PATCH",
    });
    if (!response.ok) {
      throw new Error("Failed to reset activities");
    }
  } catch (error) {
    console.error("Error resetting activities:", error);
    throw error;
  }
};
