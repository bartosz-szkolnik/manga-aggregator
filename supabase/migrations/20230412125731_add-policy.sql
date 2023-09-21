create policy "Enable read access for all users"
on "public"."manga"
as permissive
for select
to public
using (true);

create policy "Enable write access to authenticated users"
on "public"."manga"
as permissive
for insert
to authenticated
with check (true);



