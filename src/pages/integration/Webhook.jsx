const Webhook = () => {
  return (
    <>
      <p className="mb-5">
        Follow the instructions below to configure webhooks for APIs
      </p>

      <ul className="list-disc pl-5 mb-4">
        <li>Log in to your dashboard using your credentials.</li>
        <li>
          Navigate to <strong>Settings &gt; Webhooks</strong>.
        </li>
        <li>Click Add in the Webhooks page.</li>
      </ul>

      <img
        className="px-10 mb-5 border rounded-lg"
        alt="Webhook initial page"
        src="/assets/images/integration/webhook/webhook init.png"
      />

      <p>In the Add Webhook popup, enter the following information:</p>
      <ul className="list-disc pl-5 mb-4">
        <li>
          <strong>Webhook URL:</strong> Enter the URL where you want to receive
          the transfer related notifications.
        </li>
        <li>
          Select a <strong>webhook Type:</strong> Select initiated from the
          dropdown menu.
        </li>
        <li>
          Click <strong>Add Webhook.</strong>
        </li>
      </ul>

      <img
        className="px-5 pb-10 border-b mb-5 border rounded-lg"
        alt="Webhook setup"
        src="/assets/images/integration/webhook/add webhook.png"
      />
      <h2 className="text-xl font-semibold mb-3">Webhook events</h2>
      <p>
        Payouts webhooks enable you to receive updates about all event-driven
        activities originating from your account. Below is the list of payouts
        webhooks:
      </p>
    </>
  );
};

export default Webhook;
