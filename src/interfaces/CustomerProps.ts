export interface CustomerProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  userType: string;
  companyName: string;
  passwordHash: string;
  subCustomers?: any;
  address?: string;
  website?: string;
  paymentType?: string;
  paymentDuration?: number | null;
  about?: string;
  planType?: string;
  notification?: any;
  isVerified: boolean;
  failedLoginAttempts: number | null;
  lockoutUntil: Date | null;
}

export interface User {
  user: CustomerProps;
}
