import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  WorkSiteList: undefined;
  WorkSiteInfo: undefined;
};

export type WorkSiteListNavigationProp = StackNavigationProp<RootStackParamList, 'WorkSiteList'>;
export type WorkSiteInfoNavigationProp = StackNavigationProp<RootStackParamList, 'WorkSiteInfo'>;
