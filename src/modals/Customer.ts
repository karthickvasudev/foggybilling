export interface Customer {
    id: string;
    name: string;
    phoneNumber: string;
    address?: any;
    city?: any;
    pinCode?: any;
    createOn: string;
    createdBy: string;
    updatedOn?: any;
    updatedBy?: any;
}