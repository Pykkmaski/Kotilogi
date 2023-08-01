import TestRenderer from 'react-test-renderer';
import Property from '../Property';

test('testing the test', () => {
   const renderer = TestRenderer.create(<Property/>);
   const testInstance = renderer.root;

   expect(testInstance.findByType())
});