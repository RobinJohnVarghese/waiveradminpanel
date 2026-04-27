export type UserDetails = {
  permission: any;
  all_access: string[];
  is_manager: boolean;
  is_admin: boolean;
  is_staff: boolean;
  fullname: string;
  id: string;
  unique_id: string;
  email: string;
  gender: string;
  dob: string;
  phone: string;
  alternative_phone: string;
  whatsapp_phone: string;
  state: string;
  district: string;
  location: string;
  location_name: string;
  address: string;
  is_active: boolean;
};

export type DocumentType = {
  id: string;
  profile_image: any;
  aadhar_image_1: any;
  aadhar_image_2: any;
  driving_license_1: any;
  driving_license_2: any;
  pan_card_1: any;
  pan_card_2: any;
  certificate_1: any;
  certificate_2: any;
};

export type UserType = {
  fullname: string;
  id: string;
  referral: string;
  email: string;
  phone: string;
  location: string;
};

export type Location = {
  id: number | string;
  name: string;
  radius: number;
  status: string;
  location_type: string;
};

export type VehicleType = {
  id: number | string;
  name: string;
};

export type ReceiverType = {
  id: number | string;
  name: string;
};

export type TransmissionType = {
  id: number | string;
  name: string;
};

export type WorkExperience = {
  id: number | string;
  experience: string;
};

export type StateType = {
  id: number | string;
  name: string;
};

export type OptionType = {
  id: number | string;
  name: string;
};

export type BankType = {
  id: number | string;
  name: string;
};

export type DistrictType = {
  id: number | string;
  state: number | string;
  name: string;
};

export type PlanType = {
  id: number | string;
  name: string;
};

export type PlanService = {
  id: number | string;
  name: string;
};

export type CabRideCostType = {
  id: string;
  vehicle_type: string;
  name: string;
  subtext: string;
  cost_per_km: number;
  cost_per_minutes: number;
  min_rate: number;
  min_rate_km: number;
  location: string;
  return_charge: number;
  image: any;
};

export type SubscriptionPlanType = {
  id: string;
  name: string;
  plan_type: string;
  bookings_no: number;
  validity_days: number;
  max_duration_km: number;
  max_duration_hr: number;
  price: number;
  compare_price: number;
  is_active: boolean;
  plan_status: string;
};

export type RatingType = {
  id: string;
  driver_name: string;
  passenger_name: string;
  ride_id: string;
  rating: number;
  review: string;
  driver: string;
  passenger: string;
  ride: string;
  review_type: string;
  created_at: string;
  updated_at: string;
};
