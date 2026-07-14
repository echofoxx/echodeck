# EchoDeck CI/CD

EchoDeck uses GitHub Actions to validate changes, verify native packaging, and publish versioned desktop releases.

## Pull requests and main

`.github/workflows/ci.yml` runs automatically for pull requests targeting `main` and pushes to `main`.

The workflow:

1. installs exactly the dependencies in `package-lock.json`;
2. checks release-version consistency;
3. runs the repository smoke test;
4. audits production dependencies for high-severity vulnerabilities; and
5. creates unpacked Windows and macOS applications to catch native packaging failures.

Configure the `main` branch to require both `Validate` jobs and both `Package check` jobs before merging.

## Creating a release

1. Update the version in `package.json`, `package-lock.json`, and `VERSION.txt`.
2. Run `npm ci` and `npm test` locally.
3. Merge the version change into `main` after CI passes.
4. Create and push a matching tag, such as `v0.3.3` for version `0.3.3`.

The release workflow rejects a tag that does not exactly match `package.json`. A valid tag builds the Windows installer, Windows portable executable, macOS DMG, and macOS ZIP. It then publishes those immutable files in a GitHub Release.

The current release is unsigned. Windows SmartScreen and macOS Gatekeeper may warn users until signing certificates and protected GitHub secrets are configured. Do not store certificates or passwords in the repository.

## Rollback

GitHub Releases retain the artifacts for each version. To roll back, direct users to the previous release; do not replace the files attached to an existing tag. Correct the problem on a branch and publish a new patch version.

## Recommended repository settings

- Protect `main` and require a pull request.
- Require the CI status checks before merging.
- Require branches to be current before merging.
- Block force pushes and deletion of `main`.
- Enable secret scanning and push protection.
- Use GitHub environments and approval rules if signing or store publication is added later.
