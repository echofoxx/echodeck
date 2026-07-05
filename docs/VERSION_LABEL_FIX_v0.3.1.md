# EchoDeck v0.3.1 — Version Label Fix

The Now Playing screen previously used a hardcoded eyebrow string, so the UI could continue showing an older release name even after package/version updates.

v0.3.1 adds:

- `appVersionLabel` element binding
- `APP_VERSION` renderer constant
- Runtime label update during render

This prevents the visible Now Playing version label from staying stuck on old labels such as `v0.2.6 Mobile UX`.
