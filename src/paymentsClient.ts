/**
 * Client for PaymentsAPI v1. Generated stub — replace with the real ATA SDK
 * once you wire one in.
 */
import axios, { AxiosInstance } from 'axios';

export interface CreatePaymentRequest {
	amount: number;
	currency: string;
	customer_id: string;
}

export interface PaymentResponse {
	id: string;
	amount: number;
	currency: string;
	customer_id: string;
	status: 'pending' | 'succeeded' | 'failed';
	created_at: string;
}

export interface ListPaymentsResponse {
	payments: PaymentResponse[];
	has_more: boolean;
}

export class PaymentsClient {
	private http: AxiosInstance;

	constructor(baseUrl: string, apiKey: string) {
		this.http = axios.create({
			baseURL: baseUrl,
			headers: { Authorization: `Bearer ${apiKey}` },
		});
	}

	async createPayment(req: CreatePaymentRequest): Promise<PaymentResponse> {
		const { data } = await this.http.post<PaymentResponse>('/v1/payments', req);
		return data;
	}

	async getPayment(paymentId: string): Promise<PaymentResponse> {
		const { data } = await this.http.get<PaymentResponse>(`/v1/payments/${paymentId}`);
		return data;
	}

	async listPayments(customerId: string): Promise<ListPaymentsResponse> {
		const { data } = await this.http.get<ListPaymentsResponse>('/v1/payments', {
			params: { 'customer.id': customerId },
		});
		return data;
	}
}
