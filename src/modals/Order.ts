import { ORDERSTATUS, PAYMENTSTATUS, PAYMENTTYPE } from "src/constants/projectEnums";


export interface Order {
    id: string;
    customerId: string;
    billUrl: string,
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



