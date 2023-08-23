import React, { useEffect, useState } from 'react';
import PackageType from '../interfaces/PackageType';
import authorizedFetch from '../helpers/fetchWrapper';

const SubscriptionPackages: React.FC = () => {
  const [packages, setPackages] = useState<PackageType[]>([]);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const response = await authorizedFetch('http://localhost:3000/service');
        const data = await response.json();
        setPackages(data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    }

    fetchPackages();
  }, []);

  return (
    <div>
      <h2>Subscription Packages</h2>
      <ul>
        {packages.map((subscriptionPackage) => (
          <li key={subscriptionPackage._id} > {subscriptionPackage?.name} </li>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionPackages;
