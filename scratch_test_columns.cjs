const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://mrhmfrwzdrmulfqgpmgj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yaG1mcnd6ZHJtdWxmcWdwbWdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5MzMwNzgsImV4cCI6MjEwMDUwOTA3OH0.11czHevZA0NXb40xfp3PN-8DhIvohTznhaa5D-llPPc';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testColumns() {
  console.log('Fetching columns from course_enrollments...');
  const { data: enrData, error: enrError } = await supabase.from('course_enrollments').select('*').limit(1);
  if (enrError) {
    console.error('course_enrollments error:', enrError);
  } else {
    console.log('course_enrollments row example:', enrData);
  }

  console.log('Fetching columns from demo_requests...');
  const { data: demoData, error: demoError } = await supabase.from('demo_requests').select('*').limit(1);
  if (demoError) {
    console.error('demo_requests error:', demoError);
  } else {
    console.log('demo_requests row example:', demoData);
  }

  console.log('Fetching columns from crm_deals...');
  const { data: crmData, error: crmError } = await supabase.from('crm_deals').select('*').limit(1);
  if (crmError) {
    console.error('crm_deals error:', crmError);
  } else {
    console.log('crm_deals row example:', crmData);
  }
}

testColumns();
