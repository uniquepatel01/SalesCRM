
export type outOfStationClient = {

  company: string;
  name: string;
  days: number;
  contactPerson: string;
  source: string;
  businessType: string;
  businessVolume: string;
  email: string;
  mobile: string;
  altMobile: string;
  date: string; // <-- changed from demoTaken/converted to date
  address: string;
  remarks: { date: string; text: string }[];
  statuses: string[];
  action: string;
};


export const outOfStationClients: outOfStationClient[] = [

  {
    company: "START EXPORTER",
    name: "Manish Gupta",
    days: 5,
    contactPerson: "Manish Gupta",
    source: "Calling",
    businessType: "Exporter",
    businessVolume: "₹5,00,000",
    email: "manish@startexporter.com",
    mobile: "+91 9876543210",
    altMobile: "+91 9123456780",
    date: "15/05/25", // <-- added date
    address: "123, Export Lane, Mumbai, Maharashtra",
    remarks: [
      { date: "20/05/25", text: "Did not pick up" },
      { date: "21/05/25", text: "Tried again, no response" },
    ],
    statuses: [
      "DNP",
      "Demo",
      "Future Client",
      "Call Me Later",
      "Not interested",
      "Out Of Station",
      "Email",
    ],
    action: "",
  },
  {
    company: "THREE MARIN START EXPORTER",
    name: "Manish Gupta",
    days: 3,
    contactPerson: "Manish Gupta",
    source: "Reference",
    businessType: "Importer",
    businessVolume: "₹10,00,000",
    email: "manish@threemarin.com",
    mobile: "+91 9876543210",
    altMobile: "+91 9123456781",
    date: "17/05/25",
    address: "456, Marine Drive, Chennai, Tamil Nadu",
    remarks: [{ date: "20/05/25", text: "No answer" }],
    statuses: [
      "DNP",
      "Demo",
      "Future Client",
      "Call Me Later",
      "Not interested",
      "Out Of Station",
      "Email",
    ],
    action: "",
  },
  {
    company: "ADANI BSL GROUP",
    name: "Manish Gupta",
    days: 7,
    contactPerson: "Manish Gupta",
    source: "Website",
    businessType: "Distributor",
    businessVolume: "₹15,00,000",
    email: "manish@adanibsl.com",
    mobile: "+91 9876543210",
    altMobile: "+91 9123456782",
    date: "13/05/25",
    address: "789, BSL Road, Ahmedabad, Gujarat",
    remarks: [{ date: "20/05/25", text: "Did not pick up" }],
    statuses: [
      "DNP",
      "Demo",
      "Future Client",
      "Call Me Later",
      "Not interested",
      "Out Of Station",
    ],
    action: "",
  },
  {
    company: "ZTIBRA FOUNDATION",
    name: "Manish Gupta",
    days: 2,
    contactPerson: "Manish Gupta",
    source: "Event",
    businessType: "Retailer",
    businessVolume: "₹2,00,000",
    email: "manish@ztibra.org",
    mobile: "+91 9876543210",
    altMobile: "+91 9123456783",
    date: "18/05/25",
    address: "101, Foundation Street, Delhi",
    remarks: [{ date: "20/05/25", text: "No response" }],
    statuses: [
      "DNP",
      "Demo",
      "Future Client",
      "Call Me Later",
      "Not interested",
      "Out Of Station",
    ],
    action: "",
  },
  {
    company: "ZTIBRA FOUNDATION",
    name: "Manish Gupta",
    days: 4,
    contactPerson: "Manish Gupta",
    source: "Reference",
    businessType: "Wholesaler",
    businessVolume: "₹8,00,000",
    email: "manish@ztibra.org",
    mobile: "+91 9876543210",
    altMobile: "+91 9123456784",
    date: "16/05/25",
    address: "102, Foundation Street, Delhi",
    remarks: [{ date: "20/05/25", text: "Did not pick up" }],
    statuses: [
      "DNP",
      "Demo",
      "Future Client",
      "Call Me Later",
      "Not interested",
      "Out Of Station",
      "Email",
    ],
    action: "",
  },
  {
    company: "ZTIBRA FOUNDATION",
    name: "Manish Gupta",
    days: 6,
    contactPerson: "Manish Gupta",
    source: "Calling",
    businessType: "Exporter",
    businessVolume: "₹12,00,000",
    email: "manish@ztibra.org",
    mobile: "+91 9876543210",
    altMobile: "+91 9123456785",
    date: "14/05/25",
    address: "103, Foundation Street, Delhi",
    remarks: [{ date: "20/05/25", text: "No answer" }],
    statuses: [
      "DNP",
      "Demo",
      "Future Client",
      "Call Me Later",
      "Not interested",
      "Out Of Station",
      "Email",
    ],
    action: "",
  },
  {
    company: "ZTIBRA FOUNDATION",
    name: "Manish Gupta",
    days: 1,
    contactPerson: "Manish Gupta",
    source: "Website",
    businessType: "Retailer",
    businessVolume: "₹1,00,000",
    email: "manish@ztibra.org",
    mobile: "+91 9876543210",
    altMobile: "+91 9123456786",
    date: "19/05/25",
    address: "104, Foundation Street, Delhi",
    remarks: [{ date: "20/05/25", text: "Did not pick up" }],
    statuses: [
      "DNP",
      "Demo",
      "Future Client",
      "Call Me Later",
      "Not interested",
      "Out Of Station",
      "Email",
    ],
    action: "",
  },
];
