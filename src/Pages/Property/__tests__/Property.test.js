import renderer from 'react-test-renderer';
import Property from '../Property';

test('Testing the tests', () => {
    const component = renderer.create(
        <Property/>
    ).toJSON();

    expect(component).toBeDefined();
});