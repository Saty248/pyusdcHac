import React, { useEffect, useState } from 'react'
import useAuth from './useAuth';
import { PersonalInformationType } from '@/types';
import UserService from '@/services/UserService';

const useKycStatusId = () => {
    const { user, web3authStatus } = useAuth();
    const { getUser } = UserService();
    const { signIn } = useAuth();

    const [personalInformation, setPersonalInformation] = useState<PersonalInformationType>({
      name: "",
      email: "",
      phoneNumber: "",
      newsletter: false,
      KYCStatusId: 0,
    });

    const handleKyc = async () => {
        if (!user) return;

      const { name, email, phoneNumber, newsletter, KYCStatusId } = user;

        let id = KYCStatusId

        if(id !== 0){
            const responseData = await getUser();

          if(responseData.KYCStatusId){
            id = responseData.KYCStatusId

            if(id !== user.KYCStatusId){
                localStorage.setItem("user", JSON.stringify(responseData));
                signIn({ user: responseData })
            }
          }
        
        setPersonalInformation({
          name,
          email,
          phoneNumber,
          newsletter,
          KYCStatusId: id,
        });
     }
    }

   useEffect(() => {
      handleKyc()
    }, [user, web3authStatus]);

  return {personalInformation, setPersonalInformation}
}

export default useKycStatusId
