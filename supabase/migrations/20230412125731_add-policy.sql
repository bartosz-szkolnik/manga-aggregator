create policy "Enable read access for all users"
on "public"."manga"
as permissive
for select
to public
using (true);



