import { ORDERSTATUS, PAYMENTSTATUS, PAYMENTTYPE } from "src/constants/projectEnums";

export interface GetTransactionBill {
    customerDetails: CustomerDetails;
    orderDetails: OrderDetails;
}

interface CustomerDetails {
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

interface OrderPaymentsDetails {
    id: string;
    balance: number;
    paidAmount: number;
    additionalCharge: number;
    discount: number;
    status: PAYMENTSTATUS;
}

interface OrderLine {
    id: string;
    productId: string;
    productName: string;
    count: number;
    price: number;
    createdOn: string;
    updateOn?: any;
}

interface PaymentTransaction {
    id: string;
    orderId: string;
    paidAmount: number;
    paymentType: PAYMENTTYPE;
    additionalCharge: number;
    discount: number;
    createdOn: string;
    createdBy: string;
    updatedOn?: any;
    updatedBy?: any;
}

interface OrderDetails {
    id: string;
    customerId: string;
    orderDate: string;
    startedDate?: any;
    completedDate?: any;
    expectedDeliveryDate: string;
    deliveredDate: string;
    count: number;
    amount: number;
    status: ORDERSTATUS;
    orderPaymentsDetails: OrderPaymentsDetails;
    orderLines: OrderLine[];
    paymentTransactions: PaymentTransaction[];
    createOn: string;
    createdBy: string;
    updatedOn: string;
    updatedBy: string;
}

