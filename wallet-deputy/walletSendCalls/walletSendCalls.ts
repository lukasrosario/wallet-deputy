import {
  type InferType,
  type ObjectSchema,
  type StringSchema,
  array,
  object as objectSchema,
  string,
} from 'yup';
import {
  type DataCallbackCapability,
  dataCallbackCapabilitySchema,
} from './capabilities/dataCallback/dataCallback.js';
import {
  type PaymasterServiceCapability,
  paymasterServiceCapabilitySchema,
} from './capabilities/paymasterService/paymasterService.js';

export type WalletSendCallsRequest = InferType<
  typeof walletSendCallsRequestSchema
>;

export const walletSendCallsRequestSchema = objectSchema().shape({
  method: string().oneOf(['wallet_sendCalls']).required(),
  params: array()
    .length(1)
    .of(
      objectSchema().shape({
        version: string().required(),
        chainId: string()
          .required()
          .matches(/^0x[a-fA-F0-9]+$/) as StringSchema<`0x${string}`>,
        calls: array()
          .of(
            objectSchema().shape({
              to: string()
                .required()
                .matches(
                  /^0x[a-fA-F0-9]{40}$/,
                  'Address must be a valid Ethereum address',
                ) as StringSchema<`0x${string}`>,
              value: string()
                .optional()
                .matches(/^0x[a-fA-F0-9]+$/, 'Value must be valid hex')
                .default(undefined) as StringSchema<`0x${string}` | undefined>,
              data: string()
                .optional()
                .matches(/^0x[a-fA-F0-9]+$/, 'Data must be valid hex')
                .default(undefined) as StringSchema<`0x${string}` | undefined>,
            }),
          )
          .required(),
        capabilities: objectSchema()
          .shape({
            dataCallback: objectSchema()
              .optional()
              .test(
                'is-valid-dataCallback',
                'Must be a valid data callback capability',
                (value) =>
                  !value || dataCallbackCapabilitySchema.isValidSync(value),
              ) as ObjectSchema<DataCallbackCapability | undefined>,
            paymasterService: objectSchema()
              .optional()
              .test(
                'is-valid-paymasterService',
                'Must be a valid paymaster service capability',
                (value) =>
                  !value || paymasterServiceCapabilitySchema.isValidSync(value),
              ) as ObjectSchema<PaymasterServiceCapability | undefined>,
          })
          .optional()
          .default(undefined),
      }),
    )
    .required(),
});
