insert into manga (id, title, mangadex_id, image_url, is_completed, latest_chapter_no) values ('e0c01b6e-5805-4a45-9198-1d4e16128a71', 'Telework Yotabanashi', 'd09c8abd-24ec-41de-ac8b-b6381a2f3a63', 'https://mangadex.org/covers/d09c8abd-24ec-41de-ac8b-b6381a2f3a63/b5f646b5-6c33-4a1a-8154-7b04450f300c.jpg', true, 20.5);
insert into manga (id, title, mangadex_id, image_url, is_completed, latest_chapter_no) values ('80c62f24-ec26-477f-89ba-cfdae22deba9', 'Uzaki-chan Wants to Hang Out!', '5a90308a-8b12-4a4d-9c6d-2487028fe319', 'https://mangadex.org/covers/5a90308a-8b12-4a4d-9c6d-2487028fe319/58623d3b-5bc1-42cc-987e-d1e7c07431a3.jpg', false, 101);
insert into manga (id, title, mangadex_id, image_url, is_completed, latest_chapter_no) values ('5f8a029c-17b0-4be9-b59c-8d90dbb3ca52', 'Don''t Toy With Me, Miss Nagatoro', 'd86cf65b-5f6c-437d-a0af-19a31f94ec55', 'https://mangadex.org/covers/d86cf65b-5f6c-437d-a0af-19a31f94ec55/22ca1567-ce59-4100-9cb8-3950d32261e4.jpg', false, 135);
insert into manga (id, title, mangadex_id, image_url, is_completed, latest_chapter_no) values ('9265b4a2-e627-4686-ba84-80fbb0c3c5af', 'A Story About Treating a Female Knight, Who Has Never Been Treated as a Woman, as a Woman', '9b3d1a67-941f-4538-9e75-3797eeb3771f', 'https://mangadex.org/covers/9b3d1a67-941f-4538-9e75-3797eeb3771f/a5656a23-6cbd-4a03-8e59-6cbb413b72c8.jpg', true, 131);

insert into auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) values (
  '00000000-0000-0000-0000-000000000000',
  '4f14a3c1-952e-4bce-9db3-0c0cbf8505e6',
  'authenticated',
  'authenticated',
  'bartosz.szkolnik@protonmail.com',
  crypt ('123456', gen_salt ('bf')),
  current_timestamp,
  current_timestamp,
  current_timestamp,
  '{"provider":"email","providers":["email"]}',
  '{}',
  current_timestamp,
  current_timestamp,
  '',
  '',
  '',
  ''
);

insert into profile_manga (
  id,
  created_at,
  profile_id,
  manga_id,
  is_following,
  is_in_library,
  current_reading_status,
  latest_chapter_read,
  priority
) values (
  '9fbb8799-2b8d-4274-b0ac-f0e98ada8dbb',
  '2023-09-27 21:53:41.253516+00',
  '4f14a3c1-952e-4bce-9db3-0c0cbf8505e6',
  '5f8a029c-17b0-4be9-b59c-8d90dbb3ca52',
  false,
  false,
  null,
  null,
  null
);