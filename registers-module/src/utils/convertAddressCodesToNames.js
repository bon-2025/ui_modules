// convertAddressCodesToNames.js

/**
 * Converts PSGC address codes into their corresponding names.
 *
 * @param {Object} address  - { region, province, city, barangay }
 * @param {Object} lists - { regionList, provinceList, cityList, barangayList }
 * @returns {Object} - Object with converted names
 */
export const convertAddressCodesToNames = (address, lists) => {
  if (!address) return {};

  const {
    regionList = [],
    provinceList = [],
    cityList = [],
    barangayList = []
  } = lists || {};

  const findName = (list, code) =>
    list?.find(item => item.psgcCode === code)?.name || "";

  return {
    region: findName(regionList, address.region),
    province: findName(provinceList, address.province),
    city: findName(cityList, address.city),
    barangay: findName(barangayList, address.barangay),
  };
};
