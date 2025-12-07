import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import {
  regions as fetchRegions,
  provinces as fetchProvinces,
  cities as fetchCities,
  barangays as fetchBarangays,
} from "phil-address";

export default function AddressField({ field, register, watch, errors }) {
  const initial = watch(field.name);

  const [region, setRegion] = useState(initial?.region || "");
  const [province, setProvince] = useState(initial?.province || "");
  const [city, setCity] = useState(initial?.city || "");
  const [barangay, setBarangay] = useState(initial?.barangay || "");

  const [regionList, setRegionList] = useState([]);
  const [provinceList, setProvinceList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [barangayList, setBarangayList] = useState([]);

  useEffect(() => {
    fetchRegions().then(setRegionList);
  }, []);

  useEffect(() => {
    if (!region) return;
    fetchProvinces(region).then(setProvinceList);
  }, [region]);

  useEffect(() => {
    if (!province) return;
    fetchCities(province).then(setCityList);
  }, [province]);

  useEffect(() => {
    if (!city) return;
    fetchBarangays(city).then(setBarangayList);
  }, [city]);

  const renderSelect = (label, name, value, onChange, list, keyField, disabled) => (
    <>
      <Form.Label>{label}</Form.Label>
      <Form.Select
        {...register(name)}
        value={value}
        onChange={onChange}
        disabled={disabled}
        isInvalid={!!errors?.[field.name]?.[keyField]}
      >
        <option value="">Select {label}</option>
        {list.map((item) => (
          <option key={item.psgcCode || item.id} value={item.psgcCode || item.id}>
            {item.name}
          </option>
        ))}
      </Form.Select>
      <Form.Control.Feedback type="invalid">
        {errors?.[field.name]?.[keyField]?.message}
      </Form.Control.Feedback>
    </>
  );

  return (
    <Row className="mb-3">
      <Col>{renderSelect("Region", `${field.name}.region`, region, e => setRegion(e.target.value), regionList, "region", false)}</Col>
      <Col>{renderSelect("Province", `${field.name}.province`, province, e => setProvince(e.target.value), provinceList, "province", !region)}</Col>
      <Col>{renderSelect("City", `${field.name}.city`, city, e => setCity(e.target.value), cityList, "city", !province)}</Col>
      <Col>{renderSelect("Barangay", `${field.name}.barangay`, barangay, e => setBarangay(e.target.value), barangayList, "barangay", !city)}</Col>
    </Row>
  );
}
