
(* Cloud Deployment Code *)
dashboard = CreateDocument[
  Manipulate[
    (* Main dashboard code here *)
    mainDashboard,
    (* Controls *)
    controlSpecs
  ],
  WindowTitle -> "Odisha Development Dashboard"
];

(* Deploy to Wolfram Cloud *)
cloudDashboard = CloudDeploy[
  dashboard,
  "odisha-development-dashboard",
  Permissions -> "Public"
];

(* Create API endpoints for data access *)
dataAPI = CloudDeploy[
  APIFunction[{"metric" -> "String", "district" -> "String", "year" -> "Integer"},
    Module[{data},
      data = getMetricData[#metric, #district, #year];
      ExportString[data, "JSON"]
    ] &
  ],
  "odisha-data-api",
  Permissions -> "Public"
];

(* Form function for user feedback *)
feedbackForm = CloudDeploy[
  FormFunction[
    {"name" -> "String", "email" -> "EmailAddress", "feedback" -> "String"},
    (EmailSend[{"dashboard@odisha.gov.in"}, 
      "Dashboard Feedback", #feedback, "ReplyTo" -> #email]; 
     "Thank you for your feedback!") &
  ],
  "dashboard-feedback",
  Permissions -> "Public"
];
