import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "";

/**
 * 백엔드 API(httpOnly 쿠키 세션)용 클라이언트.
 */
export const apiClient = axios.create({
  baseURL: baseURL || undefined,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});
