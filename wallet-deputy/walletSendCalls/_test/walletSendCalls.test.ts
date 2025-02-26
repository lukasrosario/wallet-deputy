import { describe, expect, it } from 'vitest';
import { walletSendCallsRequestSchema } from '../walletSendCalls.js';

describe('walletSendCallsRequestSchema', () => {
  it('should validate a minimal valid request', () => {
    const validRequest = {
      method: 'wallet_sendCalls',
      params: [
        {
          version: '1.0',
          chainId: '0x1',
          calls: [
            {
              to: '0x1234567890123456789012345678901234567890',
            },
          ],
        },
      ],
    };

    expect(() =>
      walletSendCallsRequestSchema.validateSync(validRequest),
    ).not.toThrow();
  });

  it('should validate a complete valid request with all optional fields', () => {
    const validRequest = {
      method: 'wallet_sendCalls',
      params: [
        {
          version: '1.0',
          chainId: '0x1',
          calls: [
            {
              to: '0x1234567890123456789012345678901234567890',
              value: '0x123',
              data: '0xabcdef',
            },
          ],
          capabilities: {
            dataCallback: {
              url: 'https://api.example.com/callback',
              requests: [
                {
                  type: 'email',
                  optional: true,
                },
                {
                  type: 'phoneNumber',
                  optional: false,
                },
              ],
            },
            paymasterService: {
              url: 'https://paymaster.example.com',
            },
          },
        },
      ],
    };

    expect(() =>
      walletSendCallsRequestSchema.validateSync(validRequest),
    ).not.toThrow();
  });

  describe('validation errors', () => {
    it('should reject invalid method', () => {
      const invalidRequest = {
        method: 'invalid_method',
        params: [
          {
            version: '1.0',
            chainId: '0x1',
            calls: [
              {
                to: '0x1234567890123456789012345678901234567890',
              },
            ],
          },
        ],
      };

      expect(() =>
        walletSendCallsRequestSchema.validateSync(invalidRequest),
      ).toThrowErrorMatchingInlineSnapshot(
        `"method must be one of the following values: wallet_sendCalls"`,
      );
    });

    it('should reject invalid chainId format', () => {
      const invalidRequest = {
        method: 'wallet_sendCalls',
        params: [
          {
            version: '1.0',
            chainId: 'invalid_chain_id',
            calls: [
              {
                to: '0x1234567890123456789012345678901234567890',
              },
            ],
          },
        ],
      };

      expect(() =>
        walletSendCallsRequestSchema.validateSync(invalidRequest),
      ).toThrowErrorMatchingInlineSnapshot(
        `"params[0].chainId must match the following: "/^0x[a-fA-F0-9]+$/""`,
      );
    });

    it('should reject invalid address format', () => {
      const invalidRequest = {
        method: 'wallet_sendCalls',
        params: [
          {
            version: '1.0',
            chainId: '0x1',
            calls: [
              {
                to: 'invalid_address',
              },
            ],
          },
        ],
      };

      expect(() =>
        walletSendCallsRequestSchema.validateSync(invalidRequest),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Address must be a valid Ethereum address"`,
      );
    });

    it('should reject invalid value format', () => {
      const invalidRequest = {
        method: 'wallet_sendCalls',
        params: [
          {
            version: '1.0',
            chainId: '0x1',
            calls: [
              {
                to: '0x1234567890123456789012345678901234567890',
                value: 'invalid_value',
              },
            ],
          },
        ],
      };

      expect(() =>
        walletSendCallsRequestSchema.validateSync(invalidRequest),
      ).toThrowErrorMatchingInlineSnapshot(`"Value must be valid hex"`);
    });

    it('should reject invalid data format', () => {
      const invalidRequest = {
        method: 'wallet_sendCalls',
        params: [
          {
            version: '1.0',
            chainId: '0x1',
            calls: [
              {
                to: '0x1234567890123456789012345678901234567890',
                data: 'invalid_data',
              },
            ],
          },
        ],
      };

      expect(() =>
        walletSendCallsRequestSchema.validateSync(invalidRequest),
      ).toThrowErrorMatchingInlineSnapshot(`"Data must be valid hex"`);
    });

    it('should reject invalid capabilities format', () => {
      const invalidRequest = {
        method: 'wallet_sendCalls',
        params: [
          {
            version: '1.0',
            chainId: '0x1',
            calls: [
              {
                to: '0x1234567890123456789012345678901234567890',
              },
            ],
            capabilities: {
              dataCallback: {
                method: 'POST',
              },
            },
          },
        ],
      };

      expect(() =>
        walletSendCallsRequestSchema.validateSync(invalidRequest),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Must be a valid data callback capability"`,
      );
    });
  });
});
