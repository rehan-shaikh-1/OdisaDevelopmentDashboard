
(* Main Interactive Dashboard *)
Manipulate[
  Grid[{
    {Style["Odisha Development Dashboard", 24, Bold], SpanFromLeft},
    {
      (* Left Panel - Controls *)
      Column[{
        Style["Select Metric:", 14, Bold],
        RadioButtonBar[metric, {"Literacy", "Agriculture", "Infrastructure", "Economy"}],
        Style["Time Period:", 14, Bold],
        Slider[Dynamic[year], {2014, 2024, 1}],
        Style["District Filter:", 14, Bold],
        CheckboxBar[Dynamic[selectedDistricts], odishaDistricts[[1;;10]]]
      }],

      (* Right Panel - Visualizations *)
      Column[{
        (* Main Visualization *)
        Dynamic[
          Switch[metric,
            "Literacy", 
            GeoRegionValuePlot[
              Thread[selectedDistricts -> RandomReal[{50, 95}, Length[selectedDistricts]]],
              PlotLabel -> "Literacy Rates (" <> ToString[year] <> ")",
              ColorFunction -> "Rainbow"
            ],

            "Agriculture",
            BarChart[
              RandomReal[{1000, 5000}, Length[selectedDistricts]],
              ChartLabels -> selectedDistricts[[1;;Length[selectedDistricts]]],
              PlotLabel -> "Agricultural Output (" <> ToString[year] <> ")",
              ChartStyle -> "Rainbow"
            ],

            "Infrastructure",
            GeoBubbleChart[
              Thread[selectedDistricts -> RandomReal[{10, 100}, Length[selectedDistricts]]],
              PlotLabel -> "Infrastructure Index (" <> ToString[year] <> ")"
            ],

            "Economy",
            ListLinePlot[
              Table[RandomReal[{20000, 80000}], {i, 2014, year}],
              PlotLabel -> "Per Capita Income Trend",
              DataRange -> {2014, year}
            ]
          ]
        ],

        (* Secondary Visualization *)
        Dynamic[
          TimeSeries[
            Table[{DateObject[{i, 1, 1}], RandomReal[{0.1, 0.3}]}, {i, 2014, year}],
            PlotLabel -> "Growth Rate Trend"
          ]
        ]
      }]
    }
  }],

  (* Control Variables *)
  {metric, "Literacy", ControlType -> None},
  {year, 2020, ControlType -> None},
  {selectedDistricts, odishaDistricts[[1;;5]], ControlType -> None},

  (* Layout Options *)
  ControlPlacement -> None,
  Alignment -> Left
]
