export function exportToCSV<T>(data: T[], filename: string) {
  if (!data.length) return;

  // Get headers from the first object's keys
  const headers = Object.keys(data[0] as object);
  
  // Convert data to CSV format
  const csvContent = [
    // Headers row
    headers.join(','),
    // Data rows
    ...data.map(row => 
      headers.map(header => {
        const cell = row[header as keyof T];
        // Handle cells that might contain commas or quotes
        const cellStr = String(cell).replace(/"/g, '""');
        return cellStr.includes(',') ? `"${cellStr}"` : cellStr;
      }).join(',')
    )
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
} 