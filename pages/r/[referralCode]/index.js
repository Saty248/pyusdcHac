import { useEffect } from 'react';
import { useRouter } from 'next/router';

const ReferralCodeRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.query && router.query.referralCode) {
      const referralCode = router.query.referralCode;

      localStorage.setItem('referralCode', referralCode);
    }
  }, [router.query]);
};

export default ReferralCodeRedirect;
