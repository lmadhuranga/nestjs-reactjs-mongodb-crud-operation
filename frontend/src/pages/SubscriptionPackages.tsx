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

  async function subscribe(serviceId: number) {
    console.log(`serviceId`, serviceId);
    try {
      const options: RequestInit = {
        method: 'post',
        body: JSON.stringify({ serviceId, })
      };
      const response = await authorizedFetch('http://localhost:3000/subscribe', options);
      const data: { status: string } = await response.json();
      if (data.status === 'OK') {
        alert('Subcribed succesfully')
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  }

  async function unsubscribe(subscriptionId: number) {
    try {
      const options: RequestInit = { 
        method: 'post',
        body: JSON.stringify({ subscriptionId })
      };
      const response = await authorizedFetch('http://localhost:3000/unsubscribe', options);
      const data: { status: string } = await response.json();
      if (data.status === 'OK') {
        alert('Unsubcribed succesfully')
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  }

  const subBtnClickHandler = (serviceId: number) => {
    subscribe(serviceId)
  }

  const unsubBtnClickHandler = (serviceId: number) => {
    unsubscribe(serviceId)
  }

  const buttons = (id: number) => (
    <>
      <button onClick={(e) => subBtnClickHandler(id)}>Sub</button>
      < button onClick={(e) => unsubBtnClickHandler(id)}> Unsub</button >
    </>
  )


  return (
    <div>
      <h2>Subscription Packages</h2>
      <ul>
        {packages.map((subscriptionPackage) => (
          <li key={subscriptionPackage._id} > {subscriptionPackage?.name} {buttons(subscriptionPackage._id)} </li>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionPackages;
