export const BASE_URL = 'http://localhost:8000';

export const API_PATHS = {
    AUTH:{
        LOGIN:"/api/v1/auth/login",
        REGISTER:"/api/v1/auth/register",
        GET_USER_INFO:"/api/v1/auth/getUser",
    },
    DASHBOARD:{
        GET_DATA:"/api/v1/dashboard",
    },
    
    IMAGE:{
        UPLOAD_IMAGE:"/api/v1/auth/upload-image",
    },
     SESSIONS: {
  PUBLIC: "/api/v1/sessions", // GET all published sessions
  MY_SESSIONS: "/api/v1/sessions/my-sessions", // GET user's sessions
  VIEW_SINGLE: (id) => `/api/v1/sessions/my-sessions/${id}`,
  SAVE_DRAFT: "/api/v1/sessions/my-sessions/save-draft",
  PUBLISH: "/api/v1/sessions/my-sessions/publish",
}
}