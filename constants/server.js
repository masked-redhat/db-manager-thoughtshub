import { apiUrl } from "./api_url";

export const checkAdminUrl = `${apiUrl}/check-admin`;
export const loginAdminUrl = `${apiUrl}/admin-login`;
export const newsUploadUrl = `${apiUrl}/admin/news`;
export const forumsUploadUrl = `${apiUrl}/forums`;
export const logoutUrl = `${apiUrl}/logout`;
export const uploadUrl = `${apiUrl}/upload`;
export const getNewsUrl = `${apiUrl}/news`;
export const getForumsUrl = `${apiUrl}/forums`;
export const getForumsByOffsetUrl = `${apiUrl}/forums/bo`;
export const getForumsCountUrl = `${apiUrl}/forums/pages`;
export const getNewsByOffsetUrl = `${apiUrl}/news/bo`;
export const getNewsCountUrl = `${apiUrl}/news/pages`;
export const getCategoriesUrl = `${apiUrl}/admin/categories`;
export const deleteAllNewsUrl = `${apiUrl}/admin/all/news`;
export const deleteAllForumsUrl = `${apiUrl}/admin/all/forums`;
export const createCategoryUrl = `${apiUrl}/admin/categories`;
export const upvoteForumsUrl = `${apiUrl}/forums/upvote`;
export const deleteForumUrl = `${apiUrl}/admin/forums`;
export const getUsersCountUrl = `${apiUrl}/admin/users/pages`;
export const getUsersUrl = `${apiUrl}/admin/users`;
export const checkUsernameUrl = `${apiUrl}/check-username`;
export const getUserUrl = `${apiUrl}/admin/user`;
export const changeMaxSizeUrl = `${apiUrl}/admin/max-image-size`