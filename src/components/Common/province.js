import { getProvinces } from "../../API/province";

export const getProvinceName = async (provinceId) => {
    const provinces = await getProvinces();
    const province = provinces.find((province) => province.codename === provinceId);
    return province.name;
};

export const getDistrictName = async (provinceId, districtId) => {
    const provinces = await getProvinces();
    const province = provinces.find((province) => province.codename === provinceId);
    const district = province.districts.find((district) => district.codename === districtId);
    return district.name;
};

export const getWardName = async (provinceId, districtId, wardId) => {
    const provinces = await getProvinces();
    const province = provinces.find((province) => province.codename === provinceId);
    const district = province.districts.find((district) => district.codename === districtId);
    const ward = district.wards.find((ward) => ward.codename === wardId);
    return ward.name;
};
