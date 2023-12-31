import React, { useEffect, useMemo, useState } from 'react';
import PackageType from '../interfaces/PackageType';
import authorizedFetch from '../helpers/fetchWrapper';
import { useNavigate } from 'react-router';
import NavBar from '../components/NavBar';

const SubscriptionPackages: React.FC<{ showToast: (toast: { type: 'success' | 'error'; message: string }) => void }> = ({
  showToast,
}) => {
  const [packages, setPackages] = useState<PackageType[]>([]);
  const [isUpdate, setIsUpdate] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPackages() {
      try {
        // Todo:: Need add pagination 
        const { response, status } = await authorizedFetch('http://localhost:3000/service');
        const data = await response.json();
        console.log(`fetch services `, data);
        setPackages(data);
      } catch (error) {
        navigate('/login')
        console.error('Error fetching packages:', error);
      }
    }
    fetchPackages();
  }, [isUpdate]);

  async function subscribe(serviceId: number) {

    try {
      const options: RequestInit = {
        method: 'post',
        body: JSON.stringify({ serviceId, })
      };
      const { response, status } = await authorizedFetch('http://localhost:3000/subscribe', options);
      if (status === 409) {
        showToast({ type: 'error', message: 'Already subscribed' });
      } else if (status === 201) {
        setIsUpdate(Math.random());
        showToast({ type: 'success', message: 'Subscribed successfully' });
      } else {
        showToast({ type: 'error', message: 'Subscription failed' });
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
      const { response, status } = await authorizedFetch('http://localhost:3000/unsubscribe', options);
      if (status === 409) {
        showToast({ type: 'error', message: 'Already unsubscribed' });
      } else if (status === 201) {
        setIsUpdate(Math.random());
        showToast({ type: 'success', message: 'Unsubscribed successfully' });
      } else {
        showToast({ type: 'error', message: 'Unsubscribed failed' });
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  }

  const subBtnClickHandler = (serviceId: number) => {
    subscribe(serviceId)
  }

  const unsubBtnClickHandler = (subsciribeId: number) => {
    unsubscribe(subsciribeId)
  }

  const buttons = useMemo(() => (subscriptionPackage: any) => {
    const { subscribes, _id } = subscriptionPackage;
    if (subscribes && subscribes.length > 0 && subscribes[0].action === "SUBSCRIBED") {
      return (<button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        onClick={(e) => unsubBtnClickHandler(subscribes[0]._id)} > Unsubscribe </button>);
    }
    else {
      return (<button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2"
        onClick={(e) => subBtnClickHandler(_id)} > Subscribe </button>);
    }
  }, []);

  return (
    <>
      <NavBar />
      <div className="bg-gray-100 py-8">
        <h2 className="text-2xl font-semibold text-center mb-4">Subscription Packages</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4">
          {packages.map((subscriptionPackage) => (
            <div key={subscriptionPackage._id} className="bg-white rounded shadow p-4">
              <h3 className="text-lg font-semibold mb-2">{subscriptionPackage?.name}</h3>
              <p className="text-gray-500">{subscriptionPackage?.description}</p>
              {buttons(subscriptionPackage)}
            </div>
          ))}
        </div>
      </div>
    </>

  );
};

export default SubscriptionPackages;
