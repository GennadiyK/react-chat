import red from '@material-ui/core/colors/red';
import pink from '@material-ui/core/colors/pink';
import purple from '@material-ui/core/colors/purple';
import indigo from '@material-ui/core/colors/indigo';
import blue from '@material-ui/core/colors/blue';
import teal from '@material-ui/core/colors/teal';
import green from '@material-ui/core/colors/green';
import blueGrey from '@material-ui/core/colors/blueGrey';

const colors = [
  red,
  pink,
  purple,
  indigo,
  blue,
  teal,
  green,
];

export default function colorFrom(string) {
  try {
      const index = string
          .toString()
          .split('')
          .map(char => char.charCodeAt())
          .reduce((sum, num) => sum + num, 0)

      const colorIndex = index % colors.length

      return colors[colorIndex][500];
  } catch (err) {
     return blueGrey[500]
  }



}