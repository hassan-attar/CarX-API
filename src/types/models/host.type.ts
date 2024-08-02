export interface OptionalHostAttributes {
    hostId?: string;
    phone?: string;
    passChangedOn?: Date;
    passChangedRequestedOn?: Date;
    passChangeHash?: string;
    profileImage?: string;
}

export interface HostAttributes extends OptionalHostAttributes {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export default HostAttributes;
