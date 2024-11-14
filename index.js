/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import zipy from 'zipy-react-native';
// import zipy from 'zipyai-react-native';

zipy.init('6d2b9556');
import * as Sentry from '@sentry/react-native';

// Sentry.init({
//   dsn: "https://3aca528daae3c37bea157a5045a6b400@o4507888853647360.ingest.de.sentry.io/4507888857382992",
//   attachViewHierarchy: true,
//   _experiments: {
//     replaysSessionSampleRate: 1.0,
//     replaysOnErrorSampleRate: 1.0,
//     profilesSampleRate: 1.0,
//   },
//   attachScreenshot: true,
//   enableNdkScopeSync: true,
//   debug: true,
//   integrations: [
//     Sentry.mobileReplayIntegration(
//         {
//             maskAllText: false,
//             maskAllImages: false,
//             maskAllVectors: false,
//           }
//     ),
//   ],
// });

import { withGestureCapture } from 'zipy-react-native';
// import { withGestureCapture } from 'zipyai-react-native';

const MyApp = () => {
    return (
      // <Sentry.TouchEventBoundary>
        <App />
      // </Sentry.TouchEventBoundary>
    );
  };
AppRegistry.registerComponent(appName, () => withGestureCapture(MyApp));
