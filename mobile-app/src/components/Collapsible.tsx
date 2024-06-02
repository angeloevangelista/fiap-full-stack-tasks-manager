import { PropsWithChildren, useState } from 'react';
import { useTheme } from 'styled-components';
import IonIcons from '@expo/vector-icons/Ionicons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText,  } from './ThemedText';

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});

type CollapsibleProps = PropsWithChildren & { title: string };

const Collapsible: React.FC<CollapsibleProps> = ({ children, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  return (
    <View>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <IonIcons
          name={isOpen ? 'chevron-down' : 'chevron-forward-outline'}
          size={18}
          color={theme.primary}
        />
        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </TouchableOpacity>
      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
};

export { Collapsible };
