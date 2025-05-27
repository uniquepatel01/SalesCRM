export type DemoClient = {
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



export const demoClients = [
  {
    company: "THREE STAR MARINE EXPORTS",
    name: "Rama Swami",
    days: 6,
    contactPerson: "THREE STAR MARINE EXPORTS",
    source: "Calling",
    businessType: "Exporter",
    businessVolume: "Did not Disclose",
    email: "threestargafoor@tstrading.in",
    mobile: "+91 111222888",
    altMobile: "+91 123456789",
    demoTaken: "20 days",
    address: "Door No-40/9448 A1, KASMISONS ARCADE ,NEAR PADMA JUNC, ERNAKULAM, KERALA",
    remarks: [
      { date: "22/04/25", text: "Call me later" },
      { date: "22/04/25", text: "Call me later" },
      { date: "22/04/25", text: "Call me later" },
    ],
    statuses: ["Converted", "Dormant", "Future Client"],
    action: "",
  },
  {
    company: "OCEANIC EXPORTS",
    name: "Priya Menon",
    days: 3,
    contactPerson: "Priya Menon",
    source: "Reference",
    businessType: "Importer",
    businessVolume: "₹10,00,000",
    email: "priya@oceanicexp.com",
    mobile: "+91 9988776655",
    altMobile: "+91 8877665544",
    demoTaken: "3 days",
    address: "12, Beach Road, Chennai, Tamil Nadu",
    remarks: [
      { date: "21/04/25", text: "Requested brochure" },
      { date: "22/04/25", text: "Call me later" },
    ],
    statuses: ["Future Client", "Dormant", "Converted"],
    action: "",
  },
  {
    company: "SUNRISE TRADERS",
    name: "Amit Shah",
    days: 10,
    contactPerson: "Amit Shah",
    source: "Website",
    businessType: "Distributor",
    businessVolume: "₹5,00,000",
    email: "amit@sunrisetraders.in",
    mobile: "+91 9090909090",
    altMobile: "+91 8080808080",
    demoTaken: "10 days",
    address: "Plot 22, MIDC, Pune, Maharashtra",
    remarks: [
      { date: "20/04/25", text: "Interested in demo" },
      { date: "21/04/25", text: "Demo scheduled" },
      { date: "22/04/25", text: "Call me later" },
    ],
    statuses: ["Dormant", "Converted", "Future Client"],
    action: "",
  },
  {
    company: "GLOBAL FOODS",
    name: "Sara Khan",
    days: 1,
    contactPerson: "Sara Khan",
    source: "Event",
    businessType: "Retailer",
    businessVolume: "₹2,00,000",
    email: "sara@globalfoods.com",
    mobile: "+91 9123456789",
    altMobile: "+91 9876543210",
    demoTaken: "1 day",
    address: "Shop 5, Market Street, Delhi",
    remarks: [
      { date: "23/04/25", text: "Requested callback" },
    ],
    statuses: ["Converted", "Future Client", "Dormant"],
    action: "",
  },
  {
    company: "MARINE EXPORT HOUSE",
    name: "Vikram Patel",
    days: 15,
    contactPerson: "Vikram Patel",
    source: "Calling",
    businessType: "Exporter",
    businessVolume: "₹20,00,000",
    email: "vikram@marineexp.com",
    mobile: "+91 9001122334",
    altMobile: "+91 9004433221",
    demoTaken: "15 days",
    address: "B-12, Port Area, Kochi, Kerala",
    remarks: [
      { date: "10/04/25", text: "Demo completed" },
      { date: "15/04/25", text: "Follow up" },
    ],
    statuses: ["Dormant", "Converted", "Future Client"],
    action: "",
  },
  {
    company: "ZENITH EXPORTS",
    name: "Neha Agarwal",
    days: 8,
    contactPerson: "Neha Agarwal",
    source: "Reference",
    businessType: "Wholesaler",
    businessVolume: "₹8,00,000",
    email: "neha@zenithexports.com",
    mobile: "+91 9555123456",
    altMobile: "+91 9555987654",
    demoTaken: "8 days",
    address: "88, Industrial Area, Surat, Gujarat",
    remarks: [
      { date: "18/04/25", text: "Interested" },
      { date: "20/04/25", text: "Call me later" },
    ],
    statuses: ["Future Client", "Converted", "Dormant"],
    action: "",
  },
];