CREATE TYPE current_reading_status AS ENUM (
    'reading',
    'want to read',
    'finished reading',
    'postponed',
    'dropped'
);

CREATE TYPE priority AS ENUM (
    'high',
    'normal',
    'low'
);

CREATE TYPE notification_status AS ENUM (
    'pending',
    'error',
    'sent'
);

CREATE TYPE manga_status AS ENUM (
    'completed',
    'ongoing',
    'hiatus',
    'cancelled',
    'unknown'
);

create table "public"."manga" (
    "id" uuid not null default uuid_generate_v4(), -- id of the manga
    "created_at" timestamp with time zone not null default now(), -- time when the manga was created
    "title" text not null, -- title of the manga
    "image_url" text not null, -- image url of the manga
    "mangadex_id" text not null, -- id of the manga on mangadex
    "last_time_checked" timestamp with time zone default null, -- last time the manga was checked for new chapters
    "check_every" text default null, -- how often to check for new chapters
    "manga_status" manga_status default 'unknown', -- the current status of the manga, whether it's completed, ongoing, hiatus, cancelled, or unknown
    "latest_chapter" text default null -- latest chapter number of the manga
);

alter table "public"."manga" enable row level security;

create table "public"."profile" (
    "id" uuid not null, -- id of the profile
    "created_at" timestamp with time zone not null default now(),
    "name" text default null, -- display name of the profile, probably name and username
    "username" text not null, -- handle of the profile (usually email)
    "avatar_url" text default null, -- avatar url of the profile
    "subscriptions" jsonb not null default '[]'::jsonb -- list of web push subscriptions connected to that profile
);

alter table "public"."profile" enable row level security;

create table "public"."profile_manga" (
    "id" uuid not null default gen_random_uuid(), -- id of the profile manga relation
    "created_at" timestamp with time zone not null default now(),
    "profile_id" uuid not null, -- id of the profile
    "manga_id" uuid not null, -- id of the manga
    "is_following" boolean not null default false, -- whether the profile wants to receive notifications for the manga
    "is_in_library" boolean not null default false, -- whether to show the manga in the library of a profile
    "current_reading_status" current_reading_status default 'want to read', -- current reading status of the manga
    "latest_chapter_read" text default null, -- latest chapter number read by the profile, corresponds to manga.latest_chapter
    "priority" priority default null -- priority of the manga for a profile
);

create table "public"."notifications" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "status" notification_status not null default 'pending'::notification_status,
    "subscription" jsonb,
    "data" jsonb
);

CREATE UNIQUE INDEX manga_pkey ON public.manga USING btree (id);

alter table "public"."manga" add constraint "manga_pkey" PRIMARY KEY using index "manga_pkey";

alter table "public"."profile_manga" enable row level security;

CREATE UNIQUE INDEX profile_manga_pkey ON public.profile_manga USING btree (id);

CREATE UNIQUE INDEX profile_pkey ON public.profile USING btree (id);

alter table "public"."profile" add constraint "profile_pkey" PRIMARY KEY using index "profile_pkey";

alter table "public"."profile_manga" add constraint "profile_manga_pkey" PRIMARY KEY using index "profile_manga_pkey";

alter table "public"."profile" add constraint "profile_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profile" validate constraint "profile_id_fkey";

alter table "public"."profile_manga" add constraint "profile_manga_manga_id_fkey" FOREIGN KEY (manga_id) REFERENCES manga(id) ON DELETE CASCADE not valid;

alter table "public"."profile_manga" validate constraint "profile_manga_manga_id_fkey";

alter table "public"."profile_manga" add constraint "profile_manga_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profile(id) ON DELETE CASCADE not valid;

alter table "public"."profile_manga" validate constraint "profile_manga_profile_id_fkey";

alter table "public"."notifications" enable row level security;

CREATE UNIQUE INDEX notifications_pkey ON public.notifications USING btree (id);

alter table "public"."notifications" add constraint "notifications_pkey" PRIMARY KEY using index "notifications_pkey";