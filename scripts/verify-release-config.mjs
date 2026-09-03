const issues = [];
const disabled = [];

function readHttpsUrl(name, { required, originOnly }) {
  const value = process.env[name]?.trim();
  if (!value) {
    if (required) issues.push(`${name} is required`);
    else disabled.push(name);
    return;
  }

  try {
    const url = new URL(value);
    if (url.protocol !== "https:") {
      issues.push(`${name} must use https`);
      return;
    }
    if (
      originOnly &&
      (url.username || url.password || url.pathname !== "/" || url.search || url.hash)
    ) {
      issues.push(`${name} must be an origin without credentials, path, query, or fragment`);
    }
  } catch {
    issues.push(`${name} must be a valid URL`);
  }
}

readHttpsUrl("NEXT_PUBLIC_SITE_URL", { required: true, originOnly: true });
readHttpsUrl("NEXT_PUBLIC_APP_ORIGIN", { required: false, originOnly: true });
readHttpsUrl("NEXT_PUBLIC_TELEGRAM_URL", { required: false, originOnly: false });
readHttpsUrl("NEXT_PUBLIC_INSTAGRAM_URL", { required: false, originOnly: false });

if (issues.length > 0) {
  for (const issue of issues) console.error(`Invalid release configuration: ${issue}`);
  process.exitCode = 1;
} else {
  console.log("Release configuration is valid.");
}

for (const name of disabled) {
  console.warn(`Optional public integration is disabled: ${name}`);
}
