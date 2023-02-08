export type Response = {
  title: string;
  username: string;
  image: image;
  serviceImage: image;
  serviceName: string;
  sinceDate: string;
  isActive: boolean;
  description: string;
  uri: string;
};

type image = {
  url: string;
  height: number;
  width: number;
}
const baseUrl = `https://${
  import.meta.env.VITE_SERVICE_DOMAIN
}.microcms.io/api/v1/profile-link`;

const requestInit: RequestInit = {
  headers: {
    "X-MICROCMS-API-KEY": import.meta.env.VITE_API_KEY,
  },
};

export const getProfileLink = async (): Promise<Array<Response>> => {
  const response = await fetch(baseUrl, requestInit);
  const data = await response.json();
  return data;
};
