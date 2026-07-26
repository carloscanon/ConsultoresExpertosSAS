const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://mrhmfrwzdrmulfqgpmgj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yaG1mcnd6ZHJtdWxmcWdwbWdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5MzMwNzgsImV4cCI6MjEwMDUwOTA3OH0.11czHevZA0NXb40xfp3PN-8DhIvohTznhaa5D-llPPc';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testDemo() {
  console.log('Inserting test demo request...');
  const { data, error } = await supabase
    .from('demo_requests')
    .insert([{
      full_name: 'Lead Tester',
      email: 'lead@example.com',
      phone: '12345',
      company: 'Lead Co',
      role: 'Lead Developer',
      topic_of_interest: 'GovData Nexus',
      preferred_schedule: 'Tarde',
      interests: ['demo'],
      message: 'Hello',
      status: 'Nuevo Lead'
    }]);

  if (error) {
    console.error('Demo requests Insert Error:', error);
  } else {
    console.log('Demo requests Insert Success!', data);
  }
}

testDemo();
