import { Text, type TextProps, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});

type ThemedTextProps = TextProps & {
  color?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

const ThemedText: React.FC<ThemedTextProps> = ({
  type = 'default',
  color,
  style,
  ...rest
}) => {
  const theme = useTheme();

  return (
    <Text
      {...rest}
      style={[
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        {
          color: color ?? theme.text,
        },
        style,
      ]}
      {...rest}
    />
  );
};

export { ThemedText };
