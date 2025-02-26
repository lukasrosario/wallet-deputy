# Wallet Deputy

## Overview

Wallet Deputy is a TypeScript library that provides validators for EVM wallet RPC requests. It helps ensure type safety and standardization of RPC requests sent to wallets.

## Installation

```bash
bun add wallet-deputy
```

## Usage

```ts
import { walletSendCallsRequestSchema } from 'wallet-deputy';

// Validate a wallet_sendCalls request
const request = {
  method: 'wallet_sendCalls',
  params: [{
    version: '1.0',
    chainId: '0x1',
      calls: [
        {
          to: '0x1234567890123456789012345678901234567890',
          value: '0x123',
          data: '0xabcdef',
        },
      ],
    },
  ],
};

// Will throw if invalid
walletSendCallsRequestSchema.validateSync(request);
```
