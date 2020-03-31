import Storage from './storage';

const CACHE_MAX_AGE = 48 * 60; // 2 day
const TOP_COMPANY_CACHE_KEY = "TOP_COMPANY"; // Cache key
const BASE_URL = "/cfs/handleCompanies";
const DEFAULT_PAGE_SIZE = 6

const Cache = new Storage(CACHE_MAX_AGE);

const getCachedData = async (cacheKey, path) => {
  const cachedData = Cache.getItem(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  try {
    const data = await fetch(`${BASE_URL}/${path}`)
    const { result } = await data.json()

    Cache.setItem(
      cacheKey,
      result,
      CACHE_MAX_AGE
    );

    return result;
  } catch (error) {
    console.log(error);
    throw new Error(`Fetch data error ${path}`)
  }
}

const getTopCompanies = async () => {
  return await getCachedData(TOP_COMPANY_CACHE_KEY, 'incTopCompanies')
}

const getCompanyByQuery = async (query) => {
  return await getCachedData(query, `incCompanies?search=${query}`)
}

export {
  getTopCompanies,
  getCompanyByQuery,
  getCachedData,
  DEFAULT_PAGE_SIZE
}