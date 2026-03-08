

# Plan: Promotional Email Sender + Fix Build Errors

## 1. Fix Existing Build Errors

Three files have type errors that must be fixed first:

**AdminDashboardPage.tsx (line 142):** `set_user_role` RPC doesn't exist in types. Fix by casting with `as any` on the rpc call since the function exists in DB but isn't reflected in generated types.

**ProductPage.tsx (line 546):** `review.ownerReply` is typed as `unknown`. Cast it to `string` explicitly: `{review.ownerReply as string}`.

**ProfilePage.tsx (lines 64, 103, 115):** The `ProfileRow` type includes `phone` but the DB `profiles` table doesn't have a `phone` column. Fix by removing `phone` from the local `ProfileRow` type and adjusting the phone-related code to use `as any` casts, or better yet, add a `phone` column to profiles via migration.

Best approach for ProfilePage: Since phone functionality is already coded, add a `phone` column to the `profiles` table via migration. This resolves all three ProfilePage errors cleanly.

## 2. Database Migration

Add `phone` column to `profiles` table:
```sql
ALTER TABLE public.profiles ADD COLUMN phone text;
```

Add `promotional_emails` table for the sent emails log:
```sql
CREATE TABLE public.promotional_emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject text NOT NULL,
  body text NOT NULL,
  recipient_group text NOT NULL,
  recipient_count integer DEFAULT 0,
  status text NOT NULL DEFAULT 'draft',
  scheduled_at timestamptz,
  sent_at timestamptz,
  open_rate numeric(5,2),
  created_by uuid NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.promotional_emails ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage promotional emails"
  ON public.promotional_emails FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );
```

## 3. Promotional Email Sender Component

Create `src/components/admin/PromotionalEmailSender.tsx` with:

- **Tabs layout** using shadcn Tabs: "Compose", "Preview", "Sent Log"
- **Compose tab:**
  - Subject input field
  - Recipient group select (All Users, Inactive Users, Recent Buyers, New Users)
  - Rich text body editor using a Textarea with a toolbar for inserting `{{first_name}}`, `{{store_name}}` variables via buttons
  - "Send Now" button and "Schedule for Later" button that reveals a date/time picker (using shadcn Popover + Calendar + time input)
- **Preview tab:**
  - Renders the email body with sample data replacing variables (e.g., `{{first_name}}` -> "Tendai")
  - Shows subject line and recipient group summary
- **Sent Log tab:**
  - Table showing subject, recipient count, sent date, open rate, status
  - Fetched from `promotional_emails` table

## 4. Integrate into Admin Dashboard

Add the `PromotionalEmailSender` component as a new Card section in `AdminDashboardPage.tsx`, after the Users section, with a `Mail` icon in the card header.

## Files to Create/Edit

| Action | File |
|--------|------|
| Create | `src/components/admin/PromotionalEmailSender.tsx` |
| Edit | `src/pages/AdminDashboardPage.tsx` (fix rpc type error + add email sender section) |
| Edit | `src/pages/ProductPage.tsx` (fix ReactNode type error) |
| Edit | `src/pages/ProfilePage.tsx` (fix phone type errors after migration) |
| Migration | Add `phone` to profiles, create `promotional_emails` table |

