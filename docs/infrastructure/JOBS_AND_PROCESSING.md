# Jobs & Processing Decision

Status: Draft v0.2  
Decision: Use Solid Queue (Rails 8 native) for background processing in Phase 1.

## 1. Requirements

| Requirement              | Importance | Notes                                                    |
| ------------------------ | ---------- | -------------------------------------------------------- |
| Reliable async execution | Critical   | Transcription + report generation must survive restarts. |
| Concurrency control      | High       | CPU-bound / IO-bound mix; need tuning.                   |
| Retry with backoff       | High       | External API flakiness.                                  |
| Visibility (dashboard)   | High       | Ops needs to inspect failures.                           |
| Scheduling future jobs   | Medium     | Report refresh / cleanup.                                |
| Multi-tenant tagging     | High       | Isolation + metrics.                                     |
| Rails ecosystem maturity | High       | Minimize friction.                                       |

## 2. Options

### Sidekiq

Pros:

- Mature, widely adopted, excellent performance (multithreaded).
- Rich middleware ecosystem (instrumentation, unique jobs, rate limiting).
- Familiar operational model for most Rails engineers.
- Low overhead on Railway since Redis already needed for caching.

Cons:

- Requires Redis (additional network hop).
- Licenses for advanced features (Pro/Enterprise) if needed later.

### GoodJob

Pros:

- Postgres-backed (no Redis dependency).
- Uses advisory locks; fewer moving parts early.
- Built-in cron / batches; open-source only.

Cons:

- Throughput lower vs Sidekiq for high concurrency.
- DB bloat risk with many job rows (requires pruning).
- Adds load to primary DB (mixes OLTP + queue).

## 3. Decision Rationale

Chose Solid Queue because:

- Rails 8 native solution (no Redis dependency for MVP).
- Simpler operations: one database instead of DB + Redis.
- Railway deployment easier with fewer add-ons.
- Built-in dashboard and monitoring.
- Can migrate to Sidekiq later if high-concurrency needs arise.
- Good performance for initial audio processing workloads.

## 4. Implementation Outline

1. Use Rails 8's built-in Solid Queue (already installed via `rails new`).
2. Configure queues in `config/queue.yml`: `critical`, `default`, `low`.
3. Access dashboard at `/admin/solid_queue` (protected).
4. Worker pattern:

```ruby
class TranscriptionJob < ApplicationJob
  queue_as :default
  retry_on StandardError, wait: :exponentially_longer, attempts: 5

  def perform(audio_recording_id)
    TenantContext.with(audio_recording_id) do
      # fetch, process, store results
    end
  end
end
```

5. Idempotency: use `perform_unique_by` or job argument deduplication.
6. Add `tenant_id` to job metadata for filtering and metrics.

## 5. Future Enhancements

| Need                       | Approach                                       |
| -------------------------- | ---------------------------------------------- |
| Cron jobs                  | `sidekiq-cron` gem or Railway scheduled tasks. |
| Unique jobs                | `sidekiq-unique-jobs` gem.                     |
| Rate limiting external API | Token bucket middleware per provider.          |
| Distributed tracing        | OpenTelemetry instrumentation.                 |
| Priority routing           | Separate concurrency settings per queue.       |

## 6. Migration Considerations (If Switching to Sidekiq Later)

- Keep jobs thin; domain services perform logic.
- Job interface similar: `SomeJob.perform_later(id)` works with both.
- If switching: add Redis, change `queue_adapter` config, update retry syntax.
- Abstract complex enqueueing behind service objects if needed.

## 7. Metrics (Planned)

- Queue latency (enqueued time → start).
- Execution duration.
- Retries & dead letter count.
- Per-tenant job volume.

## 8. Open Questions

- Need for global concurrency caps per provider?
- Memory profiling of audio processing tasks?

## 9. Summary

Solid Queue provides Rails-native background processing with minimal operational complexity. Perfect for MVP; migration path to Sidekiq available when high-performance needs arise.
