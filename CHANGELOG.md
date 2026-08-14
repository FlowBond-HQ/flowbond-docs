# CHANGELOG — FlowBond Protocol specification

**This file is append-only.**

Entries are never edited and never deleted. A mistaken entry is corrected by appending a
further entry that references it by sequence number. The git history of this file is part
of the protocol's audit trail; rewriting it destroys the trail.

Entry format is fixed. The renderer at `/changelog` parses it, so keep the field order
and the `## NNNN — vX.Y.Z` heading shape exactly as below.

---

## 0001 — v0.1-draft

- **Date:** 2026-08-14
- **Author:** Steph
- **Class:** MINOR

### Changed

- Initial publication of the FlowBond Protocol specification.
- §1 Architecture — the five-plane model, the layering rule, and the three guarantees
  the architecture is accountable for.
- FBP-00 · Ledger — event schema, canonical serialisation, logical ordering,
  deterministic merge for mesh-delayed events, and the no-update/no-delete invariant.
- FBP-01 · FBID — identity object, verifiable claims, revocation, additive account
  linking, scoped grants, the five authentication rails, and non-custodial threshold
  recovery with a mandatory delay and subject veto.
- FBP-02 · FlowShare — split object, largest-remainder allocation, release conditions as
  ledger events, the settlement state machine, and the conditional-release profile.
- FBP-03 · StableFlow — economy instances, mint/burn/transfer/spend scopes, public supply
  integrity with private balances, and the agent spend gate.
- FBP-04 · LifeKey — sealed trusts, thresholds and quorum rules, the advisory-only
  counselor role, soulbound bindings, and amendment by the trust's own rules.
- Privacy Core — the exhaustive list of what public state may contain, the required proof
  statements per primitive, selective disclosure through scoped view keys, proof-system
  profiles, and metadata obligations.
- Resilience Transport — local signing, durable queues, Reticulum/LXMF-class carriage,
  LoRa and WiFi HaLow bearer tiers, the leaf/relay/gateway node tiers, and honest
  presentation of eventual consistency.
- Agent Interface — the primitives-only rule, spend-gate obligations, dual attribution,
  unilateral revocation, memory boundaries, and the exhaustive list of actions an agent
  may never take.
- Passport application profile — composition proof that points, honors, quests and a
  life path require zero new primitives.
- Governance — Foundation and editor roles and their separation, the RFC process, and the
  versioning policy.
- Protocol license — recorded as an OPEN question between Apache 2.0 and BSL 1.1
  converting to Apache 2.0, with the constraints any outcome must satisfy.

### Rationale

The protocol has existed as working code and as scattered decisions for longer than it
has existed as a document. That is backwards for something meant to be a Layer 0: an
implementer cannot build against a shared understanding held in one person's head, and a
reviewer cannot audit what was never written down.

Publishing at `v0.1-draft` rather than waiting for `v1.0` is deliberate. The primitives
are stable enough to implement against, and the wording is not yet stable enough to
freeze. Saying so plainly is more useful than a version number that overstates
confidence.

Three choices in this first publication are worth naming, because they constrain
everything that follows. First, the consumer boundary: no product is named in the spec
body, so the protocol cannot grow privileged paths for its own applications. Second, the
`NEVER` invariants — non-redeemability, zero custody, the counselor's non-signatory
status, no agent side doors — are written as constitutional rather than configurable,
because a rule that a consumer can switch off is a preference. Third, privacy is stated
as a property of the data model rather than as a policy, because a policy is only as
durable as whoever currently holds the database.

### Compatibility

- No prior version. Nothing to migrate.
- Implementations claiming this version must verify against the git tag `v0.1-draft`.
  See `/audit`.

---
