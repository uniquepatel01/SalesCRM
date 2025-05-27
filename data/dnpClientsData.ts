export type DnpClient = {
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
  demoTaken: string;
  address: string;
  remarks: { date: string; text: string }[];
  statuses: string[];
  action: string;
};

export const dnpClients: DnpClient[] = [
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
    demoTaken: "5 days",
    address: "123, Export Lane, Mumbai, Maharashtra",
    remarks: [
      { date: "20/05/25", text: "Did not pick up" },
      { date: "21/05/25", text: "Tried again, no response" }
    ],
    statuses: ["DNP", "Dormant", "Future Client"],
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
    demoTaken: "3 days",
    address: "456, Marine Drive, Chennai, Tamil Nadu",
    remarks: [
      { date: "20/05/25", text: "No answer" }
    ],
    statuses: ["DNP", "Future Client", "Dormant"],
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
    demoTaken: "7 days",
    address: "789, BSL Road, Ahmedabad, Gujarat",
    remarks: [
      { date: "20/05/25", text: "Did not pick up" }
    ],
    statuses: ["Dormant", "DNP", "Future Client"],
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
    demoTaken: "2 days",
    address: "101, Foundation Street, Delhi",
    remarks: [
      { date: "20/05/25", text: "No response" }
    ],
    statuses: ["DNP", "Future Client", "Dormant"],
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
    demoTaken: "4 days",
    address: "102, Foundation Street, Delhi",
    remarks: [
      { date: "20/05/25", text: "Did not pick up" }
    ],
    statuses: ["Future Client", "DNP", "Dormant"],
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
    demoTaken: "6 days",
    address: "103, Foundation Street, Delhi",
    remarks: [
      { date: "20/05/25", text: "No answer" }
    ],
    statuses: ["Dormant", "Future Client", "DNP"],
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
    demoTaken: "1 day",
    address: "104, Foundation Street, Delhi",
    remarks: [
      { date: "20/05/25", text: "Did not pick up" }
    ],
    statuses: ["DNP", "Dormant", "Future Client"],
    action: "",
  },
];