class AmountPayment {
  value: string;
  currency: string;
}

class ObjectPayment {
  id: string;
  object: string;
  data: {
    object: {
      id: string;
      object: string;
      status: string;
      metadata: {
        orderId: string;
        description: string;
      };
    };
  };
}
export class PaymentStatusDto {
  event:
    | 'payment_intent.succeeded'
    | 'payment_intent.requires_capture'
    | 'payment_intent.canceled'
    | 'refund.succeeded';
  type: string;
  object: ObjectPayment;
}
