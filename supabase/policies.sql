-- First, clean up any potential remnants and handle dependencies
DROP TABLE IF EXISTS user_progress CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Create the profiles table with proper constraints
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    avatar_url TEXT,
    onboarding_completed BOOLEAN DEFAULT FALSE NOT NULL,
    onboarding_step INTEGER DEFAULT 1 NOT NULL CHECK (onboarding_step BETWEEN 1 AND 7),
    onboarding_data JSONB DEFAULT '{}'::JSONB
);

-- Create the user_progress table
CREATE TABLE user_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    lesson_id INTEGER NOT NULL,
    progress INTEGER DEFAULT 0 NOT NULL,
    completed BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    UNIQUE(user_id, lesson_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Create an update trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for both tables
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_progress_updated_at
    BEFORE UPDATE ON user_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create policies for profiles
CREATE POLICY "Enable insert for signup" ON profiles
    FOR INSERT TO authenticated, anon
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Create policies for user_progress
CREATE POLICY "Users can view own progress" ON user_progress
    FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON user_progress
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON user_progress
    FOR UPDATE TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Grant permissions for both tables
GRANT ALL ON profiles TO authenticated;
GRANT ALL ON profiles TO anon;
GRANT ALL ON profiles TO service_role;

GRANT ALL ON user_progress TO authenticated;
GRANT ALL ON user_progress TO service_role;

-- Reset the identity sequences if they exist
ALTER SEQUENCE IF EXISTS profiles_id_seq RESTART WITH 1; 