import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

interface IconProps {
  color: string;
  size: number;
}

export const HomeIcon = ({ color, size }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V10.5Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ProfileIcon = ({ color, size }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={7} r={4} stroke={color} strokeWidth={1.8} />
    <Path
      d="M4 21C4 17.134 7.58172 14 12 14C16.4183 14 20 17.134 20 21"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  </Svg>
);
