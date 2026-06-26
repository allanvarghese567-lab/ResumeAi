import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface DatabaseResume {
  id: string;
  user_id: string;
  title: string;
  template: string;
  data: Record<string, any>;
  completeness: number;
  ats_score: number | null;
  created_at: string;
  updated_at: string;
}

// Resume operations
export const resumeDB = {
  async create(userId: string, title: string, template: string) {
    const { data, error } = await supabase
      .from('resumes')
      .insert([
        {
          user_id: userId,
          title,
          template,
          data: {},
          completeness: 0,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async get(resumeId: string) {
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('id', resumeId)
      .single();

    if (error) throw error;
    return data;
  },

  async getAll(userId: string) {
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async update(resumeId: string, updates: Record<string, any>) {
    const { data, error } = await supabase
      .from('resumes')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', resumeId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(resumeId: string) {
    const { error } = await supabase.from('resumes').delete().eq('id', resumeId);

    if (error) throw error;
  },

  async duplicate(resumeId: string, newTitle: string) {
    const resume = await this.get(resumeId);
    return this.create(resume.user_id, newTitle, resume.template);
  },
};
