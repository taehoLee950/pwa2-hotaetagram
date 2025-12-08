import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import {
  CacheFirst,
  NetworkFirst,
  StaleWhileRevalidate,
} from "workbox-strategies";

const PREFIX = import.meta.env.VITE_APP_NAME;

// ---------------------------------
// 정적 파일 캐싱
// ---------------------------------
precacheAndRoute(self.__WB_MANIFEST);

// ---------------------------------
// HTML 오프라인 대응
// ---------------------------------
registerRoute(
  ({ request }) => request.mode === "navigate",
  new NetworkFirst({
    cacheName: `${PREFIX}-html-cache`, // html cache인지, api cache인지 등 이름을 정함.
    networkTimeoutSeconds: 3, // NetworkFirst: 서버의 요청반환을 최대 3초까지 기다린 후 캐시 데이터를 전송
  })
);

// ---------------------------------
// 이미지 캐싱
// ---------------------------------
registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: `${PREFIX}-image-cache`,
    networkTimeoutSeconds: 3,
  })
);

// ----------------------------------
// API 요청 캐싱(최소 동작 보장, GET을 제외한 나머지는 제외)
// ----------------------------------
registerRoute(
  ({ request, url }) =>
    url.origin === import.meta.env.VITE_SERVER_URL && request.method === "GET", // 우리 도메인 확인 + GET method 인지 확인 후 캐싱
  new StaleWhileRevalidate({
    cacheName: `${PREFIX}-api-cache`,
    networkTimeoutSeconds: 3,
  })
);
