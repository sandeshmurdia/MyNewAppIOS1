/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import zipy from 'zipy-react-native';

import { withGestureCapture } from 'zipy-react-native';

const MyApp = () => {
    return (
        <App />
    );
  };
AppRegistry.registerComponent(appName, () => withGestureCapture(MyApp));
