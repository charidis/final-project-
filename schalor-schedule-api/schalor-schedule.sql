\echo 'Delete and recreate schalor_schedule db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE schalor_schedule;
CREATE DATABASE schalor_schedule;
\connect schalor_schedule

\i schalor-schedule-schema.sql

\echo 'Delete and recreate schalor_schedule_test db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE schalor_schedule_test;
CREATE DATABASE schalor_schedule_test;
\connect schalor_schedule_test

\i schalor-schedule-schema.sql