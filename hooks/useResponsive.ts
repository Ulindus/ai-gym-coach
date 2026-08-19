import { useWindowDimensions } from 'react-native';

export function useResponsive() {
  const { width, height } = useWindowDimensions();

  const isSmall = width < 360;
  const isTablet = width >= 768;

  const horizontalPadding = isTablet ? 40 : isSmall ? 16 : 20;

  return {
    width,
    height,
    isSmall,
    isTablet,
    horizontalPadding,
  };
}