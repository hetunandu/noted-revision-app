import {
  GoogleAnalyticsTracker,
  GoogleTagManager,
  GoogleAnalyticsSettings
} from 'react-native-google-analytics-bridge';


if (__DEV__) {
  GoogleAnalyticsSettings.setDryRun(true);
}

export let tracker = new GoogleAnalyticsTracker('UA-73405679-1');
