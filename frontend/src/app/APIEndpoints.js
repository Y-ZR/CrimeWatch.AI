import { HOSTED_GOOGLE_API_URL } from "../../../config";

export const ANALYSIS_ENDPOINTS = {
  BASIC: "get_video_analysis/",
  DETAILED: "get_deeper_analysis/",
};

export const getVideoBasicAnalysis = () =>
  `${HOSTED_GOOGLE_API_URL}${ANALYSIS_ENDPOINTS.BASIC}`;

export const getVideoDetailedAnalysis = () =>
  `${HOSTED_GOOGLE_API_URL}${ANALYSIS_ENDPOINTS.DETAILED}`;
