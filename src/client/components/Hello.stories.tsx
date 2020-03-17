import React from 'react';
import { storiesOf } from '@storybook/react';
import { Hello } from './Hello';

const propsOne = { compiler: 'TypeScript', framework: 'React' };
const propsTwo = { compiler: 'CofeeScript', framework: 'Vue' };

storiesOf('Hello', module)
  .addDecorator((story) => <div style={{ padding: '3rem' }}>{story()}</div>)
  .add('Story one', () => <Hello {...propsOne} />)
  .add('Story two', () => <Hello {...propsTwo} />);
