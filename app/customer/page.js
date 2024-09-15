// app/customer/page.js

'use client'; // Add this line to mark the file as a Client Component

import { useEffect, useState } from 'react';

export default function CustomerPage() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Fetch customers data from API
    async function fetchCustomers() {
      const response = await fetch('/api/customer');
      const data = await response.json();
      setCustomers(data);
    }

    fetchCustomers();
  }, []);

  return (
    <div>
      <h1>Customers</h1>
      <ul>
        {customers.map(customer => (
          <li key={customer._id}>
            {customer.name} - {customer.contactInformation}
          </li>
        ))}
      </ul>
    </div>
  );
}
