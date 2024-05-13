
function removeFromLocalStorage(key,user){
    let initialData=localStorage.getItem(key)
    if(initialData.length>2 && user?.blockchainAddress){
    localStorage.removeItem(key)
    }
}
module.exports={removeFromLocalStorage}