import React from 'react';
import type { UseFormReturn, FieldValues } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';

type Props<T extends FieldValues> = {
  children: React.ReactNode;
  methods: UseFormReturn<T>;
};

const ReactHookFormProvider = <T extends FieldValues>({
  children,
  methods,
}: Props<T>) => {
  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default ReactHookFormProvider;
