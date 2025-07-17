const fs = require('fs');
const path = require('path');

// Read the CSV file
const csvPath = path.join(__dirname, 'public', 'guest-list.csv');
const csvContent = fs.readFileSync(csvPath, 'utf8');

// Split into lines and process
const lines = csvContent.split('\n');
const header = lines[0];
const dataLines = lines.slice(1).filter(line => line.trim());

// Process each data line to add inviteLink
const updatedLines = dataLines.map(line => {
  if (!line.trim()) return line;
  
  const parts = line.split(',');
  const uuid = parts[0];
  
  // Add inviteLink if not already present
  if (parts.length === 3) {
    const inviteLink = `https://pamiandelias.party?inviteeId=${uuid}`;
    return `${line},${inviteLink}`;
  }
  
  return line;
});

// Combine header and updated lines
const updatedCsv = [header, ...updatedLines, ''].join('\n');

// Write back to file
fs.writeFileSync(csvPath, updatedCsv);

console.log('CSV updated with invite links!');