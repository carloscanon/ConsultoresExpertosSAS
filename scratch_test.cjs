const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://mrhmfrwzdrmulfqgpmgj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yaG1mcnd6ZHJtdWxmcWdwbWdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5MzMwNzgsImV4cCI6MjEwMDUwOTA3OH0.11czHevZA0NXb40xfp3PN-8DhIvohTznhaa5D-llPPc';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function runTest() {
  console.log('Inserting test resource...');
  const testId = 'test-res-' + Date.now();
  const { data, error } = await supabase
    .from('blog_resources')
    .insert([{
      id: testId,
      title: 'Recurso de Prueba',
      category: 'video',
      read_time: '15 Minutos',
      summary: 'https://youtube.com',
      ai_summary: 'Descripción de prueba',
      author: 'Tester',
      author_role: 'Admin',
      date: '25/07/2026',
      is_published: true
    }]);

  if (error) {
    console.error('FAIL TO INSERT:', error);
  } else {
    console.log('SUCCESS INSERT:', data);
    
    // Now delete it
    const { error: delError } = await supabase
      .from('blog_resources')
      .delete()
      .eq('id', testId);
    console.log('DELETE TEST STATUS:', delError ? delError : 'Success delete');
  }
}

runTest();
