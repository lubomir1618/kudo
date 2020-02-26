import React from 'react';
import { storiesOf } from '@storybook/react';
import { Hello } from './Hello';

const propsOne = { framework: 'React', compiler: 'TypeScript' };
const propsTwo = { framework: 'Vue', compiler: 'CofeeScript' };

storiesOf('Hello', module)
  .addDecorator((story) => <div style={{ padding: '3rem' }}>{story()}</div>)
  .add('Story one', () => <Hello {...propsOne} />)
  .add('Story two', () => <Hello {...propsTwo} />);
