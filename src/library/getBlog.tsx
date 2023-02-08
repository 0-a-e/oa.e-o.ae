export type blogType = {
  title: string;
  content: string;
  content2?: string;
  eyecatch: image;
  isImportant: boolean;
  isDualContent: boolean;
  category: string;
};

type image = {
  url: string;
  height: number;
  width: number;
}

const baseUrl = `https://${
  import.meta.env.VITE_SERVICE_DOMAIN
}.microcms.io/api/v1/blogs`;

const requestInit: RequestInit = {
  headers: {
    "X-MICROCMS-API-KEY": import.meta.env.VITE_API_KEY,
  },
};

export const getBlogs = async (): Promise<Array<blogType>> => {
  const response = await fetch(baseUrl, requestInit);
  const data = await response.json();
  return data;
};

export const getBlog = async (id: string): Promise<blogType> => {
  const response = await fetch(`${baseUrl}?filters=blogId[equals]${id}`, requestInit);
  const data = await response.json();
  return data;
};

