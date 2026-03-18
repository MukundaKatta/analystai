-- AnalystAI Database Schema
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS profiles (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), email TEXT UNIQUE NOT NULL, full_name TEXT, created_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE IF NOT EXISTS projects (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT NOT NULL, description TEXT, user_id UUID REFERENCES profiles(id) ON DELETE CASCADE, created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE IF NOT EXISTS documents (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), project_id UUID REFERENCES projects(id) ON DELETE CASCADE, name TEXT NOT NULL, file_path TEXT, content TEXT, embedding vector(1536), status TEXT DEFAULT 'uploaded', metadata JSONB DEFAULT '{}', created_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE IF NOT EXISTS questions (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), project_id UUID REFERENCES projects(id) ON DELETE CASCADE, question TEXT NOT NULL, "order" INTEGER DEFAULT 0, created_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE IF NOT EXISTS analysis_cells (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), project_id UUID REFERENCES projects(id) ON DELETE CASCADE, document_id UUID REFERENCES documents(id) ON DELETE CASCADE, question_id UUID REFERENCES questions(id) ON DELETE CASCADE, answer TEXT, citation TEXT, confidence FLOAT DEFAULT 0, status TEXT DEFAULT 'empty', created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(), UNIQUE(document_id, question_id));

CREATE TABLE IF NOT EXISTS charts (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), project_id UUID REFERENCES projects(id) ON DELETE CASCADE, name TEXT NOT NULL, type TEXT NOT NULL, config JSONB DEFAULT '{}', created_at TIMESTAMPTZ DEFAULT NOW());

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE analysis_cells ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users own projects" ON projects FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users access project docs" ON documents FOR ALL USING (project_id IN (SELECT id FROM projects WHERE user_id = auth.uid()));
CREATE POLICY "Users access project questions" ON questions FOR ALL USING (project_id IN (SELECT id FROM projects WHERE user_id = auth.uid()));
CREATE POLICY "Users access project cells" ON analysis_cells FOR ALL USING (project_id IN (SELECT id FROM projects WHERE user_id = auth.uid()));
