# Telegram Integration

## Presented

The brief calls for one-tap Telegram sign-in and says most mobile traffic arrives
from Telegram links. A functioning notification bot is listed as a launch input.

## Implemented

Nothing, and nothing will be. Telegram sign-in belongs to the separate YVC
application; this repository contains no bot token, widget script, OAuth
callback, Login Widget configuration, Mini App SDK, bot username, webhook, or
verification route.

The marketing site's only relationship with Telegram is an outbound link to the
public community channel, and only when `NEXT_PUBLIC_TELEGRAM_URL` is
configured. While it is empty the join action falls back to the contact page
rather than linking to an unverified address.

## Needs verification

- Telegram Login Widget versus Mini App versus custom bot-link flow
- Bot username and ownership
- Allowed origins and callback URL
- Server-side signature verification
- Session creation, expiry, logout, and account recovery
- Notification consent and message templates
- Deep-link payload format and attribution
- Privacy notice and deletion behavior for Telegram profile data

Do not add a bot token or signature secret to `NEXT_PUBLIC_*`, and do not add
integration code to this repository at all: it belongs to the application.
`NEXT_PUBLIC_TELEGRAM_URL` is a public channel address, not a credential.
