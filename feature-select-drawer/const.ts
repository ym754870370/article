export interface IPaginationInfo {
    page: number;
    size: number;
    recordsTotal: number;
}

export interface ICustomListPayload {
    page: number;
    size: number;
    favoriteOnly: boolean;
    showMeOnly: boolean;
    globalSearch?: string;
}

export interface IFeatureItem {
    id: number;
    featureKey: string;
    featureName: string;
    description: string;
    defaultValue: string;
}

export const USER_PORTRAIT_RESULT_SELECTED_KEY = 'USER_PORTRAIT_RESULT_SELECTED';
