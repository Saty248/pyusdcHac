export const claimAirspaceProperty = async (claimProperty: any, data: PropertyData, coordinates: any, user: any, setShowFailurePopUp: (value: boolean) => void, setShowSuccessPopUp: (value: boolean) => void, setShowClaimModal: (value: boolean) => void, setIsLoading: (value: boolean) => void, setData: (data: any) => void, setClaimButtonLoading: (value: boolean) => void, toast: any, defaultData: any) => {
    try {
        setClaimButtonLoading(true);
        const {
            address,
            name,
            hasChargingStation,
            hasLandingDeck,
            hasPlanningPermission,
            hasStorageHub,
            rent,
            timezone,
            transitFee,
            noFlyZone,
            isFixedTransitFee,
            weekDayRanges,
        } = data;
        let { latitude, longitude } = coordinates;
        latitude = Number(latitude);
        longitude = Number(longitude);

        if (!name) return;

        const postData = {
            address,
            ownerId: user.id,
            propertyStatusId: 0,
            hasChargingStation,
            hasLandingDeck,
            hasStorageHub,
            isRentableAirspace: rent,
            title: name,
            transitFee,
            noFlyZone,
            isFixedTransitFee,
            latitude,
            longitude,
            timezone,
            isActive: hasPlanningPermission,
            vertexes: [
                { latitude: latitude + 0.0001, longitude: longitude + 0.0001 },
                { latitude: latitude + 0.0001, longitude: longitude - 0.0001 },
                { latitude: latitude - 0.0001, longitude: longitude + 0.0001 },
                { latitude: latitude - 0.0001, longitude: longitude - 0.0001 },
            ],
            weekDayRanges,
        };

        const responseData = await claimProperty({ postData });

        if (!responseData) setShowFailurePopUp(true);
        else setShowSuccessPopUp(true);

        setShowClaimModal(false);
        setIsLoading(false);
        setData({ ...defaultData });
    } catch (error) {
        console.error(error);
        toast.error("Error when creating property.")
    } finally {
        setClaimButtonLoading(false);
    }
};
