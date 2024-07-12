set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.insert_profile_for_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin
insert into
  public.profile (id, created_at, name, username, avatar_url)
values
  (
    new.id,
    now (),
    'Bartosz Szkolnik',
    'bartosz-szkolnik',
    'https://avatars.githubusercontent.com/u/20556964?v=4'
  );

return new;

end;$function$
;


CREATE TRIGGER "on_auth.users_insert" AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION insert_profile_for_new_user();


