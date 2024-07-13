export interface OptionalUserAttributes {
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
}

export interface UserAttributes extends OptionalUserAttributes {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export default UserAttributes;
