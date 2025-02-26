import { describe, expect, it } from 'vitest';
import { paymasterServiceCapabilitySchema } from '../paymasterService/paymasterService.js';

describe('paymasterServiceCapabilitySchema', () => {
  it('should validate a minimal valid paymaster service', () => {
    const validPaymaster = {
      url: 'https://paymaster.example.com',
    };

    expect(() =>
      paymasterServiceCapabilitySchema.validateSync(validPaymaster),
    ).not.toThrow();
  });

  it('should validate a paymaster service with context', () => {
    const validPaymaster = {
      url: 'https://paymaster.example.com',
      context: {
        chainId: '0x1',
        gasToken: '0x1234567890123456789012345678901234567890',
      },
    };

    expect(() =>
      paymasterServiceCapabilitySchema.validateSync(validPaymaster),
    ).not.toThrow();
  });

  describe('validation errors', () => {
    it('should reject missing url', () => {
      const invalidPaymaster = {
        context: {},
      };

      expect(() =>
        paymasterServiceCapabilitySchema.validateSync(invalidPaymaster),
      ).toThrowErrorMatchingInlineSnapshot(`"url is a required field"`);
    });

    it('should reject invalid url format', () => {
      const invalidPaymaster = {
        url: 'not-a-url',
      };

      expect(() =>
        paymasterServiceCapabilitySchema.validateSync(invalidPaymaster),
      ).toThrowErrorMatchingInlineSnapshot(`"URL must be a valid HTTPS URL"`);
    });

    it('should reject non-object context', () => {
      const invalidPaymaster = {
        url: 'https://paymaster.example.com',
        context: 'invalid-context',
      };

      expect(() =>
        paymasterServiceCapabilitySchema.validateSync(invalidPaymaster),
      ).toThrowErrorMatchingInlineSnapshot(
        `"context must be a \`object\` type, but the final value was: \`"invalid-context"\`."`,
      );
    });
  });
});
