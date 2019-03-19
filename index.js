/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import NewEntry from './NewEntry'
import ViewEntry from './ViewEntry'
import ViewMain from './ViewMain'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => ViewMain);
