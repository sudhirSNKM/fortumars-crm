# Fortumars CRM - Setup Instructions

## 🚀 Authentication & Database Setup

### 1. Supabase Configuration

Your Supabase URL is already configured: `https://gjthhdvxvccehgcbauab.supabase.co`

#### Get your Supabase Keys:
1. Go to https://app.supabase.com/project/gjthhdvxvccehgcbauab/settings/api
2. Copy your `anon/public` key
3. Create a `.env` file in the project root:

```env
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_ADMIN_PHONE=+1234567890
```

### 2. Database Setup

Run these SQL commands in your Supabase SQL Editor (https://app.supabase.com/project/gjthhdvxvccehgcbauab/editor):

```sql
-- Create user_registrations table
CREATE TABLE user_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  role TEXT,
  industry TEXT,
  team_size TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(email)
);

-- Enable Row Level Security
ALTER TABLE user_registrations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to insert their own data
CREATE POLICY "Users can insert own registration"
  ON user_registrations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to read their own data
CREATE POLICY "Users can view own registration"
  ON user_registrations FOR SELECT
  USING (auth.uid() = user_id);

-- Create admin table for phone notifications
CREATE TABLE admin_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_phone TEXT NOT NULL,
  notification_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert admin phone number
INSERT INTO admin_settings (admin_phone) VALUES ('+1234567890');
```

### 3. Admin Notification Setup (Optional - SMS/WhatsApp)

To send notifications to admin when new users register, you have two options:

####  Option A: Supabase Edge Function (Recommended)

Create an Edge Function in Supabase:

```bash
supabase functions new notify-admin
```

Then add this code to handle notifications via Twilio/SendGrid/etc.

#### Option B: Database Webhook

1. Go to https://app.supabase.com/project/gjthhdvxvccehgcbauab/database/hooks
2. Create a webhook that triggers on `user_registrations` INSERT
3. Send POST request to your notification service (Twilio, etc.)

### 4. Update Navigation Links

The login/signup pages are created, but you need to update the navigation buttons:

**In `src/components/landing/Navbar.tsx`**: 
- Line 73-75: Wrap "Sign In" button with `<Link to="/login">`
- Line 76-78: Wrap "Get Started Free" button with `<Link to="/signup">`
- Line 138-140: Wrap mobile "Sign In" button with `<Link to="/login">`  
- Line 141-143: Wrap mobile "Get Started Free" button with `<Link to="/signup">` 

**In `src/components/landing/CTASection.tsx`**:
- Line 74-80: Wrap "Get Started Free" button with `<Link to="/signup">`
- Line 81-88: Wrap "Schedule a Demo" button with `<Link to="/signup">`

### 5. Run the Project

```bash
npm install
npm run dev
```

## 📧 Features Implemented

✅ Login page (`/login`)
✅ Signup page with 2-step form (`/signup`)
✅ Supabase authentication integration
✅ User registration data storage  
✅ Admin notification system (requires setup)
✅ Responsive, premium UI with Fortumars branding

## 🔐 Security Notes

- RLS (Row Level Security) is enabled on all tables
- Users can only view/edit their own data
- Admin phone number stored securely in database
- Environment variables for sensitive data

## 📱 Admin Notifications

When a user signs up, their details will be sent to the admin phone number configured in `.env` or the database. You need to:

1. Choose a notification service (Twilio for SMS, SendGrid for email, etc.)
2. Set up the webhook or Edge Function
3. Configure the service API keys

## Need Help?

Check the Supabase documentation: https://supabase.com/docs
