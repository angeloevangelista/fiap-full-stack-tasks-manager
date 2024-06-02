import React, { ReactElement } from 'react';

import * as SC from './styles';

type ChipProps = {
  selected?: boolean;
  icon: ReactElement;
  text: string;
  onPress?: () => void;
};

const Chip: React.FC<ChipProps> = ({ icon, text, selected, onPress }) => {
  return (
    <SC.Container $selected={selected} onPress={onPress}>
      {icon}
      <SC.Text>{text}</SC.Text>
    </SC.Container>
  );
};

export { Chip };
