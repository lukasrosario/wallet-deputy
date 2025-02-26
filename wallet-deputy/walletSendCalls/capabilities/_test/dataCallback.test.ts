import { describe, expect, it } from 'vitest';
import {
  SUPPORTED_DATA_CALLBACK_TYPES,
  dataCallbackCapabilitySchema,
} from '../dataCallback/dataCallback.js';

describe('dataCallbackCapabilitySchema', () => {
  it('should validate a minimal valid data callback', () => {
    const validCallback = {
      requests: [
        {
          type: 'email',
        },
      ],
    };

    expect(() =>
      dataCallbackCapabilitySchema.validateSync(validCallback),
    ).not.toThrow();
  });

  it('should validate a complete data callback with all fields', () => {
    const validCallback = {
      callbackURL: 'https://api.example.com/callback',
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
    };

    expect(() =>
      dataCallbackCapabilitySchema.validateSync(validCallback),
    ).not.toThrow();
  });

  it('should validate all supported data types', () => {
    for (const type of SUPPORTED_DATA_CALLBACK_TYPES) {
      const callback = {
        requests: [{ type }],
      };

      expect(() =>
        dataCallbackCapabilitySchema.validateSync(callback),
      ).not.toThrow();
    }
  });

  describe('validation errors', () => {
    it('should reject missing requests array', () => {
      const invalidCallback = {
        callbackURL: 'https://api.example.com/callback',
      };

      expect(() =>
        dataCallbackCapabilitySchema.validateSync(invalidCallback),
      ).toThrow('requests is a required field');
    });

    it('should reject empty requests array', () => {
      const invalidCallback = {
        requests: [],
      };

      expect(() =>
        dataCallbackCapabilitySchema.validateSync(invalidCallback),
      ).toThrowErrorMatchingInlineSnapshot(
        `"At least one data callback request is required"`,
      );
    });

    it('should reject invalid request type', () => {
      const invalidCallback = {
        requests: [
          {
            type: 'invalid-type',
          },
        ],
      };

      expect(() =>
        dataCallbackCapabilitySchema.validateSync(invalidCallback),
      ).toThrowErrorMatchingInlineSnapshot(
        `"requests[0].type must be one of the following values: email, phoneNumber, physicalAddress, name, walletAddress"`,
      );
    });

    it('should reject invalid callbackURL', () => {
      const invalidCallback = {
        callbackURL: 'not-a-url',
        requests: [{ type: 'email' }],
      };

      expect(() =>
        dataCallbackCapabilitySchema.validateSync(invalidCallback),
      ).toThrowErrorMatchingInlineSnapshot(`"URL must be a valid HTTPS URL"`);
    });

    it('should reject invalid optional flag type', () => {
      const invalidCallback = {
        requests: [
          {
            type: 'email',
            optional: 'not-a-boolean',
          },
        ],
      };

      expect(() =>
        dataCallbackCapabilitySchema.validateSync(invalidCallback),
      ).toThrowErrorMatchingInlineSnapshot(
        `"requests[0].optional must be a \`boolean\` type, but the final value was: \`"not-a-boolean"\`."`,
      );
    });

    it('should reject missing type in request', () => {
      const invalidCallback = {
        requests: [
          {
            optional: true,
          },
        ],
      };

      expect(() =>
        dataCallbackCapabilitySchema.validateSync(invalidCallback),
      ).toThrowErrorMatchingInlineSnapshot(
        `"requests[0].type is a required field"`,
      );
    });
  });
});
