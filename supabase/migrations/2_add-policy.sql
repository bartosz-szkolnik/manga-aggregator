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

create policy "Enable read access for authenticated users"
on "public"."profile"
as permissive
for select
to authenticated
using (true);


create policy "Enable write access to authenticated users"
on "public"."profile"
as permissive
for update
to authenticated
using (true)
with check (true);


create policy "Enable read access for authenticated users"
on "public"."profile_manga"
as permissive
for select
to authenticated
using ((profile_id = auth.uid()));


create policy "Enable write access to authenticated users"
on "public"."profile_manga"
as permissive
for insert
to authenticated
with check ((profile_id = auth.uid()));


create policy "Enable update access to edge function"
on "public"."manga"
as permissive
for update
to service_role
using (true)
with check (true);

create policy "Enable update access for authenticated users"
on "public"."profile_manga"
as permissive
for update
to authenticated
with check ((profile_id = auth.uid()));



