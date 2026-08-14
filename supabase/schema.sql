-- Ememtino Creamy Foods Venture — Supabase schema
-- Run this in the Supabase SQL editor for a fresh project.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  phone text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  customer_name text not null,
  phone text not null,
  email text not null,
  fulfillment text not null check (fulfillment in ('pickup', 'delivery')),
  address text,
  notes text,
  total numeric not null,
  status text not null default 'pending' check (status in ('pending', 'paid', 'preparing', 'ready', 'completed', 'cancelled')),
  payment_reference text,
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

create policy "Users can view their own orders"
  on public.orders for select
  using (auth.uid() = user_id);

-- Order rows are written by the server (via the service-role key in
-- /api/paystack/verify) after a Paystack payment is verified, so no
-- client-side insert policy is needed.

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  name text not null,
  unit_price numeric not null,
  quantity integer not null,
  notes text
);

alter table public.order_items enable row level security;

create policy "Users can view items for their own orders"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );
