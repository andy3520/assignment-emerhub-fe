import Storage from './storage';

const CACHE_MAX_AGE = 48 * 60; // 2 day
const TOP_COMPANY_CACHE_KEY = "TOP_COMPANY"; // Cache key
const BASE_URL = process.env.NODE_ENV !== "production" ? "/cfs" : 'https://asia-northeast1-emerhub-registry.cloudfunctions.net/handleRegistry';
const DEFAULT_PAGE_SIZE = 6

const Cache = new Storage(CACHE_MAX_AGE);

const getCachedData = async (cacheKey, path, options = {}) => {
  const cachedData = Cache.getItem(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  try {
    const data = await fetch(`${BASE_URL}/${path}`, options)
    const { result } = await data.json()

    Cache.setItem(
      cacheKey,
      result,
      CACHE_MAX_AGE
    );

    return result;
  } catch (error) {
    if (error.name === 'AbortError') {
      return;
    }

    console.log(error);
    throw new Error(`Fetch data error ${path}`)
  }
}

const getTopCompanies = async () => {
  return await getCachedData(TOP_COMPANY_CACHE_KEY, 'incTopCompanies?countryids=IDN')
}

const getCompanyByQuery = async (query, signal) => {
  return await getCachedData(query, `incCompanies?search=${query}&countryids=IDN`, { signal })
}

const getCompanyDetail = async (systemId) => {
  const KEY = `DETAIL_${systemId}`
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ systemId: systemId })
  }

  return await getCachedData(KEY, 'incCompaniesDeatail', options)
}

export {
  getTopCompanies,
  getCompanyByQuery,
  getCachedData,
  getCompanyDetail,
  DEFAULT_PAGE_SIZE
}