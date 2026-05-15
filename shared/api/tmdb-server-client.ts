import axios, { type AxiosInstance } from "axios";

let tmdbServerClient: AxiosInstance | null = null;

/**
 * TMDB Read Access Token.
 * `.env`에 `VITE_TMDB_ACCESS_TOKEN`으로 두는 경우(기존 Vite 프로젝트 관례)와
 * `TMDB_READ_ACCESS_TOKEN` 모두 지원합니다.
 */
export function resolveTmdbAccessToken(): string | undefined {
  const fromVite = process.env.VITE_TMDB_ACCESS_TOKEN?.trim();
  const fromLegacy = process.env.TMDB_READ_ACCESS_TOKEN?.trim();
  return fromVite || fromLegacy || undefined;
}

/**
 * TMDB v3 API 전용. 서버(Route Handler, Server Action 등)에서만 사용하세요.
 * @see https://developer.themoviedb.org/reference/getting-started
 */
export function getTmdbServerClient(): AxiosInstance {
  const token = resolveTmdbAccessToken();
  if (!token) {
    throw new Error(
      "TMDB 액세스 토큰이 없습니다. .env에 VITE_TMDB_ACCESS_TOKEN 또는 TMDB_READ_ACCESS_TOKEN을 설정하세요.",
    );
  }
  if (!tmdbServerClient) {
    tmdbServerClient = axios.create({
      baseURL: "https://api.themoviedb.org/3",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
  }
  return tmdbServerClient;
}
