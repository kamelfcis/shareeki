export type Locale = "en" | "ar";
export type Direction = "ltr" | "rtl";
export type Theme = "light" | "dark" | "system";

export interface User {
  id: string;
  email: string;
  name: string;
  nameAr?: string;
  avatar?: string;
  role: "employee" | "admin" | "manager";
  employeeId: string;
  department: string;
  departmentAr?: string;
  position: string;
  positionAr?: string;
  company: string;
  companyAr?: string;
  phone: string;
  joinDate: string;
  status: "active" | "inactive";
}

export interface Service {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  category: string;
  categoryAr: string;
  icon: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  featured: boolean;
  popular: boolean;
  provider: string;
  providerAr: string;
  available: boolean;
  tags: string[];
}

export interface Benefit {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  value: number;
  type: "discount" | "cashback" | "points" | "coupon";
  icon: string;
  expiresAt: string;
  used: boolean;
  code?: string;
}

export interface Request {
  id: string;
  type: string;
  typeAr: string;
  title: string;
  titleAr: string;
  status: "pending" | "approved" | "rejected" | "in_progress" | "completed";
  submittedAt: string;
  updatedAt: string;
  description: string;
  descriptionAr: string;
  attachments: Attachment[];
  timeline: TimelineEvent[];
  comments: Comment[];
}

export interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  descriptionAr: string;
  date: string;
  category: string;
  categoryAr: string;
  status: "completed" | "pending" | "failed";
}

export interface Notification {
  id: string;
  title: string;
  titleAr: string;
  message: string;
  messageAr: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: string;
  icon: string;
  link?: string;
}

export interface Document {
  id: string;
  name: string;
  nameAr: string;
  type: string;
  size: number;
  uploadedAt: string;
  category: string;
  categoryAr: string;
  url: string;
  icon: string;
}

export interface Ticket {
  id: string;
  subject: string;
  subjectAr: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  createdAt: string;
  updatedAt: string;
  messages: TicketMessage[];
  category: string;
  categoryAr: string;
}

export interface TicketMessage {
  id: string;
  sender: "user" | "support";
  message: string;
  createdAt: string;
}

export interface Employee {
  id: string;
  name: string;
  nameAr: string;
  email: string;
  phone: string;
  avatar: string;
  department: string;
  departmentAr: string;
  position: string;
  positionAr: string;
  company: string;
  companyAr: string;
  joinDate: string;
  status: "active" | "inactive";
  location: string;
  locationAr: string;
}

export interface Article {
  id: string;
  title: string;
  titleAr: string;
  excerpt: string;
  excerptAr: string;
  content: string;
  contentAr: string;
  image: string;
  author: string;
  authorAr: string;
  publishedAt: string;
  category: string;
  categoryAr: string;
  tags: string[];
  pinned: boolean;
  trending: boolean;
  readTime: number;
}

export interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  titleAr: string;
  description?: string;
  descriptionAr?: string;
  date: string;
  status: "completed" | "current" | "upcoming";
  icon?: string;
}

export interface Comment {
  id: string;
  author: string;
  authorAr: string;
  avatar?: string;
  content: string;
  createdAt: string;
}

export interface TicketMessage {
  id: string;
  sender: "user" | "support";
  senderName: string;
  senderNameAr: string;
  message: string;
  createdAt: string;
}

export interface Department {
  id: string;
  name: string;
  nameAr: string;
  manager: string;
  managerAr: string;
  employeeCount: number;
  description: string;
  descriptionAr: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: "percentage" | "fixed";
  minPurchase: number;
  expiresAt: string;
  used: boolean;
  serviceId?: string;
  description: string;
  descriptionAr: string;
}

export interface Event {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  date: string;
  time: string;
  location: string;
  locationAr: string;
  image?: string;
  attendees: number;
  category: string;
  categoryAr: string;
}

export interface Announcement {
  id: string;
  title: string;
  titleAr: string;
  content: string;
  contentAr: string;
  priority: "low" | "medium" | "high";
  publishedAt: string;
  expiresAt: string;
  image?: string;
  author: string;
  authorAr: string;
}

export interface Activity {
  id: string;
  type: "service" | "request" | "wallet" | "document" | "notification";
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  timestamp: string;
  icon: string;
  color: string;
}

export interface StatCard {
  title: string;
  titleAr: string;
  value: string | number;
  change: number;
  changeType: "increase" | "decrease" | "neutral";
  icon: string;
  color: string;
}

export interface NavItem {
  title: string;
  titleAr: string;
  href: string;
  icon: string;
  badge?: number;
  children?: NavItem[];
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface FilterOption {
  label: string;
  labelAr: string;
  value: string;
}

export interface SortOption {
  label: string;
  labelAr: string;
  value: string;
  direction: "asc" | "desc";
}
