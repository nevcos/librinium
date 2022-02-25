import React from 'react';

// esbuild converts JSX into React.createElement, without really importing it
// This injects Reacts to every tests
global.React = React;
