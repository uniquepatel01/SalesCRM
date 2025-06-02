export type CallmeLater = {
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
  convertedDate: string; // <-- Add this line
};

export const callmeLaterClients: CallmeLater[] = [
  {
    company: "Sudha EXPORTS",
    name: "Ravi Kumar",
    days: 12,
    contactPerson: "Ravi Kumar",
    source: "Reference",
    businessType: "Exporter",
    businessVolume: "₹15,00,000",
    email: "ravi@alphaexports.com",
    mobile: "+91 9000012345",
    altMobile: "+91 9000098765",
    demoTaken: "12 days",
    address: "123, Export Lane, Mumbai, Maharashtra",
    remarks: [
      { date: "10/04/25", text: "Converted after demo" },
      { date: "12/04/25", text: "Sent contract" },
    ],
    statuses: ["Active", "Repeat", "VIP"],
    action: "",
    convertedDate: "15/04/25", // <-- Add this line
  },
  {
    company: "gango TRADERS",
    name: "Sunita Sharma",
    days: 7,
    contactPerson: "Sunita Sharma",
    source: "Website",
    businessType: "Importer",
    businessVolume: "₹8,00,000",
    email: "sunita@betatraders.com",
    mobile: "+91 9888876543",
    altMobile: "+91 9888834567",
    demoTaken: "7 days",
    address: "45, Trade Street, Delhi",
    remarks: [
      { date: "15/04/25", text: "Converted after follow-up" },
    ],
    statuses: ["Active", "VIP"],
    action: "",
    convertedDate: "15/04/25", // <-- Add this line
  },
  // Add more dummy clients as needed
];