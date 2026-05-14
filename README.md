# migration-test-consumer

A sample consumer application used by ATA's consumer-migration test harness.

This repo intentionally consumes a fictional **PaymentsAPI v1**. When the
ATA-tracked spec for PaymentsAPI moves to v2 with a breaking change, ATA's
consumer-migration runner should open a PR here with the suggested code
changes.

## Files of interest

- `src/paymentsClient.ts` — the typed client that uses v1 shape.
- `src/index.ts` — sample call sites.

## Validating an AI-generated migration PR

```sh
npm install
npm run typecheck
npm run build
```

If the migration PR is correct, the above three commands pass cleanly.
