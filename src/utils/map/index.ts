import opencage from 'opencage-api-client';

interface GetCoordinatesOptions {
    countryCode: string;
    postalCode: string;
}

export const getCoordinates = async (options: GetCoordinatesOptions): Promise<[number, number]> => {

    const {results} = await opencage.geocode({q: options.postalCode, countrycode: options.countryCode});
    const res = results.reduce((acc:any, cur:any) => {
        if(cur.confidence > acc.confidence){ // TODO needs better implementation when the hosts functionality is added to API
            return cur;
        }
        return acc;
    }, results[0])
    return [res.geometry.lng as number, res.geometry.lat as number]
}
