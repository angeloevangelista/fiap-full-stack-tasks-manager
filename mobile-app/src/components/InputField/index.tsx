import { Control, useController } from "react-hook-form";

import * as SC from './styles'

type InputFieldProps = typeof SC.Input.defaultProps & {
  name: string;
  control: Control<any, any>;
};

const InputField: React.FC<InputFieldProps> = ({ name, control, ...rest }) => {
  const { field } = useController({
    name,
    control,
  });

  return (
    <SC.Input value={field.value} onChangeText={field.onChange} {...rest} />
  );
};

export {InputField}
