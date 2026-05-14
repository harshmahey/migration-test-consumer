import { PaymentsClient } from './paymentsClient';

/**
 * Sample app that consumes PaymentsAPI v1.
 *
 * Used by ATA's consumer-migration test harness to validate that AI-generated
 * migration PRs correctly rewrite this code when the upstream spec moves from
 * v1 to v2 (breaking change: `customer_id` → `customer.id`).
 */
async function main() {
	const client = new PaymentsClient(
		process.env.PAYMENTS_API_URL ?? 'http://localhost:9999',
		process.env.PAYMENTS_API_KEY ?? 'test',
	);

	const payment = await client.createPayment({
		amount: 1999,
		currency: 'usd',
		customer_id: 'cust_abc123',
	});

	const fetched = await client.getPayment(payment.id);
	console.log('fetched payment:', fetched.id, fetched.status);

	const list = await client.listPayments('cust_abc123');
	console.log('payment count:', list.payments.length);
}

main().catch((e) => {
	console.error('demo error', e);
	process.exit(1);
});
