class AmountPayment {
  value: string;
  currency: string;
}

// class ObjectPayment {
//   id: string;
//   status: string;
//   amount: AmountPayment;
//   payment_method: {
//     type: string;
//     id: string;
//     saved: boolean;
//     title: string;
//     card: object;
//   };
//   created_at: string;
//   expires_at: string;
//   description: string;
// }

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
// enum PaymentEvent {
//   PaymentSucceeded = 'payment.succeeded',
//   WaitingForCapture = 'payment.waiting_for_capture',
//   PaymentCanceled = 'payment.canceled',
//   RefundSucceeded = 'refund.succeeded',
// }
