const IpWhitelisting = () => {
  return (
    <>
      <p className="mb-5">
        Follow the instructions below to configure IP whitelisting:
      </p>

      <ul className="list-disc pl-5 mb-4">
        <li>Log in to your dashboard using your credentials.</li>
        <li>
          Navigate to <strong>Settings &gt; IP Whitelist</strong>.
        </li>
        <li>You will see the IP Whitelisting page with no IPs added.</li>
      </ul>

      <img
        className="px-10 mb-5 border rounded-lg"
        alt="IP whitelisting initial page"
        src="/assets/images/integration/ip whitelist/ip init.png"
      />

      <ul className="list-disc pl-5 mb-4">
        <li>
          <strong>IP:</strong> Enter the IP address from which you want to allow
          API access.
        </li>
        <li>
          Click <strong>Add IP</strong> to whitelist the entered IP address.
        </li>
      </ul>

      <img
        className="px-5 mb-5 border rounded-lg"
        alt="IP whitelisting setup"
        src="/assets/images/integration/ip whitelist/ip setup.png"
      />

      <p>
        Once IP addresses are added to the whitelist, only requests originating
        from these IPs will be allowed to access your APIs. This helps ensure
        that only trusted systems can interact with your account, reducing the
        risk of unauthorized access. You can add or remove whitelisted IPs at
        any time, giving you full control over API access.
      </p>
    </>
  );
};

export default IpWhitelisting;
