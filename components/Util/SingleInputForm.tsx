'use client';

import React, { createContext, useContext, useId, useState } from 'react';

const SingleInputFormContext = createContext<any>(null);

type SingleInputFormProps = React.ComponentProps<'form'> & {
  editingEnabled?: boolean;
};

/**
 * Wraps a form that takes a single input, passed within a SingleInputFormProvider.Input.
 * It provides built-in functionality to submit the data through a dedicated button, passed within The SingleInputFormProvider.SubmitButton.
 * */
export function SingleInputForm({ children, editingEnabled = true, ...props }: SingleInputFormProps) {
  const [value, setValue] = useState(undefined);
  const formId = useId();

  const updateValue = (value: TODO) => {
    setValue(value);
  };

  return (
    <SingleInputFormContext.Provider value={{ value, formId, updateValue, editingEnabled }}>
      <form {...props} id={formId}>
        {children}
      </form>
    </SingleInputFormContext.Provider>
  );
}

/**The input element used to get data. Accepts a single input, textarea or select element as a child.
 * Internally passes an onInput-handler to the child. If the child already has one, that is called first.
 */
SingleInputForm.Input = function ({ children }) {
  if (React.Children.count(children) !== 1) {
    throw new Error('The SingleInputForm.Input must have exactly one child!');
  }

  const { updateValue } = useSingleInputFormContext();

  return React.Children.map(children as React.ReactElement, child => {
    if (child.type !== 'input' && child.type !== 'textarea' && child.type !== 'select') {
      //throw new Error('Only input, textarea or select elements can be passed into a SingleInputFormProvider.Input!');
    }

    return React.cloneElement(child, {
      ...child.props,
      onInput: e => {
        if (child.props.onInput) {
          child.props.onInput(e);
        }

        updateValue(e.target.value);
      },
    });
  });
};

/**The button used to submit the form data. Internally passes the form id and a submit-type to the child. */
SingleInputForm.SubmitButton = function ({ children }) {
  const { formId } = useSingleInputFormContext();
  return React.Children.map(children as React.ReactElement, child => {
    return React.cloneElement(child, {
      ...child.props,
      form: formId,
      type: 'submit',
    });
  });
};

function useSingleInputFormContext() {
  const ctx = useContext(SingleInputFormContext);
  if (!ctx) throw new Error('useSingleInputFormProviderContext can only be used within the scope of a SingleInputFormProviderContext!');
  return ctx;
}
