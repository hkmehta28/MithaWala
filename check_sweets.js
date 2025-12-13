
async function checkSweets() {
  const PORT = 4000;
  console.log(`Checking sweets on PORT ${PORT}...`);
  try {
    const res = await fetch(`http://127.0.0.1:${PORT}/api/sweets`);
    const data = await res.json();
    console.log(`Total Sweets Found: ${data.length}`);
    console.log('Sample names:', data.map(s => s.name).slice(0, 5));
    
    // Check categories
    const categories = {};
    data.forEach(s => {
        categories[s.category] = (categories[s.category] || 0) + 1;
    });
    console.log('Counts by Category:', categories);

  } catch (e) {
    console.error('Failed to fetch sweets:', e.message);
  }
}
checkSweets();
