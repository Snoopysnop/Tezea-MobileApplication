import { StackNavigationProp } from '@react-navigation/stack';
import { WorkSiteAndRequestAPI } from '../api/Model';

export type RootStackParamList = {
  WorkSiteList: undefined;
  WorkSiteInfo: undefined;
  WorkSiteInProgress: undefined
  ValidationScreen: undefined
};

export type WorkSiteListNavigationProp = StackNavigationProp<RootStackParamList, 'WorkSiteList'>;
export type WorkSiteInfoNavigationProp = StackNavigationProp<RootStackParamList, 'WorkSiteInfo'>;
export type WorkSiteWorkInProgressNavigationProp = StackNavigationProp<RootStackParamList, 'WorkSiteInProgress'>;
export type ValidationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ValidationScreen'>;



