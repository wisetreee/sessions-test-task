import { apiRequest } from "./client";
import { PaginatedResponse, SessionListItem, SessionDetails } from "@/types";

export async function getSessionList(
  page: number,
  limit: number,
): Promise<PaginatedResponse<SessionListItem>> {
  return apiRequest<PaginatedResponse<SessionListItem>>(
    `/session/list?page=${page}&limit=${limit}`,
  );
}

export async function getSessionDetails(id: string): Promise<SessionDetails> {
  return apiRequest<SessionDetails>(`/session/${id}`);
}
