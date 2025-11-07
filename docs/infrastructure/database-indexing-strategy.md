# Database Indexing Strategy

This document outlines the comprehensive indexing strategy implemented for Fluently's PostgreSQL database to optimize filtering, pagination, and search performance across all API endpoints.

## Overview

Our indexing strategy focuses on optimizing the most common query patterns:

- **Role-based filtering** (tenant and user scoping)
- **Status and type filtering** (enum-based columns)
- **Date range queries** (created_at, updated_at)
- **Full-text search** (trigram-based for partial matching)
- **Numerical range filtering** (confidence, duration, file size)
- **Composite queries** (combinations of the above)

## PostgreSQL Extensions

### pg_trgm (Trigram Extension)

Enables efficient partial text matching using trigram indexes, supporting ILIKE queries with % wildcards.

```sql
-- Already enabled in schema
enable_extension "pg_trgm"
```

## Index Categories

### 1. Core Filtering Indexes

#### Audio Recordings

```sql
-- Individual column indexes
add_index :audio_recordings, :duration                    -- Numeric range filtering
add_index :audio_recordings, :file_size                   -- File size filtering
add_index :audio_recordings, :file_type                   -- Format filtering

-- Composite indexes for common access patterns
add_index :audio_recordings, [:tenant_id, :status, :created_at]     -- Tenant + status filtering
add_index :audio_recordings, [:tenant_id, :user_id, :created_at]    -- User scoping
add_index :audio_recordings, [:user_id, :status]                    -- User + status queries
```

#### Users

```sql
-- Name-based queries
add_index :users, [:first_name, :last_name]               -- Name searches
add_index :users, [:tenant_id, :role, :created_at]        -- Role-based filtering
```

#### Tenants

```sql
-- Soft delete and status filtering
add_index :tenants, :deleted_at                           -- Active/inactive filtering
add_index :tenants, :slug                                 -- Unique slug lookup
```

#### Transcriptions

```sql
-- Core filtering columns
add_index :transcriptions, :created_at                    -- Date range queries
add_index :transcriptions, :confidence                    -- Confidence filtering
add_index :transcriptions, [:audio_recording_id, :created_at]  -- Nested resource queries
```

#### Reports

```sql
-- Status and type filtering
add_index :reports, :created_at                           -- Date sorting/filtering
add_index :reports, :status                               -- Status filtering
add_index :reports, [:tenant_id, :created_at]             -- Tenant scoping
add_index :reports, [:user_id, :created_at]               -- User scoping
add_index :reports, [:status, :created_at]                -- Status + date queries
add_index :reports, [:report_type, :created_at]           -- Type + date queries
add_index :reports, [:audio_recording_id, :created_at]    -- Nested resource queries

-- Complex composite indexes
add_index :reports, [:tenant_id, :status, :created_at]         -- Tenant + status filtering
add_index :reports, [:tenant_id, :report_type, :created_at]    -- Tenant + type filtering
add_index :reports, [:user_id, :status, :created_at]          -- User + status filtering
```

### 2. Full-Text Search Indexes (GIN Trigram)

These indexes enable efficient partial text matching using PostgreSQL's trigram similarity.

```sql
-- Audio recordings
add_index :audio_recordings, :title, using: :gin, opclass: :gin_trgm_ops
add_index :audio_recordings, :original_filename, using: :gin, opclass: :gin_trgm_ops

-- Users
add_index :users, :email, using: :gin, opclass: :gin_trgm_ops

-- Tenants
add_index :tenants, :name, using: :gin, opclass: :gin_trgm_ops

-- Transcriptions
add_index :transcriptions, :content, using: :gin, opclass: :gin_trgm_ops

-- Reports
add_index :reports, :title, using: :gin, opclass: :gin_trgm_ops
add_index :reports, :content, using: :gin, opclass: :gin_trgm_ops
```

### 3. Relationship and Foreign Key Indexes

Rails automatically creates indexes for foreign keys, but we add composite indexes for common join patterns:

```sql
-- Multi-tenant architecture support
add_index :audio_recordings, [:tenant_id, :user_id, :created_at]
add_index :reports, [:tenant_id, :user_id, :created_at]

-- Nested resource access patterns
add_index :transcriptions, [:audio_recording_id, :created_at]
add_index :reports, [:audio_recording_id, :created_at]
```

## Query Pattern Optimization

### Role-Based Access Patterns

**Owner (Cross-tenant access)**

```sql
-- Optimized by tenant + date indexes
SELECT * FROM audio_recordings ORDER BY created_at DESC;
```

**Admin/Therapist (Tenant-scoped)**

```sql
-- Uses tenant_id + created_at composite indexes
SELECT * FROM audio_recordings WHERE tenant_id = ? ORDER BY created_at DESC;
```

**Client (User-scoped)**

```sql
-- Uses tenant_id + user_id + created_at composite indexes
SELECT * FROM audio_recordings WHERE tenant_id = ? AND user_id = ? ORDER BY created_at DESC;
```

### Search Query Patterns

**Partial Text Search**

```sql
-- Uses trigram GIN indexes for efficient ILIKE queries
SELECT * FROM transcriptions WHERE content ILIKE '%keyword%';
```

**Filtered Search**

```sql
-- Combines trigram search with status filtering
SELECT * FROM reports
WHERE title ILIKE '%analysis%' AND status = 'ready' AND tenant_id = ?
ORDER BY created_at DESC;
```

### Range Filtering

**Confidence Filtering**

```sql
-- Uses confidence index for range queries
SELECT * FROM transcriptions
WHERE confidence >= 0.8 AND confidence <= 1.0;
```

**Date Range Filtering**

```sql
-- Uses created_at indexes for efficient date ranges
SELECT * FROM audio_recordings
WHERE created_at >= '2024-01-01' AND created_at <= '2024-12-31';
```

## Performance Considerations

### Index Selection Strategy

1. **Single-column indexes** for frequently filtered columns (status, type, confidence)
2. **Composite indexes** ordered by cardinality (tenant_id, user_id, created_at)
3. **Trigram indexes** for all searchable text fields
4. **Partial indexes** avoided to maintain simplicity (can be added later if needed)

### Query Planning

- **B-tree indexes** for exact matches and range queries
- **GIN indexes** for full-text search and array operations
- **Composite indexes** ordered by most selective column first
- **Index-only scans** enabled by including frequently selected columns

### Monitoring and Maintenance

**Useful queries for monitoring index usage:**

```sql
-- Check index usage statistics
SELECT schemaname, tablename, indexname, idx_scan, idx_tup_read, idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;

-- Identify unused indexes
SELECT schemaname, tablename, indexname, idx_scan
FROM pg_stat_user_indexes
WHERE idx_scan = 0;

-- Check index sizes
SELECT schemaname, tablename, indexname, pg_size_pretty(pg_relation_size(indexrelid))
FROM pg_stat_user_indexes
ORDER BY pg_relation_size(indexrelid) DESC;
```

## Migration Strategy

### Adding New Indexes

1. **Concurrent creation** in production to avoid table locks:

```ruby
add_index :table_name, :column_name, algorithm: :concurrently
```

2. **Monitor performance** before and after index creation
3. **Remove unused indexes** identified through monitoring

### Index Naming Convention

- **Single column**: `index_table_name_on_column_name`
- **Composite**: `idx_table_abbreviation_column1_column2`
- **Trigram**: `idx_table_abbreviation_column_trgm`
- **Custom**: Descriptive names for complex composite indexes

## Future Optimization Opportunities

1. **Partial indexes** for commonly filtered subsets (e.g., active records only)
2. **Expression indexes** for computed values (e.g., LOWER(email))
3. **Covering indexes** to enable index-only scans
4. **Materialized views** for complex analytical queries
5. **Database partitioning** as data volume grows

## Conclusion

This indexing strategy provides comprehensive coverage for all current filtering, searching, and pagination needs while maintaining optimal query performance across role-based access patterns. Regular monitoring will help identify opportunities for further optimization as usage patterns evolve.
