import * as React from 'react';
<<<<<<< HEAD
import './knight.css';

=======
import './knight.css'
>>>>>>> kudo knight add some normal styling
export interface Props {
  mostKudos: string;
}

export const Knight = (props: Props) => (
  <div className="kudoKnight">
    <div>
      <img src="img/007-crusader.png" />
    </div>
    <div className="kudoKnight__content">
      <h3>Kudo Knight</h3>
      <h2>{props.mostKudos}</h2>
    </div>
  </div>
);
