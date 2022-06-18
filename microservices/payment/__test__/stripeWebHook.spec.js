const supertest = require("supertest");
const app = require("../index");
const client = supertest(app);

describe("Stripe webhook", () => {
  it("POST /payment/webhook", async () => {
    const body = {
      id: "evt_3L03PEGprRfnAOKy1CNsdMP7",
      object: "event",
      api_version: "2020-08-27",
      created: 1652705533,
      data: {
        object: {
          id: "ch_3L03PEGprRfnAOKy1B7Ug5li",
          object: "charge",
          amount: 2000,
          amount_captured: 2000,
          amount_refunded: 0,
          application: null,
          application_fee: null,
          application_fee_amount: null,
          balance_transaction: "txn_3L03PEGprRfnAOKy1SQhMK4m",
          billing_details: {
            address: {
              city: null,
              country: null,
              line1: null,
              line2: null,
              postal_code: null,
              state: null,
            },
            email: null,
            name: null,
            phone: null,
          },
          calculated_statement_descriptor: "Stripe",
          captured: true,
          created: 1652705533,
          currency: "usd",
          customer: null,
          description: "(created by Stripe CLI)",
          destination: null,
          dispute: null,
          disputed: false,
          failure_balance_transaction: null,
          failure_code: null,
          failure_message: null,
          fraud_details: {},
          invoice: null,
          livemode: false,
          metadata: {
            order_id: 1,
            status: "PAID",
          },
          on_behalf_of: null,
          order: null,
          outcome: {
            network_status: "approved_by_network",
            reason: null,
            risk_level: "normal",
            risk_score: 24,
            seller_message: "Payment complete.",
            type: "authorized",
          },
          paid: true,
          payment_intent: "pi_3L0470GprRfnAOKy1k51mAlP",
          payment_method: "pm_1L03PEGprRfnAOKy0hfH7vSu",
          payment_method_details: {
            card: {
              brand: "visa",
              checks: {
                address_line1_check: null,
                address_postal_code_check: null,
                cvc_check: null,
              },
              country: "US",
              exp_month: 5,
              exp_year: 2023,
              fingerprint: "IsKFyKP6ThqI5eOJ",
              funding: "credit",
              installments: null,
              last4: "4242",
              mandate: null,
              network: "visa",
              three_d_secure: null,
              wallet: null,
            },
            type: "card",
          },
          receipt_email: null,
          receipt_number: null,
          receipt_url:
            "https://pay.stripe.com/receipts/acct_1Ks4C8GprRfnAOKy/ch_3L03PEGprRfnAOKy1B7Ug5li/rcpt_LhSJktgQvM1uVdpKyYtRQ2fHC5bUcGB",
          refunded: false,
          refunds: {
            object: "list",
            data: [],
            has_more: false,
            total_count: 0,
            url: "/v1/charges/ch_3L03PEGprRfnAOKy1B7Ug5li/refunds",
          },
          review: null,
          shipping: {
            address: {
              city: "San Francisco",
              country: "US",
              line1: "510 Townsend St",
              line2: null,
              postal_code: "94103",
              state: "CA",
            },
            carrier: null,
            name: "Jenny Rosen",
            phone: null,
            tracking_number: null,
          },
          source: null,
          source_transfer: null,
          statement_descriptor: null,
          statement_descriptor_suffix: null,
          status: "succeeded",
          transfer_data: null,
          transfer_group: null,
        },
      },
      livemode: false,
      pending_webhooks: 2,
      request: {
        id: "req_5cg00tf9BitfTr",
        idempotency_key: "1c1fdaaa-cbf0-4a48-82a7-1f69463117b8",
      },
      type: "charge.succeeded",
    };

    const response = await client.post("/payment/webhook").send(body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("received");
    expect(response.body.received).toBe(true);
  });
});
