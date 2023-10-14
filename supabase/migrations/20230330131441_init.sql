CREATE TYPE current_reading_status AS ENUM (
    'reading',
    'want to read',
    'finished reading',
    'postponed',
    'canceled',
    'read later'
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

create table "public"."manga" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone not null default now(),
    "title" text not null,
    "image_url" text not null,
    "mangadex_id" text not null,
    "last_time_checked" timestamp with time zone,
    "check_every" text,
    "is_completed" boolean default false,
    "latest_chapter_no" text
);

alter table "public"."manga" enable row level security;

create table "public"."profile" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "name" text,
    "username" text not null,
    "avatar_url" text,
    "subscriptions" jsonb not null default '[]'::jsonb
);

alter table "public"."profile" enable row level security;

create table "public"."profile_manga" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "profile_id" uuid not null,
    "manga_id" uuid not null,
    "is_following" boolean not null default false,
    "is_in_library" boolean not null default false,
    "current_reading_status" current_reading_status,
    "latest_chapter_read" text,
    "priority" priority
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
