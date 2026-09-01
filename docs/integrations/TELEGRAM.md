# Telegram Integration

## Presented

The brief calls for one-tap Telegram sign-in and says most mobile traffic arrives
from Telegram links. A functioning notification bot is listed as a launch input.

## Implemented

Nothing. The repository contains no Telegram bot token, widget script, OAuth
callback, Login Widget configuration, Mini App SDK, bot username, webhook, deep
link, or backend verification route. V3 visually demonstrates the intended
journey but does not attempt authentication.

## Needs verification

- Telegram Login Widget versus Mini App versus custom bot-link flow
- Bot username and ownership
- Allowed origins and callback URL
- Server-side signature verification
- Session creation, expiry, logout, and account recovery
- Notification consent and message templates
- Deep-link payload format and attribution
- Privacy notice and deletion behavior for Telegram profile data

Do not add a bot token or signature secret to `NEXT_PUBLIC_*`. Integration code
must wait for a verified backend contract and Telegram application ownership.
