import { http } from '@/utils/axios';
import { ICustomListPayload, IFeatureItem, IPaginationInfo } from './const';

export async function getFeatureList(payload: ICustomListPayload): Promise<{pagination: IPaginationInfo, records: IFeatureItem[]}> {
    const { data } = await http.get('/v2/rest/fc/featureList', {
        params: {
            ...payload,
        },
        enabledUnversalLoading: false,
    });
    return data;
}
