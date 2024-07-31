import React, { useState } from 'react';
import ActivitiesList from '../ActivitiesList';


const ReferralActivities: React.FC = () => {
  const [showActivities, setShowActivities] = useState(false);
  return (
    <div className="mt-4 md:mt-0 w-full md:w-[55%] px-4 md:px-[44px]">
    <div className=" py-2 px-4 md:px-[15px] rounded-[30px] bg-white gap-4 md:gap-[15px] w-full shadow-xl" style={{ boxShadow: "0px 12px 34px -10px #3A4DE926" }}>
      <div className=" py-2">
        <h3 className="text-xl font-semibold">Use my SKY Points</h3>
    
          <div className="flex items-center py-3 gap-4 w-full">
          
               <div className="flex items-center  w-[32%]">
                <span className="bg-gray-200  h-[66px] w-full flex items-center justify-center "></span>
                </div>

                <div className="flex items-center  w-[32%]">
                <span className="bg-gray-200  h-[66px] w-full  flex items-center justify-center "></span>
                
                </div>

                <div className="flex items-center w-[32%]">
                <span className="bg-gray-200  h-[66px] w-full  flex items-center justify-center "></span>
                </div>
          </div>
          <div className="container mx-auto p-4 relative">
            { showActivities ? (
              <ActivitiesList onBack={() => setShowActivities(false)} />
            ) : (
              <div className="flex justify-end mt-2">
                <button
                  className="text-blue-600 font-semibold hover:underline"
                  onClick={() => {
                    setShowActivities(true);
                  }}
                >
                  View full list of activities
                </button>
              </div>
            )}
          </div>
      </div>
    </div>
    </div>
  );
};

export default ReferralActivities;
