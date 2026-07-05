# EchoDeck v0.3.0 — Xcode Build Notes

## Open Xcode

```bash
npm run ios:open
```

## In Xcode

1. Select the EchoDeck app target.
2. Set your development team.
3. Confirm bundle identifier: `com.echofoxx.echodeck`.
4. Select an iPhone simulator or connected iPhone.
5. Build and run.

## Common issues

### Signing error

Set your Apple Developer Team under Signing & Capabilities.

### White screen

Run:

```bash
npm run ios:sync
```

Then reopen Xcode.

### Capacitor not found

Run:

```bash
npm install
```
