select
  cron.schedule(
    'invoke-update-mangas',
    -- '0 8,16 * * *',
    '*/30 * * * *',
    $$
    select
      net.http_post(
          url:='http://localhost:54321/functions/v1/update-mangas',
          headers:='{"Content-Type": "application/json", "Authorization": "Bearer YOUR_AUTHENTICATION_KEY"}'::jsonb,
          body:=concat('{}')::jsonb
      ) as request_id;
    $$
  );

select
cron.schedule(
  'invoke-send-notifications',
  '*/5 * * * *',
  $$
  select
    net.http_post(
        url:='http://localhost:54321/functions/v1/send-notifications',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer YOUR_AUTHENTICATION_KEY"}'::jsonb,
        body:=concat('{}')::jsonb
    ) as request_id;
  $$
);