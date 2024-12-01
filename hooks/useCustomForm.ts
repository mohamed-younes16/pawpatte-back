import { useState, useEffect } from 'react';
import { useForm, UseFormProps, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface UseCustomFormProps<T extends FieldValues> extends Omit<UseFormProps<T>, 'resolver'> {
  schema: z.ZodType<T>;
  onSubmit: (values: T) => Promise<void>;
}

export function useCustomForm<T extends FieldValues>({
  schema,
  onSubmit,
  ...formProps
}: UseCustomFormProps<T>) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<T>({
    ...formProps,
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    setIsLoading(form.formState.isSubmitting);
  }, [form.formState.isSubmitting]);

  const handleSubmit = async (values: T) => {
    try {
      setIsLoading(true);
      await onSubmit(values);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    handleSubmit: form.handleSubmit(handleSubmit),
  };
}
