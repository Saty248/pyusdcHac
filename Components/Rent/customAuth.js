

const logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    router.push('/auth/join');
  }
  const customAuth=(router,user,web3auth)=>{
    const loadingStates = ["connecting", "not_ready"];
    const nonLoadingStates = ["disconnected", "errored"];
  
    if (!web3auth){
      router.push("/auth/join");
    }
  
    if (loadingStates.includes(web3auth.status)) return;
    if (nonLoadingStates.includes(web3auth.status)) {
        console.log('entered logout phase ')
        logout();
        return;
    }
  
    if (web3auth?.status === "ready") {
      const fetchedToken = JSON.parse(localStorage.getItem('openlogin_store'));
      console.log({fetchedToken})
      if (!fetchedToken?.sessionId) {     
          router.push("/auth/join");
        return;
        } 
    }
  }
  export default customAuth