export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessType: string;
  status: string;
  createdAt: string;
  lastContact?: string;
  assignedTo?: string;
  notes?: string;
  tags?: string[];
};