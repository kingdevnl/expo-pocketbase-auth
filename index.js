import 'react-native-url-polyfill/auto';

import EventSource from "react-native-sse";
global.EventSource = EventSource;

import registerRootComponent from 'expo/build/launch/registerRootComponent';
import App from './App';
registerRootComponent(App);
