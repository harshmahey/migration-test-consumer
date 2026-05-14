# Migrate to PaymentsAPI v2.0.0

The migration from PaymentsAPI v1.0.0 to v2.0.0 requires updates to request and response structures, specifically renaming fields related to customer identification. This will ensure compatibility with the new API version.

## Steps

### 1. Update CreatePaymentRequest field (automatable)

The field `customer_id` in CreatePaymentRequest has been renamed to `customer.id`. Update the request structure accordingly.

**Before:**

```
export interface CreatePaymentRequest {
	amount: number;
	currency: string;
	customer_id: string;
}
```

**After:**

```
export interface CreatePaymentRequest {
	amount: number;
	currency: string;
	customer: {
		id: string;
	};
}
```


### 2. Update PaymentResponse field (automatable)

The field `customer_id` in PaymentResponse has been renamed to `customer.id`. Update the response structure accordingly.

**Before:**

```
export interface PaymentResponse {
	id: string;
	amount: number;
	currency: string;
	customer_id: string;
	status: 'pending' | 'succeeded' | 'failed';
	created_at: string;
}
```

**After:**

```
export interface PaymentResponse {
	id: string;
	amount: number;
	currency: string;
	customer: {
		id: string;
	};
	status: 'pending' | 'succeeded' | 'failed';
	created_at: string;
}
```


### 3. Update listPayments query parameter (automatable)

The query parameter `customer_id` in the listPayments method has been renamed to `customer.id`. Update the method call accordingly.

**Before:**

```
async listPayments(customerId: string): Promise<ListPaymentsResponse> {
		const { data } = await this.http.get<ListPaymentsResponse>('/v1/payments', {
			params: { customer_id: customerId },
		});
		return data;
	}
```

**After:**

```
async listPayments(customerId: string): Promise<ListPaymentsResponse> {
		const { data } = await this.http.get<ListPaymentsResponse>('/v1/payments', {
			params: { 'customer.id': customerId },
		});
		return data;
	}
```


## Estimated effort

8 hours

## Risks

- Potential issues with existing tests if they rely on the old field names.
- Need to ensure all instances of the renamed fields are updated throughout the codebase.

## Codemod summary

Applied 2 patch(es) across 2 file(s).

## Patches that could not be applied automatically

- **src/paymentsClient.ts** — _search string appears multiple times (ambiguous)_

  ```
  search: customer_id: string;
  replace: customer: {
		id: string;
	};
  ```
- **src/paymentsClient.ts** — _search string appears multiple times (ambiguous)_

  ```
  search: customer_id: string;
  replace: customer: {
		id: string;
	};
  ```