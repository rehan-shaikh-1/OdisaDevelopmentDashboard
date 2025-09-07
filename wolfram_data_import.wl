
(* Data Import and Processing *)
odishaData = Import["https://odisha.data.gov.in/api/datasets/agriculture", "JSON"];
districtLiteracy = Import["literacy_data.csv"];
agriculturalOutput = Import["agriculture_stats.csv"];

(* Convert to TimeSeries for temporal analysis *)
literacyTimeSeries = TimeSeries[
  {districtLiteracy[[All, {1, 3}]]}, 
  {districtLiteracy[[All, 2]]}
];

(* Geographic entity mapping *)
odishaDistricts = Entity["AdministrativeDivision", 
  {"Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack"}];
