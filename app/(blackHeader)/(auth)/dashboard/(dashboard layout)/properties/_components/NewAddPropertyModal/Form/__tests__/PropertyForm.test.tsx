import { buildingTypes, energyClasses } from 'kotilogi-app/constants';
import { NewAddPropertyModalTrigger, useAddPropertyModalContext } from '../../NewAddPropertyModal';
import { PropertyForm } from '../PropertyForm';
import { render, screen } from '@testing-library/react';

var component = null;

jest.mock('../../newAddPropertyModal', () => ({
  useAddPropertyModalContext: jest.fn().mockReturnValue({
    property: {},
    updateData: jest.fn(),
  }),
}));

const renderComponent = () => {
  const onChange = jest.fn();
  const onSubmit = jest.fn();
  const id = 'testFormId';

  return render(
    <PropertyForm
      id={id}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

beforeEach(() => {
  component = renderComponent();
});

it('contains the property- target-type input.', () => {
  expect(() => component.getByTestId('target-property-input')).not.toThrow();
});

it('contains the appartment- target type input.', () => {
  expect(() => component.getByTestId('target-appartment-input')).not.toThrow();
});

it('contains the buildYear-input.', () => {
  expect(() => component.getByTestId('buildYear-input')).not.toThrow();
});

describe('Target type set to Kiinteistö', () => {
  beforeEach(() => {
    (useAddPropertyModalContext as jest.Mock).mockReturnValueOnce({
      updateData: jest.fn(),
      property: { targetType: 'Kiinteistö' },
    });

    component = renderComponent();
  });

  test('Mocks useAddPropertyModalContext properly', () => {
    expect(useAddPropertyModalContext().property.targetType).toBe('Kiinteistö');
  });

  it('contains the propertyNumber input.', () => {
    expect(() => component.getByTestId('propertyNumber-input')).not.toThrow();
  });
  /*
  it('does not contain the appartment-number input.', () => {
    expect(() => component.getByTestId('appartmentNumber-input')).toThrow();
  });*/
});

/*
describe('Target type set to Huoneisto', () => {
  beforeEach(() => {
    (useAddPropertyModalContext as jest.Mock).mockReturnValueOnce({
      updateData: jest.fn(),
      property: { targetType: 'Huoneisto' },
    });

    expect(useAddPropertyModalContext().property.targetType).toBe('Huoneisto');
  });

  it('does not contain the propertyNumber input.', () => {
    expect(() => component.getByTestId('propertyNumber-input')).toThrow();
  });

  it('does contain the appartment-number input.', () => {
    expect(() => component.getByTestId('appartmentNumber-input')).not.toThrow();
  });
});
*/
it('contains all buildingType-inputs as radio-elements.', () => {
  buildingTypes.forEach(type => {
    const testId = `${type}-input`;

    expect(() => component.getByTestId(testId)).not.toThrow();
    expect(component.getByTestId(testId)).toHaveAttribute('type', 'radio');
  });
});

it('contains all energyClass-inputs as radio-elements.', () => {
  energyClasses.forEach(type => {
    const testId = `${type}-input`;

    expect(() => component.getByTestId(testId)).not.toThrow();
    expect(component.getByTestId(testId)).toHaveAttribute('type', 'radio');
  });
});
