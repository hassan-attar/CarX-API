type User = {
  firstName: string;
  lastName: string;
  email: string;
  // password: string;
  userId?: string;
  phone?: string;
  passChangedOn?: Date;
  passChangedRequestedOn?: Date;
  passChangeHash?: string;
  DLN?: string;
  DLExpirationDate?: Date;
  DLCountry?: string;
  DLRegion?: string;
  dob?: Date;
  profileImage?: string;
};

export default User;
