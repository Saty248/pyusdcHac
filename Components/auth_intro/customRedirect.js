

function customRedirect(router){
    
    const initialAirspaceData=localStorage.getItem('airSpaceData');
    const initialRentData=localStorage.getItem('rentData');
    if(initialAirspaceData?.length>2){
      router.replace("/homepage/airspace2");
    }else if(initialRentData?.length>2){
      router.replace("/homepage/rent");
    }
    else{
      router.replace("/homepage/dashboard2");
    }
}
export default customRedirect;