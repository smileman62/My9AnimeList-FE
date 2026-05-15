import axios from "axios";

/**
 * 이 Next 앱의 `/api/*` 라우트 호출용(브라우저에서 동일 출처).
 * 서버에서 호출할 때는 `baseURL`을 절대 URL로 넘기세요.
 */
export const internalApiClient = axios.create({
  headers: {
    Accept: "application/json",
  },
});
