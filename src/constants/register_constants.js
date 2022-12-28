import Countries from "../libs/cities_countries";

export const REG_URL_PATH = "/ApiRegister";
export const EMAIL_VERIFY_URL_PATH = "/confirm_email_is_unique";

export const USER_TYPES = [
  "My Self",
  "My Daughter",
  "My Son",
  "My Sister",
  "My Brother",
  "My Friend",
  "My Relative",
];
export const ID_TYPES = [
  "National ID",
  "Green Card",
  "PR Card",
  "Residence Permit Card",
  "National ID",
  "Passport",
  "Driving License",
  "Other",
];
export const GENDER_TYPES = ["Male", "Female"];
export const EDUCATION1_TYPES = [
  "SSC",
  "O Level",
  "Grade 10",
  "ABE level 5",
  "Secondary (high) school diploma",
  "Equivalent",
  "Other",
];
export const EDUCATION2_TYPES = [
  "HSC",
  "A Level",
  "Grade 12",
  "ABE level 6",
  "Higher Secondary School diploma",
  "Equivalent",
  "Other",
];
export const EDUCATION3_TYPES = [
  "Honors",
  "Bachelor",
  "MBBS",
  "ACCA",
  "LLB",
  "Other",
];
export const EDUCATION4_TYPES = [
  "Masters",
  "MBA",
  "MD/ FCPS",
  "Phd",
  "CA ( Chartered Accountant)",
  "LLM",
  "Other",
];

export const OCCUPATION_TYPES = [
  "Unemployed",
  "Student",
  "Government job",
  "Private job",
  "Business",
  "Self Employed",
  "Freelancer",
  "Other",
];

export const INDUSTRY_TYPES = [
  "Telecommunication",
  "FMCG",
  "Beverage",
  "RMG",
  "Chemical",
  "Hospitality",
  "Logistics",
  "Service",
  "Bank & Financial Institution",
  "Education",
  "Defence",
  "Government Job",
];

export const RELIGION_TYPES = [
  "",

  "Islam",
  "Hinduism",
  "Buddhism",
  "Christianity",
  "Other",
];

export const MARITAL_STATUS_TYPES = [
  "Never married",
  "Divorced",
  "Widowed",
  "Seperated",
];

// const CURR_YEAR = new Date().getFullYear()
export const MIN_HEIGHT_FEET = 3;
export const MAX_HEIGHT_FEET = 8;
export const MIN_EDUCATION_PASSING_YEAR = 1990;
export const DEFAULT_EDUCATION1_YEAR = 2012; // CURR_YEAR - 75
export const DEFAULT_EDUCATION2_YEAR = 2014;
export const DEFAULT_EDUCATION3_YEAR = 2018;
export const MIN_BIRTH_DATE = new Date("1995-01-01"); //()`${CURR_YEAR - 101}-01-01`)
export const COUNTRIES = Object.keys(Countries);

// export type GenderType = typeof GENDER_TYPES[number]
// export type UserType = typeof USER_TYPES[number]
// export type IDType = typeof ID_TYPES[number]
// export type Education1Type = typeof EDUCATION1_TYPES[number]
// export type Education2Type = typeof EDUCATION2_TYPES[number]
// export type Education3Type = typeof EDUCATION3_TYPES[number]
// export type Education4Type = typeof EDUCATION4_TYPES[number]
// export type OccupationType = typeof OCCUPATION_TYPES[number]
// export type IndustryType = typeof INDUSTRY_TYPES[number]
// export type MaritalStatusType = typeof MARITAL_STATUS_TYPES[number]
// export type ReligionType = typeof RELIGION_TYPES[number]
// export type CountryType = keyof typeof Countries
// export type CityType = string // typeof Countries[CountryType][number]

// export type RegDataType = {
//   full_name: string
//   email: string
//   password: string
//   password_confirmation: string
//   user_type: UserType
//   gender: GenderType
//   date_of_birth: string
//   education1: Education1Type
//   education1_institution: string
//   education1_major: string
//   education1_passing_year: number
//   education2: Education2Type
//   education2_institution: string
//   education2_major: string
//   education2_passing_year: number
//   education3: Education3Type
//   education3_institution: string
//   education3_major: string
//   education3_passing_year: number
//   education4: Education4Type // ?
//   education4_institution: string // ?
//   education4_major: string // ?
//   education4_passing_year: number // ?
//   current_employment_type: OccupationType
//   industry: IndustryType // ?
//   employer_name: string // ?
//   designation: string // ?
//   working_since: string // ?
//   religion: ReligionType
//   height_feet: number
//   height_inches: number
//   weight: number // ?
//   marital_status: MaritalStatusType
//   current_country: CountryType
//   current_city: CityType
//   father_occupation: string
//   father_home_district: string
//   mother_occupation: string
//   mother_home_district: string
//   number_of_brothers: number
//   number_of_sisters: number
//   verification_type: IDType
//   verification_img1: File
//   verification_img2: File
// }

export const generateMockData = (file1, file2) => {
  const MOCK_REG_DATA = {
    full_name: "qwerty@qwerty.com",
    email: "qwertydsadsa@qwerty.com",
    password: "qwerty@qwerty.com",
    password_confirmation: "qwerty@qwerty.com",
    user_type: "Myself",
    gender: "Male",
    date_of_birth: "2000-10-10",
    education1: "SSC",
    education1_institution: "qwerty@qwerty.com",
    education1_major: "qwerty@qwerty.com",
    education1_passing_year: 2014,
    education2: "A Level",
    education2_institution: "qwerty@qwerty.com",
    education2_major: "qwerty@qwerty.com",
    education2_passing_year: 2014,
    education3: "Bachelor",
    education3_institution: "qwerty@qwerty.com",
    education3_major: "qwerty@qwerty.com",
    education3_passing_year: 2014,
    education4: "Masters",
    education4_institution: "qwerty@qwerty.com",
    education4_major: "qwerty@qwerty.com",
    education4_passing_year: 0,
    current_employment_type: "Sales Professional",
    industry: "Bank & Financial Institution",
    working_since: "2020-01-01",
    employer_name: "qwerty@qwerty.com",
    designation: "qwerty@qwerty.com",
    religion: "Buddhism",
    height_feet: 5,
    height_inches: 5,
    weight: 1,
    marital_status: "Divorced",
    current_country: "Afghanistan",
    current_city: "Kandahar",
    father_occupation: "qwerty@qwerty.com",
    father_home_district: "qwerty@qwerty.com",
    mother_occupation: "qwerty@qwerty.com",
    mother_home_district: "qwerty@qwerty.com",
    number_of_brothers: 0,
    number_of_sisters: 0,
    verification_type: "Driving License",
    verification_img1: file1,
    verification_img2: file2,
  };

  return MOCK_REG_DATA;
};

// export type RegReqDataFn = () => RegDataType

// export type RegResType = {
//   status?: 'success'
//   message: string
//   is_verified: null
//   is_banned: null
//   auth_token: string
// }

// export type EmailVerifyResType = {
//   status?: 'success'
//   message: 'valid' | ''
// }
