
(* Advanced Geographic Analysis *)
odishaMap = Entity["AdministrativeDivision", {"Odisha", "India"}];

(* Multi-dimensional correlation analysis *)
correlationMatrix = Manipulate[
  districtData = Table[
    {
      "District" -> district,
      "Literacy" -> RandomReal[{50, 95}],
      "Agriculture" -> RandomReal[{1000, 5000}],
      "Infrastructure" -> RandomReal[{10, 100}],
      "Economy" -> RandomReal[{20000, 80000}]
    },
    {district, selectedDistricts}
  ];

  Grid[{
    {
      (* Correlation Heat Map *)
      MatrixPlot[
        CorrelationMatrix[districtData[[All, {2, 3, 4, 5}]]],
        PlotLabel -> "Metric Correlation Matrix",
        FrameLabel -> {"Literacy", "Agriculture", "Infrastructure", "Economy"}
      ],

      (* Geographic Distribution *)
      GeoRegionValuePlot[
        Thread[selectedDistricts -> districtData[[All, selectedMetric + 1]]],
        GeoRange -> odishaMap,
        PlotLabel -> "Geographic Distribution: " <> metricNames[[selectedMetric]]
      ]
    }
  }],

  {selectedMetric, 1, ControlType -> RadioButtonBar, 
   ControllerLabels -> {"Literacy", "Agriculture", "Infrastructure", "Economy"}},
  {selectedDistricts, odishaDistricts[[1;;10]], ControlType -> CheckboxBar}
];
